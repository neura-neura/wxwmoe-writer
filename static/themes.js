(function () {
  var definitions = {
    "paper-bloom": {
      id: "paper-bloom",
      defaultColorMode: "light",
      labels: {
        en: "Paper Bloom",
        es: "Papel en flor",
        zh: "花笺"
      },
      descriptions: {
        en: "The original wxw.moe writing desk.",
        es: "El escritorio de escritura original de wxw.moe.",
        zh: "wxw.moe 原始写作桌面。"
      }
    },
    "note-editor": {
      id: "note-editor",
      defaultColorMode: "light",
      labels: {
        en: "Note editor",
        es: "Editor Note",
        zh: "Note 编辑器"
      },
      descriptions: {
        en: "A quiet, focused editor inspired by note.com.",
        es: "Un editor silencioso y enfocado inspirado en note.com.",
        zh: "受 note.com 启发的安静专注编辑器。"
      }
    }
  };

  var appearanceDefinitions = {
    system: {
      id: "system",
      palette: "paper-bloom",
      colorMode: "system",
      labels: { en: "system", es: "Sistema", zh: "系统" }
    },
    light: {
      id: "light",
      palette: "paper-bloom",
      colorMode: "light",
      labels: { en: "light", es: "Claro", zh: "浅色" }
    },
    dark: {
      id: "dark",
      palette: "paper-bloom",
      colorMode: "dark",
      labels: { en: "dark", es: "Oscuro", zh: "深色" }
    },
    "ink-paper-light": {
      id: "ink-paper-light",
      palette: "ink-paper",
      colorMode: "light",
      labels: { en: "ink paper light", es: "Ink Paper claro", zh: "Ink Paper 浅色" }
    },
    "ink-paper-dark": {
      id: "ink-paper-dark",
      palette: "ink-paper",
      colorMode: "dark",
      labels: { en: "ink paper dark", es: "Ink Paper oscuro", zh: "Ink Paper 深色" }
    }
  };

  window.wxwThemes = {
    defaultId: "paper-bloom",
    ids: function () {
      return Object.keys(definitions);
    },
    has: function (id) {
      return Object.prototype.hasOwnProperty.call(definitions, id);
    },
    get: function (id) {
      return definitions[id] || definitions[this.defaultId];
    },
    labelsFor: function (language) {
      var labels = {};
      this.ids().forEach(function (id) {
        labels[id] = definitions[id].labels[language] || definitions[id].labels.en;
      });
      return labels;
    },
    descriptionsFor: function (language) {
      var descriptions = {};
      this.ids().forEach(function (id) {
        descriptions[id] = definitions[id].descriptions[language] || definitions[id].descriptions.en;
      });
      return descriptions;
    },
    appearanceIds: function () {
      return Object.keys(appearanceDefinitions);
    },
    appearance: function (id) {
      return appearanceDefinitions[id] || appearanceDefinitions.light;
    },
    appearanceLabelsFor: function (language) {
      var labels = {};
      this.appearanceIds().forEach(function (id) {
        labels[id] = appearanceDefinitions[id].labels[language] || appearanceDefinitions[id].labels.en;
      });
      return labels;
    }
  };
})();
