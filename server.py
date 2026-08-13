#!/usr/bin/env python3
import base64
import binascii
import hashlib
import hmac
import json
import mimetypes
import os
import re
import secrets
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path


APP_NAME = os.environ.get("WXW_APP_NAME", "wxwmoe writer")
APP_WEBSITE = os.environ.get("WXW_APP_WEBSITE", "https://github.com/neura-neura/wxwmoe-writer").rstrip("/")
DEFAULT_INSTANCE = "https://wxw.moe"
DEFAULT_SCOPES = "read:accounts write:statuses write:media"
SESSION_COOKIE = "wxw_diary_session"
STATE_COOKIE = "wxw_diary_oauth"
SESSION_TTL = 60 * 60 * 24 * 90
REQUEST_TIMEOUT = 20

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
PUBLIC_DIR = BASE_DIR / "public"
DATA_DIR = Path(os.environ.get("WXW_DATA_DIR", str(BASE_DIR / "data")))
CONFIG_PATH = DATA_DIR / "config.json"
SESSIONS_PATH = DATA_DIR / "sessions.json"

INSTANCE_URL = os.environ.get("WXW_INSTANCE", DEFAULT_INSTANCE).rstrip("/")
HOST = os.environ.get("WXW_APP_HOST", "0.0.0.0")
PORT = int(os.environ.get("WXW_APP_PORT", "18080"))
BASE_URL = os.environ.get("WXW_BASE_URL", "").strip().rstrip("/")
SCOPES = os.environ.get("WXW_SCOPES", DEFAULT_SCOPES)
TRANSLATE_PROVIDER = os.environ.get("WXW_TRANSLATE_PROVIDER", "google").strip().lower()
TRANSLATE_URL = os.environ.get("WXW_TRANSLATE_URL", "").strip()
TRANSLATE_API_KEY = os.environ.get("WXW_TRANSLATE_API_KEY", "").strip()
TRANSLATE_LANGUAGES = {"en", "es", "zh"}
TRANSLATE_SOURCES = TRANSLATE_LANGUAGES | {"auto"}
PROTECTED_TOKEN_RE = re.compile(
    r"https?://[^\s<>'\"]+|www\.[^\s<>'\"]+|@[A-Za-z0-9_]+(?:@[A-Za-z0-9_.-]+)?|#[^\s#]+|:[A-Za-z0-9_+-]+:"
)


def parse_base_urls():
    raw = os.environ.get("WXW_BASE_URLS", "")
    values = []
    if BASE_URL:
        values.append(BASE_URL)
    for item in raw.replace("\n", ",").replace(" ", ",").split(","):
        item = item.strip().rstrip("/")
        if item and item not in values:
            values.append(item)
    return values


BASE_URLS = parse_base_urls()


def callback_uri(base_url):
    return f"{base_url.rstrip('/')}/callback"


def fallback_base_url():
    return f"http://127.0.0.1:{PORT}"


def oauth_redirect_uris(base_url=None):
    base_urls = BASE_URLS or ([base_url] if base_url else [fallback_base_url()])
    return [callback_uri(item) for item in base_urls]


def request_base_url(handler):
    host = (handler.headers.get("Host") or "").strip()
    proto = (handler.headers.get("X-Forwarded-Proto") or "http").split(",")[0].strip()
    allowed = {urllib.parse.urlparse(base_url).netloc for base_url in BASE_URLS}
    valid_host = host and "/" not in host and "\\" not in host and " " not in host
    if valid_host and proto in {"http", "https"} and (not allowed or host in allowed):
        return f"{proto}://{host}"
    return BASE_URLS[0] if BASE_URLS else fallback_base_url()


def now():
    return int(time.time())


def b64url(data):
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def ensure_data_dir():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    try:
        os.chmod(DATA_DIR, 0o700)
    except PermissionError:
        pass


def load_json(path, default):
    try:
        with path.open("r", encoding="utf-8") as fh:
            return json.load(fh)
    except FileNotFoundError:
        return default
    except json.JSONDecodeError:
        return default


def save_json(path, data):
    ensure_data_dir()
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2, sort_keys=True)
    os.replace(tmp, path)
    try:
        os.chmod(path, 0o600)
    except PermissionError:
        pass


def get_config():
    ensure_data_dir()
    config = load_json(CONFIG_PATH, {})
    changed = False
    if "secret_key" not in config:
        config["secret_key"] = secrets.token_urlsafe(48)
        changed = True
    if changed:
        save_json(CONFIG_PATH, config)
    return config


def get_secret_key():
    return get_config()["secret_key"].encode("utf-8")


def sign_value(value):
    sig = hmac.new(get_secret_key(), value.encode("utf-8"), hashlib.sha256).digest()
    return f"{value}.{b64url(sig)}"


def verify_signed_value(signed):
    if not signed or "." not in signed:
        return None
    value, sig = signed.rsplit(".", 1)
    expected = sign_value(value).rsplit(".", 1)[1]
    if hmac.compare_digest(sig, expected):
        return value
    return None


def form_request(url, data, token=None):
    encoded = urllib.parse.urlencode(data, doseq=True).encode("utf-8")
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "User-Agent": f"{APP_NAME}/1.0",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=encoded, headers=headers, method="POST")
    return json_request(req)


def json_request(req):
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as res:
            raw = res.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace")
        message = body
        try:
            payload = json.loads(body)
            message = payload.get("error") or payload.get("error_description") or body
        except json.JSONDecodeError:
            pass
        raise RuntimeError(f"{exc.code} {exc.reason}: {message}") from exc


def json_post_request(url, payload, headers=None):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request_headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": f"{APP_NAME}/1.0",
    }
    if headers:
        request_headers.update(headers)
    req = urllib.request.Request(url, data=data, headers=request_headers, method="POST")
    return json_request(req)


def multipart_post(url, token, filename, content_type, content):
    boundary = f"----wxwmoe-{secrets.token_hex(16)}"
    body = b"\r\n".join(
        [
            f"--{boundary}".encode("ascii"),
            f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode("ascii"),
            f"Content-Type: {content_type}".encode("ascii"),
            b"",
            content,
            f"--{boundary}--".encode("ascii"),
            b"",
        ]
    )
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Accept": "application/json",
            "User-Agent": f"{APP_NAME}/1.0",
        },
        method="POST",
    )
    return json_request(req)


def decode_image_data_url(value):
    if not isinstance(value, str) or not value.startswith("data:"):
        raise ValueError("La portada no tiene un formato de imagen válido.")
    header, separator, encoded = value.partition(",")
    if separator != "," or ";base64" not in header.lower():
        raise ValueError("La portada no tiene un formato de imagen válido.")
    media_type = header[5:].split(";", 1)[0].lower()
    extensions = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/gif": "gif",
        "image/webp": "webp",
    }
    if media_type not in extensions:
        raise ValueError("Mastodon solo admite portadas PNG, JPEG, GIF o WebP.")
    try:
        content = base64.b64decode(encoded, validate=True)
    except (ValueError, binascii.Error) as exc:
        raise ValueError("La portada no tiene datos válidos.") from exc
    if not content:
        raise ValueError("La portada está vacía.")
    if len(content) > 8 * 1024 * 1024:
        raise ValueError("La portada supera el límite de 8 MB.")
    return media_type, extensions[media_type], content


def upload_media(token, filename, content_type, content):
    try:
        return multipart_post(
            f"{INSTANCE_URL}/api/v2/media",
            token,
            filename,
            content_type,
            content,
        )
    except RuntimeError as exc:
        if not (str(exc).startswith("404 ") or str(exc).startswith("405 ")):
            raise
        return multipart_post(
            f"{INSTANCE_URL}/api/v1/media",
            token,
            filename,
            content_type,
            content,
        )


def bearer_get(path, token):
    req = urllib.request.Request(
        f"{INSTANCE_URL}{path}",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
            "User-Agent": f"{APP_NAME}/1.0",
        },
    )
    return json_request(req)


def register_oauth_app(redirect_uris=None):
    config = get_config()
    app = config.get("oauth_app")
    redirect_uris = redirect_uris or oauth_redirect_uris()
    if (
        app
        and app.get("client_name") == APP_NAME
        and app.get("website") == APP_WEBSITE
        and app.get("redirect_uris") == redirect_uris
        and app.get("instance") == INSTANCE_URL
        and app.get("scopes") == SCOPES
    ):
        return app

    payload = form_request(
        f"{INSTANCE_URL}/api/v1/apps",
        {
            "client_name": APP_NAME,
            "redirect_uris": "\n".join(redirect_uris),
            "scopes": SCOPES,
            "website": APP_WEBSITE,
        },
    )
    app = {
        "instance": INSTANCE_URL,
        "client_name": APP_NAME,
        "website": APP_WEBSITE,
        "redirect_uris": redirect_uris,
        "scopes": SCOPES,
        "client_id": payload["client_id"],
        "client_secret": payload["client_secret"],
        "vapid_key": payload.get("vapid_key"),
        "created_at": now(),
    }
    config["oauth_app"] = app
    save_json(CONFIG_PATH, config)
    return app


def load_sessions():
    sessions = load_json(SESSIONS_PATH, {})
    cutoff = now() - SESSION_TTL
    cleaned = {
        sid: session
        for sid, session in sessions.items()
        if session.get("created_at", 0) >= cutoff and session.get("access_token")
    }
    if cleaned != sessions:
        save_json(SESSIONS_PATH, cleaned)
    return cleaned


def save_sessions(sessions):
    save_json(SESSIONS_PATH, sessions)


def create_session(access_token, account):
    sessions = load_sessions()
    sid = secrets.token_urlsafe(32)
    sessions[sid] = {
        "created_at": now(),
        "access_token": access_token,
        "csrf": secrets.token_urlsafe(32),
        "account": {
            "id": account.get("id"),
            "acct": account.get("acct"),
            "username": account.get("username"),
            "display_name": account.get("display_name"),
            "url": account.get("url"),
            "avatar": account.get("avatar"),
        },
    }
    save_sessions(sessions)
    return sid


def delete_session(sid):
    sessions = load_sessions()
    if sid in sessions:
        del sessions[sid]
        save_sessions(sessions)


def get_instance_limits():
    try:
        req = urllib.request.Request(
            f"{INSTANCE_URL}/api/v1/instance",
            headers={"Accept": "application/json", "User-Agent": f"{APP_NAME}/1.0"},
        )
        data = json_request(req)
        return {
            "max_characters": int(
                data.get("configuration", {})
                .get("statuses", {})
                .get("max_characters", 20000)
            ),
            "title": data.get("title", "wxw.moe"),
        }
    except Exception:
        return {"max_characters": 20000, "title": "wxw.moe"}


def read_body(handler, max_bytes=1024 * 1024):
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length > max_bytes:
        raise ValueError("La petición es demasiado grande.")
    return handler.rfile.read(length)


def status_text(title, body, title_mode):
    title = (title or "").strip()
    body = (body or "").strip()
    if title_mode == "cw":
        return body, title
    if title:
        return f"{title}\n\n{body}" if body else title, ""
    return body, ""


def valid_language(language):
    if language in {"en", "es", "zh"}:
        return language
    return "en"


def valid_translate_source(language):
    if language in TRANSLATE_SOURCES:
        return language
    return "auto"


def valid_translate_target(language):
    if language in TRANSLATE_LANGUAGES:
        return language
    return "en"


def valid_case_mode(case_mode):
    if case_mode in {"normal", "upper", "lower"}:
        return case_mode
    return "normal"


def protect_translation_tokens(text):
    protected = {}

    def replace(match):
        marker = f"\ue000{len(protected)}\ue001"
        protected[marker] = match.group(0)
        return marker

    return PROTECTED_TOKEN_RE.sub(replace, text), protected


def restore_translation_tokens(text, protected):
    for marker, token in protected.items():
        text = text.replace(marker, token)
    return text


def apply_case_mode(text, case_mode):
    if case_mode == "upper":
        return text.upper()
    if case_mode == "lower":
        return text.lower()
    return text


def google_translate_text(text, source, target):
    url = TRANSLATE_URL or "https://translate.googleapis.com/translate_a/single"
    payload = urllib.parse.urlencode(
        {
            "client": "gtx",
            "sl": source,
            "tl": target,
            "dt": "t",
            "q": text,
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "User-Agent": f"{APP_NAME}/1.0",
        },
        method="POST",
    )
    data = json_request(req)
    parts = data[0] if data and isinstance(data[0], list) else []
    return "".join(part[0] for part in parts if part and part[0])


def libretranslate_text(text, source, target):
    url = TRANSLATE_URL or "https://libretranslate.com/translate"
    payload = {
        "q": text,
        "source": source,
        "target": target,
        "format": "text",
    }
    if TRANSLATE_API_KEY:
        payload["api_key"] = TRANSLATE_API_KEY
    data = json_post_request(url, payload)
    translated = data.get("translatedText")
    if not isinstance(translated, str):
        raise RuntimeError("La respuesta del traductor no incluyó texto traducido.")
    return translated


def translate_text(text, source, target, case_mode, protect_tokens):
    if not text:
        return ""
    protected = {}
    prepared = text
    if protect_tokens:
        prepared, protected = protect_translation_tokens(text)

    if TRANSLATE_PROVIDER in {"google", "googletranslate", "google-translate"}:
        translated = google_translate_text(prepared, source, target)
    elif TRANSLATE_PROVIDER in {"libre", "libretranslate", "libre-translate"}:
        translated = libretranslate_text(prepared, source, target)
    else:
        raise RuntimeError("El proveedor de traducción no está configurado correctamente.")

    translated = apply_case_mode(translated, case_mode)
    if protect_tokens:
        translated = restore_translation_tokens(translated, protected)
    return translated


def decode_signed_state(signed_state):
    state_value = verify_signed_value(signed_state)
    if not state_value:
        return None
    try:
        return json.loads(base64.urlsafe_b64decode(state_value + "=" * (-len(state_value) % 4)))
    except (json.JSONDecodeError, ValueError):
        return None


class AppHandler(BaseHTTPRequestHandler):
    server_version = "wxw-moe-diary/1.0"

    def log_message(self, fmt, *args):
        print(f"{self.address_string()} - {fmt % args}")

    @property
    def cookies(self):
        cookie = SimpleCookie()
        cookie.load(self.headers.get("Cookie", ""))
        return cookie

    def session_id(self):
        morsel = self.cookies.get(SESSION_COOKIE)
        if not morsel:
            return None
        return verify_signed_value(morsel.value)

    def session(self):
        sid = self.session_id()
        if not sid:
            return None, None
        sessions = load_sessions()
        session = sessions.get(sid)
        if not session:
            return None, None
        return sid, session

    def send_cookie(self, name, value, max_age=SESSION_TTL, path="/"):
        cookie = SimpleCookie()
        cookie[name] = value
        cookie[name]["path"] = path
        cookie[name]["max-age"] = str(max_age)
        cookie[name]["httponly"] = True
        cookie[name]["samesite"] = "Lax"
        self.send_header("Set-Cookie", cookie.output(header="").strip())

    def clear_cookie(self, name):
        self.send_cookie(name, "", max_age=0)

    def redirect(self, location, status=HTTPStatus.FOUND):
        self.send_response(status)
        self.send_header("Location", location)
        self.end_headers()

    def send_json(self, payload, status=HTTPStatus.OK):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def send_error_json(self, message, status=HTTPStatus.BAD_REQUEST):
        self.send_json({"ok": False, "error": message}, status)

    def serve_file(self, root, path):
        if path == "/":
            path = "/index.html"
        root = root.resolve()
        candidate = (root / path.lstrip("/")).resolve()
        if not str(candidate).startswith(str(root)):
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        if not candidate.exists() or not candidate.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        content = candidate.read_bytes()
        mime = mimetypes.guess_type(str(candidate))[0] or "application/octet-stream"
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", mime)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def serve_static(self, path):
        self.serve_file(STATIC_DIR, path)

    def serve_public(self, path):
        self.serve_file(PUBLIC_DIR, path)

    def require_session(self):
        sid, session = self.session()
        if not session:
            return None, None
        return sid, session

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        try:
            if path == "/health":
                self.send_json(
                    {
                        "ok": True,
                        "instance": INSTANCE_URL,
                        "base_urls": BASE_URLS,
                        "dynamic_host_callbacks": not bool(BASE_URLS),
                        "translation_provider": TRANSLATE_PROVIDER,
                    }
                )
                return

            if path == "/login":
                self.handle_login()
                return

            if path == "/callback":
                self.handle_callback(parsed)
                return

            if path == "/logout":
                sid = self.session_id()
                if sid:
                    delete_session(sid)
                self.send_response(HTTPStatus.FOUND)
                self.clear_cookie(SESSION_COOKIE)
                self.send_header("Location", "/logged-out")
                self.end_headers()
                return

            if path == "/logged-out":
                self.serve_static("/logged-out.html")
                return

            if path == "/api/me":
                _, session = self.require_session()
                if not session:
                    self.send_json({"authenticated": False}, HTTPStatus.UNAUTHORIZED)
                    return
                self.send_json(
                    {
                        "authenticated": True,
                        "account": session.get("account"),
                        "csrf": session.get("csrf"),
                        "instance": INSTANCE_URL,
                        "base_url": request_base_url(self),
                        "base_urls": BASE_URLS,
                        "limits": get_instance_limits(),
                    }
                )
                return

            if path == "/" and not self.session()[1]:
                self.redirect("/login")
                return

            if path == "/" or path.startswith("/static/"):
                static_path = "/index.html" if path == "/" else path.removeprefix("/static")
                self.serve_static(static_path)
                return

            if path.startswith("/sounds/"):
                self.serve_public(path)
                return

            self.send_error(HTTPStatus.NOT_FOUND)
        except Exception as exc:
            traceback.print_exc()
            self.send_error_json(str(exc), HTTPStatus.INTERNAL_SERVER_ERROR)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        try:
            if path == "/api/logout":
                self.handle_logout()
                return
            if path == "/api/publish":
                self.handle_publish()
                return
            if path == "/api/translate":
                self.handle_translate()
                return
            self.send_error(HTTPStatus.NOT_FOUND)
        except Exception as exc:
            traceback.print_exc()
            self.send_error_json(str(exc), HTTPStatus.INTERNAL_SERVER_ERROR)

    def handle_logout(self):
        sid, session = self.require_session()
        if session:
            csrf = self.headers.get("X-CSRF-Token", "")
            if not hmac.compare_digest(csrf, session.get("csrf", "")):
                self.send_error_json("Token CSRF inválido.", HTTPStatus.FORBIDDEN)
                return
            delete_session(sid)

        data = json.dumps({"ok": True}, ensure_ascii=False).encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.clear_cookie(SESSION_COOKIE)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle_login(self):
        redirect_uri = callback_uri(request_base_url(self))
        redirect_uris = oauth_redirect_uris(request_base_url(self))
        app = register_oauth_app(redirect_uris)
        verifier = b64url(secrets.token_bytes(32))
        challenge = b64url(hashlib.sha256(verifier.encode("ascii")).digest())
        state_payload = json.dumps(
            {
                "nonce": secrets.token_urlsafe(24),
                "verifier": verifier,
                "redirect_uri": redirect_uri,
                "created_at": now(),
            }
        )
        state = sign_value(b64url(state_payload.encode("utf-8")))

        params = urllib.parse.urlencode(
            {
                "response_type": "code",
                "client_id": app["client_id"],
                "redirect_uri": redirect_uri,
                "scope": SCOPES,
                "state": state,
                "code_challenge": challenge,
                "code_challenge_method": "S256",
            }
        )

        self.send_response(HTTPStatus.FOUND)
        self.clear_cookie(STATE_COOKIE)
        self.send_header("Location", f"{INSTANCE_URL}/oauth/authorize?{params}")
        self.end_headers()

    def handle_callback(self, parsed):
        query = urllib.parse.parse_qs(parsed.query)
        if "error" in query:
            self.send_error_json(query.get("error_description", query["error"])[0], HTTPStatus.UNAUTHORIZED)
            return

        code = query.get("code", [None])[0]
        state = query.get("state", [None])[0]
        if not code or not state:
            self.send_error_json("Faltan parámetros de OAuth.", HTTPStatus.BAD_REQUEST)
            return

        state_payload = decode_signed_state(state)
        if not state_payload:
            # Compatibility with login attempts started before this change.
            state_cookie = self.cookies.get(STATE_COOKIE)
            state_payload = decode_signed_state(state_cookie.value if state_cookie else None)
            if not state_payload:
                self.send_error_json("La sesión de login expiró. Intenta entrar de nuevo.", HTTPStatus.UNAUTHORIZED)
                return
            if state_payload.get("state") != state:
                self.send_error_json("El estado de OAuth no coincide. Intenta entrar de nuevo.", HTTPStatus.UNAUTHORIZED)
                return

        if state_payload.get("created_at", 0) < now() - 600:
            self.send_error_json("El estado de OAuth no coincide.", HTTPStatus.UNAUTHORIZED)
            return
        redirect_uri = state_payload.get("redirect_uri") or callback_uri(request_base_url(self))
        if redirect_uri not in oauth_redirect_uris(request_base_url(self)):
            self.send_error_json("El callback de OAuth no está permitido.", HTTPStatus.UNAUTHORIZED)
            return

        app = register_oauth_app()
        token_payload = form_request(
            f"{INSTANCE_URL}/oauth/token",
            {
                "client_id": app["client_id"],
                "client_secret": app["client_secret"],
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
                "code": code,
                "scope": SCOPES,
                "code_verifier": state_payload["verifier"],
            },
        )
        access_token = token_payload["access_token"]
        account = bearer_get("/api/v1/accounts/verify_credentials", access_token)
        sid = create_session(access_token, account)

        self.send_response(HTTPStatus.FOUND)
        self.send_cookie(SESSION_COOKIE, sign_value(sid))
        self.clear_cookie(STATE_COOKIE)
        self.send_header("Location", "/")
        self.end_headers()

    def handle_publish(self):
        _, session = self.require_session()
        if not session:
            self.send_json({"authenticated": False}, HTTPStatus.UNAUTHORIZED)
            return
        csrf = self.headers.get("X-CSRF-Token", "")
        if not hmac.compare_digest(csrf, session.get("csrf", "")):
            self.send_error_json("Token CSRF inválido.", HTTPStatus.FORBIDDEN)
            return

        raw = read_body(self, max_bytes=12 * 1024 * 1024)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_error_json("La petición no tiene JSON válido.", HTTPStatus.BAD_REQUEST)
            return

        title = payload.get("title", "")
        body = payload.get("body", "")
        title_mode = payload.get("title_mode", "heading")
        language = valid_language(payload.get("language", "en"))
        visibility = payload.get("visibility", "unlisted")
        if visibility not in {"public", "unlisted", "private", "direct"}:
            visibility = "unlisted"

        status, spoiler_text = status_text(title, body, title_mode)
        if not status.strip():
            self.send_error_json("Escribe algo antes de publicar.", HTTPStatus.BAD_REQUEST)
            return

        max_chars = get_instance_limits()["max_characters"]
        counted = len(status) + len(spoiler_text)
        if counted > max_chars:
            self.send_error_json(
                f"El texto tiene {counted} caracteres y wxw.moe permite {max_chars}.",
                HTTPStatus.BAD_REQUEST,
            )
            return

        data = {
            "status": status,
            "visibility": visibility,
            "language": language,
        }
        if spoiler_text:
            data["spoiler_text"] = spoiler_text

        media_data_url = payload.get("media_data_url", "")
        if media_data_url:
            try:
                media_type, extension, media_content = decode_image_data_url(media_data_url)
                media = upload_media(
                    session["access_token"],
                    f"cover.{extension}",
                    media_type,
                    media_content,
                )
            except ValueError as exc:
                self.send_error_json(str(exc), HTTPStatus.BAD_REQUEST)
                return
            except Exception as exc:
                self.send_error_json(f"No se pudo adjuntar la portada: {exc}", HTTPStatus.BAD_GATEWAY)
                return
            media_id = media.get("id") if isinstance(media, dict) else None
            if not media_id:
                self.send_error_json("Mastodon no devolvió el identificador de la portada.", HTTPStatus.BAD_GATEWAY)
                return
            data["media_ids[]"] = [media_id]

        published = form_request(
            f"{INSTANCE_URL}/api/v1/statuses",
            data,
            token=session["access_token"],
        )
        self.send_json(
            {
                "ok": True,
                "id": published.get("id"),
                "url": published.get("url") or published.get("uri"),
                "visibility": published.get("visibility"),
            }
        )

    def handle_translate(self):
        _, session = self.require_session()
        if not session:
            self.send_json({"authenticated": False}, HTTPStatus.UNAUTHORIZED)
            return
        csrf = self.headers.get("X-CSRF-Token", "")
        if not hmac.compare_digest(csrf, session.get("csrf", "")):
            self.send_error_json("Token CSRF inválido.", HTTPStatus.FORBIDDEN)
            return

        raw = read_body(self)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_error_json("La petición no tiene JSON válido.", HTTPStatus.BAD_REQUEST)
            return

        title = payload.get("title", "")
        body = payload.get("body", "")
        source = valid_translate_source(payload.get("source", "auto"))
        target = valid_translate_target(payload.get("target", "en"))
        case_mode = valid_case_mode(payload.get("case_mode", "normal"))
        protect_tokens = bool(payload.get("protect_tokens", True))

        if not str(title).strip() and not str(body).strip():
            self.send_error_json("No hay texto para traducir.", HTTPStatus.BAD_REQUEST)
            return

        try:
            translated_title = translate_text(str(title), source, target, case_mode, protect_tokens)
            translated_body = translate_text(str(body), source, target, case_mode, protect_tokens)
        except Exception as exc:
            self.send_error_json(f"No se pudo traducir: {exc}", HTTPStatus.BAD_GATEWAY)
            return

        self.send_json(
            {
                "ok": True,
                "title": translated_title,
                "body": translated_body,
                "source": source,
                "target": target,
                "case_mode": case_mode,
            }
        )


def main():
    ensure_data_dir()
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"Listening on http://{HOST}:{PORT}")
    print(f"Instance: {INSTANCE_URL}")
    print(f"Base URLs: {', '.join(BASE_URLS)}")
    server.serve_forever()


if __name__ == "__main__":
    main()
