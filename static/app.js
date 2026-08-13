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
  appearanceSettingsLabel: document.querySelector("#appearanceSettingsLabel"),
  themeLabel: document.querySelector("#themeLabel"),
  themePicker: document.querySelector("#themePicker"),
  themePickerValue: document.querySelector("#themePickerValue"),
  editorThemeSelect: document.querySelector("#editorThemeSelect"),
  editorThemeLabel: document.querySelector("#editorThemeLabel"),
  language: document.querySelector("#language"),
  languageLabel: document.querySelector("#languageLabel"),
  keyboardSound: document.querySelector("#keyboardSound"),
  keyboardSoundLabel: document.querySelector("#keyboardSoundLabel"),
  keyboardSoundVolume: document.querySelector("#keyboardSoundVolume"),
  keyboardSoundVolumeLabel: document.querySelector("#keyboardSoundVolumeLabel"),
  keyboardSoundVolumeValue: document.querySelector("#keyboardSoundVolumeValue"),
  layoutSettingsLabel: document.querySelector("#layoutSettingsLabel"),
  pinHeader: document.querySelector("#pinHeader"),
  pinHeaderLabel: document.querySelector("#pinHeaderLabel"),
  pinFooter: document.querySelector("#pinFooter"),
  pinFooterLabel: document.querySelector("#pinFooterLabel"),
  pinnedChrome: document.querySelector("#pinnedChrome"),
  pinnedChromeLabel: document.querySelector("#pinnedChromeLabel"),
  autoIndentParagraphs: document.querySelector("#autoIndentParagraphs"),
  autoIndentParagraphsLabel: document.querySelector("#autoIndentParagraphsLabel"),
  justifyParagraphs: document.querySelector("#justifyParagraphs"),
  justifyParagraphsLabel: document.querySelector("#justifyParagraphsLabel"),
  translationSettingsLabel: document.querySelector("#translationSettingsLabel"),
  translateSource: document.querySelector("#translateSource"),
  translateSourceLabel: document.querySelector("#translateSourceLabel"),
  translateTarget: document.querySelector("#translateTarget"),
  translateTargetLabel: document.querySelector("#translateTargetLabel"),
  translateCase: document.querySelector("#translateCase"),
  translateCaseLabel: document.querySelector("#translateCaseLabel"),
  translateProtectTokens: document.querySelector("#translateProtectTokens"),
  translateProtectTokensLabel: document.querySelector("#translateProtectTokensLabel"),
  translateShortcutLabel: document.querySelector("#translateShortcutLabel"),
  translateShortcutButton: document.querySelector("#translateShortcutButton"),
  translateButton: document.querySelector("#translateButton"),
  themeToggle: document.querySelector("#themeToggle"),
  logout: document.querySelector("#logout"),
  publish: document.querySelector("#publish"),
  statusbar: document.querySelector(".statusbar"),
  saved: document.querySelector("#saved"),
  count: document.querySelector("#count"),
  words: document.querySelector("#words"),
  toast: document.querySelector("#toast"),
  noteBodyEditor: document.querySelector("#noteBodyEditor"),
  noteSidebar: document.querySelector("#noteSidebar"),
  noteSidebarToggle: document.querySelector("#noteSidebarToggle"),
  noteToc: document.querySelector("#noteToc"),
  noteHint: document.querySelector("#noteHint"),
  noteGuide: document.querySelector("#noteGuide"),
  noteTocPanel: document.querySelector("#noteTocPanel"),
  noteHintPanel: document.querySelector("#noteHintPanel"),
  noteGuidePanel: document.querySelector("#noteGuidePanel"),
  noteMore: document.querySelector("#noteMore"),
  noteMoreMenu: document.querySelector("#noteMoreMenu"),
  noteSaveStatus: document.querySelector("#noteSaveStatus"),
  notePublish: document.querySelector("#notePublish"),
  notePublishLabel: document.querySelector("#notePublishLabel"),
  noteThemeLabel: document.querySelector("#noteThemeLabel"),
  noteThemePicker: document.querySelector("#noteThemePicker"),
  noteThemePickerValue: document.querySelector("#noteThemePickerValue"),
  noteCopyButton: document.querySelector("#noteCopyButton"),
  noteDownloadButton: document.querySelector("#noteDownloadButton"),
  noteSettingsButton: document.querySelector("#noteSettingsButton"),
  noteImage: document.querySelector("#noteImage"),
  noteImageInput: document.querySelector("#noteImageInput"),
  noteCount: document.querySelector("#noteCount"),
  noteTocTitle: document.querySelector("#noteTocTitle"),
  noteTocEmpty: document.querySelector("#noteTocEmpty"),
  noteTocList: document.querySelector("#noteTocList"),
  noteHintTitle: document.querySelector("#noteHintTitle"),
  noteHintContent: document.querySelector("#noteHintContent"),
  noteGuideTitle: document.querySelector("#noteGuideTitle"),
  noteGuideContent: document.querySelector("#noteGuideContent"),
  noteCover: document.querySelector("#noteCover"),
  noteCoverImage: document.querySelector("#noteCoverImage"),
  noteCoverRemove: document.querySelector("#noteCoverRemove"),
  noteInsertButton: document.querySelector("#noteInsertButton"),
  noteInsertMenu: document.querySelector("#noteInsertMenu"),
  noteInsertTitle: document.querySelector("#noteInsertTitle"),
  noteFormatBar: document.querySelector("#noteFormatBar")
};

var PREF_KEY = "wxw-diary-preferences";
var TRANSLATION_PREF_KEY = "wxw-translation-preferences";
var defaultPrefs = {
  visibility: "unlisted",
  titleMode: "heading",
  language: "en",
  theme: "paper-bloom",
  colorMode: "light",
  systemColorMode: false,
  appearance: "light",
  pinHeader: false,
  pinFooter: false,
  pinnedChrome: false,
  autoIndentParagraphs: false,
  justifyParagraphs: false
};
var defaultTranslationPrefs = {
  source: "auto",
  target: "en",
  caseMode: "normal",
  protectTokens: true,
  shortcut: "Ctrl+Alt+T"
};

var i18n = {
  en: {
    documentTitle: "wxw.moe diary",
    title: "Title",
    body: "Body",
    settings: "Settings",
    appearance: "Appearance",
    theme: "Theme",
    editorLayout: "Editor layout",
    language: "Language",
    keyboardSound: "Keyboard sound",
    soundVolume: "Sound volume",
    layout: "Layout",
    pinHeader: "Pin header while scrolling",
    pinFooter: "Pin footer while scrolling",
    pinnedChrome: "Show pinned shadow and border",
    autoIndentParagraphs: "Auto-indent normal paragraphs",
    justifyParagraphs: "Justify normal paragraphs",
    translation: "Translation",
    translateFrom: "From",
    translateTo: "To",
    translateCase: "Result case",
    translate: "Translate",
    translating: "Translating",
    translated: "Translation applied.",
    translateFailed: "Could not translate.",
    noTextToTranslate: "Write something before translating.",
    protectTokens: "Protect mentions, hashtags, links, and :emoji:.",
    shortcut: "Shortcut",
    pressShortcut: "Press shortcut",
    titlePlaceholder: "Title",
    bodyPlaceholder: "Start here...",
    noteTitlePlaceholder: "Article title",
    noteBodyPlaceholder: "Start writing...",
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
    draftSaved: "Draft saved locally.",
    noteClose: "Close",
    noteSave: "Save draft",
    notePublish: "Publish",
    noteMore: "More",
    noteAddImage: "Add image",
    noteRemoveImage: "Remove cover image",
    noteToc: "Table of contents",
    noteTocEmpty: "Set a heading to show it here",
    noteHint: "Note tips",
    noteGuide: "Editor guide",
    noteInsert: "Insert",
    noteCoverImage: "Cover image",
    noteHeading: "Heading",
    noteSubheading: "Subheading",
    noteBulletList: "Bullet list",
    noteNumberedList: "Numbered list",
    noteQuote: "Quote",
    noteCode: "Code",
    noteHighlight: "Highlight",
    noteDivider: "Divider",
    noteInsertToc: "Table of contents",
    noteButtons: "Buttons",
    noteKeyboardShortcuts: "Keyboard shortcuts",
    noteGettingStarted: "Getting started",
    noteMostImportant: "The most important thing is to start writing.",
    noteShare: "Share your article on social networks when it is ready.",
    noteMarkdownHint: "Headings and formatting stay as Markdown when you publish to Mastodon.",
    noteLinkPrompt: "Link URL",
    noteUndo: "Undo",
    noteRedo: "Redo",
    noteSaveShortcut: "Save draft",
    noteBoldShortcut: "Bold",
    noteStrikeShortcut: "Strikethrough",
    noteQuoteShortcut: "Quote",
    noteHeadingShortcut: "Heading (h2)",
    noteSubheadingShortcut: "Subheading (h3)",
    noteCodeShortcut: "Code",
    noteHighlightShortcut: "Highlight",
    noteBulletShortcut: "Bullet list",
    noteNumberedShortcut: "Numbered list",
    noteLinkShortcut: "Link",
    noteOpenSettings: "Open settings",
    noteCharacters: "characters",
    noteSystemMode: "Use system theme",
    noteSystemModeOn: "Using system theme",
    noteCopy: "Copy all content",
    noteCopied: "Content copied.",
    noteDownload: "Download Markdown",
    imageSelected: "Image selected locally.",
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
    translationLanguages: {
      auto: "Auto",
      en: "English",
      es: "Spanish",
      zh: "Chinese"
    },
    caseModes: {
      normal: "Normal",
      upper: "UPPERCASE",
      lower: "lowercase"
    },
    titleModeHelp: "Title in post publishes it as the first line. Content warning uses Mastodon's CW field and hides the body behind it."
  },
  es: {
    appearance: "Apariencia",
    theme: "Tema",
    editorLayout: "Diseño del editor",
    noteTitlePlaceholder: "Titulo del articulo",
    noteBodyPlaceholder: "Empieza a escribir...",
    draftSaved: "Borrador guardado localmente.",
    noteClose: "Cerrar",
    noteSave: "Guardar borrador",
    notePublish: "Publicar",
    noteMore: "Mas",
    noteAddImage: "Anadir imagen",
    noteRemoveImage: "Quitar imagen de portada",
    noteToc: "Tabla de contenidos",
    noteTocEmpty: "Define un encabezado para mostrarlo aqui",
    noteHint: "Consejos de note",
    noteGuide: "Guia del editor",
    noteInsert: "Insertar",
    noteCoverImage: "Imagen de portada",
    noteHeading: "Encabezado",
    noteSubheading: "Subencabezado",
    noteBulletList: "Lista con viñetas",
    noteNumberedList: "Lista numerada",
    noteQuote: "Cita",
    noteCode: "Codigo",
    noteHighlight: "Resaltado",
    noteDivider: "Divisor",
    noteInsertToc: "Tabla de contenidos",
    noteButtons: "Botones",
    noteKeyboardShortcuts: "Atajos de teclado",
    noteGettingStarted: "Para empezar",
    noteMostImportant: "Lo mas importante es empezar a escribir.",
    noteShare: "Cuando termines, comparte tu articulo en redes sociales.",
    noteMarkdownHint: "Los encabezados y formatos se conservan como Markdown al publicar en Mastodon.",
    noteLinkPrompt: "URL del enlace",
    noteUndo: "Deshacer",
    noteRedo: "Rehacer",
    noteSaveShortcut: "Guardar borrador",
    noteBoldShortcut: "Negrita",
    noteStrikeShortcut: "Tachado",
    noteQuoteShortcut: "Cita",
    noteHeadingShortcut: "Encabezado (h2)",
    noteSubheadingShortcut: "Subencabezado (h3)",
    noteCodeShortcut: "Codigo",
    noteHighlightShortcut: "Resaltado",
    noteBulletShortcut: "Lista con viñetas",
    noteNumberedShortcut: "Lista numerada",
    noteLinkShortcut: "Enlace",
    noteOpenSettings: "Abrir configuracion",
    noteCharacters: "caracteres",
    noteSystemMode: "Usar tema del sistema",
    noteSystemModeOn: "Usando tema del sistema",
    noteCopy: "Copiar todo el contenido",
    noteCopied: "Contenido copiado.",
    noteDownload: "Descargar Markdown",
    imageSelected: "Imagen seleccionada localmente.",
    documentTitle: "Diario wxw.moe",
    title: "Título",
    body: "Cuerpo",
    settings: "Configuración",
    language: "Idioma",
    keyboardSound: "Sonido de teclado",
    soundVolume: "Volumen del sonido",
    layout: "Disposición",
    pinHeader: "Fijar encabezado al hacer scroll",
    pinFooter: "Fijar barra inferior al hacer scroll",
    pinnedChrome: "Mostrar sombra y borde al fijar",
    autoIndentParagraphs: "Sangrar automaticamente los parrafos normales",
    justifyParagraphs: "Justificar los parrafos normales",
    translation: "Traducción",
    translateFrom: "Origen",
    translateTo: "Destino",
    translateCase: "Formato",
    translate: "Traducir",
    translating: "Traduciendo",
    translated: "Traducción aplicada.",
    translateFailed: "No se pudo traducir.",
    noTextToTranslate: "Escribe algo antes de traducir.",
    protectTokens: "Proteger menciones, hashtags, links y :emoji:.",
    shortcut: "Atajo",
    pressShortcut: "Presiona el atajo",
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
    translationLanguages: {
      auto: "Auto",
      en: "Inglés",
      es: "Español",
      zh: "Chino"
    },
    caseModes: {
      normal: "Normal",
      upper: "MAYÚSCULAS",
      lower: "minúsculas"
    },
    titleModeHelp: "Título en el post lo publica como primera línea. Aviso CW usa el campo Content Warning de Mastodon y oculta el cuerpo detrás."
  },
  zh: {
    noteSystemMode: "\u4f7f\u7528\u7cfb\u7edf\u4e3b\u9898",
    noteSystemModeOn: "\u6b63\u5728\u4f7f\u7528\u7cfb\u7edf\u4e3b\u9898",
    noteCopy: "\u590d\u5236\u5168\u90e8\u5185\u5bb9",
    noteCopied: "\u5185\u5bb9\u5df2\u590d\u5236\u3002",
    noteDownload: "\u4e0b\u8f7d Markdown",
    documentTitle: "wxw.moe 日记",
    title: "标题",
    body: "正文",
    settings: "设置",
    language: "语言",
    keyboardSound: "键盘声音",
    soundVolume: "声音音量",
    layout: "布局",
    pinHeader: "滚动时固定页眉",
    pinFooter: "滚动时固定页脚",
    pinnedChrome: "固定时显示阴影和边框",
    translation: "翻译",
    translateFrom: "源语言",
    translateTo: "目标语言",
    translateCase: "大小写",
    translate: "翻译",
    translating: "翻译中",
    translated: "已应用翻译。",
    translateFailed: "无法翻译。",
    noTextToTranslate: "请先写一些内容再翻译。",
    protectTokens: "保护提及、标签、链接和 :emoji:。",
    shortcut: "快捷键",
    pressShortcut: "按下快捷键",
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
    translationLanguages: {
      auto: "自动",
      en: "英语",
      es: "西班牙语",
      zh: "中文"
    },
    caseModes: {
      normal: "正常",
      upper: "大写",
      lower: "小写"
    },
    titleModeHelp: "标题写入帖文会把它放在第一行。CW 会使用 Mastodon 的内容警告字段并隐藏正文。"
  }
};

var csrf = "";
var maxCharacters = 20000;
var draftKey = "wxw-diary-draft";
var prefs = loadPreferences();
var translationPrefs = loadTranslationPreferences();
var toastTimer = 0;
var waitingForShortcut = false;
var noteSaveState = "localDraft";
var lastBodyContentHeight = 0;
var noteEditorReady = false;
var noteActivePanel = "toc";
var noteSelectionRange = null;
var noteActiveBlock = null;
var noteShortcutDefinitions = [
  { label: "noteUndo", keys: ["Ctrl", "Z"], action: "undo" },
  { label: "noteRedo", keys: ["Ctrl", "Y"], action: "redo" },
  { label: "noteSaveShortcut", keys: ["Ctrl", "S"], action: "save" },
  { label: "noteBoldShortcut", keys: ["Ctrl", "B"], action: "bold" },
  { label: "noteStrikeShortcut", keys: ["Ctrl", "Shift", "X"], action: "strike" },
  { label: "noteHighlightShortcut", keys: ["Ctrl", "Alt", "H"], action: "highlight" },
  { label: "noteQuoteShortcut", keys: ["Ctrl", "Shift", ">"], action: "quote" },
  { label: "noteHeadingShortcut", keys: ["Ctrl", "Alt", "2"], action: "heading" },
  { label: "noteSubheadingShortcut", keys: ["Ctrl", "Alt", "3"], action: "subheading" },
  { label: "noteCodeShortcut", keys: ["Ctrl", "Alt", "`"], action: "code" },
  { label: "noteBulletShortcut", keys: ["Ctrl", "Shift", "8"], action: "bullet" },
  { label: "noteNumberedShortcut", keys: ["Ctrl", "Shift", "7"], action: "number" },
  { label: "noteLinkShortcut", keys: ["Ctrl", "K"], action: "link" }
];

function optionIsAllowed(value, allowed, fallback) {
  return allowed.indexOf(value) >= 0 ? value : fallback;
}

function themeIds() {
  if (window.wxwThemes && typeof window.wxwThemes.ids === "function") {
    return window.wxwThemes.ids();
  }
  return ["paper-bloom", "note-editor"];
}

function resolveThemeId(value) {
  var ids = themeIds();
  return ids.indexOf(value) >= 0 ? value : defaultPrefs.theme;
}

function themeLabels() {
  if (window.wxwThemes && typeof window.wxwThemes.labelsFor === "function") {
    return window.wxwThemes.labelsFor(prefs ? prefs.language : defaultPrefs.language);
  }
  return {
    "paper-bloom": "Paper Bloom",
    "note-editor": "Note editor"
  };
}

function appearanceIds() {
  if (window.wxwThemes && typeof window.wxwThemes.appearanceIds === "function") {
    return window.wxwThemes.appearanceIds();
  }
  return ["system", "light", "dark", "ink-paper-light", "ink-paper-dark"];
}

function appearanceLabels() {
  if (window.wxwThemes && typeof window.wxwThemes.appearanceLabelsFor === "function") {
    return window.wxwThemes.appearanceLabelsFor(prefs ? prefs.language : defaultPrefs.language);
  }
  return {
    system: "System",
    light: "Light",
    dark: "Dark",
    "ink-paper-light": "Ink Paper light",
    "ink-paper-dark": "Ink Paper dark"
  };
}

function appearanceFor(id) {
  if (window.wxwThemes && typeof window.wxwThemes.appearance === "function") {
    return window.wxwThemes.appearance(id);
  }
  return { id: id, palette: "paper-bloom", colorMode: id === "dark" ? "dark" : "light" };
}

function appearanceFromPreferences() {
  if (prefs.systemColorMode) return "system";
  if (prefs.appearance && appearanceIds().indexOf(prefs.appearance) >= 0) return prefs.appearance;
  if (prefs.theme === "ink-paper") return prefs.colorMode === "dark" ? "ink-paper-dark" : "ink-paper-light";
  return prefs.colorMode === "dark" ? "dark" : "light";
}

function appearanceForColorMode(colorMode) {
  return document.documentElement.getAttribute("data-theme-palette") === "ink-paper" ?
    "ink-paper-" + colorMode : colorMode;
}

function setAppearancePicker(picker, value, labels) {
  var stops;
  var fill;
  var index;
  if (!picker) return;
  stops = picker.querySelectorAll("[data-appearance]");
  fill = picker.querySelector(".theme-picker-fill");
  index = Math.max(0, appearanceIds().indexOf(value));
  picker.setAttribute("data-appearance", value);
  Array.prototype.forEach.call(stops, function (stop, stopIndex) {
    var selected = stop.getAttribute("data-appearance") === value;
    stop.setAttribute("aria-checked", selected ? "true" : "false");
    stop.tabIndex = selected ? 0 : -1;
    stop.setAttribute("aria-label", labels[stop.getAttribute("data-appearance")] || stop.getAttribute("data-appearance"));
    stop.title = labels[stop.getAttribute("data-appearance")] || stop.getAttribute("data-appearance");
    if (stop.querySelector(".theme-picker-name")) stop.querySelector(".theme-picker-name").textContent = labels[stop.getAttribute("data-appearance")] || stop.getAttribute("data-appearance");
    if (selected) stop.setAttribute("data-selected", "true");
    else stop.removeAttribute("data-selected");
  });
  if (fill) {
    fill.style.setProperty("--theme-stop-index", index);
    fill.style.setProperty("--theme-fill-width", ((index + 0.5) / appearanceIds().length * 100) + "%");
  }
}

function updateAppearancePickers() {
  var value = appearanceFromPreferences();
  var labels = appearanceLabels();
  var label = labels[value] || value;
  setAppearancePicker(els.themePicker, value, labels);
  setAppearancePicker(els.noteThemePicker, value, labels);
  if (els.themePickerValue) els.themePickerValue.textContent = label;
  if (els.noteThemePickerValue) els.noteThemePickerValue.textContent = label;
}

function updateAppearance(value) {
  var appearance = appearanceFor(value);
  if (value === "system") {
    prefs.systemColorMode = true;
    prefs.colorMode = "light";
  } else {
    prefs.systemColorMode = false;
    prefs.colorMode = appearance.colorMode;
  }
  prefs.appearance = value;
  savePreferences();
  applyPreferences();
}

function bindAppearancePicker(picker) {
  var track;
  var dragging = false;
  var activePointerId = null;
  if (!picker) return;
  track = picker.querySelector(".theme-picker-track");
  if (track) {
    function updateFromPointer(event) {
      var rect;
      var index;
      rect = track.getBoundingClientRect();
      if (!rect.width) return;
      index = Math.round(((event.clientX - rect.left) / rect.width) * (appearanceIds().length - 1));
      index = Math.max(0, Math.min(appearanceIds().length - 1, index));
      updateAppearance(appearanceIds()[index]);
    }

    function stopDragging(event) {
      if (!dragging || (event.pointerId !== undefined && event.pointerId !== activePointerId)) return;
      dragging = false;
      if (track.releasePointerCapture && activePointerId !== null && track.hasPointerCapture && track.hasPointerCapture(activePointerId)) {
        track.releasePointerCapture(activePointerId);
      }
      activePointerId = null;
    }

    track.addEventListener("pointerdown", function (event) {
      if (event.button !== undefined && event.button !== 0) return;
      dragging = true;
      activePointerId = event.pointerId;
      if (track.setPointerCapture && event.pointerId !== undefined) track.setPointerCapture(event.pointerId);
      event.preventDefault();
      updateFromPointer(event);
    });
    track.addEventListener("pointermove", function (event) {
      if (!dragging || (event.pointerId !== undefined && event.pointerId !== activePointerId)) return;
      event.preventDefault();
      updateFromPointer(event);
    });
    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    track.addEventListener("lostpointercapture", function () {
      dragging = false;
      activePointerId = null;
    });
  }
  picker.querySelectorAll("[data-appearance]").forEach(function (stop) {
    stop.addEventListener("click", function () {
      updateAppearance(stop.getAttribute("data-appearance"));
    });
    stop.addEventListener("keydown", function (event) {
      var ids = appearanceIds();
      var current = ids.indexOf(stop.getAttribute("data-appearance"));
      var next = current;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % ids.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + ids.length) % ids.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = ids.length - 1;
      else return;
      event.preventDefault();
      updateAppearance(ids[next]);
      window.setTimeout(function () {
        var selected = picker.querySelector('[data-appearance="' + ids[next] + '"]');
        if (selected) selected.focus();
      }, 0);
    });
  });
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
  var savedTheme;
  var legacyColorMode;
  var savedAppearance;
  if (!raw) {
    return {
      visibility: defaultPrefs.visibility,
      titleMode: defaultPrefs.titleMode,
      language: defaultPrefs.language,
      theme: defaultPrefs.theme,
      colorMode: defaultPrefs.colorMode,
      systemColorMode: defaultPrefs.systemColorMode,
      appearance: defaultPrefs.appearance,
       pinHeader: defaultPrefs.pinHeader,
       pinFooter: defaultPrefs.pinFooter,
       pinnedChrome: defaultPrefs.pinnedChrome,
       autoIndentParagraphs: defaultPrefs.autoIndentParagraphs,
       justifyParagraphs: defaultPrefs.justifyParagraphs
    };
  }

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    parsed = {};
  }

  savedTheme = parsed.themeId || parsed.theme;
  legacyColorMode = parsed.colorMode || (savedTheme === "dark" ? "dark" : defaultPrefs.colorMode);
  savedAppearance = appearanceIds().indexOf(parsed.appearance) >= 0 ? parsed.appearance :
    parsed.systemColorMode === true ? "system" : legacyColorMode === "dark" ? "dark" : "light";

  return {
    visibility: optionIsAllowed(parsed.visibility, ["public", "unlisted", "private", "direct"], defaultPrefs.visibility),
    titleMode: optionIsAllowed(parsed.titleMode, ["heading", "cw"], defaultPrefs.titleMode),
    language: optionIsAllowed(parsed.language, ["en", "es", "zh"], defaultPrefs.language),
    theme: resolveThemeId(savedTheme),
    colorMode: optionIsAllowed(legacyColorMode, ["light", "dark"], defaultPrefs.colorMode),
    systemColorMode: parsed.systemColorMode === true,
    appearance: savedAppearance,
    pinHeader: typeof parsed.pinHeader === "boolean" ? parsed.pinHeader : defaultPrefs.pinHeader,
    pinFooter: typeof parsed.pinFooter === "boolean" ? parsed.pinFooter : defaultPrefs.pinFooter,
    pinnedChrome: typeof parsed.pinnedChrome === "boolean" ? parsed.pinnedChrome : defaultPrefs.pinnedChrome,
    autoIndentParagraphs: typeof parsed.autoIndentParagraphs === "boolean" ? parsed.autoIndentParagraphs : defaultPrefs.autoIndentParagraphs,
    justifyParagraphs: typeof parsed.justifyParagraphs === "boolean" ? parsed.justifyParagraphs : defaultPrefs.justifyParagraphs
  };
}

function loadTranslationPreferences() {
  var raw = safeGet(TRANSLATION_PREF_KEY);
  var parsed;
  if (!raw) {
    return {
      source: defaultTranslationPrefs.source,
      target: defaultTranslationPrefs.target,
      caseMode: defaultTranslationPrefs.caseMode,
      protectTokens: defaultTranslationPrefs.protectTokens,
      shortcut: defaultTranslationPrefs.shortcut
    };
  }

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    parsed = {};
  }

  return {
    source: optionIsAllowed(parsed.source, ["auto", "en", "es", "zh"], defaultTranslationPrefs.source),
    target: optionIsAllowed(parsed.target, ["en", "es", "zh"], defaultTranslationPrefs.target),
    caseMode: optionIsAllowed(parsed.caseMode, ["normal", "upper", "lower"], defaultTranslationPrefs.caseMode),
    protectTokens: typeof parsed.protectTokens === "boolean" ? parsed.protectTokens : defaultTranslationPrefs.protectTokens,
    shortcut: parsed.shortcut || defaultTranslationPrefs.shortcut
  };
}

function savePreferences() {
  safeSet(PREF_KEY, JSON.stringify(prefs));
}

function saveTranslationPreferences() {
  safeSet(TRANSLATION_PREF_KEY, JSON.stringify(translationPrefs));
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

function noteCharactersText(count) {
  if (prefs.language === "es") return count + " caracteres";
  if (prefs.language === "zh") return count + " chars";
  return count + " characters";
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

function shortcutKeyName(event) {
  if (!event.key) return "";
  if (event.key === " ") return "Space";
  if (event.key.length === 1) return event.key.toUpperCase();
  return event.key;
}

function shortcutFromEvent(event) {
  var key = shortcutKeyName(event);
  var parts = [];
  if (!key || ["Shift", "Control", "Alt", "Meta", "CapsLock"].indexOf(key) >= 0) return "";
  if (!event.ctrlKey && !event.altKey && !event.metaKey) return "";
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");
  if (event.metaKey) parts.push("Meta");
  parts.push(key);
  return parts.join("+");
}

function parseShortcut(shortcut) {
  var parts = String(shortcut || "").split("+");
  var config = { ctrl: false, alt: false, shift: false, meta: false, key: "" };
  var i;
  var part;
  for (i = 0; i < parts.length; i += 1) {
    part = parts[i].trim();
    if (!part) continue;
    if (/^ctrl$/i.test(part) || /^control$/i.test(part)) config.ctrl = true;
    else if (/^alt$/i.test(part) || /^option$/i.test(part)) config.alt = true;
    else if (/^shift$/i.test(part)) config.shift = true;
    else if (/^meta$/i.test(part) || /^cmd$/i.test(part) || /^command$/i.test(part)) config.meta = true;
    else config.key = part.length === 1 ? part.toUpperCase() : part;
  }
  return config;
}

function eventMatchesShortcut(event, shortcut) {
  var config = parseShortcut(shortcut);
  var key = shortcutKeyName(event);
  if (!config.key) return false;
  return Boolean(event.ctrlKey) === config.ctrl &&
    Boolean(event.altKey) === config.alt &&
    Boolean(event.shiftKey) === config.shift &&
    Boolean(event.metaKey) === config.meta &&
    key.toLowerCase() === config.key.toLowerCase();
}

function editorHasFocus() {
  return document.activeElement === els.body ||
    document.activeElement === els.noteBodyEditor ||
    document.activeElement === els.title;
}

function isNoteThemeActive() {
  return prefs.theme === "note-editor" && Boolean(els.noteBodyEditor);
}

function systemPrefersDark() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function activeColorMode() {
  return prefs.systemColorMode ? (systemPrefersDark() ? "dark" : "light") : prefs.colorMode;
}

function toggleManualColorMode() {
  var current = activeColorMode();
  var currentAppearance = appearanceFromPreferences();
  var nextMode = current === "dark" ? "light" : "dark";
  updateAppearance(/^ink-paper-/.test(currentAppearance) ? "ink-paper-" + nextMode : nextMode);
}

function cycleColorMode() {
  if (prefs.systemColorMode) {
    updateAppearance("light");
    return;
  } else if (prefs.colorMode === "light") {
    updateAppearance("dark");
  } else {
    updateAppearance("system");
  }
}

function noteBlockTextOffset(block, node, offset) {
  var range;
  if (!block || !node || !block.contains(node)) return block ? block.textContent.length : 0;
  range = document.createRange();
  range.selectNodeContents(block);
  try {
    range.setEnd(node, offset);
  } catch (error) {
    return block.textContent.length;
  }
  return range.toString().length;
}

function placeNoteCaretAtTextOffset(block, targetOffset) {
  var walker;
  var remaining = Math.max(0, Number(targetOffset) || 0);
  var textNode;
  var selection;
  var range;
  if (!block || !els.noteBodyEditor) return;
  walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    textNode = walker.currentNode;
    if (remaining <= textNode.nodeValue.length) {
      range = document.createRange();
      range.setStart(textNode, remaining);
      range.collapse(true);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      noteSelectionRange = range.cloneRange();
      noteActiveBlock = block;
      return;
    }
    remaining -= textNode.nodeValue.length;
  }
  placeNoteCaretAtEnd(block);
}

function placeNoteCaretAfterNoteHighlight(mark) {
  var selection;
  var range;
  var block;
  var boundary;
  if (!mark || !mark.parentNode || !els.noteBodyEditor) return false;
  selection = window.getSelection();
  boundary = mark.nextSibling;
  if (!boundary || boundary.nodeType !== 3 || (boundary.nodeValue && boundary.nodeValue.replace(/\u200b/g, ""))) {
    boundary = document.createTextNode("\u200b");
    mark.parentNode.insertBefore(boundary, mark.nextSibling);
  } else if (!boundary.nodeValue) {
    boundary.nodeValue = "\u200b";
  }
  range = document.createRange();
  range.setStart(boundary, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  block = noteBlockForNode(mark);
  noteActiveBlock = block;
  noteSelectionRange = range.cloneRange();
  return true;
}

function cleanNoteHighlightBoundaries() {
  var walker;
  var node;
  var selection = window.getSelection();
  if (!els.noteBodyEditor) return;
  walker = document.createTreeWalker(els.noteBodyEditor, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    node = walker.currentNode;
    if (node.parentElement && node.parentElement.closest("mark")) continue;
    if (node.nodeValue.indexOf("\u200b") < 0) continue;
    node.nodeValue = node.nodeValue.replace(/\u200b/g, "");
    if (!node.nodeValue && (!selection || selection.anchorNode !== node)) node.remove();
  }
}

function noteHighlightAtCaretEnd() {
  var selection = window.getSelection();
  var node;
  var element;
  var mark;
  var previous;
  var child;
  var i;
  var parent;
  if (!selection || !selection.rangeCount || !selection.isCollapsed || !els.noteBodyEditor ||
      !els.noteBodyEditor.contains(selection.anchorNode)) return null;
  node = selection.anchorNode;
  element = node.nodeType === 1 ? node : node.parentElement;
  mark = element && element.closest ? element.closest("mark") : null;
  if (mark) {
    if (node.nodeType === 3) {
      if (selection.anchorOffset < node.nodeValue.length) {
        if (node.nextSibling && node.nextSibling.nodeType === 3 &&
            !node.nextSibling.nodeValue.replace(/\u200b/g, "")) return mark;
        return null;
      }
      child = node;
      while (child && child.parentNode !== mark) child = child.parentNode;
      if (child && child === mark.lastChild) return mark;
    } else if (node === mark && selection.anchorOffset >= mark.childNodes.length) {
      return mark;
    }
    parent = mark.parentNode;
    if (parent && parent.lastChild === mark && selection.anchorOffset >= node.nodeValue.length) return mark;
    return null;
  }
  if (node.nodeType === 3 && (!node.nodeValue || !node.nodeValue.replace(/\u200b/g, ""))) {
    previous = node.previousSibling;
    while (previous && previous.nodeType === 3 && !previous.nodeValue.replace(/\u200b/g, "")) previous = previous.previousSibling;
    if (previous && previous.nodeType === 1 && previous.tagName.toLowerCase() === "mark") return previous;
  }
  if (node.nodeType === 1) {
    i = Math.min(selection.anchorOffset - 1, node.childNodes.length - 1);
    while (i >= 0) {
      child = node.childNodes[i];
      if (child.nodeType === 3 && !child.nodeValue.replace(/\u200b/g, "")) {
        i -= 1;
        continue;
      }
      mark = child.nodeType === 1 && child.tagName.toLowerCase() === "mark" ? child : null;
      return mark || null;
    }
  }
  return null;
}

function noteHighlightContainingCaretAtEnd() {
  var selection = window.getSelection();
  var node;
  var element;
  var mark;
  var child;
  if (!selection || !selection.rangeCount || !selection.isCollapsed || !els.noteBodyEditor ||
      !els.noteBodyEditor.contains(selection.anchorNode)) return null;
  node = selection.anchorNode;
  element = node.nodeType === 1 ? node : node.parentElement;
  mark = element && element.closest ? element.closest("mark") : null;
  if (!mark) return null;
  if (node.nodeType === 3) {
    if (selection.anchorOffset < node.nodeValue.length) return null;
    child = node;
    while (child && child.parentNode !== mark) child = child.parentNode;
    return child && child === mark.lastChild ? mark : null;
  }
  return node === mark && selection.anchorOffset >= mark.childNodes.length ? mark : null;
}

function repairNoteHighlightAfterInput() {
  var mark = noteHighlightContainingCaretAtEnd();
  var baseline;
  var content;
  var suffix;
  var boundary;
  var textNode;
  var selection;
  var range;
  if (!mark || mark.getAttribute("data-note-auto-exit") !== "true") return false;
  baseline = Number(mark.getAttribute("data-note-highlight-length"));
  content = mark.textContent;
  if (!Number.isFinite(baseline) || baseline < 0 || content.length <= baseline) return false;
  suffix = content.slice(baseline);
  mark.textContent = content.slice(0, baseline);
  boundary = mark.nextSibling;
  if (!boundary || boundary.nodeType !== 3) {
    boundary = document.createTextNode("");
    mark.parentNode.insertBefore(boundary, mark.nextSibling);
  }
  boundary.nodeValue = boundary.nodeValue.replace(/\u200b/g, "") + suffix;
  mark.removeAttribute("data-note-auto-exit");
  mark.removeAttribute("data-note-highlight-length");
  textNode = boundary;
  range = document.createRange();
  range.setStart(textNode, textNode.nodeValue.length);
  range.collapse(true);
  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  noteActiveBlock = noteBlockForNode(mark);
  noteSelectionRange = range.cloneRange();
  return true;
}

function insertNoteTextOutsideHighlight(mark, value) {
  var boundary;
  var selection;
  var range;
  if (!mark || !value) return false;
  boundary = mark.nextSibling;
  if (!boundary || boundary.nodeType !== 3) {
    boundary = document.createTextNode("");
    mark.parentNode.insertBefore(boundary, mark.nextSibling);
  }
  boundary.nodeValue = boundary.nodeValue.replace(/\u200b/g, "") + value;
  range = document.createRange();
  range.setStart(boundary, boundary.nodeValue.length);
  range.collapse(true);
  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  noteActiveBlock = noteBlockForNode(mark);
  noteSelectionRange = range.cloneRange();
  syncTextareaFromNoteEditor();
  saveDraft();
  autosize({ followWriting: true });
  rememberNoteSelection();
  return true;
}

function moveNoteCaretOutOfHighlight(event) {
  var mark;
  if (!isNoteThemeActive() || event.ctrlKey || event.altKey || event.metaKey) return false;
  mark = noteHighlightAtCaretEnd();
  if (!mark) return false;
  if (event.key === "ArrowRight" && !event.shiftKey) {
    placeNoteCaretAfterNoteHighlight(mark);
    event.preventDefault();
    return true;
  }
  if (event.key && event.key.length === 1) {
    event.preventDefault();
    return insertNoteTextOutsideHighlight(mark, event.key);
  }
  if (event.key === "Enter" && !event.shiftKey) placeNoteCaretAfterNoteHighlight(mark);
  return false;
}

function handleNoteHighlightBeforeInput(event) {
  var mark;
  if (!isNoteThemeActive() || event.inputType !== "insertText" || !event.data) return false;
  mark = noteHighlightAtCaretEnd();
  if (!mark) return false;
  event.preventDefault();
  return insertNoteTextOutsideHighlight(mark, event.data);
}

function flattenNoteBlockMarkup(block) {
  var child;
  if (!block) return;
  while (block.childNodes.length === 1) {
    child = block.firstElementChild;
    if (!child || !/^(P|DIV)$/i.test(child.tagName)) break;
    block.innerHTML = child.innerHTML || "<br>";
  }
}

function normalizeNoteBlockStructure() {
  var blockMarks;
  if (!els.noteBodyEditor) return;
  blockMarks = els.noteBodyEditor.querySelectorAll("mark h1, mark h2, mark h3, mark p, mark blockquote, mark pre, mark ul, mark ol, mark hr");
  Array.prototype.forEach.call(blockMarks, function (block) {
    var mark = block.closest("mark");
    if (mark && mark.parentNode === els.noteBodyEditor) {
      while (mark.firstChild) mark.parentNode.insertBefore(mark.firstChild, mark);
      mark.remove();
    }
  });
  els.noteBodyEditor.querySelectorAll("h1, h2, h3, blockquote, pre").forEach(function (block) {
    flattenNoteBlockMarkup(block);
  });
}

function applyNoteBlockFormat(tagName) {
  var selection;
  var source;
  var replacement;
  var offset;
  focusNoteEditor();
  selection = window.getSelection();
  source = selection && selection.rangeCount ? noteBlockForNode(selection.anchorNode) : noteActiveBlock;
  if (!source || !els.noteBodyEditor.contains(source)) return;
  offset = selection && selection.rangeCount ? noteBlockTextOffset(source, selection.anchorNode, selection.anchorOffset) : source.textContent.length;
  replacement = document.createElement(tagName);
  replacement.innerHTML = source.innerHTML || "<br>";
  flattenNoteBlockMarkup(replacement);
  source.replaceWith(replacement);
  noteActiveBlock = replacement;
  normalizeNoteBlockStructure();
  els.noteBodyEditor.focus();
  placeNoteCaretAtTextOffset(replacement, offset);
  syncTextareaFromNoteEditor();
  saveDraft();
  autosize({ followWriting: true });
  window.requestAnimationFrame(function () {
    if (isNoteThemeActive()) placeNoteCaretAtTextOffset(replacement, offset);
  });
}

function escapeNoteHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderNoteInlineMarkdown(value) {
  var html = escapeNoteHtml(value);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/~~(.+?)~~/g, "<s>$1</s>");
  html = html.replace(/==(.+?)==/g, "<mark>$1</mark>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>");
  return html || "<br>";
}

function markdownToNoteHtml(value) {
  var source = String(value || "").replace(/\r/g, "");
  var lines;
  var html = [];
  var listTag = "";
  var inCode = false;
  var codeLines = [];
  var i;
  var line;
  var match;
  var indentMatch;
  var paragraphValue;
  var paragraphAttrs;

  if (!source.trim()) return "<p><br></p>";
  lines = source.split("\n");

  function closeList() {
    if (listTag) {
      html.push("</" + listTag + ">");
      listTag = "";
    }
  }

  for (i = 0; i < lines.length; i += 1) {
    line = lines[i];
    if (inCode) {
      if (/^\s*```/.test(line)) {
        html.push("<pre>" + escapeNoteHtml(codeLines.join("\n")) + "</pre>");
        codeLines = [];
        inCode = false;
      } else {
        codeLines.push(line);
      }
      continue;
    }
    if (/^\s*```/.test(line)) {
      closeList();
      inCode = true;
      codeLines = [];
      continue;
    }
    match = line.match(/^###\s+(.*)$/);
    if (match) {
      closeList();
      html.push("<h3>" + renderNoteInlineMarkdown(match[1]) + "</h3>");
      continue;
    }
    match = line.match(/^##\s+(.*)$/);
    if (match) {
      closeList();
      html.push("<h2>" + renderNoteInlineMarkdown(match[1]) + "</h2>");
      continue;
    }
    match = line.match(/^#\s+(.*)$/);
    if (match) {
      closeList();
      html.push("<h1>" + renderNoteInlineMarkdown(match[1]) + "</h1>");
      continue;
    }
    match = line.match(/^[-*]\s+(.*)$/);
    if (match) {
      if (listTag !== "ul") {
        closeList();
        html.push("<ul>");
        listTag = "ul";
      }
      html.push("<li>" + renderNoteInlineMarkdown(match[1]) + "</li>");
      continue;
    }
    match = line.match(/^\d+[.)]\s+(.*)$/);
    if (match) {
      if (listTag !== "ol") {
        closeList();
        html.push("<ol>");
        listTag = "ol";
      }
      html.push("<li>" + renderNoteInlineMarkdown(match[1]) + "</li>");
      continue;
    }
    match = line.match(/^>\s?(.*)$/);
    if (match) {
      closeList();
      html.push("<blockquote>" + renderNoteInlineMarkdown(match[1]) + "</blockquote>");
      continue;
    }
    if (/^\s*---+\s*$/.test(line)) {
      closeList();
      html.push("<hr>");
      continue;
    }
    closeList();
    if (!line.trim()) {
      html.push("<p><br></p>");
    } else {
      indentMatch = line.match(/^(?:(?: {2})|\t)+/);
      paragraphValue = indentMatch ? line.slice(indentMatch[0].length) : line;
      paragraphAttrs = "";
      if (indentMatch) paragraphAttrs += ' data-manual-indent="true"';
      else if (prefs.autoIndentParagraphs) paragraphAttrs += ' data-auto-indent="true"';
      if (prefs.justifyParagraphs) paragraphAttrs += ' data-justify="true"';
      html.push("<p" + paragraphAttrs + ">" + renderNoteInlineMarkdown(paragraphValue) + "</p>");
    }
  }
  closeList();
  if (inCode) html.push("<pre>" + escapeNoteHtml(codeLines.join("\n")) + "</pre>");
  return html.join("");
}

function serializeNoteInlineNode(node) {
  var tag;
  var content;
  var i;
  if (node.nodeType === 3) return node.nodeValue;
  if (node.nodeType !== 1) return "";
  tag = node.tagName.toLowerCase();
  if (tag === "br") return "\n";
  if (tag === "hr") return "---";
  content = "";
  for (i = 0; i < node.childNodes.length; i += 1) {
    content += serializeNoteInlineNode(node.childNodes[i]);
  }
  if (tag === "strong" || tag === "b") return "**" + content + "**";
  if (tag === "s" || tag === "del") return "~~" + content + "~~";
  if (tag === "mark") return content.replace(/\u200b/g, "").trim() ? "==" + content + "==" : "";
  if (tag === "code") return "`" + content + "`";
  if (tag === "a") return "[" + content + "](" + (node.getAttribute("href") || "") + ")";
  return content;
}

function serializeNoteBlock(block) {
  var tag = block.tagName.toLowerCase();
  var code;
  var text = serializeNoteInlineNode(block).replace(/\u00a0/g, " ").replace(/\u200b/g, "").trim();
  if (tag === "hr") return "---";
  if (tag === "pre") {
    code = block.textContent.replace(/\r/g, "").replace(/\n+$/, "");
    return "```\n" + code + "\n```";
  }
  if (!text && tag !== "li") return "";
  if (tag === "h1") return "# " + text;
  if (tag === "h2") return "## " + text;
  if (tag === "h3") return "### " + text;
  if (tag === "blockquote") return "> " + text;
  if (tag === "p" && block.getAttribute("data-manual-indent") === "true") return "  " + text;
  return text;
}

function serializeNoteEditor() {
  var blocks = [];
  var children;
  var i;
  var j;
  var items;
  if (!els.noteBodyEditor) return els.body.value;
  children = Array.prototype.slice.call(els.noteBodyEditor.children);
  if (!children.length) return (els.noteBodyEditor.innerText || "").trim();
  children.forEach(function (block) {
    var tag = block.tagName.toLowerCase();
    if (tag === "ul" || tag === "ol") {
      items = block.querySelectorAll(":scope > li");
      for (j = 0; j < items.length; j += 1) {
        blocks.push((tag === "ol" ? (j + 1) + ". " : "- ") + serializeNoteBlock(items[j]));
      }
      return;
    }
    blocks.push(serializeNoteBlock(block));
  });
  for (i = blocks.length - 1; i >= 0 && !blocks[i]; i -= 1) blocks.pop();
  return blocks.join("\n");
}

function applyNoteParagraphIndentation() {
  if (!els.noteBodyEditor) return;
  els.noteBodyEditor.querySelectorAll(":scope > p").forEach(function (paragraph) {
    var hasText = Boolean(paragraph.textContent.replace(/\u200b/g, "").trim());
    var manual = paragraph.getAttribute("data-manual-indent") === "true";
    if (prefs.autoIndentParagraphs && hasText && !manual) paragraph.setAttribute("data-auto-indent", "true");
    else paragraph.removeAttribute("data-auto-indent");
    if (prefs.justifyParagraphs && hasText) paragraph.setAttribute("data-justify", "true");
    else paragraph.removeAttribute("data-justify");
  });
}

function addNoteCopy(parent, tagName, className, value) {
  var element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = value;
  parent.appendChild(element);
  return element;
}

function renderNoteHint() {
  var content = els.noteHintContent;
  var list;
  if (!content) return;
  content.textContent = "";
  addNoteCopy(content, "p", "note-side-section-label", text("noteGettingStarted"));
  list = document.createElement("ul");
  list.className = "note-side-list";
  ["noteMostImportant", "noteShare", "noteMarkdownHint"].forEach(function (key) {
    addNoteCopy(list, "li", "", text(key));
  });
  content.appendChild(list);
}

function renderNoteGuide() {
  var content = els.noteGuideContent;
  var buttons;
  var buttonList;
  var shortcuts;
  if (!content) return;
  content.textContent = "";
  addNoteCopy(content, "p", "note-side-section-label", text("noteButtons"));
  buttons = [
    ["+", text("noteInsert")],
    ["B", text("noteBoldShortcut")],
    ["S", text("noteStrikeShortcut")],
    ["==", text("noteHighlightShortcut")],
    ["\"", text("noteQuoteShortcut")],
    ["≡", text("noteBulletShortcut")],
    ["1.", text("noteNumberedShortcut")],
    ["<>", text("noteCodeShortcut")],
    ["↗", text("noteLinkShortcut")]
  ];
  buttonList = document.createElement("ul");
  buttonList.className = "note-guide-button-list";
  buttons.forEach(function (item) {
    var row = document.createElement("li");
    addNoteCopy(row, "span", "note-guide-symbol", item[0]);
    addNoteCopy(row, "span", "", item[1]);
    buttonList.appendChild(row);
  });
  content.appendChild(buttonList);
  addNoteCopy(content, "p", "note-side-section-label note-shortcuts-heading", text("noteKeyboardShortcuts"));
  shortcuts = document.createElement("div");
  shortcuts.className = "note-shortcuts";
  noteShortcutDefinitions.forEach(function (definition) {
    var row = document.createElement("div");
    var keys = document.createElement("span");
    row.className = "note-shortcut-row";
    addNoteCopy(row, "span", "note-shortcut-label", text(definition.label));
    keys.className = "note-shortcut-keys";
    definition.keys.forEach(function (key, index) {
      if (index) addNoteCopy(keys, "span", "note-shortcut-plus", "+");
      addNoteCopy(keys, "kbd", "", key);
    });
    row.appendChild(keys);
    shortcuts.appendChild(row);
  });
  content.appendChild(shortcuts);
}

function renderNotePanels() {
  var panels = {
    toc: els.noteTocPanel,
    hint: els.noteHintPanel,
    guide: els.noteGuidePanel
  };
  renderNoteHint();
  renderNoteGuide();
  Object.keys(panels).forEach(function (key) {
    if (panels[key]) panels[key].hidden = key !== noteActivePanel;
  });
}

function showNotePanel(panel) {
  var panels = {
    toc: els.noteTocPanel,
    hint: els.noteHintPanel,
    guide: els.noteGuidePanel
  };
  if (!panels[panel]) panel = "toc";
  noteActivePanel = panel;
  Object.keys(panels).forEach(function (key) {
    if (panels[key]) panels[key].hidden = key !== panel;
  });
  setNoteSidebar(true);
}

function updateNoteToc() {
  var headings;
  var i;
  var heading;
  var item;
  var button;
  if (!els.noteBodyEditor || !els.noteTocList) return;
  headings = Array.prototype.filter.call(
    els.noteBodyEditor.querySelectorAll("h1, h2, h3"),
    function (heading) {
      return Boolean(heading.textContent.trim());
    }
  );
  els.noteTocList.textContent = "";
  els.noteTocEmpty.hidden = headings.length > 0;
  els.noteTocList.hidden = headings.length === 0;
  for (i = 0; i < headings.length; i += 1) {
    heading = headings[i];
    item = document.createElement("li");
    button = document.createElement("button");
    button.type = "button";
    button.className = "note-toc-link note-toc-level-" + heading.tagName.toLowerCase();
    button.textContent = heading.textContent.trim();
    button.addEventListener("click", (function (target) {
      return function () {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        els.noteBodyEditor.focus();
      };
    })(heading));
    item.appendChild(button);
    els.noteTocList.appendChild(item);
  }
}

function syncTextareaFromNoteEditor() {
  if (!els.noteBodyEditor) return;
  els.body.value = serializeNoteEditor();
  applyNoteParagraphIndentation();
  updateNoteToc();
  updateNoteEditorGuide();
  updateNoteInsertPosition();
}

function syncNoteEditorFromTextarea(force) {
  if (!els.noteBodyEditor || (!force && noteEditorReady)) return;
  els.noteBodyEditor.innerHTML = markdownToNoteHtml(els.body.value);
  noteEditorReady = true;
  applyNoteParagraphIndentation();
  updateNoteToc();
  updateNoteEditorGuide();
  updateNoteInsertPosition();
}

function normalizeNoteMarkdownBlocks() {
  var blocks;
  var i;
  var block;
  var match;
  var replacement;
  if (!els.noteBodyEditor) return;
  blocks = els.noteBodyEditor.querySelectorAll("p, div");
  for (i = 0; i < blocks.length; i += 1) {
    block = blocks[i];
    if (block.parentNode !== els.noteBodyEditor) continue;
    match = block.textContent.match(/^(###|##|#)\s+(.*)$/);
    if (!match) continue;
    replacement = document.createElement(match[1].length === 1 ? "h1" : match[1].length === 2 ? "h2" : "h3");
    replacement.innerHTML = renderNoteInlineMarkdown(match[2]);
    block.replaceWith(replacement);
  }
  updateNoteToc();
}

function noteHighlightTextNodeCandidate(node) {
  var parent = node && node.parentElement;
  return Boolean(parent && !parent.closest("mark, code, pre, a"));
}

function noteHighlightCaretOffsetAfterMarkdown(match, offset) {
  var openStart = match.index;
  var contentStart = openStart + 2;
  var contentEnd = contentStart + match[1].length;
  var closeEnd = contentEnd + 2;
  if (offset <= openStart) return offset;
  if (offset <= contentStart) return openStart;
  if (offset <= contentEnd) return offset - 2;
  if (offset <= closeEnd) return contentEnd;
  return offset - 4;
}

function normalizeNoteInlineMarkdownBlocks() {
  var selection;
  var block;
  var walker;
  var node;
  var match;
  var range;
  var mark;
  var caretOffset = -1;
  var nodeOffset;
  var matchStart;
  var matchEnd;
  var mappedOffset;

  if (!els.noteBodyEditor) return false;
  selection = window.getSelection();
  block = selection && selection.rangeCount ? noteBlockForNode(selection.anchorNode) : noteActiveBlock;
  if (!block || block.tagName.toLowerCase() !== "p" || !els.noteBodyEditor.contains(block)) return false;
  if (selection && selection.rangeCount && selection.isCollapsed && els.noteBodyEditor.contains(selection.anchorNode)) {
    caretOffset = noteBlockTextOffset(block, selection.anchorNode, selection.anchorOffset);
  }
  walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    node = walker.currentNode;
    if (!node.nodeValue || !noteHighlightTextNodeCandidate(node)) continue;
    match = node.nodeValue.match(/==([^=\r\n]+)==/);
    if (!match) continue;
    nodeOffset = noteBlockTextOffset(block, node, 0);
    matchStart = nodeOffset + match.index;
    matchEnd = matchStart + match[0].length;
    range = document.createRange();
    range.setStart(node, match.index);
    range.setEnd(node, match.index + match[0].length);
    mark = document.createElement("mark");
    mark.setAttribute("data-note-auto-exit", "true");
    mark.setAttribute("data-note-highlight-length", String(match[1].length));
    mark.appendChild(document.createTextNode(match[1]));
    range.deleteContents();
    range.insertNode(mark);
    if (caretOffset >= 0) {
      if (caretOffset === matchEnd) {
        placeNoteCaretAfterNoteHighlight(mark);
      } else {
        match.index = matchStart;
        mappedOffset = noteHighlightCaretOffsetAfterMarkdown(match, caretOffset);
        placeNoteCaretAtTextOffset(block, mappedOffset);
      }
    }
    return true;
  }
  return false;
}

function noteBlockForNode(node) {
  var current = node;
  if (!els.noteBodyEditor) return null;
  if (current && current.nodeType !== 1) current = current.parentElement;
  while (current && current.parentNode !== els.noteBodyEditor) current = current.parentElement;
  return current && current.parentNode === els.noteBodyEditor ? current : null;
}

function updateNoteTitleLayout() {
  var root = document.documentElement;
  var minHeight;
  var titleHeight;
  if (!els.title) return 0;
  if (!isNoteThemeActive()) {
    els.title.style.removeProperty("height");
    root.style.removeProperty("--note-title-height");
    root.style.removeProperty("--note-title-extra");
    return 0;
  }
  els.title.style.height = "auto";
  minHeight = parseFloat(window.getComputedStyle(els.title).minHeight) || 50;
  titleHeight = Math.max(minHeight, els.title.scrollHeight);
  els.title.style.height = Math.ceil(titleHeight) + "px";
  root.style.setProperty("--note-title-height", Math.ceil(titleHeight) + "px");
  root.style.setProperty("--note-title-extra", Math.max(0, Math.ceil(titleHeight - minHeight)) + "px");
  return Math.ceil(titleHeight);
}

function updateNoteEditorGuide() {
  var children;
  var editorRect;
  var activeBlock;
  var selection;
  var selectedBlock;
  var activeRect;
  var lastRect;
  var lastStyle;
  var lineTop;
  var lineHeight;
  var contentHeight;
  var marginBottom;
  if (!els.noteBodyEditor || !isNoteThemeActive()) return;
  children = Array.prototype.slice.call(els.noteBodyEditor.children);
  editorRect = els.noteBodyEditor.getBoundingClientRect();
  if (!children.length) {
    els.noteBodyEditor.style.setProperty("--note-editor-line-offset", "36px");
    els.noteBodyEditor.style.setProperty("--note-editor-line-height", Math.max(36, bodyLineHeight()) + "px");
    return Math.max(36, bodyLineHeight());
  }
  activeBlock = noteActiveBlock;
  selection = window.getSelection();
  if (selection && selection.rangeCount && els.noteBodyEditor.contains(selection.anchorNode)) {
    selectedBlock = noteBlockForNode(selection.anchorNode);
    if (selectedBlock) {
      activeBlock = selectedBlock;
      noteActiveBlock = selectedBlock;
    }
  }
  if (!activeBlock || !els.noteBodyEditor.contains(activeBlock)) activeBlock = children[children.length - 1];
  activeRect = activeBlock.getBoundingClientRect();
  lastRect = children[children.length - 1].getBoundingClientRect();
  lastStyle = window.getComputedStyle(children[children.length - 1]);
  marginBottom = parseFloat(lastStyle.marginBottom) || 0;
  lineTop = Math.max(0, activeRect.top - editorRect.top);
  lineHeight = Math.max(bodyLineHeight(), activeRect.height);
  contentHeight = Math.max(bodyLineHeight(), lastRect.bottom - editorRect.top + marginBottom);
  els.noteBodyEditor.style.setProperty("--note-editor-line-offset", Math.round(lineTop) + "px");
  els.noteBodyEditor.style.setProperty("--note-editor-line-height", Math.ceil(lineHeight) + "px");
  return Math.ceil(contentHeight);
}

function updateNoteInsertPosition() {
  var selection;
  var selectedBlock;
  var selectionRect;
  var selectionRange;
  var selectionRects;
  var block = noteActiveBlock;
  var editorRect;
  var paper;
  var paperRect;
  var children;
  var top;
  var menuTop;
  var menuHeight;
  var availableBottom;
  if (!els.noteBodyEditor || !els.noteInsertButton || !isNoteThemeActive()) return;
  selection = window.getSelection();
  if (selection && selection.rangeCount && els.noteBodyEditor.contains(selection.anchorNode)) {
    selectedBlock = noteBlockForNode(selection.anchorNode);
    if (selectedBlock) block = selectedBlock;
    selectionRange = selection.getRangeAt(0);
    if (selection.isCollapsed) {
      selectionRect = selectionRange.getBoundingClientRect();
      if (!selectionRect.width && !selectionRect.height) {
        selectionRects = selectionRange.getClientRects();
        selectionRect = selectionRects.length ? selectionRects[0] : null;
      }
    }
  }
  if (!block || !els.noteBodyEditor.contains(block)) block = null;
  children = els.noteBodyEditor.children;
  if (!block && children.length) block = children[children.length - 1];
  if (block) noteActiveBlock = block;
  editorRect = els.noteBodyEditor.getBoundingClientRect();
  paper = els.noteBodyEditor.closest(".paper");
  paperRect = paper ? paper.getBoundingClientRect() : { top: 0 };
  top = (selectionRect ? selectionRect.top : block ? block.getBoundingClientRect().top : editorRect.top) - paperRect.top;
  top = Math.max(0, Math.round(top));
  els.noteInsertButton.style.top = top + "px";
  menuTop = Math.max(0, top - 8);
  if (!els.noteInsertMenu.hidden) {
    menuHeight = els.noteInsertMenu.getBoundingClientRect().height;
    availableBottom = window.innerHeight - paperRect.top - 8;
    if (menuTop + menuHeight > availableBottom) {
      menuTop = Math.max(8, availableBottom - menuHeight);
    }
  }
  els.noteInsertMenu.style.top = Math.round(menuTop) + "px";
}

function setNoteCoverImage(dataUrl) {
  if (!dataUrl) {
    clearNoteCoverImage();
    return;
  }
  els.noteCoverImage.src = dataUrl;
  els.noteCover.hidden = false;
  els.noteImage.hidden = true;
  document.documentElement.setAttribute("data-note-cover", "true");
  window.requestAnimationFrame(function () {
    updateNoteEditorGuide();
    updateNoteInsertPosition();
  });
}

function clearNoteCoverImage() {
  els.noteCoverImage.removeAttribute("src");
  els.noteCover.hidden = true;
  els.noteImage.hidden = false;
  document.documentElement.setAttribute("data-note-cover", "false");
  window.requestAnimationFrame(function () {
    updateNoteEditorGuide();
    updateNoteInsertPosition();
  });
}

function activeBodyElement() {
  return isNoteThemeActive() ? els.noteBodyEditor : els.body;
}

function updateTranslationPreference(key, value) {
  translationPrefs[key] = value;
  saveTranslationPreferences();
  applyPreferences();
}

function applyPreferences() {
  var themeLabel;
  var colorMode = activeColorMode();

  document.documentElement.lang = prefs.language;
  document.documentElement.setAttribute("data-theme", colorMode);
  document.documentElement.setAttribute("data-theme-id", prefs.theme);
  document.documentElement.setAttribute("data-appearance", appearanceFromPreferences());
  document.documentElement.setAttribute("data-theme-palette", appearanceFor(appearanceFromPreferences()).palette);
  document.documentElement.setAttribute("data-pin-header", prefs.pinHeader ? "true" : "false");
  document.documentElement.setAttribute("data-pin-footer", prefs.pinFooter ? "true" : "false");
  document.documentElement.setAttribute("data-pinned-chrome", prefs.pinnedChrome ? "true" : "false");
  document.title = text("documentTitle");

  els.visibility.value = prefs.visibility;
  els.titleMode.value = prefs.titleMode;
  els.language.value = prefs.language;
  if (els.editorThemeSelect) els.editorThemeSelect.value = prefs.theme;
  els.title.lang = prefs.language;
  els.body.lang = prefs.language;
  els.noteBodyEditor.lang = prefs.language;

  fillOptions(els.visibility, text("visibility"));
  fillOptions(els.titleMode, text("titleMode"));
  fillOptions(els.keyboardSound, text("keyboardSoundProfiles"));
  fillOptions(els.translateSource, text("translationLanguages"));
  fillOptions(els.translateTarget, text("translationLanguages"));
  fillOptions(els.translateCase, text("caseModes"));

  els.visibility.setAttribute("aria-label", text("visibility")[prefs.visibility]);
  els.titleMode.setAttribute("aria-label", text("titleMode")[prefs.titleMode]);
  els.titleMode.title = text("titleModeHelp");
  els.settingsSummary.setAttribute("aria-label", text("settings"));
  els.settingsSummary.title = text("settings");
  els.settingsPanel.setAttribute("aria-label", text("settings"));
  els.settingsLabel.textContent = text("settings");
  els.appearanceSettingsLabel.textContent = text("appearance");
  els.themeLabel.textContent = text("theme");
  if (els.editorThemeLabel) els.editorThemeLabel.textContent = text("editorLayout");
  if (els.editorThemeSelect) els.editorThemeSelect.setAttribute("aria-label", text("editorLayout"));
  els.languageLabel.textContent = text("language");
  els.language.setAttribute("aria-label", text("language"));
  els.keyboardSoundLabel.textContent = text("keyboardSound");
  els.keyboardSound.setAttribute("aria-label", text("keyboardSound"));
  els.keyboardSoundVolumeLabel.textContent = text("soundVolume");
  els.keyboardSoundVolume.setAttribute("aria-label", text("soundVolume"));
  els.layoutSettingsLabel.textContent = text("layout");
  els.pinHeaderLabel.textContent = text("pinHeader");
  els.pinFooterLabel.textContent = text("pinFooter");
  els.pinnedChromeLabel.textContent = text("pinnedChrome");
  els.autoIndentParagraphsLabel.textContent = text("autoIndentParagraphs");
  els.justifyParagraphsLabel.textContent = text("justifyParagraphs");
  els.pinHeader.checked = prefs.pinHeader;
  els.pinFooter.checked = prefs.pinFooter;
  els.pinnedChrome.checked = prefs.pinnedChrome;
  els.autoIndentParagraphs.checked = prefs.autoIndentParagraphs;
  els.justifyParagraphs.checked = prefs.justifyParagraphs;
  els.translationSettingsLabel.textContent = text("translation");
  els.translateSourceLabel.textContent = text("translateFrom");
  els.translateTargetLabel.textContent = text("translateTo");
  els.translateCaseLabel.textContent = text("translateCase");
  els.translateProtectTokensLabel.textContent = text("protectTokens");
  els.translateShortcutLabel.textContent = text("shortcut");
  els.translateButton.querySelector("span").textContent = text("translate");
  els.translateButton.setAttribute("aria-label", text("translate"));
  els.translateSource.setAttribute("aria-label", text("translateFrom"));
  els.translateTarget.setAttribute("aria-label", text("translateTo"));
  els.translateCase.setAttribute("aria-label", text("translateCase"));
  els.translateSource.value = translationPrefs.source;
  els.translateTarget.value = translationPrefs.target;
  els.translateCase.value = translationPrefs.caseMode;
  els.translateProtectTokens.checked = translationPrefs.protectTokens;
  els.translateShortcutButton.textContent = waitingForShortcut ? text("pressShortcut") : translationPrefs.shortcut;
  els.translateShortcutButton.setAttribute("aria-label", text("shortcut"));
  els.translateShortcutButton.classList.toggle("recording", waitingForShortcut);
  if (window.wxwKeyboardSounds) {
    els.keyboardSound.value = window.wxwKeyboardSounds.getProfile();
    updateVolumeLabel(window.wxwKeyboardSounds.getVolume());
  } else {
    updateVolumeLabel(Number(els.keyboardSoundVolume.value || 0) / 100);
  }
  els.title.placeholder = prefs.theme === "note-editor" ? text("noteTitlePlaceholder") : text("titlePlaceholder");
  els.title.setAttribute("aria-label", text("title"));
  els.body.placeholder = prefs.theme === "note-editor" ? text("noteBodyPlaceholder") : text("bodyPlaceholder");
  els.body.setAttribute("aria-label", text("body"));
  els.noteBodyEditor.dataset.placeholder = text("noteBodyPlaceholder");
  els.noteBodyEditor.setAttribute("aria-label", text("body"));
  els.publish.title = "Ctrl+Enter";
  els.publish.querySelector("span").textContent = text("publish");
  els.logout.title = text("signOut");
  els.logout.setAttribute("aria-label", text("signOut"));

  themeLabel = colorMode === "dark" ? text("lightMode") : text("darkMode");
  els.themeToggle.title = themeLabel;
  els.themeToggle.setAttribute("aria-label", themeLabel);

  setNoteSaveStatus(noteSaveState);
  els.notePublishLabel.textContent = text("notePublish");
  els.noteMore.setAttribute("aria-label", text("noteMore"));
  els.noteMore.title = text("noteMore");
  els.noteThemeLabel.textContent = text("theme");
  updateAppearancePickers();
  els.noteCopyButton.textContent = text("noteCopy");
  els.noteCopyButton.setAttribute("aria-label", text("noteCopy"));
  els.noteDownloadButton.textContent = text("noteDownload");
  els.noteDownloadButton.setAttribute("aria-label", text("noteDownload"));
  els.noteSettingsButton.textContent = text("noteOpenSettings");
  els.noteImage.setAttribute("aria-label", text("noteAddImage"));
  els.noteImage.title = text("noteAddImage");
  els.noteCoverRemove.setAttribute("aria-label", text("noteRemoveImage"));
  els.noteCoverRemove.title = text("noteRemoveImage");
  els.noteSidebar.setAttribute("aria-label", text("noteToc"));
  els.noteTocTitle.textContent = text("noteToc");
  els.noteTocEmpty.textContent = text("noteTocEmpty");
  els.noteHintTitle.textContent = text("noteHint");
  els.noteGuideTitle.textContent = text("noteGuide");
  els.noteToc.setAttribute("aria-label", text("noteToc"));
  els.noteToc.title = text("noteToc");
  els.noteHint.setAttribute("aria-label", text("noteHint"));
  els.noteHint.title = text("noteHint");
  els.noteGuide.setAttribute("aria-label", text("noteGuide"));
  els.noteGuide.title = text("noteGuide");
  els.noteInsertButton.setAttribute("aria-label", text("noteInsert"));
  els.noteInsertButton.title = text("noteInsert");
  els.noteInsertButton.setAttribute("aria-expanded", els.noteInsertMenu.hidden ? "false" : "true");
  els.noteInsertTitle.textContent = text("noteInsert");
  els.noteInsertMenu.querySelector('[data-insert-action="image"] span:last-child').textContent = text("noteCoverImage");
  els.noteInsertMenu.querySelector('[data-insert-action="heading"] span:last-child').textContent = text("noteHeading");
  els.noteInsertMenu.querySelector('[data-insert-action="subheading"] span:last-child').textContent = text("noteSubheading");
  els.noteInsertMenu.querySelector('[data-insert-action="bullet"] span:last-child').textContent = text("noteBulletList");
  els.noteInsertMenu.querySelector('[data-insert-action="number"] span:last-child').textContent = text("noteNumberedList");
  els.noteInsertMenu.querySelector('[data-insert-action="quote"] span:last-child').textContent = text("noteQuote");
  els.noteInsertMenu.querySelector('[data-insert-action="code"] span:last-child').textContent = text("noteCode");
  els.noteInsertMenu.querySelector('[data-insert-action="highlight"] span:last-child').textContent = text("noteHighlight");
  els.noteInsertMenu.querySelector('[data-insert-action="divider"] span:last-child').textContent = text("noteDivider");
  els.noteInsertMenu.querySelector('[data-insert-action="toc"] span:last-child').textContent = text("noteInsertToc");
  {
    var noteInsertSymbols = {
      image: "img",
      heading: "h2",
      subheading: "h3",
      bullet: "*",
      number: "1.",
      quote: "\"",
      code: "<>",
      highlight: "==",
      divider: "---",
      toc: "="
    };
    els.noteInsertMenu.querySelectorAll("[data-insert-action]").forEach(function (button) {
      button.querySelector(".note-insert-symbol").textContent = noteInsertSymbols[button.getAttribute("data-insert-action")];
    });
  }
  {
    var noteFormatSymbols = {
      menu: "+",
      bold: "B",
      strike: "S",
      highlight: "==",
      list: "*",
      quote: "\"",
      code: "<>",
      link: "->",
      undo: "<",
      redo: ">"
    };
    els.noteFormatBar.querySelectorAll("[data-note-action]").forEach(function (button) {
      var action = button.getAttribute("data-note-action");
      var span = button.querySelector("span");
      if (span && noteFormatSymbols[action] && !button.classList.contains("note-format-text")) span.textContent = noteFormatSymbols[action];
    });
  }
  els.noteCount.setAttribute("aria-label", text("noteCharacters"));

  if (prefs.theme === "note-editor") {
    syncNoteEditorFromTextarea(false);
  } else if (noteEditorReady) {
    syncTextareaFromNoteEditor();
    noteEditorReady = false;
  }
  applyNoteParagraphIndentation();
  renderNotePanels();
  setNoteSidebar(document.documentElement.getAttribute("data-note-sidebar") !== "closed");
  updateNoteTitleLayout();

  if (!els.title.value && !els.body.value) {
    els.saved.textContent = text("localDraft");
  }
  updateCount();
  updatePinnedLayout();
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
  updatePinnedLayout();

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

function bodyLineHeight() {
  var lineHeight = parseFloat(window.getComputedStyle(activeBodyElement()).lineHeight);
  return lineHeight || 32;
}

function writingTailHeight() {
  return Math.max(bodyLineHeight() * 10, window.innerHeight * 0.34);
}

function measureBodyContentHeight(value) {
  var target = activeBodyElement();
  var style = window.getComputedStyle(target);
  var mirror = document.createElement("div");
  var marker = document.createElement("span");
  var height;
  mirror.setAttribute("aria-hidden", "true");
  mirror.style.position = "absolute";
  mirror.style.left = "-9999px";
  mirror.style.top = "0";
  mirror.style.visibility = "hidden";
  mirror.style.width = Math.max(1, target.clientWidth || els.body.clientWidth) + "px";
  mirror.style.minHeight = "0";
  mirror.style.height = "auto";
  mirror.style.padding = style.padding;
  mirror.style.border = style.border;
  mirror.style.boxSizing = style.boxSizing;
  mirror.style.fontFamily = style.fontFamily;
  mirror.style.fontSize = style.fontSize;
  mirror.style.fontStyle = style.fontStyle;
  mirror.style.fontWeight = style.fontWeight;
  mirror.style.letterSpacing = style.letterSpacing;
  mirror.style.lineHeight = style.lineHeight;
  mirror.style.textTransform = style.textTransform;
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.overflowWrap = "break-word";
  mirror.style.wordBreak = style.wordBreak;
  mirror.appendChild(document.createTextNode(value || "\u200b"));
  marker.textContent = "\u200b";
  mirror.appendChild(marker);
  document.body.appendChild(mirror);
  height = Math.max(bodyLineHeight(), marker.offsetTop + bodyLineHeight());
  mirror.remove();
  return height;
}

function bodyCaretContentHeight() {
  if (isNoteThemeActive()) return measureBodyContentHeight(els.body.value);
  return measureBodyContentHeight(els.body.value.slice(0, els.body.selectionEnd));
}

function bodyCaretIsAtEnd() {
  if (isNoteThemeActive()) return false;
  return document.activeElement === els.body && els.body.selectionStart >= els.body.value.length - 2;
}

function keepWritingLineInView(caretHeight) {
  var rect;
  var writingLineY;
  var preferredY;
  var delta;
  var footerHeight = 0;
  if (isNoteThemeActive()) return;
  if (!bodyCaretIsAtEnd()) return;

  rect = els.body.getBoundingClientRect();
  if (prefs.pinFooter && els.statusbar) {
    footerHeight = els.statusbar.getBoundingClientRect().height;
  }
  writingLineY = rect.top + Math.max(0, caretHeight - bodyLineHeight() * 0.45);
  preferredY = Math.min(window.innerHeight * 0.62, window.innerHeight - footerHeight - bodyLineHeight() * 4);
  preferredY = Math.max(window.innerHeight * 0.38, preferredY);
  delta = writingLineY - preferredY;

  if (delta > bodyLineHeight() * 0.8) {
    window.scrollBy({ top: delta, behavior: delta > 180 ? "smooth" : "auto" });
  }
}

function updatePinnedLayout() {
  var lift = 0;
  if (prefs.pinFooter && els.statusbar) {
    lift = Math.ceil(els.statusbar.getBoundingClientRect().height + 18);
  }
  document.documentElement.style.setProperty("--pinned-footer-lift", lift + "px");
}

function autosize(options) {
  var target = activeBodyElement();
  var notePaper;
  var notePaperRect;
  var noteEditorRect;
  var tail = writingTailHeight();
  var minHeight = window.innerHeight * 0.48 + tail;
  var contentHeight;
  var caretHeight;
  var height;
  var shouldFollow = options && options.followWriting;
  document.documentElement.style.setProperty("--writing-tail", Math.round(tail) + "px");
  if (isNoteThemeActive()) {
    updateNoteTitleLayout();
    contentHeight = updateNoteEditorGuide() || 36;
    target.style.height = Math.max(36, contentHeight) + "px";
    notePaper = els.noteBodyEditor.closest(".paper");
    if (notePaper) {
      notePaperRect = notePaper.getBoundingClientRect();
      noteEditorRect = els.noteBodyEditor.getBoundingClientRect();
      notePaper.style.minHeight = Math.max(
        window.innerHeight,
        Math.ceil(noteEditorRect.top - notePaperRect.top + Math.max(36, contentHeight) + 64)
      ) + "px";
    }
    lastBodyContentHeight = contentHeight;
    updateNoteInsertPosition();
    updatePinnedLayout();
    return;
  }
  updateNoteTitleLayout();
  contentHeight = measureBodyContentHeight(els.body.value);
  caretHeight = bodyCaretContentHeight();
  lastBodyContentHeight = contentHeight;
  height = Math.max(contentHeight + tail, minHeight);
  target.style.height = height + "px";
  if (!isNoteThemeActive() && els.body.parentNode) {
    els.body.parentNode.style.minHeight = height + "px";
  }
  notePaper = els.noteBodyEditor.closest(".paper");
  if (notePaper) notePaper.style.removeProperty("min-height");
  updatePinnedLayout();
  if (shouldFollow) {
    window.requestAnimationFrame(function () {
      keepWritingLineInView(caretHeight);
    });
  }
}

function updateCount() {
  var count = characterCount();
  els.count.textContent = charactersText(count, maxCharacters);
  els.words.textContent = wordsText(wordCount(textForCounting()));
  els.noteCount.textContent = noteCharactersText(count);
  els.count.style.color = count > maxCharacters ? "var(--danger)" : "";
}

function saveDraft() {
  var hasDraft;
  if (isNoteThemeActive()) syncTextareaFromNoteEditor();
  var draft = {
    title: els.title.value,
    body: els.body.value,
    noteBodyHtml: isNoteThemeActive() ? els.noteBodyEditor.innerHTML : "",
    noteCoverImage: els.noteCover.hidden ? "" : els.noteCoverImage.src,
    updatedAt: Date.now()
  };

  hasDraft = Boolean(draft.title.trim() || draft.body.trim() || draft.noteCoverImage);
  if (hasDraft) {
    safeSet(draftKey, JSON.stringify(draft));
    els.saved.textContent = text("saved");
    setNoteSaveStatus("saved");
  } else {
    safeRemove(draftKey);
    els.saved.textContent = text("localDraft");
    setNoteSaveStatus("localDraft");
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
  if (isNoteThemeActive()) {
    if (draft.noteBodyHtml) {
      els.noteBodyEditor.innerHTML = draft.noteBodyHtml;
        normalizeNoteBlockStructure();
        noteEditorReady = true;
        updateNoteToc();
      } else {
        syncNoteEditorFromTextarea(true);
      }
      if (draft.noteCoverImage) setNoteCoverImage(draft.noteCoverImage);
    }

    hasPrefs = Boolean(safeGet(PREF_KEY));
    if (!hasPrefs && draft.visibility && draft.titleMode) {
      prefs.visibility = draft.visibility;
      prefs.titleMode = draft.titleMode;
      savePreferences();
      applyPreferences();
    }
    els.saved.textContent = text("recovered");
    setNoteSaveStatus("recovered");
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
  var coverDataUrl = isNoteThemeActive() && !els.noteCover.hidden ? els.noteCoverImage.src : "";
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
      language: prefs.language,
      media_data_url: coverDataUrl
    })
  })
    .then(parseJsonResponse)
    .then(function (data) {
      safeRemove(draftKey);
      els.title.value = "";
      els.body.value = "";
      if (isNoteThemeActive()) {
        noteEditorReady = false;
        syncNoteEditorFromTextarea(true);
      }
      clearNoteCoverImage();
      els.saved.textContent = text("localDraft");
      setNoteSaveStatus("localDraft");
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

function translateDraft() {
  if (!els.title.value.trim() && !els.body.value.trim()) {
    showToast(text("noTextToTranslate"));
    return;
  }

  els.translateButton.disabled = true;
  els.translateButton.querySelector("span").textContent = text("translating");

  fetch("/api/translate", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf
    },
    body: JSON.stringify({
      title: els.title.value,
      body: els.body.value,
      source: translationPrefs.source,
      target: translationPrefs.target,
      case_mode: translationPrefs.caseMode,
      protect_tokens: translationPrefs.protectTokens
    })
  })
    .then(parseJsonResponse)
    .then(function (data) {
      els.title.value = data.title || "";
      els.body.value = data.body || "";
      if (isNoteThemeActive()) noteEditorReady = false;
      prefs.language = translationPrefs.target;
      savePreferences();
      applyPreferences();
      saveDraft();
      autosize();
      showToast(text("translated"));
    })
    .catch(function (error) {
      showToast(error.message || text("translateFailed"));
    })
    .then(function () {
      els.translateButton.disabled = false;
      els.translateButton.querySelector("span").textContent = text("translate");
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

function toggleNoteMore(forceOpen) {
  var open = typeof forceOpen === "boolean" ? forceOpen : els.noteMoreMenu.hidden;
  els.noteMoreMenu.hidden = !open;
  els.noteMore.setAttribute("aria-expanded", open ? "true" : "false");
}

function updateNoteCanvasShift(open) {
  var root = document.documentElement;
  var openWidth;
  var closedWidth = 56;
  var shift;
  if (prefs.theme !== "note-editor" || window.innerWidth <= 820) {
    root.style.setProperty("--note-canvas-shift", "0px");
    return;
  }
  openWidth = window.innerWidth <= 1120 ? 304 : 377;
  shift = open ? 0 : -Math.round((openWidth - closedWidth) / 2);
  root.style.setProperty("--note-canvas-shift", shift + "px");
}

function setNoteSidebar(open) {
  var isOpen = Boolean(open);
  document.documentElement.setAttribute("data-note-sidebar", isOpen ? "open" : "closed");
  els.noteToc.setAttribute("aria-expanded", isOpen ? "true" : "false");
  els.noteSidebarToggle.setAttribute("aria-label", isOpen ? text("noteClose") : text("noteToc"));
  els.noteSidebarToggle.title = isOpen ? text("noteClose") : text("noteToc");
  updateNoteCanvasShift(isOpen);
}

function setNoteSaveStatus(state) {
  noteSaveState = state || "localDraft";
  if (els.noteSaveStatus) els.noteSaveStatus.textContent = text(noteSaveState);
}

function noteExportTitle() {
  return (els.title.value || text("noteTitlePlaceholder")).trim() || "note";
}

function noteMarkdownWithImage() {
  var title = els.title.value.trim();
  var body;
  var cover = isNoteThemeActive() && !els.noteCover.hidden ? els.noteCoverImage.src : "";
  var markdown = [];
  if (isNoteThemeActive()) syncTextareaFromNoteEditor();
  body = els.body.value.trim();
  if (title) markdown.push("# " + title);
  if (body) markdown.push(body);
  if (cover) markdown.push("![Cover image](" + cover + ")");
  if (!markdown.length) markdown.push("");
  return markdown.join("\n\n") + "\n";
}

function noteImageClipboardItem() {
  var src = isNoteThemeActive() && !els.noteCover.hidden ? els.noteCoverImage.src : "";
  if (!src || src.indexOf("data:") !== 0) return null;
  return fetch(src).then(function (response) { return response.blob(); });
}

function copyTextFallback(value) {
  var field = document.createElement("textarea");
  var copied = false;
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.focus();
  field.select();
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }
  field.remove();
  return copied;
}

function copyNoteContent() {
  var markdown = noteMarkdownWithImage();
  var imagePromise = noteImageClipboardItem();
  var writeMarkdown = function (blob) {
    var item = {
      "text/plain": new Blob([markdown], { type: "text/plain" }),
      "text/markdown": new Blob([markdown], { type: "text/markdown" })
    };
    if (blob) item[blob.type || "image/png"] = blob;
    return navigator.clipboard.write([new ClipboardItem(item)]);
  };
  var fallback = function () {
    if (copyTextFallback(markdown)) {
      showToast(text("noteCopied"));
      return true;
    }
    return false;
  };
  if (navigator.clipboard && typeof navigator.clipboard.write === "function" && window.ClipboardItem) {
    (imagePromise || Promise.resolve(null)).then(writeMarkdown).then(function () {
      showToast(text("noteCopied"));
    }).catch(function () {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(markdown).then(function () {
          showToast(text("noteCopied"));
        }).catch(fallback);
      } else {
        fallback();
      }
    });
    return;
  }
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(markdown).then(function () {
      showToast(text("noteCopied"));
    }).catch(fallback);
    return;
  }
  fallback();
}

function downloadNoteMarkdown() {
  var blob = new Blob([noteMarkdownWithImage()], { type: "text/markdown;charset=utf-8" });
  var link = document.createElement("a");
  var filename = noteExportTitle().replace(/[^\w\-. ]+/g, "-").trim() || "note";
  if (!/\.md$/i.test(filename)) filename += ".md";
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 0);
}

function saveNoteDraft() {
  saveDraft();
}

function rememberNoteSelection() {
  var selection = window.getSelection();
  var block;
  if (!selection || !selection.rangeCount || !els.noteBodyEditor || !els.noteBodyEditor.contains(selection.anchorNode)) return;
  noteSelectionRange = selection.getRangeAt(0).cloneRange();
  block = noteBlockForNode(selection.anchorNode);
  if (block) noteActiveBlock = block;
  updateNoteEditorGuide();
  updateNoteInsertPosition();
}

function noteSelectionIsInsideEditor() {
  var selection = window.getSelection();
  return Boolean(selection && selection.rangeCount && els.noteBodyEditor &&
    els.noteBodyEditor.contains(selection.anchorNode));
}

function noteBlockIndex(block) {
  if (!block || !els.noteBodyEditor || block.parentNode !== els.noteBodyEditor) return -1;
  return Array.prototype.indexOf.call(els.noteBodyEditor.children, block);
}

function noteBlockAtIndex(index) {
  if (!els.noteBodyEditor || index < 0) return null;
  return els.noteBodyEditor.children[index] || null;
}

function placeNoteCaretAtEnd(block) {
  var selection = window.getSelection();
  var range;
  if (!els.noteBodyEditor) return;
  if (!block || block === els.noteBodyEditor) {
    block = document.createElement("p");
    block.innerHTML = "<br>";
    els.noteBodyEditor.appendChild(block);
  }
  try {
    els.noteBodyEditor.focus({ preventScroll: true });
  } catch (error) {
    els.noteBodyEditor.focus();
  }
  range = document.createRange();
  range.selectNodeContents(block);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  noteActiveBlock = block;
  noteSelectionRange = range.cloneRange();
  updateNoteEditorGuide();
  updateNoteInsertPosition();
}

function ensureNoteCaret(preferredBlock) {
  var selection = window.getSelection();
  var block = preferredBlock || noteActiveBlock;
  if (!els.noteBodyEditor) return;
  if (noteSelectionIsInsideEditor()) {
    rememberNoteSelection();
    return;
  }
  if (!block || !els.noteBodyEditor.contains(block)) block = els.noteBodyEditor.lastElementChild;
  placeNoteCaretAtEnd(block);
}

function focusNoteEditor() {
  var selection;
  var range;
  var block;
  if (!els.noteBodyEditor) return;
  try {
    els.noteBodyEditor.focus({ preventScroll: true });
  } catch (error) {
    els.noteBodyEditor.focus();
  }
  selection = window.getSelection();
  if (noteSelectionRange && els.noteBodyEditor.contains(noteSelectionRange.commonAncestorContainer)) {
    selection.removeAllRanges();
    selection.addRange(noteSelectionRange);
    return;
  }
  if (selection && selection.rangeCount && els.noteBodyEditor.contains(selection.anchorNode)) {
    rememberNoteSelection();
    return;
  }
  block = noteActiveBlock;
  if (!block || !els.noteBodyEditor.contains(block)) block = els.noteBodyEditor.lastElementChild;
  placeNoteCaretAtEnd(block || els.noteBodyEditor);
}

function unwrapNoteHighlight(mark) {
  var parent = mark.parentNode;
  while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
  mark.remove();
}

function wrapNoteTextRange(node, startOffset, endOffset) {
  var range = document.createRange();
  var mark = document.createElement("mark");
  var fragment;
  if (!node || startOffset >= endOffset) return null;
  range.setStart(node, startOffset);
  range.setEnd(node, endOffset);
  fragment = range.extractContents();
  mark.appendChild(fragment);
  range.insertNode(mark);
  return mark;
}

function noteRangeInsideHighlight(range, mark) {
  var markRange;
  if (!range || !mark || !els.noteBodyEditor.contains(mark)) return false;
  markRange = document.createRange();
  markRange.selectNodeContents(mark);
  try {
    return markRange.compareBoundaryPoints(Range.START_TO_START, range) <= 0 &&
      markRange.compareBoundaryPoints(Range.END_TO_END, range) >= 0;
  } catch (error) {
    return false;
  }
}

function noteHighlightForRange(range) {
  var marks;
  var i;
  var mark;
  var selectedText;
  if (!range || range.collapsed || !els.noteBodyEditor) return null;
  selectedText = range.toString().replace(/\u200b/g, "");
  marks = els.noteBodyEditor.querySelectorAll("mark");
  for (i = 0; i < marks.length; i += 1) {
    mark = marks[i];
    if (noteRangeInsideHighlight(range, mark) && selectedText === mark.textContent.replace(/\u200b/g, "")) return mark;
  }
  return null;
}

function highlightNoteTextSelection(range) {
  var walker = document.createTreeWalker(els.noteBodyEditor, NodeFilter.SHOW_TEXT);
  var textNodes = [];
  var node;
  var startOffset;
  var endOffset;
  var marks = [];
  var i;
  while (walker.nextNode()) {
    node = walker.currentNode;
    if (!node.nodeValue || !range.intersectsNode(node)) continue;
    if (node.parentElement && node.parentElement.closest("mark")) continue;
    startOffset = 0;
    endOffset = node.nodeValue.length;
    try {
      if (range.startContainer === node) startOffset = range.startOffset;
      else if (range.comparePoint(node, node.nodeValue.length) < 0) continue;
      if (range.endContainer === node) endOffset = range.endOffset;
      else if (range.comparePoint(node, 0) > 0) continue;
    } catch (error) {
      continue;
    }
    if (startOffset < endOffset) textNodes.push({ node: node, start: startOffset, end: endOffset });
  }
  for (i = textNodes.length - 1; i >= 0; i -= 1) {
    node = textNodes[i];
    marks.unshift(wrapNoteTextRange(node.node, node.start, node.end));
  }
  return marks.filter(Boolean);
}

function toggleNoteHighlight() {
  var selection;
  var range;
  var startBlock;
  var startOffset;
  var endOffset;
  var mark;
  var ancestor;
  var highlighted;

  focusNoteEditor();
  selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  range = selection.getRangeAt(0);
  if (!els.noteBodyEditor.contains(range.commonAncestorContainer)) return;
  ancestor = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
  mark = ancestor && ancestor.closest ? ancestor.closest("mark") : null;
  mark = noteHighlightForRange(range) || (range.collapsed ? mark : null);
  if (mark && els.noteBodyEditor.contains(mark)) {
    startBlock = noteBlockForNode(mark);
    startOffset = noteBlockTextOffset(startBlock, range.startContainer, range.startOffset);
    endOffset = range.collapsed ? startOffset : noteBlockTextOffset(startBlock, range.endContainer, range.endOffset);
    unwrapNoteHighlight(mark);
    placeNoteCaretAtTextOffset(startBlock, Math.max(startOffset, endOffset));
  } else if (range.collapsed) {
    mark = document.createElement("mark");
    mark.appendChild(document.createTextNode("\u200b"));
    range.insertNode(mark);
    range.setStart(mark.firstChild, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    noteActiveBlock = noteBlockForNode(mark);
    noteSelectionRange = range.cloneRange();
  } else {
    highlighted = highlightNoteTextSelection(range);
    if (highlighted.length) {
      var firstMark = highlighted[0];
      var lastMark = highlighted[highlighted.length - 1];
      range = document.createRange();
      range.setStart(firstMark.firstChild || firstMark, 0);
      range.setEnd(lastMark.lastChild || lastMark, lastMark.lastChild && lastMark.lastChild.nodeType === 3 ? lastMark.lastChild.nodeValue.length : lastMark.childNodes.length);
      selection.removeAllRanges();
      selection.addRange(range);
      noteActiveBlock = noteBlockForNode(firstMark);
      noteSelectionRange = range.cloneRange();
    }
    /* Text nodes are wrapped individually so block elements never become
       children of <mark>; headings, lists and quotes remain valid Markdown. */
    if (!highlighted.length) return;
    /* The selection is already restored above. */
  }
  syncTextareaFromNoteEditor();
  saveDraft();
  autosize({ followWriting: true });
  rememberNoteSelection();
}

function toggleMarkdownHighlightInTextarea(textarea) {
  var start = textarea.selectionStart || 0;
  var end = textarea.selectionEnd || start;
  var selected = textarea.value.slice(start, end);
  var replacement = "==" + selected + "==";
  textarea.setRangeText(replacement, start, end, "select");
  if (start === end) textarea.setSelectionRange(start + 2, start + 2);
  saveDraft();
  autosize({ followWriting: true });
}

function indentTextarea(textarea, event) {
  var value = textarea.value;
  var start = textarea.selectionStart || 0;
  var end = textarea.selectionEnd || start;
  var lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  var lineEnd = value.indexOf("\n", end);
  var original;
  var replacement;
  var lines;
  var removed = 0;
  var i;

  if (lineEnd < 0) lineEnd = value.length;
  if (start === end) {
    if (event.shiftKey) {
      original = value.slice(lineStart, start);
      removed = Math.min(2, (original.match(/^ {1,2}/) || [""])[0].length);
      if (!removed) return false;
      textarea.setRangeText("", lineStart, lineStart + removed, "end");
      textarea.setSelectionRange(Math.max(lineStart, start - removed), Math.max(lineStart, start - removed));
    } else {
      textarea.setRangeText("  ", start, end, "end");
    }
  } else {
    original = value.slice(lineStart, lineEnd);
    lines = original.split("\n");
    if (event.shiftKey) {
      replacement = lines.map(function (line) {
        var count = Math.min(2, (line.match(/^ {1,2}/) || [""])[0].length);
        removed += count;
        return line.slice(count);
      }).join("\n");
    } else {
      replacement = lines.map(function (line) { return "  " + line; }).join("\n");
    }
    textarea.setRangeText(replacement, lineStart, lineEnd, "select");
    if (event.shiftKey) {
      textarea.setSelectionRange(Math.max(lineStart, start - Math.min(removed, start - lineStart)), Math.max(lineStart, end - removed));
    }
  }
  event.preventDefault();
  saveDraft();
  autosize({ followWriting: true });
  return true;
}

function indentNoteParagraph(event) {
  var selection;
  var range;
  var block;
  var offset;
  var textNode;

  focusNoteEditor();
  selection = window.getSelection();
  if (!selection || !selection.rangeCount || !els.noteBodyEditor.contains(selection.anchorNode)) return false;
  range = selection.getRangeAt(0);
  block = noteBlockForNode(selection.anchorNode);
  if (!block || block.tagName.toLowerCase() !== "p") return false;
  event.preventDefault();
  if (event.shiftKey) {
    if (block.getAttribute("data-manual-indent") === "true") block.removeAttribute("data-manual-indent");
  } else if (range.collapsed && noteBlockTextOffset(block, selection.anchorNode, selection.anchorOffset) === 0) {
    block.setAttribute("data-manual-indent", "true");
  } else {
    if (!range.collapsed) range.deleteContents();
    textNode = document.createTextNode("  ");
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  syncTextareaFromNoteEditor();
  saveDraft();
  autosize({ followWriting: true });
  rememberNoteSelection();
  return true;
}

function handleIndentKey(event) {
  if (event.key !== "Tab" || event.ctrlKey || event.altKey || event.metaKey) return false;
  if (document.activeElement === els.body) return indentTextarea(els.body, event);
  if (isNoteThemeActive() && document.activeElement === els.noteBodyEditor) return indentNoteParagraph(event);
  return false;
}

function handleMarkdownHighlightShortcut(event) {
  if (document.activeElement !== els.body ||
      (!eventMatchesShortcut(event, "Ctrl+Alt+H") && !eventMatchesShortcut(event, "Ctrl+Shift+H"))) return false;
  event.preventDefault();
  toggleMarkdownHighlightInTextarea(els.body);
  return true;
}

function applyNoteCommand(command, value) {
  var targetIndex;
  if (command === "formatBlock" && (value === "h2" || value === "h3")) {
    applyNoteBlockFormat(value);
    return;
  }
  if (command === "highlight") {
    toggleNoteHighlight();
    return;
  }
  focusNoteEditor();
  targetIndex = noteBlockIndex(noteActiveBlock);
  document.execCommand(command, false, value || null);
  normalizeNoteMarkdownBlocks();
  ensureNoteCaret(noteBlockAtIndex(targetIndex));
  syncTextareaFromNoteEditor();
  saveDraft();
  autosize({ followWriting: true });
  window.requestAnimationFrame(function () {
    if (isNoteThemeActive()) ensureNoteCaret(noteBlockAtIndex(targetIndex));
  });
}

function applyNoteLink() {
  var url = window.prompt(text("noteLinkPrompt"), "https://");
  if (url) applyNoteCommand("createLink", url.trim());
}

function handleNoteFormatAction(action) {
  if (action === "menu") {
    toggleNoteInsert();
    return;
  }
  if (action === "heading") {
    applyNoteCommand("formatBlock", "h2");
    return;
  }
  if (action === "subheading") {
    applyNoteCommand("formatBlock", "h3");
    return;
  }
  if (action === "list" || action === "bullet") {
    applyNoteCommand("insertUnorderedList");
    return;
  }
  if (action === "number") {
    applyNoteCommand("insertOrderedList");
    return;
  }
  if (action === "quote") {
    applyNoteCommand("formatBlock", "blockquote");
    return;
  }
  if (action === "bold") {
    applyNoteCommand("bold");
    return;
  }
  if (action === "strike") {
    applyNoteCommand("strikeThrough");
    return;
  }
  if (action === "highlight") {
    applyNoteCommand("highlight");
    return;
  }
  if (action === "code") {
    applyNoteCommand("formatBlock", "pre");
    return;
  }
  if (action === "link") {
    applyNoteLink();
    return;
  }
  if (action === "undo" || action === "redo") {
    applyNoteCommand(action);
  }
}

function toggleNoteInsert(forceOpen) {
  var open = typeof forceOpen === "boolean" ? forceOpen : els.noteInsertMenu.hidden;
  els.noteInsertMenu.hidden = !open;
  els.noteInsertButton.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) updateNoteInsertPosition();
}

function handleNoteInsertAction(action) {
  toggleNoteInsert(false);
  if (action === "image") {
    els.noteImageInput.click();
    return;
  }
  if (action === "heading") {
    applyNoteCommand("formatBlock", "h2");
    return;
  }
  if (action === "subheading") {
    applyNoteCommand("formatBlock", "h3");
    return;
  }
  if (action === "bullet") {
    applyNoteCommand("insertUnorderedList");
    return;
  }
  if (action === "number") {
    applyNoteCommand("insertOrderedList");
    return;
  }
  if (action === "quote") {
    applyNoteCommand("formatBlock", "blockquote");
    return;
  }
  if (action === "code") {
    applyNoteCommand("formatBlock", "pre");
    return;
  }
  if (action === "highlight") {
    applyNoteCommand("highlight");
    return;
  }
  if (action === "divider") {
    applyNoteCommand("insertHorizontalRule");
    return;
  }
  if (action === "toc") showNotePanel("toc");
}

function noteShortcutMatches(event, shortcut) {
  var config = parseShortcut(shortcut);
  var expected = config.key;
  var key = shortcutKeyName(event);
  if (eventMatchesShortcut(event, shortcut)) return true;
  if (!expected || !event.code) return false;
  if (expected === "`") expected = "Backquote";
  else if (/^\d$/.test(expected)) expected = "Digit" + expected;
  else if (expected === ">") expected = "Period";
  else return false;
  return event.code === expected &&
    Boolean(event.ctrlKey) === config.ctrl &&
    Boolean(event.altKey) === config.alt &&
    Boolean(event.shiftKey) === config.shift &&
    Boolean(event.metaKey) === config.meta;
}

function handleNoteShortcut(event) {
  var definition;
  if (!isNoteThemeActive() || document.activeElement !== els.noteBodyEditor) return false;
  for (var i = 0; i < noteShortcutDefinitions.length; i += 1) {
    definition = noteShortcutDefinitions[i];
    if (!noteShortcutMatches(event, definition.keys.join("+")) &&
        !(definition.action === "highlight" && eventMatchesShortcut(event, "Ctrl+Shift+H"))) continue;
    event.preventDefault();
    if (definition.action === "save") {
      saveNoteDraft();
    } else if (definition.action === "link") {
      applyNoteLink();
    } else {
      handleNoteFormatAction(definition.action);
    }
    return true;
  }
  return false;
}

function insertNoteParagraph() {
  var selection = window.getSelection();
  var range;
  var block;
  var listItem;
  var tailRange;
  var tail;
  var paragraph;
  if (!selection || !selection.rangeCount || !els.noteBodyEditor.contains(selection.anchorNode)) return false;
  range = selection.getRangeAt(0);
  listItem = selection.anchorNode.nodeType === 1 ? selection.anchorNode.closest("li") : selection.anchorNode.parentElement.closest("li");
  if (listItem) return false;
  block = noteBlockForNode(selection.anchorNode);
  if (!block) {
    paragraph = document.createElement("p");
    paragraph.innerHTML = "<br>";
    els.noteBodyEditor.appendChild(paragraph);
    block = paragraph;
    range.selectNodeContents(block);
    range.collapse(false);
  }
  if (!range.collapsed) range.deleteContents();
  tailRange = document.createRange();
  tailRange.selectNodeContents(block);
  tailRange.setStart(range.endContainer, range.endOffset);
  tail = tailRange.extractContents();
  paragraph = document.createElement("p");
  if (tail.childNodes.length) paragraph.appendChild(tail);
  if (!paragraph.childNodes.length) paragraph.innerHTML = "<br>";
  if (!block.textContent && !block.querySelector("br")) block.innerHTML = "<br>";
  block.parentNode.insertBefore(paragraph, block.nextSibling);
  range = document.createRange();
  range.selectNodeContents(paragraph);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  noteActiveBlock = paragraph;
  noteSelectionRange = range.cloneRange();
  return true;
}

function updatePreference(key, value) {
  if (key === "theme") {
    value = resolveThemeId(value);
    if (prefs.theme === "note-editor" && value !== "note-editor") {
      syncTextareaFromNoteEditor();
      noteEditorReady = false;
    }
    if (value === "note-editor") noteEditorReady = false;
  }
  if (key === "colorMode") {
    value = optionIsAllowed(value, ["light", "dark"], defaultPrefs.colorMode);
    prefs.systemColorMode = false;
  }
  if (key === "autoIndentParagraphs") value = Boolean(value);
  if (key === "justifyParagraphs") value = Boolean(value);
  prefs[key] = value;
  savePreferences();
  applyPreferences();
}

function bindEvents() {
  els.title.addEventListener("input", function () {
    updateNoteTitleLayout();
    saveDraft();
    autosize();
  });
  els.body.addEventListener("input", function () {
    saveDraft();
    autosize({ followWriting: true });
  });
  els.noteBodyEditor.addEventListener("input", function () {
    noteEditorReady = true;
    normalizeNoteMarkdownBlocks();
    while (normalizeNoteInlineMarkdownBlocks()) {}
    repairNoteHighlightAfterInput();
    cleanNoteHighlightBoundaries();
    rememberNoteSelection();
    syncTextareaFromNoteEditor();
    saveDraft();
    autosize({ followWriting: true });
  });
  els.noteBodyEditor.addEventListener("beforeinput", function (event) {
    handleNoteHighlightBeforeInput(event);
  });
  els.noteBodyEditor.addEventListener("keydown", function (event) {
    if (moveNoteCaretOutOfHighlight(event)) return;
    if (event.key === "Enter" && !event.shiftKey && insertNoteParagraph()) {
      event.preventDefault();
      window.setTimeout(function () {
        normalizeNoteMarkdownBlocks();
        rememberNoteSelection();
        syncTextareaFromNoteEditor();
        saveDraft();
        autosize({ followWriting: true });
      }, 0);
    }
  });
  els.noteBodyEditor.addEventListener("keyup", rememberNoteSelection);
  els.noteBodyEditor.addEventListener("mouseup", rememberNoteSelection);
  els.noteBodyEditor.addEventListener("blur", rememberNoteSelection);
  els.visibility.addEventListener("change", function () {
    updatePreference("visibility", els.visibility.value);
  });
  els.titleMode.addEventListener("change", function () {
    updatePreference("titleMode", els.titleMode.value);
  });
  els.language.addEventListener("change", function () {
    updatePreference("language", els.language.value);
  });
  bindAppearancePicker(els.themePicker);
  bindAppearancePicker(els.noteThemePicker);
  els.editorThemeSelect.addEventListener("change", function () {
    updatePreference("theme", els.editorThemeSelect.value);
  });
  els.pinHeader.addEventListener("change", function () {
    updatePreference("pinHeader", els.pinHeader.checked);
  });
  els.pinFooter.addEventListener("change", function () {
    updatePreference("pinFooter", els.pinFooter.checked);
  });
  els.pinnedChrome.addEventListener("change", function () {
    updatePreference("pinnedChrome", els.pinnedChrome.checked);
  });
  els.autoIndentParagraphs.addEventListener("change", function () {
    updatePreference("autoIndentParagraphs", els.autoIndentParagraphs.checked);
  });
  els.justifyParagraphs.addEventListener("change", function () {
    updatePreference("justifyParagraphs", els.justifyParagraphs.checked);
  });
  els.translateSource.addEventListener("change", function () {
    updateTranslationPreference("source", els.translateSource.value);
  });
  els.translateTarget.addEventListener("change", function () {
    updateTranslationPreference("target", els.translateTarget.value);
  });
  els.translateCase.addEventListener("change", function () {
    updateTranslationPreference("caseMode", els.translateCase.value);
  });
  els.translateProtectTokens.addEventListener("change", function () {
    updateTranslationPreference("protectTokens", els.translateProtectTokens.checked);
  });
  els.translateShortcutButton.addEventListener("click", function () {
    waitingForShortcut = true;
    applyPreferences();
    els.translateShortcutButton.focus();
  });
  els.translateButton.addEventListener("click", translateDraft);
  els.themeToggle.addEventListener("click", function () {
    toggleManualColorMode();
  });
  els.noteMore.addEventListener("click", function () {
    toggleNoteMore();
  });
  els.noteCopyButton.addEventListener("click", function () {
    copyNoteContent();
  });
  els.noteDownloadButton.addEventListener("click", function () {
    downloadNoteMarkdown();
  });
  els.noteSettingsButton.addEventListener("click", function () {
    toggleNoteMore(false);
    els.settingsMenu.open = true;
  });
  els.notePublish.addEventListener("click", publish);
  els.noteSidebarToggle.addEventListener("click", function () {
    setNoteSidebar(document.documentElement.getAttribute("data-note-sidebar") === "closed");
  });
  els.noteToc.addEventListener("click", function () {
    var isOpen = document.documentElement.getAttribute("data-note-sidebar") === "open";
    if (isOpen) {
      setNoteSidebar(false);
      return;
    }
    showNotePanel("toc");
  });
  els.noteHint.addEventListener("click", function () {
    showNotePanel("hint");
  });
  els.noteGuide.addEventListener("click", function () {
    showNotePanel("guide");
  });
  els.noteImage.addEventListener("click", function () {
    els.noteImageInput.click();
  });
  els.noteImageInput.addEventListener("change", function () {
    if (els.noteImageInput.files && els.noteImageInput.files.length) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        setNoteCoverImage(reader.result);
        saveDraft();
        showToast(text("imageSelected"));
      });
      reader.readAsDataURL(els.noteImageInput.files[0]);
    }
  });
  els.noteCoverRemove.addEventListener("click", function () {
    clearNoteCoverImage();
    saveDraft();
  });
  els.noteInsertButton.addEventListener("click", function () {
    toggleNoteInsert();
  });
  els.noteInsertButton.addEventListener("mousedown", function (event) {
    rememberNoteSelection();
    event.preventDefault();
  });
  els.noteInsertMenu.querySelectorAll("[data-insert-action]").forEach(function (button) {
    button.addEventListener("mousedown", function (event) {
      rememberNoteSelection();
      event.preventDefault();
    });
    button.addEventListener("click", function () {
      handleNoteInsertAction(button.getAttribute("data-insert-action"));
    });
  });
  els.noteFormatBar.querySelectorAll("[data-note-action]").forEach(function (button) {
    button.addEventListener("mousedown", function (event) {
      rememberNoteSelection();
      event.preventDefault();
    });
    button.addEventListener("click", function () {
      handleNoteFormatAction(button.getAttribute("data-note-action"));
    });
  });
  if (window.matchMedia) {
    var systemMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    var systemModeChanged = function () {
      if (prefs.systemColorMode) applyPreferences();
    };
    if (systemMediaQuery.addEventListener) systemMediaQuery.addEventListener("change", systemModeChanged);
    else if (systemMediaQuery.addListener) systemMediaQuery.addListener(systemModeChanged);
  }
  els.logout.addEventListener("click", logout);
  document.addEventListener("pointerdown", function (event) {
    if (els.settingsMenu.open && !els.settingsMenu.contains(event.target)) {
      els.settingsMenu.open = false;
    }
    if (!els.noteMore.contains(event.target) && !els.noteMoreMenu.contains(event.target)) {
      toggleNoteMore(false);
    }
    if (!els.noteInsertButton.contains(event.target) && !els.noteInsertMenu.contains(event.target)) {
      toggleNoteInsert(false);
    }
  });
  document.addEventListener("selectionchange", function () {
    if (isNoteThemeActive() && document.activeElement === els.noteBodyEditor) {
      rememberNoteSelection();
    }
  });
  document.addEventListener("keydown", function (event) {
    var shortcut;
    if (waitingForShortcut) {
      event.preventDefault();
      if (event.key === "Escape") {
        waitingForShortcut = false;
        applyPreferences();
        return;
      }
      shortcut = shortcutFromEvent(event);
      if (shortcut) {
        waitingForShortcut = false;
        updateTranslationPreference("shortcut", shortcut);
      }
      return;
    }
    if (handleIndentKey(event)) return;
    if (handleMarkdownHighlightShortcut(event)) return;
    if (handleNoteShortcut(event)) return;
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      publish();
    }
    if (editorHasFocus() && eventMatchesShortcut(event, translationPrefs.shortcut)) {
      event.preventDefault();
      translateDraft();
      return;
    }
    if (event.key === "Escape" && els.settingsMenu.open) {
      els.settingsMenu.open = false;
      els.settingsSummary.focus();
    }
    if (event.key === "Escape" && !els.noteMoreMenu.hidden) {
      toggleNoteMore(false);
      els.noteMore.focus();
    }
    if (event.key === "Escape" && !els.noteInsertMenu.hidden) {
      toggleNoteInsert(false);
      els.noteInsertButton.focus();
    }
  });
  els.publish.addEventListener("click", publish);
  window.addEventListener("resize", function () {
    autosize();
    updateNoteCanvasShift(document.documentElement.getAttribute("data-note-sidebar") !== "closed");
  });
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
