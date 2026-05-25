(function () {
  "use strict";

  var PROFILE_STORAGE_KEY = "keyboardSoundProfile";
  var VOLUME_STORAGE_KEY = "keyboardSoundVolume";
  var MODIFIER_KEYS = {
    Shift: true,
    Control: true,
    Alt: true,
    Meta: true,
    CapsLock: true
  };
  var THROTTLE_MS = 32;
  var TEXT_INPUT_TYPES = {
    "": true,
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true
  };

  var keyboardSoundProfiles = {
    none: null,

    ios: {
      basePath: "/sounds/keyboards/ios/",
      press: {
        normal: ["key.mp3"],
        backspace: ["back.mp3"],
        space: ["alt.mp3"],
        enter: ["alt.mp3"],
        special: ["alt.mp3"]
      },
      release: null,
      volume: 0.3
    },

    alpaca: {
      basePath: "/sounds/keyboards/alpaca/",
      press: {
        normal: [
          "press_key1.mp3",
          "press_key2.mp3",
          "press_key3.mp3",
          "press_key4.mp3",
          "press_key5.mp3"
        ],
        backspace: ["press_back.mp3"],
        space: ["press_space.mp3"],
        enter: ["press_enter.mp3"],
        special: ["press_key1.mp3"]
      },
      release: {
        normal: ["release_key.mp3"],
        backspace: ["release_back.mp3"],
        space: ["release_space.mp3"],
        enter: ["release_enter.mp3"],
        special: ["release_key.mp3"]
      },
      volume: 0.25
    },

    "logitech-g915-tkl-brown": {
      basePath: "/sounds/keyboards/logitech-g915-tkl-brown/",
      press: {
        normal: [
          "key-press-1.wav",
          "key-press-2.wav",
          "key-press-3.wav",
          "key-press-4.wav",
          "key-press-5.wav"
        ],
        backspace: [
          "key-press-1.wav",
          "key-press-2.wav",
          "key-press-3.wav",
          "key-press-4.wav",
          "key-press-5.wav"
        ],
        space: [
          "space-press-1.wav",
          "space-press-2.wav",
          "space-press-3.wav"
        ],
        enter: [
          "enter-press-1.wav",
          "enter-press-2.wav"
        ],
        special: ["key-press-1.wav"]
      },
      release: {
        normal: [
          "key-release-1.wav",
          "key-release-2.wav",
          "key-release-3.wav",
          "key-release-4.wav",
          "key-release-5.wav"
        ],
        backspace: [
          "key-release-1.wav",
          "key-release-2.wav",
          "key-release-3.wav",
          "key-release-4.wav",
          "key-release-5.wav"
        ],
        space: [
          "space-release-1.wav",
          "space-release-2.wav",
          "space-release-3.wav"
        ],
        enter: [
          "enter-release-1.wav",
          "enter-release-2.wav"
        ],
        special: ["key-release-1.wav"]
      },
      volume: 0.2
    }
  };

  var activeProfileId = readStoredProfile();
  var volumeOverride = readStoredVolume();
  var audioContext = null;
  var bufferCache = {};
  var loadingCache = {};
  var lastPlayedAt = {};
  var initialized = false;
  var volumeControl = null;
  var onVolumeChange = null;

  function readStoredProfile() {
    var value;
    try {
      value = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    } catch (error) {
      value = null;
    }
    return keyboardSoundProfiles.hasOwnProperty(value) ? value : "none";
  }

  function writeStoredProfile(profileId) {
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, profileId);
    } catch (error) {
      return false;
    }
    return true;
  }

  function clampVolume(value) {
    var number = Number(value);
    if (!isFinite(number)) return 0;
    if (number < 0) return 0;
    if (number > 1) return 1;
    return number;
  }

  function readStoredVolume() {
    var value;
    var number;
    try {
      value = window.localStorage.getItem(VOLUME_STORAGE_KEY);
    } catch (error) {
      value = null;
    }
    if (value === null || value === "") return null;
    number = Number(value);
    if (!isFinite(number)) return null;
    if (number > 1 && number <= 100) number = number / 100;
    return clampVolume(number);
  }

  function writeStoredVolume(value) {
    try {
      window.localStorage.setItem(VOLUME_STORAGE_KEY, String(clampVolume(value)));
    } catch (error) {
      return false;
    }
    return true;
  }

  function getProfileDefaultVolume(profileId) {
    var profile = keyboardSoundProfiles[profileId || activeProfileId];
    if (!profile || typeof profile.volume !== "number") return 0;
    return clampVolume(profile.volume);
  }

  function getVolume() {
    if (volumeOverride !== null) return volumeOverride;
    return getProfileDefaultVolume(activeProfileId);
  }

  function notifyVolumeChange() {
    if (typeof onVolumeChange === "function") {
      onVolumeChange(getVolume());
    }
  }

  function syncVolumeControl() {
    if (volumeControl) {
      volumeControl.value = String(Math.round(getVolume() * 100));
    }
    notifyVolumeChange();
  }

  function setVolume(value) {
    volumeOverride = clampVolume(value);
    writeStoredVolume(volumeOverride);
    syncVolumeControl();
  }

  function getAudioContext() {
    var AudioContextClass;
    if (audioContext) return audioContext;
    AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
    return audioContext;
  }

  function unlockAudioContext() {
    var context = getAudioContext();
    if (context && context.state === "suspended") {
      context.resume().catch(function () {});
    }
    if (activeProfileId !== "none") {
      preloadProfile(activeProfileId);
    }
  }

  function uniqueFilesForProfile(profile) {
    var seen = {};
    var files = [];
    var phases = ["press", "release"];
    var phaseIndex;
    var category;
    var list;
    var i;

    for (phaseIndex = 0; phaseIndex < phases.length; phaseIndex += 1) {
      if (!profile[phases[phaseIndex]]) continue;
      for (category in profile[phases[phaseIndex]]) {
        if (!profile[phases[phaseIndex]].hasOwnProperty(category)) continue;
        list = profile[phases[phaseIndex]][category] || [];
        for (i = 0; i < list.length; i += 1) {
          if (!seen[list[i]]) {
            seen[list[i]] = true;
            files.push(list[i]);
          }
        }
      }
    }
    return files;
  }

  function loadBuffer(url) {
    var context = getAudioContext();
    if (!context) return Promise.resolve(null);
    if (bufferCache[url]) return Promise.resolve(bufferCache[url]);
    if (loadingCache[url]) return loadingCache[url];

    loadingCache[url] = fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("Unable to load keyboard sound: " + url);
        return response.arrayBuffer();
      })
      .then(function (arrayBuffer) {
        return context.decodeAudioData(arrayBuffer);
      })
      .then(function (buffer) {
        bufferCache[url] = buffer;
        return buffer;
      })
      .catch(function () {
        return null;
      });

    return loadingCache[url];
  }

  function preloadProfile(profileId) {
    var profile = keyboardSoundProfiles[profileId];
    var files;
    var i;
    if (!profile || !getAudioContext()) return;
    files = uniqueFilesForProfile(profile);
    for (i = 0; i < files.length; i += 1) {
      loadBuffer(profile.basePath + files[i]);
    }
  }

  function isEditableTarget(target) {
    var node = target;
    while (node && node !== document) {
      if (node.tagName === "TEXTAREA") return true;
      if (node.tagName === "INPUT") return Boolean(TEXT_INPUT_TYPES[(node.type || "").toLowerCase()]);
      if (node.isContentEditable) return true;
      node = node.parentNode;
    }
    return false;
  }

  function getKeyCategory(event) {
    if (event.key === "Backspace" || event.key === "Delete") return "backspace";
    if (event.key === " " || event.key === "Space" || event.key === "Spacebar") return "space";
    if (event.key === "Enter") return "enter";
    if (
      event.key === "Tab" ||
      event.key === "Escape" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      return "special";
    }
    return event.key && event.key.length === 1 ? "normal" : "special";
  }

  function shouldIgnoreEvent(event) {
    if (activeProfileId === "none") return true;
    if (!isEditableTarget(event.target)) return true;
    if (event.ctrlKey || event.altKey || event.metaKey) return true;
    if (MODIFIER_KEYS[event.key]) return true;
    return false;
  }

  function shouldThrottle(event, phase, category) {
    var key = phase + ":" + category + ":" + event.key;
    var current = Date.now();
    if (lastPlayedAt[key] && current - lastPlayedAt[key] < THROTTLE_MS) {
      return true;
    }
    lastPlayedAt[key] = current;
    return false;
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function playBuffer(buffer, volume) {
    var context = getAudioContext();
    var source;
    var gain;
    if (!context || !buffer) return;
    if (context.state === "suspended") {
      context.resume().catch(function () {});
    }
    source = context.createBufferSource();
    gain = context.createGain();
    gain.gain.value = volume;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(context.destination);
    source.start(0);
  }

  function playKeyboardSound(event, phase) {
    var profile = keyboardSoundProfiles[activeProfileId];
    var category;
    var phaseConfig;
    var list;
    var file;
    var url;

    if (shouldIgnoreEvent(event)) return;
    category = getKeyCategory(event);
    if (shouldThrottle(event, phase, category)) return;
    if (!profile || !profile[phase]) return;

    phaseConfig = profile[phase];
    list = phaseConfig[category] || phaseConfig.normal;
    if (!list || !list.length) return;

    file = pickRandom(list);
    url = profile.basePath + file;
    loadBuffer(url).then(function (buffer) {
      playBuffer(buffer, getVolume());
    });
  }

  function setProfile(profileId) {
    activeProfileId = keyboardSoundProfiles.hasOwnProperty(profileId) ? profileId : "none";
    writeStoredProfile(activeProfileId);
    unlockAudioContext();
    syncVolumeControl();
  }

  function getProfile() {
    return activeProfileId;
  }

  function init(selectElement, volumeElement, volumeChangeCallback) {
    if (initialized) return;
    initialized = true;
    volumeControl = volumeElement || null;
    onVolumeChange = volumeChangeCallback || null;
    if (selectElement) {
      selectElement.value = activeProfileId;
      selectElement.addEventListener("change", function () {
        setProfile(selectElement.value);
      });
    }
    if (volumeControl) {
      syncVolumeControl();
      volumeControl.addEventListener("input", function () {
        unlockAudioContext();
        setVolume(Number(volumeControl.value) / 100);
      });
      volumeControl.addEventListener("change", unlockAudioContext);
    } else {
      notifyVolumeChange();
    }
    document.addEventListener("keydown", function (event) {
      unlockAudioContext();
      playKeyboardSound(event, "press");
    });
    document.addEventListener("keyup", function (event) {
      playKeyboardSound(event, "release");
    });
    document.addEventListener("pointerdown", unlockAudioContext, { once: true });
    document.addEventListener("focusin", unlockAudioContext, { once: true });
  }

  window.wxwKeyboardSounds = {
    profiles: keyboardSoundProfiles,
    init: init,
    setProfile: setProfile,
    getProfile: getProfile,
    setVolume: setVolume,
    getVolume: getVolume,
    getProfileDefaultVolume: getProfileDefaultVolume,
    playKeyboardSound: playKeyboardSound,
    getKeyCategory: getKeyCategory
  };
}());
