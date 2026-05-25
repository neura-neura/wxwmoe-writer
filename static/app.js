var els = {
  account: document.querySelector("#account"),
  title: document.querySelector("#title"),
  body: document.querySelector("#body"),
  visibility: document.querySelector("#visibility"),
  titleMode: document.querySelector("#titleMode"),
  settingsMenu: document.querySelector("#settingsMenu"),
  settingsSummary: document.querySelector(".settings-summary"),
  settingsPanel: document.querySelector(".settings-panel"),
  settingsLabel: document.querySelector("#settingsLabel"),
  language: document.querySelector("#language"),
  languageLabel: document.querySelector("#languageLabel"),
  keyboardSound: document.querySelector("#keyboardSound"),
  keyboardSoundLabel: document.querySelector("#keyboardSoundLabel"),
  keyboardSoundVolume: document.querySelector("#keyboardSoundVolume"),
  keyboardSoundVolumeLabel: document.querySelector("#keyboardSoundVolumeLabel"),
  keyboardSoundVolumeValue: document.querySelector("#keyboardSoundVolumeValue"),
  themeToggle: document.querySelector("#themeToggle"),
  logout: document.querySelector("#logout"),
  publish: document.querySelector("#publish"),
  saved: document.querySelector("#saved"),
  count: document.querySelector("#count"),
  words: document.querySelector("#words"),
  toast: document.querySelector("#toast")
};

var PREF_KEY = "wxw-diary-preferences";
var defaultPrefs = {
  visibility: "unlisted",
  titleMode: "heading",
  language: "en",
  theme: "light"
};

var i18n = {
  en: {
    documentTitle: "wxw.moe diary",
    title: "Title",
    body: "Body",
    settings: "Settings",
    language: "Language",
    keyboardSound: "Keyboard sound",
    soundVolume: "Sound volume",
    titlePlaceholder: "Title",
    bodyPlaceholder: "Start here...",
    localDraft: "Local draft",
    saved: "Saved locally",
    recovered: "Draft restored",
    publish: "Publish",
    publishing: "Publishing",
    signOut: "Sign out",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    visitPost: "Visit post",
    published: "Published on wxw.moe.",
    empty: "Write something before publishing.",
    publishFailed: "Could not publish.",
    logoutFailed: "Could not sign out.",
    visibility: {
      public: "Public",
      unlisted: "Unlisted",
      private: "Followers only",
      direct: "Direct"
    },
    titleMode: {
      heading: "Title in post",
      cw: "Title as content warning"
    },
    keyboardSoundProfiles: {
      none: "No sound",
      alpaca: "Alpaca",
      ios: "iOS",
      "logitech-g915-tkl-brown": "Logitech G915 TKL Brown"
    },
    titleModeHelp: "Title in post publishes it as the first line. Content warning uses Mastodon's CW field and hides the body behind it."
  },
  es: {
    documentTitle: "Diario wxw.moe",
    title: "Título",
    body: "Cuerpo",
    settings: "Configuración",
    language: "Idioma",
    keyboardSound: "Sonido de teclado",
    soundVolume: "Volumen del sonido",
    titlePlaceholder: "Título",
    bodyPlaceholder: "Empieza aquí...",
    localDraft: "Borrador local",
    saved: "Guardado localmente",
    recovered: "Borrador recuperado",
    publish: "Publicar",
    publishing: "Publicando",
    signOut: "Cerrar sesión",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    visitPost: "Visitar post",
    published: "Publicado en wxw.moe.",
    empty: "Escribe algo antes de publicar.",
    publishFailed: "No se pudo publicar.",
    logoutFailed: "No se pudo cerrar sesión.",
    visibility: {
      public: "Pública",
      unlisted: "No listada",
      private: "Solo seguidores",
      direct: "Directa"
    },
    titleMode: {
      heading: "Título en el post",
      cw: "Título como aviso CW"
    },
    keyboardSoundProfiles: {
      none: "Sin sonido",
      alpaca: "Alpaca",
      ios: "iOS",
      "logitech-g915-tkl-brown": "Logitech G915 TKL Brown"
    },
    titleModeHelp: "Título en el post lo publica como primera línea. Aviso CW usa el campo Content Warning de Mastodon y oculta el cuerpo detrás."
  },
  zh: {
    documentTitle: "wxw.moe 日记",
    title: "标题",
    body: "正文",
    settings: "设置",
    language: "语言",
    keyboardSound: "键盘声音",
    soundVolume: "声音音量",
    titlePlaceholder: "标题",
    bodyPlaceholder: "从这里开始...",
    localDraft: "本地草稿",
    saved: "已在本地保存",
    recovered: "已恢复草稿",
    publish: "发布",
    publishing: "发布中",
    signOut: "退出登录",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    visitPost: "查看帖子",
    published: "已发布到 wxw.moe。",
    empty: "发布前先写一点内容。",
    publishFailed: "发布失败。",
    logoutFailed: "退出登录失败。",
    visibility: {
      public: "公开",
      unlisted: "未列出",
      private: "仅关注者",
      direct: "私信"
    },
    titleMode: {
      heading: "标题写入帖文",
      cw: "标题作为 CW"
    },
    keyboardSoundProfiles: {
      none: "无声音",
      alpaca: "Alpaca",
      ios: "iOS",
      "logitech-g915-tkl-brown": "Logitech G915 TKL Brown"
    },
    titleModeHelp: "标题写入帖文会把它放在第一行。CW 会使用 Mastodon 的内容警告字段并隐藏正文。"
  }
};

var csrf = "";
var maxCharacters = 20000;
var draftKey = "wxw-diary-draft";
var prefs = loadPreferences();
var toastTimer = 0;

function optionIsAllowed(value, allowed, fallback) {
  return allowed.indexOf(value) >= 0 ? value : fallback;
}

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    return false;
  }
  return true;
}

function safeRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    return false;
  }
  return true;
}

function loadPreferences() {
  var raw = safeGet(PREF_KEY);
  var parsed;
  if (!raw) {
    return {
      visibility: defaultPrefs.visibility,
      titleMode: defaultPrefs.titleMode,
      language: defaultPrefs.language,
      theme: defaultPrefs.theme
    };
  }

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    parsed = {};
  }

  return {
    visibility: optionIsAllowed(parsed.visibility, ["public", "unlisted", "private", "direct"], defaultPrefs.visibility),
    titleMode: optionIsAllowed(parsed.titleMode, ["heading", "cw"], defaultPrefs.titleMode),
    language: optionIsAllowed(parsed.language, ["en", "es", "zh"], defaultPrefs.language),
    theme: optionIsAllowed(parsed.theme, ["light", "dark"], defaultPrefs.theme)
  };
}

function savePreferences() {
  safeSet(PREF_KEY, JSON.stringify(prefs));
}

function text(key) {
  var dictionary = i18n[prefs.language] || i18n.en;
  return dictionary[key] || i18n.en[key];
}

function overLimitText(extra) {
  if (prefs.language === "es") return "Te pasaste por " + extra + " caracteres.";
  if (prefs.language === "zh") return "超出 " + extra + " 个字符。";
  return "You are " + extra + " characters over the limit.";
}

function charactersText(count, max) {
  if (prefs.language === "es") return count + " / " + max + " caracteres";
  if (prefs.language === "zh") return count + " / " + max + " 字符";
  return count + " / " + max + " characters";
}

function wordsText(count) {
  if (prefs.language === "es") return count + " " + (count === 1 ? "palabra" : "palabras");
  if (prefs.language === "zh") return count + " 词";
  return count + " " + (count === 1 ? "word" : "words");
}

function updateVolumeLabel(volume) {
  if (!els.keyboardSoundVolumeValue) return;
  els.keyboardSoundVolumeValue.textContent = Math.round(Number(volume || 0) * 100) + "%";
}

function fillOptions(select, labels) {
  var i;
  var option;
  if (!select || !labels) return;
  for (i = 0; i < select.options.length; i += 1) {
    option = select.options[i];
    option.textContent = labels[option.value] || option.value;
  }
}

function applyPreferences() {
  var themeLabel;

  document.documentElement.lang = prefs.language;
  document.documentElement.setAttribute("data-theme", prefs.theme);
  document.title = text("documentTitle");

  els.visibility.value = prefs.visibility;
  els.titleMode.value = prefs.titleMode;
  els.language.value = prefs.language;
  els.title.lang = prefs.language;
  els.body.lang = prefs.language;

  fillOptions(els.visibility, text("visibility"));
  fillOptions(els.titleMode, text("titleMode"));
  fillOptions(els.keyboardSound, text("keyboardSoundProfiles"));

  els.visibility.setAttribute("aria-label", text("visibility")[prefs.visibility]);
  els.titleMode.setAttribute("aria-label", text("titleMode")[prefs.titleMode]);
  els.titleMode.title = text("titleModeHelp");
  els.settingsSummary.setAttribute("aria-label", text("settings"));
  els.settingsSummary.title = text("settings");
  els.settingsPanel.setAttribute("aria-label", text("settings"));
  els.settingsLabel.textContent = text("settings");
  els.languageLabel.textContent = text("language");
  els.language.setAttribute("aria-label", text("language"));
  els.keyboardSoundLabel.textContent = text("keyboardSound");
  els.keyboardSound.setAttribute("aria-label", text("keyboardSound"));
  els.keyboardSoundVolumeLabel.textContent = text("soundVolume");
  els.keyboardSoundVolume.setAttribute("aria-label", text("soundVolume"));
  if (window.wxwKeyboardSounds) {
    els.keyboardSound.value = window.wxwKeyboardSounds.getProfile();
    updateVolumeLabel(window.wxwKeyboardSounds.getVolume());
  } else {
    updateVolumeLabel(Number(els.keyboardSoundVolume.value || 0) / 100);
  }
  els.title.placeholder = text("titlePlaceholder");
  els.title.setAttribute("aria-label", text("title"));
  els.body.placeholder = text("bodyPlaceholder");
  els.body.setAttribute("aria-label", text("body"));
  els.publish.title = "Ctrl+Enter";
  els.publish.querySelector("span").textContent = text("publish");
  els.logout.title = text("signOut");
  els.logout.setAttribute("aria-label", text("signOut"));

  themeLabel = prefs.theme === "dark" ? text("lightMode") : text("darkMode");
  els.themeToggle.title = themeLabel;
  els.themeToggle.setAttribute("aria-label", themeLabel);

  if (!els.title.value && !els.body.value) {
    els.saved.textContent = text("localDraft");
  }
  updateCount();
}

function composedText() {
  var title = els.title.value.trim();
  var body = els.body.value.trim();
  if (prefs.titleMode === "cw") {
    return { status: body, spoiler: title };
  }
  return { status: title ? title + (body ? "\n\n" + body : "") : body, spoiler: "" };
}

function textForCounting() {
  var parts = composedText();
  return (parts.spoiler + " " + parts.status).trim();
}

function characterCount() {
  var parts = composedText();
  return parts.status.length + parts.spoiler.length;
}

function wordCount(value) {
  var normalized = value.trim();
  var latin;
  var cjk;
  if (!normalized) return 0;
  latin = normalized.match(/[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:['’][A-Za-z0-9À-ÖØ-öø-ÿ]+)?/g) || [];
  cjk = normalized.match(/[\u3400-\u9fff\uf900-\ufaff]/g) || [];
  return latin.length + cjk.length;
}

function showToast(message, action, duration) {
  var messageEl;
  var link;
  window.clearTimeout(toastTimer);
  els.toast.textContent = "";

  messageEl = document.createElement("span");
  messageEl.className = "toast-message";
  messageEl.textContent = message;
  els.toast.appendChild(messageEl);

  if (action && action.href) {
    link = document.createElement("a");
    link.className = "toast-action";
    link.href = action.href;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = action.label;
    els.toast.appendChild(link);
  }

  els.toast.classList.add("visible");
  toastTimer = window.setTimeout(function () {
    els.toast.classList.remove("visible");
  }, duration || 4600);
}

function autosize() {
  els.body.style.height = "auto";
  els.body.style.height = Math.max(els.body.scrollHeight, window.innerHeight * 0.48) + "px";
}

function updateCount() {
  var count = characterCount();
  els.count.textContent = charactersText(count, maxCharacters);
  els.words.textContent = wordsText(wordCount(textForCounting()));
  els.count.style.color = count > maxCharacters ? "var(--danger)" : "";
}

function saveDraft() {
  var draft = {
    title: els.title.value,
    body: els.body.value,
    updatedAt: Date.now()
  };

  if (draft.title.trim() || draft.body.trim()) {
    safeSet(draftKey, JSON.stringify(draft));
    els.saved.textContent = text("saved");
  } else {
    safeRemove(draftKey);
    els.saved.textContent = text("localDraft");
  }
  updateCount();
}

function loadDraft() {
  var raw = safeGet(draftKey);
  var draft;
  var hasPrefs;
  if (!raw) return;

  try {
    draft = JSON.parse(raw);
    els.title.value = draft.title || "";
    els.body.value = draft.body || "";

    hasPrefs = Boolean(safeGet(PREF_KEY));
    if (!hasPrefs && draft.visibility && draft.titleMode) {
      prefs.visibility = draft.visibility;
      prefs.titleMode = draft.titleMode;
      savePreferences();
      applyPreferences();
    }
    els.saved.textContent = text("recovered");
  } catch (error) {
    safeRemove(draftKey);
  }
}

function loadSession() {
  return fetch("/api/me", { credentials: "same-origin" })
    .then(function (res) {
      if (!res.ok) {
        window.location.href = "/login";
        return null;
      }
      return res.json();
    })
    .then(function (data) {
      var acct;
      var limits;
      var account;
      if (!data) return;
      limits = data.limits || {};
      account = data.account || {};
      csrf = data.csrf || "";
      maxCharacters = limits.max_characters || 20000;
      acct = account.acct ? "@" + account.acct : "wxw.moe";
      els.account.textContent = acct + " · " + (limits.title || "wxw.moe");
      draftKey = "wxw-diary-draft-" + (account.id || "default");
      loadDraft();
      autosize();
      updateCount();
      if (window.innerWidth >= 821) {
        try {
          els.body.focus({ preventScroll: true });
        } catch (error) {
          els.body.focus();
        }
      }
    });
}

function parseJsonResponse(res) {
  return res.json()
    .catch(function () {
      return {};
    })
    .then(function (data) {
      if (!res.ok || !data.ok) {
        throw new Error(data.error || text("publishFailed"));
      }
      return data;
    });
}

function publish() {
  var count = characterCount();
  if (!composedText().status.trim()) {
    showToast(text("empty"));
    return;
  }
  if (count > maxCharacters) {
    showToast(overLimitText(count - maxCharacters));
    return;
  }

  els.publish.disabled = true;
  els.publish.querySelector("span").textContent = text("publishing");

  fetch("/api/publish", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf
    },
    body: JSON.stringify({
      title: els.title.value,
      body: els.body.value,
      visibility: prefs.visibility,
      title_mode: prefs.titleMode,
      language: prefs.language
    })
  })
    .then(parseJsonResponse)
    .then(function (data) {
      safeRemove(draftKey);
      els.title.value = "";
      els.body.value = "";
      els.saved.textContent = text("localDraft");
      autosize();
      updateCount();
      showToast(
        text("published"),
        data.url ? { href: data.url, label: text("visitPost") } : null,
        data.url ? 12000 : 4600
      );
    })
    .catch(function (error) {
      showToast(error.message || text("publishFailed"));
    })
    .then(function () {
      els.publish.disabled = false;
      els.publish.querySelector("span").textContent = text("publish");
    });
}

function logout(event) {
  if (event && event.preventDefault) event.preventDefault();
  if (!csrf) {
    window.location.href = "/logout";
    return;
  }

  els.logout.classList.add("busy");
  fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
    headers: { "X-CSRF-Token": csrf }
  })
    .then(function (res) {
      if (!res.ok) throw new Error(text("logoutFailed"));
      window.location.href = "/logged-out";
    })
    .catch(function () {
      window.location.href = "/logout";
    });
}

function updatePreference(key, value) {
  prefs[key] = value;
  savePreferences();
  applyPreferences();
}

function bindEvents() {
  els.title.addEventListener("input", function () {
    saveDraft();
    autosize();
  });
  els.body.addEventListener("input", function () {
    saveDraft();
    autosize();
  });
  els.visibility.addEventListener("change", function () {
    updatePreference("visibility", els.visibility.value);
  });
  els.titleMode.addEventListener("change", function () {
    updatePreference("titleMode", els.titleMode.value);
  });
  els.language.addEventListener("change", function () {
    updatePreference("language", els.language.value);
  });
  els.themeToggle.addEventListener("click", function () {
    updatePreference("theme", prefs.theme === "dark" ? "light" : "dark");
  });
  els.logout.addEventListener("click", logout);
  document.addEventListener("pointerdown", function (event) {
    if (els.settingsMenu.open && !els.settingsMenu.contains(event.target)) {
      els.settingsMenu.open = false;
    }
  });
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      publish();
    }
    if (event.key === "Escape" && els.settingsMenu.open) {
      els.settingsMenu.open = false;
      els.settingsSummary.focus();
    }
  });
  els.publish.addEventListener("click", publish);
  window.addEventListener("resize", autosize);
}

bindEvents();
applyPreferences();
if (window.wxwKeyboardSounds) {
  window.wxwKeyboardSounds.init(els.keyboardSound, els.keyboardSoundVolume, updateVolumeLabel);
}
loadSession().catch(function (error) {
  showToast(error.message);
});
window.wxwDiaryReady = true;
