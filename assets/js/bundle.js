(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.musics = exports.sounds = void 0;
var PREFIX = './assets/audio';
var sounds = {
  silence: ["".concat(PREFIX, "/silence.webm"), "".concat(PREFIX, "/silence.mp3")],
  gameLogoAppears: ["".concat(PREFIX, "/gameLogoAppears.webm"), "".concat(PREFIX, "/gameLogoAppears.mp3")],
  changeItem: ["".concat(PREFIX, "/changeItem.webm"), "".concat(PREFIX, "/changeItem.mp3")],
  selectItem: ["".concat(PREFIX, "/selectItem.webm"), "".concat(PREFIX, "/selectItem.mp3")],
  clockTick: ["".concat(PREFIX, "/clockTick.webm"), "".concat(PREFIX, "/clockTick.mp3")],
  boatMove: ["".concat(PREFIX, "/boatMove.webm"), "".concat(PREFIX, "/boatMove.mp3")],
  probeDown: ["".concat(PREFIX, "/probeDown.webm"), "".concat(PREFIX, "/probeDown.mp3")],
  probeUp: ["".concat(PREFIX, "/probeUp.webm"), "".concat(PREFIX, "/probeUp.mp3")],
  probeHit: ["".concat(PREFIX, "/probeHit.webm"), "".concat(PREFIX, "/probeHit.mp3")],
  probeMiss: ["".concat(PREFIX, "/probeMiss.webm"), "".concat(PREFIX, "/probeMiss.mp3")],
  revealSeaFloor: ["".concat(PREFIX, "/revealSeaFloor.webm"), "".concat(PREFIX, "/revealSeaFloor.mp3")],
  treasureOpen: ["".concat(PREFIX, "/treasureOpen.webm"), "".concat(PREFIX, "/treasureOpen.mp3")],
  gameOverWin: ["".concat(PREFIX, "/gameOverWin.webm"), "".concat(PREFIX, "/gameOverWin.mp3")],
  gameOverLose: ["".concat(PREFIX, "/gameOverLose.webm"), "".concat(PREFIX, "/gameOverLose.mp3")]
};
exports.sounds = sounds;
var musics = {
  title: ["".concat(PREFIX, "/silence.webm"), "".concat(PREFIX, "/silence.mp3")],
  menu: ["".concat(PREFIX, "/silence.webm"), "".concat(PREFIX, "/silence.mp3")],
  play: ["".concat(PREFIX, "/silence.webm"), "".concat(PREFIX, "/silence.mp3")]
};
exports.musics = musics;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _audio = _interopRequireDefault(require("./audio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioToggle = /*#__PURE__*/function () {
  function AudioToggle() {
    var _this = this;

    _classCallCheck(this, AudioToggle);

    this.audioButton = document.createElement('div');
    this.audioButton.classList.add('audio-button');
    this.muteIcon = document.createElement('i');
    this.muteIcon.classList.add('fas', 'fa-sm', 'fa-volume-up');
    this.audioButton.appendChild(this.muteIcon);
    this.unmuteIcon = document.createElement('i');
    this.unmuteIcon.classList.add('fas', 'fa-volume-mute');
    this.audioButton.appendChild(this.unmuteIcon);
    var listener = this.audioChangeHandler.bind(this);

    _audio["default"].on('mute', listener);

    _audio["default"].on('unmute', listener);

    _audio["default"].on('unlock', listener);

    this.audioChangeHandler();

    this.audioButton.onpointerup = function () {
      return _this.tryToggleAudio();
    };

    this.element = this.audioButton;
  }

  _createClass(AudioToggle, [{
    key: "_isOn",
    value: function _isOn() {
      return !_audio["default"].isMuted() && _audio["default"].isUnlocked();
    }
  }, {
    key: "audioChangeHandler",
    value: function audioChangeHandler() {
      var isOn = this._isOn();

      this.muteIcon.style.display = !isOn ? 'none' : 'block';
      this.unmuteIcon.style.display = isOn ? 'none' : 'block';
    }
  }, {
    key: "tryToggleAudio",
    value: function tryToggleAudio() {
      _audio["default"].mute(this._isOn());
    }
  }]);

  return AudioToggle;
}();

exports["default"] = AudioToggle;

},{"./audio":3}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Music = exports.Sound = exports.Jukebox = exports["default"] = void 0;

var _events = require("events");

var _howler = require("howler");

var audioResources = _interopRequireWildcard(require("./audio-resources"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SOUND_FADE_DURATION = 250;
var MUSIC_FADE_DURATION = 500;

var Loader = /*#__PURE__*/function () {
  function Loader(loadFunc) {
    _classCallCheck(this, Loader);

    this._loadFunc = loadFunc;
    this._cache = {};
  }

  _createClass(Loader, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj) {
        var _this$_cache, _this$_cache$id;

        var id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = JSON.stringify(obj);
                (_this$_cache$id = (_this$_cache = this._cache)[id]) !== null && _this$_cache$id !== void 0 ? _this$_cache$id : _this$_cache[id] = this._loadFunc(obj);
                _context.next = 4;
                return this._cache[id];

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return Loader;
}();

var Sound = /*#__PURE__*/function () {
  function Sound(loadedHowl) {
    var _this = this;

    _classCallCheck(this, Sound);

    this._howl = loadedHowl;

    this._howl.on('fade', function (id) {
      return _this._howl.stop(id);
    });

    this._howl.on('stop', function (id) {
      return Sound._playingSounds["delete"](id);
    });

    this._howl.on('end', function (id) {
      return Sound._playingSounds["delete"](id);
    });
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      var _this2 = this;

      if (Jukebox.isUnlocked()) {
        var id = this._howl.play();

        var isPlaying = function isPlaying() {
          return _this2._howl.playing(id);
        };

        var stop = function stop() {
          if (isPlaying()) {
            var v = _this2._howl.volume(id);

            _this2._howl.fade(v, 0.0, v * SOUND_FADE_DURATION, id);
          }
        };

        var playingSound = {
          isPlaying: isPlaying,
          stop: stop
        };

        Sound._playingSounds.set(id, playingSound);

        return playingSound;
      } else {
        // Do not actually put sounds into queue.
        // Otherwise all queued sounds will start playing once the audio context is started.
        var _isPlaying = true;

        var _stop = function _stop() {
          _isPlaying = false;
        };

        setTimeout(_stop, this._howl.duration());
        return {
          isPlaying: function isPlaying() {
            return _isPlaying;
          },
          stop: _stop
        };
      }
    }
  }], [{
    key: "stop",
    value: function stop() {
      Sound._playingSounds.forEach(function (ps) {
        return ps.stop();
      });
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resources) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resources = typeof resources === 'string' ? [resources] : resources;
                _context2.next = 3;
                return Sound._loader.load(resources);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function create(_x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "_init",
    value: function _init() {
      Sound._loader = new Loader(preloadSound);
      Sound._playingSounds = new Map();
    }
  }]);

  return Sound;
}();

exports.Sound = Sound;

Sound._init();

var Loop = /*#__PURE__*/function () {
  function Loop(loadedHowl) {
    var _this3 = this;

    _classCallCheck(this, Loop);

    this._howl = loadedHowl;

    this._howl.on('fade', function (id) {
      return _this3._howl.stop(id);
    });

    this._isPlaying = false;
    this._id = null;
  }

  _createClass(Loop, [{
    key: "play",
    value: function play() {
      if (!this._isPlaying) {
        this._isPlaying = true;
        this._id = this._howl.play();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._isPlaying) {
        this._isPlaying = false;

        if (this._id !== null) {
          var v = this._howl.volume(this._id);

          this._howl.fade(v, 0.0, v * MUSIC_FADE_DURATION, this._id);

          this._id = null;
        }
      }
    }
  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return this._isPlaying;
    }
  }]);

  return Loop;
}();

var MusicController = /*#__PURE__*/function () {
  function MusicController() {
    _classCallCheck(this, MusicController);

    this._loader = new Loader(preloadLoop);
    this._loops = {
      0: new Loop(new _howler.Howl({
        src: audioResources.sounds.silence,
        preload: true,
        loop: true
      }))
    };
    this._currentLoopId = 0;
    this._counter = 0;
  }

  _createClass(MusicController, [{
    key: "isPlaying",
    value: function isPlaying(id) {
      var loop = this._loops[id];

      if (typeof loop === 'undefined') {
        return false;
      } else {
        return loop.isPlaying();
      }
    }
  }, {
    key: "play",
    value: function play() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._currentLoopId;

      if (this._currentLoopId !== id) {
        var currentLoop = this._loops[this._currentLoopId];
        currentLoop.stop();
      }

      this._currentLoopId = id;
      var newLoop = this._loops[id];

      if (!newLoop.isPlaying()) {
        newLoop.play();
      } else {// Keep playing the current loop
      }
    }
  }, {
    key: "stop",
    value: function stop(id) {
      if (typeof id === 'undefined' || id === this._currentLoopId) {
        this._loops[this._currentLoopId].stop();
      }
    }
  }, {
    key: "addLoop",
    value: function () {
      var _addLoop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resources) {
        var id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = ++this._counter;
                _context3.next = 3;
                return this._loader.load(resources);

              case 3:
                this._loops[id] = _context3.sent;
                return _context3.abrupt("return", id);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addLoop(_x3) {
        return _addLoop.apply(this, arguments);
      }

      return addLoop;
    }()
  }]);

  return MusicController;
}();

var Music = /*#__PURE__*/function () {
  function Music(id) {
    _classCallCheck(this, Music);

    this._id = id;
  }

  _createClass(Music, [{
    key: "isPlaying",
    value: function isPlaying() {
      return Music._controller.isPlaying(this._id);
    }
  }, {
    key: "play",
    value: function play() {
      Music._controller.play(this._id);
    }
  }, {
    key: "playFromStart",
    value: function playFromStart() {
      this.play();
      this.stop();
    }
  }, {
    key: "stop",
    value: function stop() {
      Music._controller.stop(this._id);
    }
  }, {
    key: "name",
    get: function get() {
      return this._id;
    }
  }], [{
    key: "stop",
    value: function stop() {
      Music._controller.stop();
    }
  }, {
    key: "create",
    value: function () {
      var _create2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resources) {
        var id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resources = typeof resources === 'string' ? [resources] : resources;
                _context4.next = 3;
                return Music._controller.addLoop(resources);

              case 3:
                id = _context4.sent;
                return _context4.abrupt("return", new Music(id));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function create(_x4) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "_init",
    value: function _init() {
      Music._controller = new MusicController();
    }
  }]);

  return Music;
}();

exports.Music = Music;

Music._init();

function preloadSound(_x5) {
  return _preloadSound.apply(this, arguments);
}

function _preloadSound() {
  _preloadSound = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resources) {
    var loadedHowl;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return preloadHowl({
              src: resources,
              loop: false
            });

          case 2:
            loadedHowl = _context7.sent;
            return _context7.abrupt("return", new Sound(loadedHowl));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _preloadSound.apply(this, arguments);
}

function preloadLoop(_x6) {
  return _preloadLoop.apply(this, arguments);
}

function _preloadLoop() {
  _preloadLoop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resources) {
    var loadedHowl;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return preloadHowl({
              src: resources,
              loop: true
            });

          case 2:
            loadedHowl = _context8.sent;
            return _context8.abrupt("return", new Loop(loadedHowl));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _preloadLoop.apply(this, arguments);
}

function preloadHowl(_x7) {
  return _preloadHowl.apply(this, arguments);
}

function _preloadHowl() {
  _preloadHowl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(howlOptions) {
    var howl;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            howl = new _howler.Howl(_objectSpread(_objectSpread({}, howlOptions), {}, {
              preload: false
            }));
            _context9.next = 3;
            return new Promise(function (resolve, reject) {
              howl.once('load', resolve);
              howl.once('loaderror', reject);
              howl.load();
            });

          case 3:
            return _context9.abrupt("return", howl);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _preloadHowl.apply(this, arguments);
}

var Jukebox = /*#__PURE__*/function () {
  function Jukebox() {
    _classCallCheck(this, Jukebox);
  }

  _createClass(Jukebox, null, [{
    key: "registerSound",
    value: function () {
      var _registerSound = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(name, resources) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(typeof this._sounds[name] !== 'undefined')) {
                  _context5.next = 4;
                  break;
                }

                throw new Error("Sound with name ".concat(name, " already registered."));

              case 4:
                _context5.next = 6;
                return Sound.create(resources);

              case 6:
                return _context5.abrupt("return", this._sounds[name] = _context5.sent);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function registerSound(_x8, _x9) {
        return _registerSound.apply(this, arguments);
      }

      return registerSound;
    }()
  }, {
    key: "hasSound",
    value: function hasSound(name) {
      return typeof this._sounds[name] !== 'undefined';
    }
  }, {
    key: "getSound",
    value: function getSound(name) {
      return this._sounds[name];
    }
  }, {
    key: "registerMusic",
    value: function () {
      var _registerMusic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name, resources) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(typeof this._musics[name] !== 'undefined')) {
                  _context6.next = 4;
                  break;
                }

                throw new Error("Music with name ".concat(name, " already registered."));

              case 4:
                _context6.next = 6;
                return Music.create(resources);

              case 6:
                return _context6.abrupt("return", this._musics[name] = _context6.sent);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function registerMusic(_x10, _x11) {
        return _registerMusic.apply(this, arguments);
      }

      return registerMusic;
    }()
  }, {
    key: "hasMusic",
    value: function hasMusic(name) {
      return typeof this._musics[name] !== 'undefined';
    }
  }, {
    key: "getMusic",
    value: function getMusic(name) {
      return this._musics[name];
    }
  }, {
    key: "isMuted",
    value: function isMuted() {
      return Jukebox._isMuted;
    }
  }, {
    key: "mute",
    value: function mute(muted) {
      _howler.Howler.mute(muted);

      if (Jukebox._isMuted !== muted) {
        Jukebox._isMuted = muted;

        Jukebox._eventEmitter.emit(muted ? 'mute' : 'unmute');
      }
    }
  }, {
    key: "isUnlocked",
    value: function isUnlocked() {
      return Jukebox._isAudioUnlocked;
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      Jukebox._eventEmitter.on(eventName, listener);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      Jukebox._eventEmitter.off(eventName, listener);
    }
  }, {
    key: "once",
    value: function once(eventName, listener) {
      Jukebox._eventEmitter.once(eventName, listener);
    }
  }, {
    key: "_init",
    value: function _init() {
      Jukebox._eventEmitter = new _events.EventEmitter();
      Jukebox._sounds = {};
      Jukebox._musics = {};
      Jukebox._isMuted = false;
      Jukebox._isAudioUnlocked = false;
      new _howler.Howl({
        src: audioResources.sounds.silence,
        autoplay: true,
        preload: true,
        onplay: function onplay() {
          Jukebox._isAudioUnlocked = true;

          Jukebox._eventEmitter.emit('unlock');
        }
      });
    }
  }]);

  return Jukebox;
}();

exports.Jukebox = exports["default"] = Jukebox;

Jukebox._init();

},{"./audio-resources":1,"events":32,"howler":33}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BotStrategyBase = /*#__PURE__*/function () {
  /**
   * Construct a new bot strategy.
   * @param lower {number} Lower bound for probe location.
   * @param upper {number} Upper bound for probe location.
   * @param treasureWidth {number} Width of the treasure to search for.
   *  If two adjacent probes are closer together than treasureWidth, the treasure must be located
   *  somewhere else.
   */
  function BotStrategyBase(lower, upper, treasureWidth) {
    _classCallCheck(this, BotStrategyBase);

    this.lower = lower;
    this.upper = upper;
    this.treasureWidth = treasureWidth;
  }
  /**
   * Compute the location in [this.lower,this.upper] to probe next. Overwrite in subclasses.
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */


  _createClass(BotStrategyBase, [{
    key: "getNextProbeLocation",
    value: function getNextProbeLocation(tangents, player, playerIndex, players) {
      return Math.max(this.lower, Math.min(player.x, this.upper));
    }
  }, {
    key: "clamp",
    value: function clamp(x) {
      return Math.max(this.lower, Math.min(x, this.upper));
    }
  }, {
    key: "getAdjacentTangentDistance",
    value: function getAdjacentTangentDistance(x, tangents) {
      var _this = this;

      console.assert(this.lower <= x && x <= this.upper, "x=".concat(x, " out of range [").concat(this.lower, ",").concat(this.upper, "]"));
      var positions = tangents.filter(function (t) {
        return _this.lower <= t.x && t.x < _this.upper;
      }).reduce(function (acc, cur) {
        return acc.add(cur.x);
      }, new Set()).add(this.lower).add(this.upper);
      var sortedPositions = Array.from(positions.values()).sort();
      var rightIndex = sortedPositions.findIndex(function (p) {
        return x <= p;
      });
      var left = sortedPositions[Math.max(0, rightIndex - 1)];
      var right = sortedPositions[rightIndex];
      console.log(sortedPositions, x, rightIndex);
      return right - left;
    }
  }, {
    key: "getOppositeTangentDistance",
    value: function getOppositeTangentDistance(tangentX, x, tangents, lowerValue, lowerSlope, upperValue, upperSlope) {
      console.assert(this.lower <= x && x <= this.upper, "x=".concat(x, " out of range [").concat(this.lower, ",").concat(this.upper, "]"));
      console.assert(this.lower <= tangentX && tangentX <= this.upper, "tangentX=".concat(tangentX, " out of range [").concat(this.lower, ",").concat(this.upper, "]"));
      var lowerTangent = {
        x: this.lower,
        value: lowerValue,
        slope: lowerSlope
      };
      var upperTangent = {
        x: this.upper,
        value: upperValue,
        slope: upperSlope
      };

      if (tangentX < x) {
        var rightIndex = tangents.map(function (t) {
          return t.x;
        }).findIndex(function (tx) {
          return x <= tx;
        });
        var right = rightIndex === -1 ? upperTangent : tangents[rightIndex];
        return right;
      } else {
        var tangentsRev = _toConsumableArray(tangents).reverse();

        var leftIndex = tangentsRev.map(function (t) {
          return t.x;
        }).findIndex(function (tx) {
          return tx <= x;
        });
        var left = leftIndex === -1 ? lowerTangent : tangentsRev[leftIndex];
        return left;
      }
    }
  }, {
    key: "buildTangentPairsInRange",
    value: function buildTangentPairsInRange(tangents, lowerValue, lowerSlope, upperValue, upperSlope) {
      var _this2 = this;

      // Filter out-of-range tangents
      tangents = tangents.filter(function (t) {
        return _this2.lower <= t.x && t.x <= _this2.upper;
      }); // Add sentinel tangents for left and right border

      tangents.unshift({
        x: this.lower,
        value: lowerValue,
        slope: lowerSlope
      });
      tangents.push({
        x: this.upper,
        value: upperValue,
        slope: upperSlope
      }); // Build list of pairs of adjacent tangents

      var tangentPairs = Array.from({
        length: tangents.length - 1
      }, function (_, i) {
        return {
          left: tangents[i],
          right: tangents[i + 1]
        };
      });
      return tangentPairs;
    }
  }, {
    key: "findLargestUnknownTerritory",
    value: function findLargestUnknownTerritory(tangents) {
      var _this3 = this;

      // Build list of pairs of adjacent tangents and remove pairs that are too close together
      var tangentPairs = this.buildTangentPairsInRange(tangents, 0, 0, 0, 0).filter(function (pair) {
        return pair.right.x - pair.left.x >= _this3.treasureWidth;
      });
      var largestUnknownTerritory = tangentPairs.reduce(function (acc, cur) {
        return cur.right.x - cur.left.x > acc.right.x - acc.left.x ? cur : acc;
      });
      return largestUnknownTerritory;
    }
  }]);

  return BotStrategyBase;
}();

exports["default"] = BotStrategyBase;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var INITIAL_ALPHA = 1.0 / Math.pow(2, 7);
var SIGMA = 0.5;
var RHO = 0.5;
var LOCAL_MIN_SLOPE = 0.2;
/**
 * This is a backtracking gradient descent strategy using the Armijo step size condition.
 */

var BotStrategyGradientDescent = /*#__PURE__*/function (_BotStrategyBase) {
  _inherits(BotStrategyGradientDescent, _BotStrategyBase);

  var _super = _createSuper(BotStrategyGradientDescent);

  function BotStrategyGradientDescent(lower, upper, treasureWidth) {
    var _this;

    _classCallCheck(this, BotStrategyGradientDescent);

    _this = _super.call(this, lower, upper, treasureWidth);
    _this.gda = null;
    _this.lastTarget = null;
    _this.locations = new Set();
    return _this;
  }
  /**
   * Return next probe location based on gradient descent.
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */


  _createClass(BotStrategyGradientDescent, [{
    key: "getNextProbeLocation",
    value: function getNextProbeLocation(tangents, player, playerIndex, players) {
      var _this2 = this;

      var x;

      if (this.lastTarget === null) {
        // There is no last target -> probe at the current location
        x = player.x;
      } else {
        // There is a last target
        var lastTargetTangent = tangents.find(function (t) {
          return t.x === _this2.lastTarget;
        }) || null;

        if (lastTargetTangent === null) {
          // The player didn't probe at the last target yet -> send the player there again
          x = this.lastTarget;
        } else {
          // There is a tangent for the last target -> continue from there
          try {
            // Try to do a local step
            x = this.getNextProbeLocationLocal(lastTargetTangent, tangents);
          } catch (e) {
            console.log('BotStrategyGradientDescent', e.message); // Local step failed -> do a global step

            x = this.getNextProbeLocationGlobal(tangents);
          }
        }
      }

      this.locations.add(x);
      this.lastTarget = x;
      return x;
    }
  }, {
    key: "getNextProbeLocationLocal",
    value: function getNextProbeLocationLocal(currentTangent, tangents) {
      console.log('BotStrategyGradientDescent', 'Local step with ', currentTangent);

      if (Math.abs(currentTangent.slope) < LOCAL_MIN_SLOPE) {
        throw new Error('Local minimum reached');
      }

      if (this.gda === null) {
        this.locations.add(currentTangent.x);
        this.gda = new GradientDescentArmijo();
      }

      var x;

      do {
        x = this.clamp(this.gda.step(currentTangent)); // TODO: Do not look for the adjacent tangents but for the last Armijo tangents and the
        // TODO: tangent on the opposite side of x
        // NOTE: This doesn't care about overshooting. Even though it could easily be prevented,
        // the regular gradient descent algorithm doesn't do it so we don't do it either

        var oppositeTangent = this.getOppositeTangentDistance(this.gda.lastArmijoTangent.x, x, tangents);
        var oppositeTangentDistance = Math.abs(this.gda.lastArmijoTangent.x - oppositeTangent.x);
        var localMinimumInBetween = this.gda.lastArmijoTangent.slope * oppositeTangent.slope < 0;
        var tooNarrow = oppositeTangentDistance < this.treasureWidth;
        console.log("oppositeTangentDistance", oppositeTangentDistance, "tooNarrow", tooNarrow);

        if (x === this.gda.lastArmijoTangent.x || localMinimumInBetween && tooNarrow) {
          // No useful progress possible -> do global search step
          throw new Error('No local progress possible');
        }
      } while (this.locations.has(x)); // don't probe the same position twice


      return x;
    }
  }, {
    key: "getNextProbeLocationGlobal",
    value: function getNextProbeLocationGlobal(tangents) {
      var _this3 = this;

      console.log('BotStrategyGradientDescent', 'Global step');

      try {
        // Try to find a tangent that we didn't use so far and that's above all currently known local maxima
        var bestLocalMaximum = tangents.filter(function (t) {
          return Math.abs(t.slope) < LOCAL_MIN_SLOPE;
        }).reduce(function (acc, cur) {
          return cur.value > acc.value ? cur : acc;
        }, 0);
        var unknownTangentsEqualGreaterLocalMaximum = tangents.filter(function (t) {
          return t.value >= bestLocalMaximum && !_this3.locations.has(t.x);
        });

        var bestTangentReducer = function bestTangentReducer(acc, cur) {
          return acc.value > cur.value ? acc : cur;
        }; // The following will throw an error if the array is empty -> continue with catch-clause.


        var bestTangent = unknownTangentsEqualGreaterLocalMaximum.reduce(bestTangentReducer); // We didn't probe at that location ourselves, but we can assume we did

        this.locations.add(bestTangent.x); // Start a local search from the new starting point

        this.gda = null;
        return this.getNextProbeLocationLocal(bestTangent);
      } catch (e) {
        // Jump to the mid point of the largest unknown territory
        this.gda = null;
        var largestUnknownTerritory = this.findLargestUnknownTerritory(tangents);
        return (largestUnknownTerritory.left.x + largestUnknownTerritory.right.x) / 2;
      }
    }
  }]);

  return BotStrategyGradientDescent;
}(_base["default"]);

exports["default"] = BotStrategyGradientDescent;

var GradientDescentArmijo = /*#__PURE__*/function () {
  function GradientDescentArmijo() {
    _classCallCheck(this, GradientDescentArmijo);

    this.lastArmijoTangent = null;
    this.alpha = INITIAL_ALPHA;
  }

  _createClass(GradientDescentArmijo, [{
    key: "step",
    value: function step(tangent) {
      if (!this.lastArmijoTangent) {
        this.lastArmijoTangent = tangent;
        this.alpha = INITIAL_ALPHA;
      }

      var armijo = tangent.value > this.lastArmijoTangent.value + this.alpha * SIGMA * Math.abs(this.lastArmijoTangent.slope);

      if (armijo) {
        this.lastArmijoTangent = tangent;
        this.alpha = INITIAL_ALPHA;
        return this.step(tangent);
      } else {
        var x = this.lastArmijoTangent.x + this.alpha * this.lastArmijoTangent.slope;
        console.log('alpha', this.alpha, 't', tangent, 'x', x);
        this.alpha *= RHO;
        return x;
      }
    }
  }]);

  return GradientDescentArmijo;
}();

},{"./base":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BotStrategyRandom = /*#__PURE__*/function (_BotStrategyBase) {
  _inherits(BotStrategyRandom, _BotStrategyBase);

  var _super = _createSuper(BotStrategyRandom);

  function BotStrategyRandom() {
    _classCallCheck(this, BotStrategyRandom);

    return _super.apply(this, arguments);
  }

  _createClass(BotStrategyRandom, [{
    key: "getNextProbeLocation",

    /**
     * Return a random next probe location.
     *
     * @param tangents {[{x:number,value:number,slope:number}]}
     * @param player
     * @param playerIndex {number}
     * @param players {[]}
     * @returns {number}
     */
    value: function getNextProbeLocation(tangents, player, playerIndex, players) {
      return this.lower + (this.upper - this.lower) * Math.random();
    }
  }]);

  return BotStrategyRandom;
}(_base["default"]);

exports["default"] = BotStrategyRandom;

},{"./base":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BotStrategyTangentIntersection = /*#__PURE__*/function (_BotStrategyBase) {
  _inherits(BotStrategyTangentIntersection, _BotStrategyBase);

  var _super = _createSuper(BotStrategyTangentIntersection);

  function BotStrategyTangentIntersection() {
    _classCallCheck(this, BotStrategyTangentIntersection);

    return _super.apply(this, arguments);
  }

  _createClass(BotStrategyTangentIntersection, [{
    key: "getNextProbeLocation",

    /**
     * TODO: Document
     *
     * @param tangents {[{x:number,value:number,slope:number}]}
     * @param player
     * @param playerIndex {number}
     * @param players {[]}
     * @returns {number}
     */
    value: function getNextProbeLocation(tangents, player, playerIndex, players) {
      var _this = this;

      // Build list of pairs of adjacent tangents and remove pairs that are too close together
      var tangentPairs = this.buildTangentPairsInRange(tangents, 0, 0.5, 0, -0.5).filter(function (pair) {
        return pair.right.x - pair.left.x >= _this.treasureWidth;
      }); // Compute a new weighted point for each pair of tangents

      var inBetweenPoints = tangentPairs.map(function (pair) {
        return computePointBetweenTangents(pair.left, pair.right, _this.treasureWidth / 2);
      }); // Choose the one with the highest weight

      var newX = inBetweenPoints.reduce(function (acc, cur) {
        return acc.weight > cur.weight ? acc : cur;
      }).x;
      return newX;
    }
  }]);

  return BotStrategyTangentIntersection;
}(_base["default"]);

exports["default"] = BotStrategyTangentIntersection;

function computePointBetweenTangents(left, right, margin) {
  var intersectionPoint = intersectTangents(left, right);
  var midPoint = {
    x: (left.x + right.x) / 2,
    y: (left.value + right.value) / 2
  };
  var leftAtCenter = {
    x: midPoint.x,
    y: left.value + left.slope * (right.x - left.x)
  };
  var rightAtCenter = {
    x: midPoint.x,
    y: right.value - right.slope * (right.x - left.x)
  };
  var all = [intersectionPoint, midPoint, leftAtCenter, rightAtCenter];
  var best = all.filter(function (p) {
    return p !== null;
  }).map(function (p) {
    return Object.assign(p, {
      weight: weighIntersection(left, right, p, margin)
    });
  }).reduce(function (acc, cur) {
    return acc.weight > cur.weight ? acc : cur;
  }); // Make sure the new x is far away from both ends

  var minX = left.x + margin;
  var maxX = right.x - margin;
  best.x = Math.max(minX, Math.min(best.x, maxX));
  return best;
}

function weighIntersection(left, right, intersection, margin) {
  if (left.value <= intersection.y && right.value <= intersection.y) {
    // high weight if intersection point probably improves upon its endpoints
    return 1 + intersection.y;
  } else {
    return intersection.y * (right.x - left.x - 2 * margin);
  }
}

function intersectTangents(left, right) {
  var pl = {
    x: left.x,
    y: left.value
  };
  var vl = {
    x: 1,
    y: left.slope
  };
  var pr = {
    x: right.x,
    y: right.value
  };
  var vr = {
    x: -1,
    y: -right.slope
  };
  var ll = {
    start: pl,
    end: add(pl, vl)
  };
  var lr = {
    start: pr,
    end: add(pr, vr)
  };
  var p = intersectLines(ll, lr);
  var inInterval = p !== null // the two lines intersect
  && left.x < p.x && p.x < right.x; // intersection point is in between the two endpoints

  return inInterval ? p : null;
}

function add(p, v) {
  return {
    x: p.x + v.x,
    y: p.y + v.y
  };
}

function intersectLines(l1, l2) {
  var d1x = l1.end.x - l1.start.x;
  var d1y = l1.end.y - l1.start.y;
  var d2x = l2.end.x - l2.start.x;
  var d2y = l2.end.y - l2.start.y;
  var denominator = d2y * d1x - d2x * d1y;

  if (denominator === 0) {
    return null;
  }

  var d12x = l1.start.x - l2.start.x;
  var d12y = l1.start.y - l2.start.y;
  var numerator = d2x * d12y - d2y * d12x;
  var t = numerator / denominator;
  return {
    x: l1.start.x + t * d1x,
    y: l1.start.y + t * d1y
  };
}

},{"./base":4}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Component that handles gamepad controls
 *
 */
var Controls = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to handle
   */
  function Controls(count) {
    _classCallCheck(this, Controls);

    this.states = Array(count).fill(null).map(function (_) {
      return {
        left: false,
        right: false,
        action: false,
        language: false
      };
    });
    this.statesModified = false;
  }
  /**
   * Builds a single on-screen controller
   *
   * @protected
   */


  _createClass(Controls, [{
    key: "modifyState",
    value: function modifyState(id, key, value) {
      if (this.states[id][key] !== value) {
        this.states[id][key] = value;
        this.statesModified = true;
      }
    }
    /**
     * Returns state of all controllers
     *
     * State is returned as an array with one object per controller
     * with properties indicating the state of each button.
     *
     * @return {[{
     *   left: Boolean,
     *   right: Boolean,
     *   action: Boolean,
     *   language: Boolean,
     * }]}
     */

  }, {
    key: "getStates",
    value: function getStates() {
      if (this.statesModified) {
        var result = this.states;
        this.states = this.states.map(function (s) {
          return Object.assign({}, s);
        }); // immutability: use cloned array for future changes

        this.statesModified = false;
        return result;
      } else {
        return this.states;
      }
    }
  }]);

  return Controls;
}();

exports["default"] = Controls;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controls = _interopRequireDefault(require("./controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component that handles gamepad controls
 *
 */
var GamepadControls = /*#__PURE__*/function (_Controls) {
  _inherits(GamepadControls, _Controls);

  var _super = _createSuper(GamepadControls);

  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  function GamepadControls(count) {
    _classCallCheck(this, GamepadControls);

    return _super.call(this, count);
  }

  _createClass(GamepadControls, [{
    key: "updateState",
    value: function updateState() {
      var _this = this;

      // clone the current state such state objects are immutable
      this.states = _toConsumableArray(this.states);
      Array.from(navigator.getGamepads()).filter(function (gp) {
        return gp !== null && gp.index < _this.states.length;
      }).forEach(function (gp) {
        var _gp$buttons$14$presse, _gp$buttons$, _gp$buttons$15$presse, _gp$buttons$2, _gp$buttons$1$pressed, _gp$buttons$3, _gp$buttons$2$pressed, _gp$buttons$4, _gp$buttons$8$pressed, _gp$buttons$5;

        _this.modifyState(gp.index, "left", gp.axes[0] < -0.5 || ((_gp$buttons$14$presse = (_gp$buttons$ = gp.buttons[14]) === null || _gp$buttons$ === void 0 ? void 0 : _gp$buttons$.pressed) !== null && _gp$buttons$14$presse !== void 0 ? _gp$buttons$14$presse : false));

        _this.modifyState(gp.index, "right", gp.axes[0] > 0.5 || ((_gp$buttons$15$presse = (_gp$buttons$2 = gp.buttons[15]) === null || _gp$buttons$2 === void 0 ? void 0 : _gp$buttons$2.pressed) !== null && _gp$buttons$15$presse !== void 0 ? _gp$buttons$15$presse : false));

        _this.modifyState(gp.index, "action", ((_gp$buttons$1$pressed = (_gp$buttons$3 = gp.buttons[1]) === null || _gp$buttons$3 === void 0 ? void 0 : _gp$buttons$3.pressed) !== null && _gp$buttons$1$pressed !== void 0 ? _gp$buttons$1$pressed : false) || ((_gp$buttons$2$pressed = (_gp$buttons$4 = gp.buttons[2]) === null || _gp$buttons$4 === void 0 ? void 0 : _gp$buttons$4.pressed) !== null && _gp$buttons$2$pressed !== void 0 ? _gp$buttons$2$pressed : false));

        _this.modifyState(gp.index, "language", (_gp$buttons$8$pressed = (_gp$buttons$5 = gp.buttons[8]) === null || _gp$buttons$5 === void 0 ? void 0 : _gp$buttons$5.pressed) !== null && _gp$buttons$8$pressed !== void 0 ? _gp$buttons$8$pressed : false);
      });
    }
    /**
     * Returns state of all controllers
     *
     * State is returned as an array with one object per controller
     * with properties indicating the state of each button.
     *
     * @return {[{
     *   left: Boolean,
     *   right: Boolean,
     *   action: Boolean,
     *   language: Boolean,
     * }]}
     */

  }, {
    key: "getStates",
    value: function getStates() {
      this.updateState();
      return _get(_getPrototypeOf(GamepadControls.prototype), "getStates", this).call(this);
    }
  }]);

  return GamepadControls;
}(_controls["default"]);

exports["default"] = GamepadControls;

},{"./controls":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controls = _interopRequireDefault(require("./controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var keyMap = {
  'ArrowLeft': {
    id: 0,
    prop: 'left'
  },
  'ArrowRight': {
    id: 0,
    prop: 'right'
  },
  'ArrowDown': {
    id: 0,
    prop: 'action'
  },
  'Space': {
    id: 0,
    prop: 'action'
  },
  'KeyL': {
    id: 0,
    prop: 'language'
  },
  'KeyA': {
    id: 1,
    prop: 'left'
  },
  'KeyD': {
    id: 1,
    prop: 'right'
  },
  'KeyS': {
    id: 1,
    prop: 'action'
  }
};
var keyCodes = Object.keys(keyMap);
/**
 * Certain default actions like scrolling should be prevented for the keys used for the game.
 */

function preventDefaultActionForKeys(e) {
  if (keyCodes.includes(e.code)) e.preventDefault();
}
/**
 * Component that handles keyboard controls
 *
 * Supports up to two players at the moment.
 *
 */


var KeyboardControls = /*#__PURE__*/function (_Controls) {
  _inherits(KeyboardControls, _Controls);

  var _super = _createSuper(KeyboardControls);

  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  function KeyboardControls(count) {
    var _this;

    _classCallCheck(this, KeyboardControls);

    _this = _super.call(this, count);

    var keyCallback = function keyCallback(ev) {
      var key = keyMap[ev.code];
      if (key && key.id < count) _this.modifyState(key.id, key.prop, ev.type === 'keydown');
    };

    window.addEventListener('keydown', keyCallback);
    window.addEventListener('keyup', keyCallback);
    window.addEventListener("keydown", preventDefaultActionForKeys, false);
    return _this;
  }

  return KeyboardControls;
}(_controls["default"]);

exports["default"] = KeyboardControls;

},{"./controls":8}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controls = _interopRequireDefault(require("./controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
 *
 */
var ScreenControls = /*#__PURE__*/function (_Controls) {
  _inherits(ScreenControls, _Controls);

  var _super = _createSuper(ScreenControls);

  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  function ScreenControls(count) {
    var _this;

    _classCallCheck(this, ScreenControls);

    _this = _super.call(this, count);
    _this.element = document.createElement('div');

    _this.element.classList.add('screen-controls');

    _this.element.classList.add("with-".concat(count, "-controls"));

    for (var i = 0; i < _this.states.length; ++i) {
      _this.element.appendChild(_this.buildControl(i));
    } // Global mouseup handling for all buttons


    _this.mousePressedButton = null;
    window.addEventListener('mouseup', function () {
      if (_this.mousePressedButton !== null) {
        _this.modifyState(_this.mousePressedButton.id, _this.mousePressedButton.name, false);

        _this.mousePressedButton.element.classList.remove('active');

        _this.mousePressedButton = null;
      }
    });
    return _this;
  }
  /**
   * Builds a single on-screen controller
   *
   * @private
   * @param {Number} id
   *  Zero-based integer index of the controller
   * @return {HTMLDivElement}
   */


  _createClass(ScreenControls, [{
    key: "buildControl",
    value: function buildControl(id) {
      var _this2 = this;

      var root = document.createElement('div');
      root.classList.add('screen-control', "screen-control-".concat(id));

      var newButton = function newButton(name) {
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add(name);

        var checkTouches = function checkTouches(ev) {
          if (ev.targetTouches.length > 0) {
            _this2.modifyState(id, name, true);

            button.classList.add('active');
          } else {
            _this2.modifyState(id, name, false);

            button.classList.remove('active');
          }

          ev.preventDefault();
        };

        button.addEventListener('touchstart', checkTouches, {
          passive: false
        });
        button.addEventListener('touchmove', checkTouches, {
          passive: false
        });
        button.addEventListener('touchend', checkTouches, {
          passive: false
        });
        button.addEventListener('touchcancel', checkTouches, {
          passive: false
        });
        button.addEventListener('mousedown', function () {
          _this2.modifyState(id, name, true);

          button.classList.add('active');
          _this2.mousePressedButton = {
            id: id,
            name: name,
            element: button
          };
        });
        return button;
      };

      root.appendChild(newButton('left'));
      root.appendChild(newButton('action'));
      root.appendChild(newButton('right'));
      return root;
    }
  }]);

  return ScreenControls;
}(_controls["default"]);

exports["default"] = ScreenControls;

},{"./controls":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FullScreenToggle = /*#__PURE__*/function () {
  function FullScreenToggle() {
    var _this = this;

    _classCallCheck(this, FullScreenToggle);

    this.fullScreenButton = document.createElement('div');
    this.fullScreenButton.classList.add('fullscreen-button');
    this.expandIcon = document.createElement('i');
    this.expandIcon.classList.add('fas', 'fa-sm', 'fa-expand');
    this.fullScreenButton.appendChild(this.expandIcon);
    this.compressIcon = document.createElement('i');
    this.compressIcon.classList.add('fas', 'fa-compress');
    this.fullScreenButton.appendChild(this.compressIcon);
    window.addEventListener('fullscreenchange', function () {
      return _this.fullScreenChangeHandler();
    });
    this.fullScreenChangeHandler();

    this.fullScreenButton.onpointerup = function () {
      return _this.toggleFullScreen();
    };

    this.element = this.fullScreenButton;
  }

  _createClass(FullScreenToggle, [{
    key: "fullScreenChangeHandler",
    value: function fullScreenChangeHandler() {
      this.expandIcon.style.display = document.fullscreenElement ? 'none' : 'block';
      this.compressIcon.style.display = !document.fullscreenElement ? 'none' : 'block';
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      if (document.fullscreenEnabled) {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()["catch"](function (err) {
            return console.log(err);
          });
        } else {
          document.exitFullscreen()["catch"](function (err) {
            return console.log(err);
          });
        }
      } else {
        console.log('Your browser cannot use fullscreen right now');
      }
    }
  }]);

  return FullScreenToggle;
}();

exports["default"] = FullScreenToggle;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameModeMenu = _interopRequireDefault(require("./game-mode-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BOT_TYPE_ORDER = ['none', 'random', 'gradient-descent', 'tangent-intersection'];

var BotTypeMode = /*#__PURE__*/function (_MenuMode) {
  _inherits(BotTypeMode, _MenuMode);

  var _super = _createSuper(BotTypeMode);

  function BotTypeMode() {
    _classCallCheck(this, BotTypeMode);

    return _super.apply(this, arguments);
  }

  _createClass(BotTypeMode, [{
    key: "getMenuTitleKeys",
    value: function getMenuTitleKeys() {
      return ['choose-bot-type', this.game.config.botTypeLabels];
    }
  }, {
    key: "getMenuItems",
    value: function getMenuItems() {
      var keysPrefix = ['bot-types', this.game.config.botTypeLabels];
      return BOT_TYPE_ORDER.map(function (key) {
        return [].concat(keysPrefix, [key]);
      });
    }
  }, {
    key: "getDefaultItemIndex",
    value: function getDefaultItemIndex() {
      var index = BOT_TYPE_ORDER.indexOf(this.game.botType);
      return index !== -1 ? index : 0;
    }
  }, {
    key: "processSelection",
    value: function processSelection(selectedIndex) {
      _get(_getPrototypeOf(BotTypeMode.prototype), "processSelection", this).call(this, selectedIndex);

      this.game.botType = BOT_TYPE_ORDER[selectedIndex];
    }
  }]);

  return BotTypeMode;
}(_gameModeMenu["default"]);

exports["default"] = BotTypeMode;

},{"./game-mode-menu":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameMode = _interopRequireDefault(require("./game-mode"));

var _i18n = require("./i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MenuMode = /*#__PURE__*/function (_GameMode) {
  _inherits(MenuMode, _GameMode);

  var _super = _createSuper(MenuMode);

  function MenuMode(game) {
    var _this;

    _classCallCheck(this, MenuMode);

    _this = _super.call(this, game);
    _this.sounds = {
      changeItem: game.jukebox.getSound('changeItem'),
      selectItem: game.jukebox.getSound('selectItem')
    };
    _this.music = game.jukebox.getMusic('menu');
    return _this;
  }

  _createClass(MenuMode, [{
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var $overlay, menuItemsSpecs, $menuTitle, $selector, i, menuItemSpec, $menuItem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.music.play();
                $overlay = $(this.game.overlay);
                menuItemsSpecs = this.getMenuItems();
                this.selectedIndex = this.getDefaultItemIndex();
                $menuTitle = $('<div class="text text-center menu-title" />').appendTo($overlay);

                _i18n.localeInit.apply(void 0, [$menuTitle].concat(_toConsumableArray(this.getMenuTitleKeys())));

                $selector = $('<div class="menu-selector" />').addClass("menu-selector-with-".concat(menuItemsSpecs.length)).appendTo($overlay);

                for (i = 0; i < menuItemsSpecs.length; ++i) {
                  menuItemSpec = menuItemsSpecs[i];
                  $menuItem = $('<div class="item" />').addClass("item-".concat(i)).toggleClass('selected', this.selectedIndex === i).appendTo($selector);

                  if (typeof menuItemSpec === 'string') {
                    $menuItem.text(menuItemSpec);
                  } else if (Array.isArray(menuItemSpec)) {
                    _i18n.localeInit.apply(void 0, [$menuItem].concat(_toConsumableArray(menuItemSpec)));
                  } else {
                    console.error("Menu item ".concat(i, " must be of type (string|string[])[]."));
                  }
                }

                this.$selectorItems = $selector.children();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleEnterMode() {
        return _handleEnterMode.apply(this, arguments);
      }

      return handleEnterMode;
    }()
  }, {
    key: "handleExitMode",
    value: function () {
      var _handleExitMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function handleExitMode() {
        return _handleExitMode.apply(this, arguments);
      }

      return handleExitMode;
    }()
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts) {
      var _this2 = this;

      var clampIndex = function clampIndex(i) {
        return Math.max(0, Math.min(i, _this2.$selectorItems.length - 1));
      };

      for (var i = 0; i < inputs.length; ++i) {
        var _ref = [inputs[i], lastInputs[i]],
            input = _ref[0],
            lastInput = _ref[1];

        if (input.direction !== 0 && input.direction * lastInput.direction <= 0) {
          this.$selectorItems.eq(this.selectedIndex).removeClass('selected');
          this.selectedIndex = clampIndex(this.selectedIndex + input.direction);
          this.$selectorItems.eq(this.selectedIndex).addClass('selected');
          this.sounds.changeItem.play();
        }

        if (input.action && !lastInput.action) {
          this.sounds.selectItem.play();
          this.processSelection(this.selectedIndex);
          this.triggerEvent('done');
          break;
        }
      }
    }
    /**
     * Get the menu title i18n key.
     *
     * Overwrite this method in a subclass to provide the menu title.
     * I will be called whenever this game mode is entered.
     *
     * @returns {string[]}
     */

  }, {
    key: "getMenuTitleKeys",
    value: function getMenuTitleKeys() {
      return ["menu"];
    }
    /**
     * Get the menu items.
     *
     * Overwrite this method in a subclass to provide the list of menu items.
     * I will be called whenever this game mode is entered to also reflect possible language changes.
     *
     *  @returns {(string|string[])[]} Either an array of strings to use as labels or and an array of arrays of strings
     *                                 that will be used as keys into the i18n database.
     */

  }, {
    key: "getMenuItems",
    value: function getMenuItems() {
      return ['One', 'Two'];
    }
    /**
     * Get the index of the default menu item. This can be used to preselect menu items in subclasses.
     *
     * @returns {number}
     */

  }, {
    key: "getDefaultItemIndex",
    value: function getDefaultItemIndex() {
      return 0;
    }
  }, {
    key: "processSelection",
    value: function processSelection(itemIndex) {}
  }]);

  return MenuMode;
}(_gameMode["default"]);

exports["default"] = MenuMode;

},{"./game-mode":18,"./i18n":20}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameModeMenu = _interopRequireDefault(require("./game-mode-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PlayerNumberMode = /*#__PURE__*/function (_MenuMode) {
  _inherits(PlayerNumberMode, _MenuMode);

  var _super = _createSuper(PlayerNumberMode);

  function PlayerNumberMode(game) {
    var _this;

    _classCallCheck(this, PlayerNumberMode);

    _this = _super.call(this, game);
    _this._menuItems = Array.from({
      length: _this.game.config.maxPlayers
    }, function (_, id) {
      return String(id + 1);
    });
    return _this;
  }

  _createClass(PlayerNumberMode, [{
    key: "getMenuTitleKeys",
    value: function getMenuTitleKeys() {
      return ['choose-num-players'];
    }
  }, {
    key: "getMenuItems",
    value: function getMenuItems() {
      return this._menuItems;
    }
  }, {
    key: "getDefaultItemIndex",
    value: function getDefaultItemIndex() {
      return this.game.numPlayers - 1;
    }
  }, {
    key: "processSelection",
    value: function processSelection(selectedIndex) {
      _get(_getPrototypeOf(PlayerNumberMode.prototype), "processSelection", this).call(this, selectedIndex);

      this.game.numPlayers = selectedIndex + 1;
    }
  }]);

  return PlayerNumberMode;
}(_gameModeMenu["default"]);

exports["default"] = PlayerNumberMode;

},{"./game-mode-menu":14}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

var _core = require("@popperjs/core");

var _gameMode = _interopRequireDefault(require("./game-mode"));

var _terrain = _interopRequireDefault(require("./terrain"));

var waves = _interopRequireWildcard(require("./waves"));

var _base = _interopRequireDefault(require("./bot-strategies/base"));

var _random = _interopRequireDefault(require("./bot-strategies/random"));

var _tangentIntersection = _interopRequireDefault(require("./bot-strategies/tangent-intersection"));

var _gradientDescent = _interopRequireDefault(require("./bot-strategies/gradient-descent"));

var _i18n = require("./i18n");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WATER_HEIGHT_SCALE = 10;
var NUM_WATER_POINTS = 300;
var WATER_FPS = 5;
var WATER_DISTANCE = 260;
var WATER_LOOP_DURATION = 20 * 1000;
var BOAT_DRAFT = 18;
var TERRAIN_HEIGHT_SCALE = 300;
var NUM_TERRAIN_POINTS = 300;
var MAX_TERRAIN_EXTREMA = 20;
var TERRAIN_MARGIN_WIDTH = 0.1;
var TERRAIN_DISTANCE = 300; // How far should the boat move on user input per ms

var SPEED_FACTOR = 0.2 / 1000.0;
var PROBE_SIZE = 10;
var PROBE_DISTANCE_AT_REST = 0.3;
var PROBE_MIN_DURATION = 500;
var PROBE_DELAY = 500;
var TANGENT_LENGTH = 0.02;
var TANGENT_MIN_OPACITY = 0.25;
var TANGENT_OPACITY_FADEOUT_FACTOR = 0.9;
var TANGENT_OPACITY_FADEOUT_DURATION = 500;
var TREASURE_SIZE = 0.03;
var START_SEQUENCE_FST_DELAY = 500;
var START_SEQUENCE_AFTER_FST_DELAY = 2000;
var START_SEQUENCE_AFTER_SND_DELAY = 1000;
var UNCOVER_DURATION = 2000;
var ENDING_SEQUENCE_FST_DELAY = 0;
var ENDING_SEQUENCE_SND_DELAY = 1000;
var ENDING_SEQUENCE_RESTART_DELAY = 1000;

var PlayMode = /*#__PURE__*/function (_GameMode) {
  _inherits(PlayMode, _GameMode);

  var _super = _createSuper(PlayMode);

  function PlayMode(game) {
    var _this;

    _classCallCheck(this, PlayMode);

    _this = _super.call(this, game);
    var wavesPoints = Array(NUM_WATER_POINTS).fill(null);

    _this.wavesPoints = function (t) {
      return waves.points(wavesPoints, t, game.draw.width(), WATER_HEIGHT_SCALE);
    };

    _this.bot = null;
    _this.sounds = {
      clockTick: _this.game.jukebox.getSound('clockTick'),
      boatMove: _this.game.jukebox.getSound('boatMove'),
      probeDown: _this.game.jukebox.getSound('probeDown'),
      probeUp: _this.game.jukebox.getSound('probeUp'),
      probeHit: _this.game.jukebox.getSound('probeHit'),
      probeMiss: _this.game.jukebox.getSound('probeMiss'),
      revealSeaFloor: _this.game.jukebox.getSound('revealSeaFloor'),
      treasureOpen: _this.game.jukebox.getSound('treasureOpen'),
      gameOverWin: _this.game.jukebox.getSound('gameOverWin'),
      gameOverLose: _this.game.jukebox.getSound('gameOverLose'),
      restart: _this.game.jukebox.getSound('selectItem')
    };
    _this.music = _this.game.jukebox.getMusic('play');
    return _this;
  }

  _createClass(PlayMode, [{
    key: "preLoadAssets",
    value: function () {
      var _preLoadAssets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.game.loadSVGSymbol('assets/img/ship.svg');

              case 2:
                this.shipSymbol = _context.sent;
                this.shipSymbol.attr({
                  overflow: 'visible'
                });
                _context.next = 6;
                return this.game.loadSVGSymbol('assets/img/treasure-closed.svg');

              case 6:
                this.treasureClosedSymbol = _context.sent;
                this.treasureClosedSymbol.attr({
                  overflow: 'visible'
                });
                _context.next = 10;
                return this.game.loadSVGSymbol('assets/img/treasure-opened.svg');

              case 10:
                this.treasureOpenedSymbol = _context.sent;
                this.treasureOpenedSymbol.attr({
                  overflow: 'visible'
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preLoadAssets() {
        return _preLoadAssets.apply(this, arguments);
      }

      return preLoadAssets;
    }()
  }, {
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var _this$game, draw, config, numPlayers, botType, $gameStats, $remainingTimeContainer, $remainingProbesContainer, modeGroup, padRemainingProbes, createPlayer, addBot, botStrategyClass, botStrategy, bot, nextTarget, newTerrainHeights, terrainHeights, terrainPoints, behindGroundGroup, treasure, groundCover;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.music.play();
                _this$game = this.game, draw = _this$game.draw, config = _this$game.config, numPlayers = _this$game.numPlayers, botType = _this$game.botType;
                this.isGameOver = false;
                this.discardInputs = false;
                this.remainingTime = config.maxTime * 1000;
                this.tangents = [];
                this.$overlay = $('<div class="play" />').appendTo(this.game.overlay);
                $gameStats = $('<div class="game-stats"/>').appendTo(this.$overlay);
                $remainingTimeContainer = $('<div class="remaining-time"/>').appendTo($gameStats);
                (0, _i18n.localeInit)($('<span>').appendTo($remainingTimeContainer), 'remaining-time');
                if (config.maxTime === Number.POSITIVE_INFINITY) $remainingTimeContainer.hide();
                $remainingProbesContainer = $('<div class="remaining-probes"/>').appendTo($gameStats);
                (0, _i18n.localeInit)($('<span>').appendTo($remainingProbesContainer), 'remaining-probes');
                this.$remainingTime = $('<span class="counter"/>').appendTo($remainingTimeContainer);
                this.$remainingProbes = $('<span />').appendTo($remainingProbesContainer);
                if (config.maxProbes === Number.POSITIVE_INFINITY) $remainingProbesContainer.hide();
                this.$endingSequenceContainer = $('<div />').appendTo(this.$overlay);
                modeGroup = draw.group().addClass('play').addClass('draw').translate(0, WATER_DISTANCE);

                padRemainingProbes = function padRemainingProbes(num) {
                  return pad(num, String(_this2.game.config.maxProbes).length, ' ');
                };

                createPlayer = function createPlayer(playerIndex, numPlayers, cssClass) {
                  var x = (playerIndex + 1) / (numPlayers + 1);
                  var group = modeGroup.group();
                  group.addClass(cssClass).transform({
                    translateX: x * draw.width()
                  });
                  var boat = group.use(_this2.shipSymbol).center(0, BOAT_DRAFT);
                  var probeParent = group.group();
                  var probe = probeParent.group();
                  var probeY = TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST;
                  var probeRope = probe.line(0, BOAT_DRAFT, 0, probeY - PROBE_SIZE / 2);
                  var probeCircle = probe.circle(PROBE_SIZE).center(0, probeY);

                  var doProbe = function doProbe(terrainHeight) {
                    var _this3 = this;

                    this.probing = true;
                    this.remainingProbes = Math.max(0, this.remainingProbes - 1);
                    this.$remainingProbes.text(padRemainingProbes(this.remainingProbes));
                    if (this.remainingProbes === 0) this.$remainingProbes.addClass("blinking");
                    var probeHeight = TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * terrainHeight;
                    var probeDuration = probeHeight * (PROBE_MIN_DURATION / TERRAIN_DISTANCE);
                    var probeDown = probeCircle.animate(probeDuration, 0, 'now').cy(probeHeight);
                    var probeRopeDown = probeRope.animate(probeDuration, 0, 'now').plot(0, BOAT_DRAFT, 0, probeHeight - PROBE_SIZE / 2);
                    var yUp = this.remainingProbes > 0 ? TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST : BOAT_DRAFT + PROBE_SIZE;
                    var probeUp = probeDown.animate(probeDuration, PROBE_DELAY).cy(yUp).after(function () {
                      return _this3.probing = false;
                    });
                    var probeRopeUp = probeRopeDown.animate(probeDuration, PROBE_DELAY).plot(0, BOAT_DRAFT, 0, yUp - PROBE_SIZE / 2);
                    return {
                      down: new Promise(function (resolve) {
                        return probeDown.after(resolve);
                      }),
                      up: new Promise(function (resolve) {
                        return probeUp.after(resolve);
                      })
                    };
                  }; // Add an element for displaying the number of remaining probes


                  var $remainingProbes = $("<span class=\"counter ".concat(cssClass, "\">").concat(config.maxProbes, "</span>")).appendTo(_this2.$remainingProbes); // Move boat in front of the probe

                  boat.front();
                  return {
                    id: playerIndex,
                    cssClass: cssClass,
                    group: group,
                    boat: boat,
                    probe: probe,
                    doProbe: doProbe,
                    x: x,
                    lastX: x,
                    flipX: false,
                    _probing: false,
                    _probeEventEmitter: new _events["default"](),

                    set probing(p) {
                      var probeTurnedOff = this._probing && !p;
                      this._probing = p;
                      if (probeTurnedOff) this._probeEventEmitter.emit("probe-off");
                    },

                    get probing() {
                      return this._probing;
                    },

                    probingDone: function () {
                      var _probingDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        var _this4 = this;

                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                if (this.probing) {
                                  _context2.next = 2;
                                  break;
                                }

                                return _context2.abrupt("return");

                              case 2:
                                _context2.next = 4;
                                return new Promise(function (resolve) {
                                  return _this4._probeEventEmitter.addListener("probe-off", resolve);
                                });

                              case 4:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2, this);
                      }));

                      function probingDone() {
                        return _probingDone.apply(this, arguments);
                      }

                      return probingDone;
                    }(),
                    remainingProbes: config.maxProbes,
                    $remainingProbes: $remainingProbes
                  };
                }; // Create a boat for each player


                addBot = botType && botType !== 'none';
                this.players = Array(numPlayers).fill(null).map(function (_, playerIndex) {
                  return createPlayer(playerIndex, numPlayers + (addBot ? 1 : 0), "player-".concat(playerIndex));
                });

                if (addBot) {
                  botStrategyClass = function () {
                    switch (botType) {
                      case 'random':
                        return _random["default"];

                      case 'newton':
                        return BotStrategyNewton;

                      case 'gradient-descent':
                        return _gradientDescent["default"];

                      case 'tangent-intersection':
                        return _tangentIntersection["default"];

                      default:
                        return _base["default"];
                    }
                  }();

                  botStrategy = new botStrategyClass(TERRAIN_MARGIN_WIDTH, 1 - TERRAIN_MARGIN_WIDTH, TREASURE_SIZE);
                  bot = {};
                  bot.type = botType;
                  bot.player = createPlayer(numPlayers, numPlayers + 1, 'player-bot');

                  nextTarget = function nextTarget() {
                    return botStrategy.getNextProbeLocation(_this2.tangents, bot.player, bot.player.id, _this2.players);
                  };

                  bot.targetX = nextTarget();

                  bot.tangentListener = function () {
                    return bot.targetX = nextTarget();
                  };

                  this.players.push(bot.player);
                  this.events.addListener('new-tangent', bot.tangentListener);
                  this.bot = bot;
                } else {
                  this.bot = null;
                }

                this.water = modeGroup.group().attr('id', 'water').addClass('water');
                waves.animatedSVGPolyline(this.water, NUM_WATER_POINTS, WATER_LOOP_DURATION / 1000 * WATER_FPS, game.draw.width(), WATER_HEIGHT_SCALE, WATER_LOOP_DURATION);
                this.groundGroup = modeGroup.group();

                newTerrainHeights = function newTerrainHeights() {
                  var terrainOptions = {
                    marginWidth: TERRAIN_MARGIN_WIDTH,
                    tilt: game.config.maxDepthTilt
                  };
                  return (0, _terrain["default"])(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
                };

                terrainHeights = game.map ? game.map : newTerrainHeights();
                terrainPoints = terrainHeights.map(function (h, i) {
                  return [draw.width() * (i / (terrainHeights.length - 1)), TERRAIN_HEIGHT_SCALE * h];
                }).concat([[2 * draw.width(), 0], [2 * draw.width(), draw.height()], [-draw.width(), draw.height()], [-draw.width(), 0]]);
                this.terrainHeights = terrainHeights;
                this.treasureLocation = this.locateTreasure();
                console.log("Map:", terrainHeights);
                console.log("Treasure location:", this.treasureLocation);
                behindGroundGroup = this.groundGroup.group();
                treasure = behindGroundGroup.group().addClass('treasure').transform({
                  translateX: this.treasureLocation.x * draw.width(),
                  translateY: TERRAIN_DISTANCE + this.treasureLocation.y * TERRAIN_HEIGHT_SCALE
                });
                this.treasureClosed = treasure.use(this.treasureClosedSymbol);
                this.treasureOpened = treasure.use(this.treasureOpenedSymbol).hide();
                this.ground = this.groundGroup.polygon(terrainPoints).fill('black').addClass('ground').translate(0, TERRAIN_DISTANCE);
                groundCover = this.groundGroup.group();
                this.groundCoverLeft = groundCover.rect(draw.width(), draw.height()).addClass('ground-cover').move(Math.ceil(draw.width() * (this.treasureLocation.x - 1)), -TERRAIN_HEIGHT_SCALE / 2);
                this.groundCoverRight = groundCover.rect(draw.width(), draw.height()).addClass('ground-cover').move(Math.floor(draw.width() * this.treasureLocation.x), -TERRAIN_HEIGHT_SCALE / 2);
                if (config.showSeaFloor) groundCover.hide();
                this.groundGroup.back();
                this.tangentGroup = modeGroup.group().translate(0, TERRAIN_DISTANCE);
                this.discardInputs = true;
                this.showGameStartSequence((0, _i18n.localeInit)($('<span>'), 'objective'), (0, _i18n.localeInit)($('<span>'), 'go'), function () {
                  return _this2.discardInputs = false;
                });

              case 46:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleEnterMode() {
        return _handleEnterMode.apply(this, arguments);
      }

      return handleEnterMode;
    }()
  }, {
    key: "handleExitMode",
    value: function () {
      var _handleExitMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Cleanup timers, etc. created on handleEnterMode
                if (this.bot !== null) this.events.removeListener('new-tangent', this.bot.tangentListener);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleExitMode() {
        return _handleExitMode.apply(this, arguments);
      }

      return handleExitMode;
    }()
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts) {
      var _this5 = this;

      // Move the boats or check if they're lowering the probe
      var _this$game2 = this.game,
          draw = _this$game2.draw,
          config = _this$game2.config,
          numPlayers = _this$game2.numPlayers; // Some game states do not allow user input

      if (this.discardInputs) return; // Leave game mode when the game is over and a player pressed the action button

      if (this.isGameOver) {
        var action = inputs.findIndex(function (input, i) {
          return actionPressed(input, lastInputs[i]);
        }) !== -1;

        if (this.isGameOver && action) {
          this.sounds.restart.play();
          this.discardInputs = true;
          this.triggerEvent('done');
        }

        return;
      } // Update remaining time


      var newRemainingTime = Math.max(0, this.remainingTime - delta);

      if (this.remainingTime !== newRemainingTime) {
        this.remainingTime = newRemainingTime;
        if (Math.ceil(this.remainingTime / 1000.0) !== Math.ceil(newRemainingTime / 1000.0)) this.sounds.clockTick.play();
      } // Check whether the game is lost


      if (this.remainingTime === 0) {
        console.log("Time is up - GAME OVER!");
        this.gameOver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", _this5.showLoseSequenceTimeIsUp());

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        })));
        return;
      } else if (this.players.reduce(function (a, c) {
        return a + c.remainingProbes;
      }, 0) === 0) {
        var anyoneProbing = this.players.reduce(function (a, c) {
          return a || c.probing;
        }, false);

        if (!anyoneProbing) {
          console.log("No probes left - GAME OVER!");
          this.gameOver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt("return", _this5.showLoseSequenceNoProbesLeft());

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          })));
          return;
        }
      } // Discard inputs that don't belong to an active player


      inputs = inputs.slice(0, numPlayers);
      lastInputs = lastInputs.slice(0, numPlayers); // If there is a bot, create fake inputs for it

      if (this.bot !== null) {
        var _PlayMode$buildBotInp = PlayMode.buildBotInput(this.bot),
            input = _PlayMode$buildBotInp.input,
            lastInput = _PlayMode$buildBotInp.lastInput;

        inputs.push(input);
        lastInputs.push(lastInput);
      } // Regular move & probe logic


      inputs.forEach(function (input, playerIndex) {
        var lastInput = lastInputs[playerIndex];
        var action = actionPressed(input, lastInput);
        var player = _this5.players[playerIndex];

        if (!player.probing && !_this5.isGameOver) {
          player.lastX = player.x;
          player.x += SPEED_FACTOR * (delta * input.direction);
          player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x), 1.0 - TERRAIN_MARGIN_WIDTH); // TODO: Limit bot position to bot.targetX

          player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;

          if (action && player.remainingProbes > 0) {
            // Switch to probe mode
            // Lower the probe, wait and raise it again
            var terrainHeight = _this5.terrainHeight(player.x);

            var _player$doProbe = player.doProbe(terrainHeight),
                down = _player$doProbe.down,
                up = _player$doProbe.up;

            down.then(function () {
              return _this5.addTangent(player);
            });
            var treasureFound = Math.abs(player.x - _this5.treasureLocation.x) <= TREASURE_SIZE / 2;
            down.then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!(treasureFound && !_this5.isGameOver)) {
                        _context8.next = 4;
                        break;
                      }

                      console.log("Treasure found - GAME OVER!");
                      _context8.next = 4;
                      return _this5.gameOver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                return _context7.abrupt("return", _this5.showWinSequence(player));

                              case 1:
                              case "end":
                                return _context7.stop();
                            }
                          }
                        }, _callee7);
                      })));

                    case 4:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            })));

            var probeDownSoundPlaying = _this5.sounds.probeDown.play();

            down.then(function () {
              probeDownSoundPlaying.stop();

              if (treasureFound) {
                _this5.sounds.probeHit.play();
              } else {
                _this5.sounds.probeMiss.play();
              }

              var probeUpSoundPlaying = _this5.sounds.probeUp.play();

              up.then(function () {
                return probeUpSoundPlaying.stop();
              });
            });
            console.log("Player ".concat(playerIndex, " is probing at:"), {
              x: player.x,
              y: terrainHeight
            });
          }
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(delta, ts) {
      var _this6 = this;

      var _this$game3 = this.game,
          draw = _this$game3.draw,
          numPlayers = _this$game3.numPlayers; // Move boats
      // Draw bottom
      // etc...

      var padRemainingTime = function padRemainingTime(num) {
        return pad(num, String(_this6.game.config.maxTime).length, ' ');
      };

      var remainingTimeText = padRemainingTime(Math.ceil(this.remainingTime / 1000.0));

      if (remainingTimeText !== this.$remainingTime.text()) {
        this.$remainingTime.text(remainingTimeText);
      }

      if (this.remainingTime === 0) this.$remainingTime.addClass("blinking"); // The water animation uses SVG animations (via SMIL), so we have to use it's timestamp for
      // animating the boat's rotation and vertical position.

      var waterTs = draw.node.getCurrentTime() * 1000;
      this.players.forEach(function (player, playerIndex) {
        var x = player.x;
        var y = WATER_HEIGHT_SCALE * waves.height(x, waterTs / WATER_LOOP_DURATION);
        var slope = WATER_HEIGHT_SCALE * waves.slope(x, waterTs / WATER_LOOP_DURATION);
        var angle = 0.25 * 180 * Math.atan2(slope, draw.width()) / Math.PI; // Animating by setting CSS attributes seems to be more efficient than setting SVG attributes

        player.boat.node.style.transform = "rotate(".concat(angle, "deg) scale(").concat(player.flipX ? -1 : 1, ",1)");
        player.group.node.style.transform = "translate(".concat(x * draw.width(), "px,").concat(y, "px)");
      });
    }
  }, {
    key: "terrainHeight",
    value: function terrainHeight(x) {
      return this.terrainHeightExt(x).value;
    }
  }, {
    key: "terrainHeightExt",
    value: function terrainHeightExt(x) {
      var xInArray = (this.terrainHeights.length - 1) * x;
      var tmpIndex = Math.floor(xInArray);
      var i0 = tmpIndex === this.terrainHeights.length - 1 ? tmpIndex - 1 : tmpIndex;
      var i1 = i0 + 1;
      var h0 = this.terrainHeights[i0];
      var h1 = this.terrainHeights[i1];
      var t = xInArray - i0;
      return {
        x: x,
        value: h0 + t * (h1 - h0),
        slope: (h1 - h0) * (this.terrainHeights.length - 1)
      };
    }
  }, {
    key: "locateTreasure",
    value: function locateTreasure() {
      var argmax = function argmax(array) {
        return [].reduce.call(array, function (m, c, i, arr) {
          return c > arr[m] ? i : m;
        }, 0);
      };

      var margin = Math.floor(this.terrainHeights.length * TERRAIN_MARGIN_WIDTH) + 1;
      var terrainHeightNoMargin = this.terrainHeights.slice(margin, this.terrainHeights.length - margin);
      var treasureIndex = margin + argmax(terrainHeightNoMargin);
      return {
        x: treasureIndex / (this.terrainHeights.length - 1),
        y: this.terrainHeights[treasureIndex]
      };
    }
  }, {
    key: "addTangent",
    value: function addTangent(player) {
      // Reduce the opacity of previously added tangents of this player
      var offsetMult = function offsetMult(v, factor, offset) {
        return offset + (v - offset) * factor;
      };

      this.tangentGroup.find(player.cssClass).each(function () {
        var o = offsetMult(this.opacity(), TANGENT_OPACITY_FADEOUT_FACTOR, TANGENT_MIN_OPACITY);
        this.animate(TANGENT_OPACITY_FADEOUT_DURATION).opacity(o);
      }); // Add the new tangent

      var draw = this.game.draw;
      var width = draw.width();
      var tangent = this.terrainHeightExt(player.x);
      var x = tangent.x,
          value = tangent.value,
          slope = tangent.slope;
      var angle = 180 * Math.atan2(slope * TERRAIN_HEIGHT_SCALE, width) / Math.PI;
      this.tangentGroup.line(-width * TANGENT_LENGTH / 2, 0, width * TANGENT_LENGTH / 2, 0).addClass(player.cssClass).transform({
        translateX: width * x,
        translateY: TERRAIN_HEIGHT_SCALE * value,
        rotate: angle
      });
      this.tangents.push(tangent);
      this.tangents.sort(function (a, b) {
        return a.x - b.x;
      });
      this.events.emit('new-tangent', tangent, this.tangents.indexOf(tangent), this.tangents);
    }
  }, {
    key: "gameOver",
    value: function () {
      var _gameOver = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(endingSequenceCallback) {
        var uncoverGroundPromise;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                // The game is now over, so a player that lowered the probe later can not win anymore.
                this.isGameOver = true; // Disable all inputs until the ending sequence is over.

                this.discardInputs = true;
                uncoverGroundPromise = this.uncoverGround();
                _context9.next = 5;
                return Promise.all(this.players.map(function (p) {
                  return p.probingDone();
                }));

              case 5:
                _context9.next = 7;
                return endingSequenceCallback();

              case 7:
                this.discardInputs = false;
                _context9.next = 10;
                return uncoverGroundPromise;

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function gameOver(_x) {
        return _gameOver.apply(this, arguments);
      }

      return gameOver;
    }()
  }, {
    key: "uncoverGround",
    value: function () {
      var _uncoverGround = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var duration,
            playingSound,
            draw,
            circularEaseIn,
            animateDx,
            animateDxPromise,
            animatePromise,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                duration = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : UNCOVER_DURATION;
                playingSound = this.sounds.revealSeaFloor.play();
                draw = this.game.draw;

                if (!(duration === 0)) {
                  _context10.next = 8;
                  break;
                }

                // uncover immediately
                this.groundCoverLeft.dx(-draw.width());
                this.groundCoverRight.dx(draw.width());
                _context10.next = 14;
                break;

              case 8:
                // uncover using an animation
                // (using an animation with duration 0 still takes > 0s for unknown reasons)
                circularEaseIn = function circularEaseIn(pos) {
                  return -(Math.sqrt(1 - pos * pos) - 1);
                };

                animateDx = function animateDx(e, dx) {
                  return e.animate(duration).dx(dx);
                };

                animateDxPromise = function animateDxPromise(e, dx) {
                  return new Promise(function (resolve) {
                    return animateDx(e, dx).after(resolve);
                  });
                };

                animatePromise = Promise.all([animateDxPromise(this.groundCoverLeft, -draw.width()), animateDxPromise(this.groundCoverRight, draw.width())]);
                animatePromise["finally"](function () {
                  return playingSound.stop();
                });
                return _context10.abrupt("return", animatePromise);

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function uncoverGround() {
        return _uncoverGround.apply(this, arguments);
      }

      return uncoverGround;
    }()
  }, {
    key: "showGameStartSequence",
    value: function () {
      var _showGameStartSequence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(firstMessageElem, secondMessageElem) {
        var secondMessageCallback,
            cssClasses,
            draw,
            delay,
            $firstMessageDiv,
            $secondMessageDiv,
            $startSequenceDiv,
            top,
            $announcementAnchor,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                secondMessageCallback = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : Function.prototype;
                cssClasses = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : [];
                draw = this.game.draw;

                delay = function delay(ms) {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                  });
                };

                $firstMessageDiv = $('<div class="line">').append(firstMessageElem);
                $secondMessageDiv = $('<div class="line">').append(secondMessageElem).css('visibility', 'hidden');
                $startSequenceDiv = $('<div class="announcement-sequences-text" />').addClass(cssClasses).append([$firstMessageDiv, $('<br>'), $secondMessageDiv]);
                top = 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
                $announcementAnchor = $('<div class="announcement-sequences-text-anchor" />').css({
                  left: "50%",
                  top: "".concat(top, "%"),
                  width: "0px",
                  height: "0px"
                });
                _context11.next = 11;
                return delay(START_SEQUENCE_FST_DELAY);

              case 11:
                this.$endingSequenceContainer.empty().append([$announcementAnchor, $startSequenceDiv]); // popper.js places the ending sequence text in a popup-like fashion above the announcement
                // anchor and makes sure that is does not move off the screen if the anchor is to close to a
                // screen edge.

                createAutoUpdatingPopper($announcementAnchor.get(0), $startSequenceDiv.get(0), {
                  placement: 'top'
                });
                _context11.next = 15;
                return delay(START_SEQUENCE_AFTER_FST_DELAY);

              case 15:
                $secondMessageDiv.css("visibility", "visible");
                secondMessageCallback();
                _context11.next = 19;
                return delay(START_SEQUENCE_AFTER_SND_DELAY);

              case 19:
                this.$endingSequenceContainer.empty();

              case 20:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function showGameStartSequence(_x2, _x3) {
        return _showGameStartSequence.apply(this, arguments);
      }

      return showGameStartSequence;
    }()
  }, {
    key: "showWinSequence",
    value: function () {
      var _showWinSequence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(winner) {
        var _this7 = this;

        var $winAnnouncement, randomIdx, $treasure, openTreaureChest;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                $winAnnouncement = $('<span>').append((0, _i18n.localeInit)($('<span>'), 'win-announcement-begin'), $('<span>').text(winner.id + 1), (0, _i18n.localeInit)($('<span>'), 'win-announcement-end'));

                randomIdx = function randomIdx(arr) {
                  return Math.floor(Math.random() * (arr.length - 1));
                };

                $treasure = (0, _i18n.localeInit)($('<span>'), 'treasures', randomIdx(IMAGINARY.i18n.t('treasures')));

                openTreaureChest = function openTreaureChest() {
                  _this7.treasureOpened.show();

                  _this7.treasureClosed.hide();

                  _this7.sounds.treasureOpen.play();
                };

                _context12.next = 6;
                return this.showGameOverSequence($winAnnouncement, function () {
                  return _this7.sounds.gameOverWin.play();
                }, $treasure, openTreaureChest, [winner.cssClass]);

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function showWinSequence(_x4) {
        return _showWinSequence.apply(this, arguments);
      }

      return showWinSequence;
    }()
  }, {
    key: "showLoseSequenceTimeIsUp",
    value: function () {
      var _showLoseSequenceTimeIsUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _this8 = this;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.showGameOverSequence((0, _i18n.localeInit)($('<span>'), 'time-is-up'), function () {
                  return _this8.sounds.gameOverLose.play();
                }, (0, _i18n.localeInit)($('<span>'), 'game-over'));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function showLoseSequenceTimeIsUp() {
        return _showLoseSequenceTimeIsUp.apply(this, arguments);
      }

      return showLoseSequenceTimeIsUp;
    }()
  }, {
    key: "showLoseSequenceNoProbesLeft",
    value: function () {
      var _showLoseSequenceNoProbesLeft = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var _this9 = this;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.showGameOverSequence((0, _i18n.localeInit)($('<span>'), 'no-probes-left'), function () {
                  return _this9.sounds.gameOverLose.play();
                }, (0, _i18n.localeInit)($('<span>'), 'game-over'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function showLoseSequenceNoProbesLeft() {
        return _showLoseSequenceNoProbesLeft.apply(this, arguments);
      }

      return showLoseSequenceNoProbesLeft;
    }()
  }, {
    key: "showGameOverSequence",
    value: function () {
      var _showGameOverSequence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(firstMessageElem, firstMessageCallback, secondMessageElem) {
        var secondMessageCallback,
            cssClasses,
            draw,
            delay,
            $firstMessageDiv,
            $secondMessageDiv,
            $restartDiv,
            $endingSequenceDiv,
            left,
            top,
            $announcementAnchor,
            _args15 = arguments;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                secondMessageCallback = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : Function.prototype;
                cssClasses = _args15.length > 4 && _args15[4] !== undefined ? _args15[4] : [];
                draw = this.game.draw;

                delay = function delay(ms) {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                  });
                };

                $firstMessageDiv = $('<div class="line">').append(firstMessageElem);
                $secondMessageDiv = $('<div class="line">').append(secondMessageElem).css('visibility', 'hidden');
                $restartDiv = $('<div class="blinking">').css('visibility', 'hidden');
                (0, _i18n.localeInit)($restartDiv, 'press-to-restart');
                $endingSequenceDiv = $('<div class="announcement-sequences-text" />').addClass(cssClasses).append([$firstMessageDiv, $secondMessageDiv, $('<br>'), $restartDiv]);
                left = 100 * this.treasureLocation.x;
                top = 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
                $announcementAnchor = $('<div class="announcement-sequences-text-anchor" />').css({
                  left: "".concat(left, "%"),
                  top: "".concat(top, "%"),
                  width: "0px",
                  height: "0px"
                });
                _context15.next = 14;
                return delay(ENDING_SEQUENCE_FST_DELAY);

              case 14:
                this.$endingSequenceContainer.empty().append([$announcementAnchor, $endingSequenceDiv]); // popper.js places the ending sequence text in a popup-like fashion above the announcement
                // anchor and makes sure that is does not move off the screen if the anchor is to close to a
                // screen edge.

                createAutoUpdatingPopper($announcementAnchor.get(0), $endingSequenceDiv.get(0), {
                  placement: 'top'
                });
                firstMessageCallback();
                _context15.next = 19;
                return delay(ENDING_SEQUENCE_SND_DELAY);

              case 19:
                $secondMessageDiv.css("visibility", "visible");
                secondMessageCallback();
                _context15.next = 23;
                return delay(ENDING_SEQUENCE_RESTART_DELAY);

              case 23:
                $restartDiv.css("visibility", "visible");

              case 24:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function showGameOverSequence(_x5, _x6, _x7) {
        return _showGameOverSequence.apply(this, arguments);
      }

      return showGameOverSequence;
    }()
  }], [{
    key: "buildBotInput",
    value: function buildBotInput(bot) {
      var botInput = {
        direction: 0,
        action: false
      };
      var botLastInput = {
        direction: 0,
        action: false
      };
      var player = bot.player,
          targetX = bot.targetX;
      var x = player.x,
          lastX = player.lastX;

      var _ref5 = x < lastX ? [x, lastX] : [lastX, x],
          _ref6 = _slicedToArray(_ref5, 2),
          lower = _ref6[0],
          upper = _ref6[1];

      if (lower <= targetX && targetX <= upper) {
        // It's time to probe!
        player.lastX = x;
        player.x = targetX;
        botInput.action = true;
      } else {
        // Navigate towards targetX
        botInput.direction = Math.sign(targetX - player.x);
      }

      return {
        input: botInput,
        lastInput: botLastInput
      };
    }
  }]);

  return PlayMode;
}(_gameMode["default"]);

exports["default"] = PlayMode;

function actionPressed(input, lastInput) {
  return input.action && !lastInput.action;
}

function pad(num, places, _char) {
  return String(num).padStart(places, _char);
}

function createAutoUpdatingPopper(reference, popper, options) {
  var popperInstance = (0, _core.createPopper)(reference, popper, options);
  var observer = new MutationObserver(function () {
    return popperInstance.update();
  });
  observer.observe(popper, {
    subtree: true,
    childList: true,
    characterData: true
  });
  return popperInstance;
}

},{"./bot-strategies/base":4,"./bot-strategies/gradient-descent":5,"./bot-strategies/random":6,"./bot-strategies/tangent-intersection":7,"./game-mode":18,"./i18n":20,"./terrain":23,"./waves":24,"@popperjs/core":26,"events":32}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = require("./i18n");

var _gameMode = _interopRequireDefault(require("./game-mode"));

var _wavyAnimation = _interopRequireDefault(require("./wavy-animation"));

var _audio = require("./audio");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TitleMode = /*#__PURE__*/function (_GameMode) {
  _inherits(TitleMode, _GameMode);

  var _super = _createSuper(TitleMode);

  function TitleMode(game) {
    var _this;

    _classCallCheck(this, TitleMode);

    _this = _super.call(this, game);
    _this.sounds = {
      title: game.jukebox.getSound('gameLogoAppears'),
      select: game.jukebox.getSound('selectItem')
    };
    _this.music = game.jukebox.getMusic('title');
    return _this;
  }

  _createClass(TitleMode, [{
    key: "preLoadAssets",
    value: function () {
      var _preLoadAssets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.game.loadSVGSymbol('assets/img/descent-logo.svg');

              case 2:
                this.logoSprite = _context.sent;
                this.poly = this.logoSprite.findOne('#descent');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preLoadAssets() {
        return _preLoadAssets.apply(this, arguments);
      }

      return preLoadAssets;
    }()
  }, {
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var draw, pressToStart, colorBegin, colorEnd, gradientLogo, gradientText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.music.play();
                draw = this.game.draw;
                pressToStart = document.createElement('div');
                pressToStart.classList.add('title-press-to-start');
                (0, _i18n.localeInit)(pressToStart, 'press-to-start');
                this.game.overlay.append(pressToStart);
                colorBegin = '#00368a';
                colorEnd = '#34c6ff';
                gradientLogo = draw.use(this.logoSprite).size(1200, 400).stroke({
                  color: colorBegin,
                  width: 2
                }).fill('transparent').center(1920 / 2, 1080 / 2.5);
                gradientText = this.logoSprite.findOne('#gradient').stroke('none').fill(colorEnd).opacity(0);
                gradientText.animate({
                  duration: 7000
                }).opacity(1);
                gradientLogo.animate({
                  duration: 5000
                }).stroke({
                  color: colorEnd
                });
                this.wavyStep = (0, _wavyAnimation["default"])(this.logoSprite, {
                  duration: 3500
                });
                this.animCounter = 0;
                this.sounds.title.play();

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleEnterMode() {
        return _handleEnterMode.apply(this, arguments);
      }

      return handleEnterMode;
    }()
  }, {
    key: "handleExitMode",
    value: function () {
      var _handleExitMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Cleanup timers, etc. created on handleEnterMode
                // The animation must be set to its final state such that it can restart properly
                // when this mode is re-entered.
                this.wavyStep(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleExitMode() {
        return _handleExitMode.apply(this, arguments);
      }

      return handleExitMode;
    }()
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts0) {
      // If any button was pressed
      if (inputs.find(function (ctrl, i) {
        return ctrl.action && !lastInputs[i].action;
      })) {
        this.sounds.select.play();
        this.triggerEvent('done');
      }
    }
  }, {
    key: "draw",
    value: function draw(delta, ts) {
      this.wavyStep(delta, ts);
    }
  }]);

  return TitleMode;
}(_gameMode["default"]);

exports["default"] = TitleMode;

},{"./audio":3,"./game-mode":18,"./i18n":20,"./wavy-animation":25}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Abstract class for GameMode
 *
 * A GameMode does the actual handling of the input and drawing
 */
var GameMode = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * @param {GradientDescentGame} game
   */
  function GameMode(game) {
    _classCallCheck(this, GameMode);

    // noinspection JSUnusedGlobalSymbols
    this.game = game;
    this.events = new _events["default"]();
  }
  /**
   * Preload any external assets that will be needed during the game
   *
   * This method runs during game initialization.
   * @return {Promise<void>}
   */


  _createClass(GameMode, [{
    key: "preLoadAssets",
    value: function () {
      var _preLoadAssets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function preLoadAssets() {
        return _preLoadAssets.apply(this, arguments);
      }

      return preLoadAssets;
    }()
    /**
     * Called by the game when the mode is entered.
     *
     * Can be used to add DOM elements, event handlers and initialize
     * internal state. Anything done here must be cleaned up in
     * handleExitMode.
     */

  }, {
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function handleEnterMode() {
        return _handleEnterMode.apply(this, arguments);
      }

      return handleEnterMode;
    }()
    /**
     * Called by the game when the mode is going to be exited
     *
     * Should be used to remove DOM elements, event handlers
     * or anything else that was created on handleEnterMode.
     */

  }, {
    key: "handleExitMode",
    value: function () {
      var _handleExitMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function handleExitMode() {
        return _handleExitMode.apply(this, arguments);
      }

      return handleExitMode;
    }()
    /**
     * Called once per frame so the mode can handle controller input
     *
     * Current input state and the previous one are passed
     * to help with state change detection.
     *
     * Both are arrays with N objects with shape:
     * - direction {integer}: Either -1, 0 or 1.
     * - action {bool}
     *
     * @param {[{direction: Number, action: Boolean}]} inputs
     * @param {[{direction: Number, action: Boolean}]} lastInputs
     * @param {Number} delta
     *  Amount of milliseconds since the last call (capped to a maximum)
     * @param {Number} ts
     *  Timestamp received via requestAnimationFrame
      *
     */

  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts) {}
    /**
     * Called when the mode is active and the language changes.
     */

  }, {
    key: "handleLanguageChange",
    value: function handleLanguageChange() {}
    /**
     * Called once per frame so the mode can draw based on the game's state
     *
     * @param {Number} delta
     *  Amount of milliseconds since the last call (capped to a maximum)
     * @param {Number} ts
     *  Timestamp received via requestAnimationFrame
     */

  }, {
    key: "draw",
    value: function draw(delta, ts) {}
    /**
     * Triggers an event for the game to handle
     *
     * Events can be used to transition to another mode, etc.
     *
     * @param {string} name
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(name) {
      this.events.emit(name);
    }
  }]);

  return GameMode;
}();

exports["default"] = GameMode;

},{"events":32}],19:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@wessberg/pointer-events");

var _i18n = _interopRequireDefault(require("./i18n"));

var _gameModePlay = _interopRequireDefault(require("./game-mode-play"));

var _gameModeTitle = _interopRequireDefault(require("./game-mode-title"));

var _gameModeNumplayers = _interopRequireDefault(require("./game-mode-numplayers"));

var _gamepad = _interopRequireDefault(require("./controls/gamepad"));

var _screen = _interopRequireDefault(require("./controls/screen"));

var _keyboard = _interopRequireDefault(require("./controls/keyboard"));

var _audioToggle = _interopRequireDefault(require("./audio-toggle"));

var _fullScreenToggle = _interopRequireDefault(require("./full-screen-toggle"));

var _gameModeBottype = _interopRequireDefault(require("./game-mode-bottype"));

var _languageCycleButton = _interopRequireDefault(require("./language-cycle-button"));

var _audio = _interopRequireDefault(require("./audio"));

var audioResources = _interopRequireWildcard(require("./audio-resources"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The main application
 *
 * This class creates the main UI elements and runs the
 * main game loop (read input, draw).
 *
 * The game can be in one of various modes (see GameMode)
 * which decides how to draw and process input.
 */
var GradientDescentGame = /*#__PURE__*/function () {
  function GradientDescentGame(container, config) {
    _classCallCheck(this, GradientDescentGame);

    this.container = container;
    this.config = config;
    this.inputs = this.createInputs();
    this.inputsLast = this.createInputs();
    this.animationFrameRequestId = 0;
    this.gameLoop = null;
    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;
    this.controls = {};
    this.debugControlsPane = null;
    this.botType = this.config.botType;
    this.numPlayers = this.config.maxPlayers;
    this.jukebox = _audio["default"];
    this.map = config.map;
  }
  /**
   * Initializes the app and downloads any external assets
   *
   * @return {Promise<void>}
   */


  _createClass(GradientDescentGame, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var width, height, minAspectRatioContainer, viewContainer, soundPromises, musicPromises, showBotType, showNumPlayers, afterNumPlayers, afterTitle;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                width = 1920, height = 864;
                minAspectRatioContainer = document.createElement('div');
                minAspectRatioContainer.classList.add('min-aspect-ratio');
                this.container.append(minAspectRatioContainer);
                viewContainer = document.createElement('div');
                viewContainer.classList.add('game-view');
                minAspectRatioContainer.append(viewContainer);
                this.svgDoc = SVG().addTo(viewContainer);
                this.svgDoc.viewbox(0, 0, width, height).attr('preserveAspectRatio', 'xMinYMin meet');
                this.draw = this.svgDoc.nested().size(width, height);
                this.overlay = document.createElement('div');
                this.overlay.classList.add('overlay');
                minAspectRatioContainer.append(this.overlay);

                if (this.config.useScreenControls) {
                  this.controls.screen = new _screen["default"](this.config.maxPlayers);
                  minAspectRatioContainer.appendChild(this.controls.screen.element);
                }

                if (this.config.useGamepads) {
                  this.controls.gamepad = new _gamepad["default"](this.config.maxPlayers);
                }

                this.languageButton = new _languageCycleButton["default"](this.container, this.config.languages);
                minAspectRatioContainer.appendChild(this.languageButton.element);

                if (!this.config.languageButton) {
                  this.languageButton.element.style.visibility = 'hidden';
                }

                if (this.config.audioButton) {
                  this.audioToggle = new _audioToggle["default"]();
                  minAspectRatioContainer.appendChild(this.audioToggle.element);
                }

                _audio["default"].mute(this.config.muteAudio);

                if (this.config.fullScreenButton) {
                  this.fullScreenToggle = new _fullScreenToggle["default"]();
                  minAspectRatioContainer.appendChild(this.fullScreenToggle.element);
                }

                if (this.config.useKeyboardControls) {
                  this.controls.keyboard = new _keyboard["default"](this.config.maxPlayers);
                }

                if (this.config.debugControls) {
                  this.debugControlsPane = document.createElement('div');
                  this.debugControlsPane.classList.add('debug-pane');
                  this.debugControlsPane.classList.add('debug-pane-controls');
                  minAspectRatioContainer.appendChild(this.debugControlsPane);
                }

                _context.prev = 23;
                soundPromises = Object.entries(audioResources.sounds).map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      id = _ref2[0],
                      res = _ref2[1];

                  return _this.jukebox.registerSound(id, res);
                });
                musicPromises = Object.entries(audioResources.musics).map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      id = _ref4[0],
                      res = _ref4[1];

                  return _this.jukebox.registerMusic(id, res);
                });
                _context.next = 28;
                return Promise.all([].concat(_toConsumableArray(soundPromises), _toConsumableArray(musicPromises)));

              case 28:
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](23);
                console.err('Unable to load game audio.', _context.t0);
                throw _context.t0;

              case 34:
                _context.next = 36;
                return this.registerMode('title', new _gameModeTitle["default"](this));

              case 36:
                _context.next = 38;
                return this.registerMode('bottype', new _gameModeBottype["default"](this));

              case 38:
                _context.next = 40;
                return this.registerMode('numplayers', new _gameModeNumplayers["default"](this));

              case 40:
                _context.next = 42;
                return this.registerMode('play', new _gameModePlay["default"](this));

              case 42:
                if (!this.config.continuousGame) {
                  _context.next = 48;
                  break;
                }

                this.transition('play', 'done', 'play');
                _context.next = 46;
                return this.setMode('play');

              case 46:
                _context.next = 58;
                break;

              case 48:
                showBotType = this.config.botType === null;
                showNumPlayers = this.config.maxPlayers > 1;
                afterNumPlayers = showBotType ? 'bottype' : 'play';
                afterTitle = showNumPlayers ? 'numplayers' : afterNumPlayers;
                this.transition('title', 'done', afterTitle);
                this.transition('numplayers', 'done', afterNumPlayers);
                this.transition('bottype', 'done', 'play');
                this.transition('play', 'done', 'title');
                _context.next = 58;
                return this.setMode('title');

              case 58:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[23, 30]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * Loads an external SVG file into a symbol within the main svg element
     *
     * @param {string} uri
     * @param {boolean} clearStyles
     *  If true removes the style elements from the file
     * @return {Promise<SVG.Symbol>}
     */

  }, {
    key: "loadSVGSymbol",
    value: function () {
      var _loadSVGSymbol = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uri) {
        var clearStyles,
            response,
            newSymbol,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clearStyles = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
                _context2.next = 3;
                return fetch(uri);

              case 3:
                response = _context2.sent;

                if (!(response.status < 200 || response.status >= 300)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error("Server returned status ".concat(response.status, " (").concat(response.statusText, ") loading ").concat(uri, "."));

              case 6:
                _context2.t0 = this.svgDoc.symbol();
                _context2.next = 9;
                return response.text();

              case 9:
                _context2.t1 = _context2.sent;
                newSymbol = _context2.t0.svg.call(_context2.t0, _context2.t1);

                if (clearStyles) {
                  newSymbol.find('style').forEach(function (s) {
                    return s.remove();
                  });
                }

                return _context2.abrupt("return", newSymbol);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadSVGSymbol(_x) {
        return _loadSVGSymbol.apply(this, arguments);
      }

      return loadSVGSymbol;
    }()
    /**
     * Initializes the input state
     *
     * @private
     */

  }, {
    key: "initInputs",
    value: function initInputs() {
      this.inputs = this.createInputs();
    }
  }, {
    key: "createInputs",
    value: function createInputs() {
      return Array(this.config.maxPlayers).fill(null).map(function () {
        return {
          direction: 0,
          action: false,
          language: false
        };
      });
    }
    /**
     * Reads the input state from all enabled controller types
     *
     * Loads the new input state in this.input and the previous
     * state in this.inputLast.
     *
     * @private
     */

  }, {
    key: "readInputs",
    value: function readInputs() {
      this.inputsLast = this.inputs;
      var states = Object.values(this.controls).map(function (c) {
        return c.getStates();
      });

      var inputReducer = function inputReducer(accInput, curState) {
        return {
          direction: curState.right ? 1 : curState.left ? -1 : accInput.direction,
          action: curState.action || accInput.action,
          language: curState.language || accInput.language
        };
      };

      this.inputs = this.createInputs().map(function (input, i) {
        return states.map(function (s) {
          return s[i];
        }).reduce(inputReducer, input);
      });

      if (this.debugControlsPane) {
        this.debugControlsPane.textContent = this.inputs.map(function (ctrl, i) {
          return "C".concat(i, ": d=").concat(ctrl.direction, " a=").concat(ctrl.action ? 'T' : 'F');
        }).join("\xA0\xA0\xA0\xA0"); // four &nbsp;
      }
    }
  }, {
    key: "handleGlobalInputs",
    value: function handleGlobalInputs() {
      var _this2 = this;

      var switchLanguage = this.inputsLast.reduce(function (acc, cur, i) {
        return acc || cur.language === false && _this2.inputs[i].language === true;
      }, false);
      if (switchLanguage) this.languageButton.handleLanguageChange().then();
    }
    /**
     * Game loop
     */

  }, {
    key: "run",
    value: function run() {
      var _this3 = this;

      window.cancelAnimationFrame(this.animationFrameRequestId);

      if (!this.gameLoop) {
        var lastTs = 0;
        var lag = 0;
        var MAX_DELTA = 125;

        this.gameLoop = function (ts) {
          if (!_this3.isPaused) {
            _this3.readInputs();

            _this3.handleGlobalInputs();

            lag += Math.max(0, ts - lag - lastTs - MAX_DELTA);
            ts -= lag;
            var delta = ts - lastTs;

            _this3.currentMode.handleInputs(_this3.inputs, _this3.inputsLast, delta, ts);

            _this3.currentMode.draw(delta, ts);

            lastTs = ts;
            _this3.animationFrameRequestId = window.requestAnimationFrame(_this3.gameLoop);
          }
        };
      }

      this.animationFrameRequestId = window.requestAnimationFrame(this.gameLoop);
    }
    /**
     * Pauses the game.
     *
     * While paused the main game loop not run.
     */

  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
    }
    /**
     * Resumes the game.
     *
     * Enables the main game loop.
     */

  }, {
    key: "resume",
    value: function resume() {
      if (this.isPaused) {
        this.isPaused = false;
        this.run();
      }
    }
    /**
     * Registers a game mode
     *
     * @private
     * @param {string} id
     *  A name that identifies the mode
     * @param {GameMode} mode
     *  A GameMode subclass
     * @return {Promise<void>}
     */

  }, {
    key: "registerMode",
    value: function () {
      var _registerMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, mode) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.modes[id] = mode;
                _context3.next = 3;
                return mode.preLoadAssets();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function registerMode(_x2, _x3) {
        return _registerMode.apply(this, arguments);
      }

      return registerMode;
    }()
    /**
     * Changes the current game mode
     *
     * @param {string} modeID
     *  Name of a previously registered mode
     * @return {Promise<void>}
     */

  }, {
    key: "setMode",
    value: function () {
      var _setMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(modeID) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.pause();

                if (!this.currentMode) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 4;
                return this.currentMode.handleExitMode();

              case 4:
                if (!(this.modes[modeID] === undefined)) {
                  _context4.next = 6;
                  break;
                }

                throw new Error("Can't change to unknown mode ".concat(modeID));

              case 6:
                this.currentMode = this.modes[modeID];
                this.draw.clear();
                this.overlay.innerHTML = '';
                _context4.next = 11;
                return this.currentMode.handleEnterMode();

              case 11:
                this.resume();

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setMode(_x4) {
        return _setMode.apply(this, arguments);
      }

      return setMode;
    }()
  }, {
    key: "transition",
    value: function transition(modeId, event) {
      var _this4 = this;

      var nextModeId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (this.modes[modeId] === undefined) {
        throw new Error("Can't define transition from unknown game mode '".concat(modeId, "'"));
      }

      if (nextModeId && this.modes[nextModeId] === undefined) {
        throw new Error("Can't define transition to unknown game mode '".concat(nextModeId, "'"));
      }

      this.modes[modeId].events.on(event, function () {
        if (_this4.currentMode !== _this4.modes[modeId]) {
          throw new Error("Mode ".concat(modeId, " triggered the event ").concat(event, " while not active. Something was not cleaned up?"));
        }

        if (nextModeId !== null) {
          _this4.setMode(nextModeId);
        }

        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    }
    /**
     * Set a custom sea floor map that will be used the next time the play mode is entered.
     *
     * @param map {number[]|null} An array containing distance values between 0 and 1. 0 is closest
     *  to the water surface, 1 is farthest away from the water surface. The map will only be used if
     *  it contains at least distance values (distances at the left and right edge). If {null} is
     *  provided, no custom map will be used and a new map will be generated each time the game
     *  restarts.
     */

  }, {
    key: "setMap",
    value: function setMap(map) {
      this.map = !Array.isArray(map) || map.length < 2 ? null : map;
    }
  }, {
    key: "showSeaFloor",
    value: function () {
      var _showSeaFloor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var animate,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                animate = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : true;

                if (!(this.currentMode && typeof this.currentMode.uncoverGround === 'function')) {
                  _context5.next = 9;
                  break;
                }

                if (!animate) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return this.currentMode.uncoverGround();

              case 5:
                _context5.next = 9;
                break;

              case 7:
                _context5.next = 9;
                return this.currentMode.uncoverGround(0);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function showSeaFloor() {
        return _showSeaFloor.apply(this, arguments);
      }

      return showSeaFloor;
    }()
  }]);

  return GradientDescentGame;
}();

exports["default"] = GradientDescentGame;

},{"./audio":3,"./audio-resources":1,"./audio-toggle":2,"./controls/gamepad":9,"./controls/keyboard":10,"./controls/screen":11,"./full-screen-toggle":12,"./game-mode-bottype":13,"./game-mode-numplayers":15,"./game-mode-play":16,"./game-mode-title":17,"./i18n":20,"./language-cycle-button":21,"@wessberg/pointer-events":27}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localize = exports["default"] = localize;
exports.localeInit = localeInit;
exports.localizeFlat = localizeFlat;
exports.I18N_KEY_ATTRIBUTE = exports.I18N_KEY_DATA_ATTRIBUTE = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var I18N_KEY_DATA_ATTRIBUTE = 'i18n-key';
exports.I18N_KEY_DATA_ATTRIBUTE = I18N_KEY_DATA_ATTRIBUTE;
var I18N_KEY_ATTRIBUTE = "data-".concat(I18N_KEY_DATA_ATTRIBUTE);
exports.I18N_KEY_ATTRIBUTE = I18N_KEY_ATTRIBUTE;
var I18N_KEY_SELECTOR = "*[".concat(I18N_KEY_ATTRIBUTE, "]");

function localeInit(elem) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  var encodedKeys = keys.map(encodeURIComponent);
  var $elem = $(elem);
  $elem.attr(I18N_KEY_ATTRIBUTE, encodedKeys.join(","));
  localize(elem);
  return elem;
}

function localize(elems) {
  localizeFlat(elems);
  var $i18nElemsDescendants = $(elems).find(I18N_KEY_SELECTOR);
  localizeFlat($i18nElemsDescendants);
  return elems;
}

function localizeFlat(elems) {
  var $elems = $(elems);
  var $i18nElems = $elems.filter(I18N_KEY_SELECTOR);
  $i18nElems.each(function () {
    var $i18nElem = $(this);
    var encodedKeys = $i18nElem.data(I18N_KEY_DATA_ATTRIBUTE).split(",");
    var keys = encodedKeys.map(decodeURIComponent);

    if (keys.length > 0) {
      var object = _defineProperty({}, keys[0], IMAGINARY.i18n.t(keys[0]));

      var text = recursiveGet.apply(void 0, [object].concat(_toConsumableArray(keys)));
      $i18nElem.text(text);
    }
  });
  return elems;
}

function recursiveGet(object, key) {
  var value = object[key];

  for (var _len2 = arguments.length, otherKeys = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    otherKeys[_key2 - 2] = arguments[_key2];
  }

  if (otherKeys.length === 0) {
    return value;
  } else {
    return recursiveGet.apply(void 0, [value].concat(otherKeys));
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LanguageCycleButton = /*#__PURE__*/function () {
  function LanguageCycleButton(elementToLocalize, languageCodes) {
    var _this = this;

    _classCallCheck(this, LanguageCycleButton);

    this.elementToLocalize = elementToLocalize;
    this.languageCodes = languageCodes;
    this.languageButton = document.createElement("div");
    this.languageButton.classList.add("language-button");
    this.languageIcon = document.createElement("i");
    this.languageIcon.classList.add("fas", "fa-sm", "fa-language");
    this.languageButton.appendChild(this.languageIcon);

    this.languageButton.onpointerup = function () {
      return _this.handleLanguageChange();
    };

    this.element = this.languageButton;
  }

  _createClass(LanguageCycleButton, [{
    key: "handleLanguageChange",
    value: function () {
      var _handleLanguageChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var currentLangIdx, nextLangIdx, nextLang;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentLangIdx = this.languageCodes.indexOf(IMAGINARY.i18n.getLang());
                nextLangIdx = (currentLangIdx + 1) % this.languageCodes.length;
                nextLang = this.languageCodes[nextLangIdx];
                _context.next = 5;
                return IMAGINARY.i18n.setLang(nextLang);

              case 5:
                (0, _i18n["default"])(this.elementToLocalize);
                console.log("Language switched: ".concat(nextLang));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleLanguageChange() {
        return _handleLanguageChange.apply(this, arguments);
      }

      return handleLanguageChange;
    }()
  }]);

  return LanguageCycleButton;
}();

exports["default"] = LanguageCycleButton;

},{"./i18n":20}],22:[function(require,module,exports){
"use strict";

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function fetchJson(_x) {
  return _fetchJson.apply(this, arguments);
}

function _fetchJson() {
  _fetchJson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uri) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(uri, {
              cache: 'no-store'
            });

          case 2:
            response = _context2.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 4;
            _context2.next = 7;
            return response.json();

          case 7:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](4);
            throw new Error("Error parsing JSON file: ".concat(_context2.t0.message));

          case 13:
            throw new Error("Server returned status ".concat(response.status, " (").concat(response.statusText, ") loading JSON file."));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 10]]);
  }));
  return _fetchJson.apply(this, arguments);
}

function getDefaultConfig() {
  return _getDefaultConfig.apply(this, arguments);
}
/**
 * Loads the config file from an external JSON file
 *
 * @param {String} uri
 * @return {Promise<any>}
 */


function _getDefaultConfig() {
  _getDefaultConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var defaultConfig, tr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            defaultConfig = {
              defaultLanguage: 'en',
              languages: undefined,
              // fill in from tr.json
              useGamepads: true,
              useScreenControls: true,
              useKeyboardControls: true,
              botType: null,
              botTypeLabels: 'difficulty',
              maxPlayers: 2,
              maxTime: Number.POSITIVE_INFINITY,
              maxProbes: Number.POSITIVE_INFINITY,
              continuousGame: false,
              showSeaFloor: false,
              maxDepthTilt: 4,
              fullScreenButton: true,
              languageButton: true,
              audioButton: true,
              muteAudio: false,
              debugControls: false,
              map: null
            };
            _context3.next = 3;
            return fetchJson(new URL('tr.json', window.location.href));

          case 3:
            tr = _context3.sent;
            defaultConfig.languages = Object.keys(tr).sort();
            return _context3.abrupt("return", defaultConfig);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getDefaultConfig.apply(this, arguments);
}

function loadConfig(_x2) {
  return _loadConfig.apply(this, arguments);
}
/**
 * Return the URL of the user-supplied config file or {null} if it is not present.
 *
 * A custom config file name can be provided via the 'config' query string variable.
 * Allowed file names must match the regex /^[A-Za-z0\-_.]+$/.
 *
 * @returns {URL|null} User-supplied config URL or {null} if not supplied.
 * @throws {Error} If the user-supplied config file name doesn't match the regex.
 */


function _loadConfig() {
  _loadConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(uri) {
    var response, config, titleCase;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetch(uri, {
              cache: 'no-store'
            });

          case 2:
            response = _context4.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context4.next = 17;
              break;
            }

            _context4.prev = 4;
            _context4.next = 7;
            return response.json();

          case 7:
            config = _context4.sent;

            // Take into account the INFINITY is a valid value for maxTime and maxProbes
            titleCase = function titleCase(s) {
              return function (l) {
                return l.charAt(0).toUpperCase() + l.slice(1);
              }(String(s).toLowerCase());
            };

            if (Number(titleCase(config.maxTime)) === Number.POSITIVE_INFINITY) config.maxTime = Number.POSITIVE_INFINITY;
            if (Number(titleCase(config.maxProbes)) === Number.POSITIVE_INFINITY) config.maxProbes = Number.POSITIVE_INFINITY;
            return _context4.abrupt("return", config);

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](4);
            throw new Error("Error parsing config file: ".concat(_context4.t0.message));

          case 17:
            throw new Error("Server returned status ".concat(response.status, " (").concat(response.statusText, ") loading config file."));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 14]]);
  }));
  return _loadConfig.apply(this, arguments);
}

function getConfigCustomUrl() {
  var urlSearchParams = new URLSearchParams(window.location.search);

  if (!urlSearchParams.has('config')) {
    return null;
  } else {
    var customConfigName = urlSearchParams.get('config');
    var whitelistRegex = /^[A-Za-z0-9\-_.]+$/;

    if (whitelistRegex.test(customConfigName)) {
      return new URL(customConfigName, window.location.href);
    } else {
      throw new Error("Custom config path ".concat(customConfigName, " must match ").concat(whitelistRegex.toString(), "."));
    }
  }
}
/**
 * Load config files and start the program
 */


(function () {
  var _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var configDefaultUrl, defaultConfigPromise, configCustomUrl, configUrl, configPromise, _yield$Promise$all, _yield$Promise$all2, defaultConfig, loadedConfig, config, game;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            configDefaultUrl = new URL('./config.json', window.location.href);
            defaultConfigPromise = getDefaultConfig();
            configCustomUrl = getConfigCustomUrl();
            configUrl = configCustomUrl !== null && configCustomUrl !== void 0 ? configCustomUrl : configDefaultUrl;
            configPromise = loadConfig(configUrl.href);
            _context.next = 8;
            return Promise.all([defaultConfigPromise, configPromise]);

          case 8:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            defaultConfig = _yield$Promise$all2[0];
            loadedConfig = _yield$Promise$all2[1];
            config = Object.assign({}, defaultConfig, loadedConfig);
            console.log("Default configuration:", defaultConfig);
            console.log("Loaded configuration:", loadedConfig);
            console.log("Merged configuration:", config);
            _context.next = 18;
            return IMAGINARY.i18n.init({
              queryStringVariable: 'lang',
              translationsDirectory: 'tr',
              defaultLanguage: config.defaultLanguage || 'en'
            });

          case 18:
            // eslint-disable-next-line no-unused-vars
            game = new _game["default"](document.querySelector('.main'), config);
            window.game = game;
            _context.next = 22;
            return game.init();

          case 22:
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            // eslint-disable-next-line no-console
            console.error(_context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  function main() {
    return _main.apply(this, arguments);
  }

  return main;
})()();

},{"./game":19}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = terrain;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Returns an integer in [l,u)
function randIndex(l, u) {
  (0, _assert["default"])(Number.isInteger(l) && l >= 0);
  (0, _assert["default"])(Number.isInteger(u) && u >= 0);
  (0, _assert["default"])(l < u);
  var r = l + (u - l) * Math.random();
  return Math.max(l, Math.min(Math.floor(r), u - 1));
}

function smoothChaikin(arr, num) {
  var open = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (num === 0) return arr;
  var l = arr.length;
  var smooth = arr.map(function (c, i) {
    return [[0.75 * c[0] + 0.25 * arr[(i + 1) % l][0], 0.75 * c[1] + 0.25 * arr[(i + 1) % l][1]], [0.25 * c[0] + 0.75 * arr[(i + 1) % l][0], 0.25 * c[1] + 0.75 * arr[(i + 1) % l][1]]];
  }).flat();

  if (open) {
    smooth.length -= 1;
    smooth[0] = arr[0];
    smooth[smooth.length - 1] = arr[arr.length - 1];
  }

  return smoothChaikin(smooth, num - 1, open);
}

function subdivide(length, leftHeight, rightHeight) {
  return {
    index: randIndex(0, length),
    height: Math.max(leftHeight, rightHeight) * Math.random()
  };
}

function generateInnerTerrainHeights(heights, leftHeight, rightHeight) {
  if (heights.length > 0) {
    var _subdivide = subdivide(heights.length, leftHeight, rightHeight),
        index = _subdivide.index,
        height = _subdivide.height;

    heights[index] = height;
    generateInnerTerrainHeights(heights.subarray(0, index), leftHeight, height);
    generateInnerTerrainHeights(heights.subarray(index + 1, heights.length), height, rightHeight);
  }

  return heights;
}

function generateTerrainPoints(numPoints) {
  var marginWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
  var marginHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.2;
  var jitter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.25;
  var tilt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
  var heights = new Float32Array(numPoints);
  var leftMarginIndex = Math.floor(marginWidth * numPoints);
  var rightMarginIndex = Math.floor((1 - marginWidth) * (numPoints - 1));
  (0, _assert["default"])(leftMarginIndex + 1 < rightMarginIndex);
  (0, _assert["default"])(marginHeight >= 0.0 && marginHeight < 1.0);
  var maxHeightIndex = randIndex(leftMarginIndex + 1, rightMarginIndex);
  var r = 1 - Math.pow(Math.random(), tilt); // tendency towards 0 or 1 depending on tilt

  var maxHeight = marginHeight + Math.max(Number.EPSILON, r * (1 - marginHeight));
  var predefinedHeights = [[0, Math.random() * marginHeight], [leftMarginIndex, marginHeight], [maxHeightIndex, maxHeight], [rightMarginIndex, marginHeight], [numPoints - 1, Math.random() * marginHeight]];

  if (numPoints > 0) {
    predefinedHeights.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          h = _ref2[1];

      return heights[i] = h;
    });
    predefinedHeights.reduce(function (_ref3, _ref4) {
      var _ref5 = _slicedToArray(_ref3, 2),
          i0 = _ref5[0],
          h0 = _ref5[1];

      var _ref6 = _slicedToArray(_ref4, 2),
          i1 = _ref6[0],
          h1 = _ref6[1];

      generateInnerTerrainHeights(heights.subarray(i0 + 1, i1), h0, h1);
      return [i1, h1];
    });
  } // restrict jitter range to prevent points from switching their order


  jitter = Math.max(0.0, Math.min(jitter, 1.0));
  return new Array(heights.length).fill(null).map(function (_, i) {
    return [(i + jitter * (Math.random() - 0.5)) / (heights.length - 1), heights[i]];
  });
}

function convertPointsToHeights(points, numHeights) {
  var left = points[0][0];
  var right = points[points.length - 1][0];
  var width = right - left;
  var heights = Array(numHeights);
  var j = 0;

  for (var i = 0; i < heights.length - 1; ++i) {
    while (i >= (numHeights - 1) * (points[j][0] - left) / width) {
      ++j;
    }

    var t = (left + i / (numHeights - 1) * width - points[j - 1][0]) / (points[j][0] - points[j - 1][0]);
    heights[i] = points[j - 1][1] + (points[j][1] - points[j - 1][1]) * t;
  }

  heights[heights.length - 1] = points[points.length - 1][1];
  return heights;
}

function restrictPrecision(number, decimalPlaces) {
  var factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

var defaultOptions = {
  marginWidth: 0.1,
  marginHeight: 0.1,
  jitter: 0.25,
  tilt: 4,
  smoothing: 6
};

function terrain(numSamples, length) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = Object.assign({}, defaultOptions, options);
  var roughTerrainPoints = generateTerrainPoints(numSamples, options.marginWidth, options.marginHeight, options.jitter, options.tilt);
  var smoothTerrainPoints = smoothChaikin(roughTerrainPoints, options.smoothing);
  var smoothTerrainHeights = convertPointsToHeights(smoothTerrainPoints, length);
  return smoothTerrainHeights.map(function (n) {
    return restrictPrecision(n, 5);
  });
}

},{"assert":28}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.height = height;
exports.slope = slope;
exports.heights = heights;
exports.points = points;
exports.animatedSVGPolyline = animatedSVGPolyline;
// The water surface consists of superimposed sin waves that are moving with respect to ts.
// Fixing x, the frequency factors with respect to ts are [1,-1,2,3].
// Since the lowest common denominator of these factors is 6 and the base frequency is 1 / (2 * PI),
// the period of the water animation is 6 / (1 / (2 * PI)) = 12 * PI.
var PERIOD = 12 * Math.PI;

function height(x, t) {
  t = t * PERIOD % PERIOD;
  return (Math.sin(x * 100 + t) + Math.sin(x * 50 - 1 * t) + Math.sin(x * 30 + 2 * t) + Math.sin(x * 10 - 3 * t)) / 4;
}

function slope(x, t) {
  t = t * PERIOD % PERIOD;
  return (100 * Math.cos(100 * x + t) + 50 * Math.cos(50 * x - t) + 30 * Math.cos(30 * x + 2 * t) + 10 * Math.cos(10 * x - 3 * t)) / 4;
}

function heights(arr, t) {
  var xScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
  var yScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
  arr.forEach(function (_, i) {
    return arr[i] = height(i / (arr.length - 1), t);
  });
  return arr;
}

function points(arr, t) {
  var xScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
  var yScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
  arr.forEach(function (_, i) {
    var x = i / (arr.length - 1);
    arr[i] = [xScale * x, yScale * height(x, t)];
  });
  return arr;
}
/*
 * Experimental: Create an SVG wave shape that animates via the <animate> tag.
 * Probably, this doesn't work in all browsers. :-(
 */


function animatedSVGPolyline(svgContainer, numPoints, numSteps, xScale, yScale, duration) {
  var p = Array(numPoints).fill(null);
  var keyframes = Array(numSteps).fill(null).map(function (_, i) {
    return Array.from(points(p, i / (numSteps - 1), xScale, yScale));
  });
  var waves = svgContainer.polyline(keyframes[0]);
  var keyframesSvg = keyframes.map(function (p) {
    return waves.plot(p).attr('points');
  });
  var keyframesString = keyframesSvg.join(';\n').replace(/;[[:space:]]*;]/g, ';');
  var animate = waves.element('animate');
  animate.attr({
    attributeName: 'points',
    dur: "".concat(duration, "ms"),
    repeatCount: 'indefinite',
    values: keyframesString
  });
  return waves;
}

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WavyAnimation;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Setup a wave-like animation for an svg.js shape made up of polygons.
 *
 * This animation works by applying a transformation on all points of
 * all polygons of the passed shape. The points will move on a sine wave
 * that is continuously phase shifting and whose amplitude decreases over time.
 *
 * Returns a stepping function that takes a delta in milliseconds which should
 * be called on the frame rendering function.
 *
 * Options:
 * - xAmplitude: Maximum distance that the x coordinates are shifted from their
 *   starting position.
 * - duration: Duration of the animation
 * - cycles: Number of cycles of phase shifting.
 *
 * @param {SVG.Container} shape
 *  The shape whose polygons will be animated
 * @param {Object} userOptions
 *  Options (see above)
 * @return {function(...[*]=)}
 *  Returns an animation callback that takes a delta.
 */
function WavyAnimation(shape) {
  var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultOptions = {
    xAmplitude: 50,
    duration: 5000,
    cycles: 3
  };
  var options = Object.assign({}, defaultOptions, userOptions);
  var polygons = shape.find('polygon');
  var originalPlots = polygons.map(function (p) {
    return p.plot();
  });
  var maxY = Math.max.apply(Math, _toConsumableArray(originalPlots.flat().map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        y = _ref2[1];

    return y;
  })));
  var counter = 0;
  return function (delta, ts) {
    if (counter > options.duration) {
      return;
    }

    counter += delta;
    var progress = Math.min(counter, options.duration) / options.duration;
    polygons.forEach(function (p, i) {
      p.plot(originalPlots[i].map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        return [x + Math.sin((y / maxY + progress * options.cycles) * Math.PI * 2) * options.xAmplitude * (1 - Math.pow(progress, 2)), y];
      }));
    });
  };
}

},{}],26:[function(require,module,exports){
(function (process){(function (){
/**
 * @popperjs/core v2.5.4 - MIT License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
/*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
  ShadowRoot); */


function isShadowRoot(node) {
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the 
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && getComputedStyle(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
      options: Object.assign(Object.assign({}, existing.options), current.options),
      data: Object.assign(Object.assign({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = element.ownerDocument.body;
  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign(Object.assign({}, rect), {}, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements; // $FlowFixMe

  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;

    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$2(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
  };
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$2,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper$1 = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

exports.applyStyles = applyStyles$1;
exports.arrow = arrow$1;
exports.computeStyles = computeStyles$1;
exports.createPopper = createPopper$1;
exports.createPopperLite = createPopper;
exports.defaultModifiers = defaultModifiers$1;
exports.detectOverflow = detectOverflow;
exports.eventListeners = eventListeners;
exports.flip = flip$1;
exports.hide = hide$1;
exports.offset = offset$1;
exports.popperGenerator = popperGenerator;
exports.popperOffsets = popperOffsets$1;
exports.preventOverflow = preventOverflow$1;


}).call(this)}).call(this,require('_process'))

},{"_process":35}],27:[function(require,module,exports){
(function () {
	'use strict';

	/**
	 * Whether or not the device is a Touch device
	 * @type {boolean}
	 */
	var isTouchDevice = "ontouchstart" in document;

	/**
	 * If true, the user agent already supports the 'maxTouchPoints' property on the Navigator prototype
	 * @type {boolean}
	 */
	var SUPPORTS_MAX_TOUCH_POINTS = "maxTouchPoints" in Navigator.prototype;

	// tslint:disable:no-any
	// Only set the 'maxTouchPoints' property on the Navigator prototype if it isn't already supported
	if (!SUPPORTS_MAX_TOUCH_POINTS) {
	    // If the device is a touch device, use 1 as the max available touch points even if it may be more. We have no way of knowing! Otherwise, fall back to 0
	    Object.defineProperty(Navigator.prototype, "maxTouchPoints", {
	        value: "maxTouchPoints" in navigator
	            ? // Use the existing maxTouchPoints value if given
	                navigator.maxTouchPoints
	            : // Use the existing msMaxTouchPoints value if given
	                "msMaxTouchPoints" in navigator
	                    ? navigator.msMaxTouchPoints
	                    : !isTouchDevice
	                        ? 0
	                        : 1,
	        enumerable: true
	    });
	}

	var POINTER_EVENT_TYPES = [
	    "pointerover",
	    "pointerenter",
	    "pointerdown",
	    "pointermove",
	    "pointerup",
	    "pointercancel",
	    "pointerout",
	    "pointerleave",
	    "gotpointercapture",
	    "lostpointercapture"
	];

	/**
	 * Returns true if the given event type represents a PointerEvent
	 * @param {string} type
	 * @returns {type is PointerEventType}
	 */
	function isPointerEventType(type) {
	    switch (type) {
	        case "gotpointercapture":
	        case "lostpointercapture":
	        case "pointerdown":
	        case "pointermove":
	        case "pointerup":
	        case "pointercancel":
	        case "pointerenter":
	        case "pointerleave":
	        case "pointerout":
	        case "pointerover":
	            return true;
	        default:
	            return false;
	    }
	}

	/**
	 * Checks if there are Global Event Handlers (such as 'onpointerdown') for every Pointer Event
	 * @type {boolean}
	 */
	var SUPPORTS_POINTER_EVENT_HANDLERS = POINTER_EVENT_TYPES.every(function (type) { return "on" + type in window; });

	// Only patch the dispatchEvent EventTarget prototype method if the user agent
	// doesn't already support Global Event Handlers for Pointer Events
	if (!SUPPORTS_POINTER_EVENT_HANDLERS) {
	    // Keep a reference to the original dispatchEvent prototype method
	    var originalDispatchEvent_1 = EventTarget.prototype.dispatchEvent;
	    /**
	     * Overwrite the dispatchEvent prototype method such that we can provide special handling
	     * for PointerEvents
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    EventTarget.prototype.dispatchEvent = function (event) {
	        if (isPointerEventType(event.type)) {
	            // Also invoke the event handler, if it exists
	            var eventHandler = this["on" + event.type];
	            if (eventHandler != null) {
	                eventHandler(event);
	            }
	        }
	        return originalDispatchEvent_1.call(this, event);
	    };
	}

	

	

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	/**
	 * The default values for constructed PointerEvents
	 * @type {object}
	 */
	var POINTER_EVENT_DEFAULT_VALUES = {
	    pointerId: 0,
	    width: 1,
	    height: 1,
	    pressure: 0,
	    tangentialPressure: 0,
	    tiltX: 0,
	    tiltY: 0,
	    twist: 0,
	    pointerType: "",
	    isPrimary: false
	};

	var SHARED_DESCRIPTOR_OPTIONS = {
	    writable: false,
	    configurable: true,
	    enumerable: true
	};

	/**
	 * Gets a PropertyDescriptor with a fallback value
	 * @param {Key} key
	 * @param {IPointerEventBase[Key]} providedValue
	 * @returns {PropertyDescriptor}
	 */
	function getDescriptorWithFallback(key, providedValue) {
	    return __assign({ value: providedValue != null ? providedValue : POINTER_EVENT_DEFAULT_VALUES[key] }, SHARED_DESCRIPTOR_OPTIONS);
	}

	var SEEN_POINTER_IDS = new Set();

	// tslint:disable:no-any
	// tslint:disable:bool-param-default
	/**
	 * A specialization of MouseEvents as spec'ed in https://www.w3.org/TR/pointerevents
	 */
	var PointerEvent = /** @class */ (function () {
	    function PointerEvent(type, eventInitDict) {
	        if (eventInitDict === void 0) { eventInitDict = {}; }
	        // Sets all of the given PropertyDescriptors with fallbacks to the default values as defined by the specification
	        var propsToSet = {
	            pointerId: getDescriptorWithFallback("pointerId", eventInitDict.pointerId),
	            width: getDescriptorWithFallback("width", eventInitDict.width),
	            height: getDescriptorWithFallback("height", eventInitDict.height),
	            pressure: getDescriptorWithFallback("pressure", eventInitDict.pressure),
	            tangentialPressure: getDescriptorWithFallback("tangentialPressure", eventInitDict.tangentialPressure),
	            tiltX: getDescriptorWithFallback("tiltX", eventInitDict.tiltX),
	            tiltY: getDescriptorWithFallback("tiltY", eventInitDict.tiltY),
	            twist: getDescriptorWithFallback("twist", eventInitDict.twist),
	            pointerType: getDescriptorWithFallback("pointerType", eventInitDict.pointerType),
	            isPrimary: getDescriptorWithFallback("isPrimary", eventInitDict.isPrimary)
	        };
	        var mouseEvent = new MouseEvent(type, eventInitDict);
	        Object.defineProperties(mouseEvent, propsToSet);
	        // Update the SEEN_POINTER_IDS Set with the pointer id from the options
	        SEEN_POINTER_IDS.add(propsToSet.pointerId.value);
	        // Return the constructed MouseEvent directly from the constructor
	        return mouseEvent;
	    }
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @returns {EventTarget[]}
	     */
	    PointerEvent.prototype.deepPath = function () {
	        return [];
	    };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @returns {EventTarget[]}
	     */
	    PointerEvent.prototype.composedPath = function () {
	        return [];
	    };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @param {string} _keyArg
	     * @returns {boolean}
	     */
	    PointerEvent.prototype.getModifierState = function (_keyArg) {
	        return false;
	    };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @param {string} _type
	     * @param {boolean} _bubbles
	     * @param {boolean} _cancelable
	     */
	    PointerEvent.prototype.initEvent = function (_type, _bubbles, _cancelable) { };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @param {string} _typeArg
	     * @param {boolean} _canBubbleArg
	     * @param {boolean} _cancelableArg
	     * @param {Window} _viewArg
	     * @param {number} _detailArg
	     * @param {number} _screenXArg
	     * @param {number} _screenYArg
	     * @param {number} _clientXArg
	     * @param {number} _clientYArg
	     * @param {boolean} _ctrlKeyArg
	     * @param {boolean} _altKeyArg
	     * @param {boolean} _shiftKeyArg
	     * @param {boolean} _metaKeyArg
	     * @param {number} _buttonArg
	     * @param {EventTarget | null} _relatedTargetArg
	     */
	    PointerEvent.prototype.initMouseEvent = function (_typeArg, _canBubbleArg, _cancelableArg, _viewArg, _detailArg, _screenXArg, _screenYArg, _clientXArg, _clientYArg, _ctrlKeyArg, _altKeyArg, _shiftKeyArg, _metaKeyArg, _buttonArg, _relatedTargetArg) { };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     * @param {string} _typeArg
	     * @param {boolean} _canBubbleArg
	     * @param {boolean} _cancelableArg
	     * @param {Window} _viewArg
	     * @param {number} _detailArg
	     */
	    PointerEvent.prototype.initUIEvent = function (_typeArg, _canBubbleArg, _cancelableArg, _viewArg, _detailArg) { };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     */
	    PointerEvent.prototype.preventDefault = function () { };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     */
	    PointerEvent.prototype.stopImmediatePropagation = function () { };
	    /**
	     * This is a no-op. A MouseEvent is returned from the constructor
	     */
	    PointerEvent.prototype.stopPropagation = function () { };
	    return PointerEvent;
	}());

	/**
	 * Converts the type of a PointerEvent into one that the browser can understand
	 * @param {string} pointerEventType
	 * @returns {string|null}
	 */
	function convertPointerEventType(pointerEventType) {
	    if (isTouchDevice) {
	        switch (pointerEventType) {
	            case "pointerdown":
	                return "touchstart";
	            case "pointermove":
	                return "touchmove";
	            case "pointerup":
	                return "touchend";
	            case "pointercancel":
	                return "touchcancel";
	            case "pointerout":
	            case "pointerleave":
	            case "pointerenter":
	            case "pointerover":
	            case "lostpointercapture":
	            case "gotpointercapture":
	                return null;
	        }
	    }
	    else {
	        switch (pointerEventType) {
	            case "pointerdown":
	                return "mousedown";
	            case "pointermove":
	                return "mousemove";
	            case "pointerup":
	                return "mouseup";
	            case "pointercancel":
	                return null;
	            case "pointerout":
	                return "mouseout";
	            case "pointerleave":
	                return "mouseleave";
	            case "pointerenter":
	                return "mouseenter";
	            case "pointerover":
	                return "mouseover";
	            case "lostpointercapture":
	            case "gotpointercapture":
	                return null;
	        }
	    }
	    throw new TypeError("Event of type: '" + pointerEventType + "' could not be handled!");
	}

	

	

	

	

	/**
	 * Returns true if the given event target is an element
	 * @param {EventTarget|null} eventTarget
	 * @returns {eventTarget is Element}
	 */
	function isElement(eventTarget) {
	    return eventTarget != null && "offsetLeft" in eventTarget;
	}

	// tslint:disable:no-any
	/**
	 * Gets the parent of an element, taking into account DocumentFragments, ShadowRoots, as well as the root context (window)
	 * @param {EventTarget} currentElement
	 * @returns {EventTarget | null}
	 */
	function getParent(currentElement) {
	    if ("nodeType" in currentElement && currentElement.nodeType === 1) {
	        return currentElement.parentNode;
	    }
	    if ("ShadowRoot" in window && currentElement instanceof window.ShadowRoot) {
	        return currentElement.host;
	    }
	    else if (currentElement === document) {
	        return window;
	    }
	    else if (currentElement instanceof Node)
	        return currentElement.parentNode;
	    return null;
	}

	// tslint:disable:no-any
	/**
	 * Finds the nearest root from an element
	 * @param {Element} target
	 * @returns {DocumentOrShadowRoot}
	 */
	function findNearestRoot(target) {
	    var currentElement = target;
	    while (currentElement != null) {
	        if ("ShadowRoot" in window && currentElement instanceof window.ShadowRoot) {
	            // Assume this is a ShadowRoot
	            return currentElement;
	        }
	        var parent_1 = getParent(currentElement);
	        if (parent_1 === currentElement) {
	            return document;
	        }
	        currentElement = parent_1;
	    }
	    return document;
	}

	var POINTER_ID_TO_CAPTURED_TARGET_MAP = new Map();

	// tslint:disable:no-any
	/**
	 * Retrieves the width of a touch
	 * @param {Touch} touch
	 * @returns {number}
	 */
	function getTouchWidth(touch) {
	    if ("radiusX" in touch)
	        return touch.radiusX * 2;
	    else if ("webkitRadiusX" in touch)
	        return touch.webkitRadiusX * 2;
	    else {
	        return POINTER_EVENT_DEFAULT_VALUES.width;
	    }
	}
	/**
	 * Retrieves the height of a touch
	 * @param {Touch} touch
	 * @returns {number}
	 */
	function getTouchHeight(touch) {
	    if ("radiusY" in touch)
	        return touch.radiusY * 2;
	    else if ("webkitRadiusY" in touch)
	        return touch.webkitRadiusY * 2;
	    else {
	        return POINTER_EVENT_DEFAULT_VALUES.height;
	    }
	}
	/**
	 * Gets the pressure of the current touch, depending on the type of event
	 * @param {PointerEventType} type
	 * @param {MouseEvent | Touch} touchOrMouseEvent
	 * @returns {number}
	 */
	function getPressure(type, touchOrMouseEvent) {
	    if (type === "pointerup") {
	        return 0;
	    }
	    else if ("force" in touchOrMouseEvent)
	        return touchOrMouseEvent.force;
	    else if ("webkitForce" in touchOrMouseEvent)
	        return touchOrMouseEvent.webkitForce;
	    else {
	        return POINTER_EVENT_DEFAULT_VALUES.pressure;
	    }
	}
	/**
	 * Gets the 'twist' value of a Touch event
	 * @param {Touch} touch
	 * @returns {number}
	 */
	function getTouchTwist(touch) {
	    if ("rotationAngle" in touch)
	        return touch.rotationAngle;
	    else if ("webkitRotationAngle" in touch)
	        return touch.webkitRotationAngle;
	    else {
	        return POINTER_EVENT_DEFAULT_VALUES.twist;
	    }
	}
	/**
	 * If the event is "pointermove", and if the target is given and is an element,
	 * use whatever element is currently under the cursor.
	 * @param {number} pointerId
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @param {Touch} touch
	 * @returns {EventTarget | null}
	 */
	function getTouchTarget(pointerId, type, e, touch) {
	    var captured = POINTER_ID_TO_CAPTURED_TARGET_MAP.get(pointerId);
	    if (captured !== undefined)
	        return captured;
	    if (type !== "pointermove" || !isElement(e.target) || !isElement(e.currentTarget))
	        return e.target;
	    return findNearestRoot(e.currentTarget).elementFromPoint(touch.clientX, touch.clientY);
	}

	/**
	 * Gets the event path from a target
	 * @param {Element} target
	 * @returns {Element[]}
	 */
	function getEventPath(target) {
	    var path = [];
	    var currentElement = target;
	    while (currentElement != null) {
	        path.push(currentElement);
	        currentElement = getParent(currentElement);
	        // If the last Node is equal to the latest parentNode, break immediately
	        if (path[path.length - 1] === currentElement)
	            break;
	    }
	    return path;
	}

	/**
	 * Finds the nearest ancestor of an element that can scroll
	 * @param {Element} target
	 * @returns {IScrollAncestor}
	 */
	function findNearestAncestorsWithScroll(target) {
	    var path = [];
	    var currentElement = target;
	    while (currentElement != null) {
	        if ("style" in currentElement) {
	            var computedStyle = getComputedStyle(currentElement);
	            var overflow = computedStyle.getPropertyValue("overflow");
	            var canScrollX = overflow.startsWith("visible") || overflow.startsWith("scroll");
	            var canScrollY = overflow.endsWith("visible") || overflow.endsWith("scroll");
	            var canScroll = canScrollX || canScrollY;
	            if (canScroll) {
	                path.push({ canScrollX: canScrollX, canScrollY: canScrollY, scrollElement: currentElement });
	            }
	        }
	        var parent_1 = getParent(currentElement);
	        // If the last Node is equal to the latest parentNode, break immediately
	        if (parent_1 === currentElement)
	            break;
	        currentElement = parent_1;
	    }
	    return path;
	}

	/**
	 * Overwrites the targets for the given event
	 * @param {Event} e
	 * @param {NullableEventTarget} target
	 * @param {NullableEventTarget} currentTarget
	 * @param {NullableEventTarget} relatedTarget
	 */
	function overwriteTargetsForEvent(e, target, currentTarget, relatedTarget) {
	    // Set the original target and currentTarget on the cancel event
	    Object.defineProperties(e, __assign({}, (target === undefined
	        ? {}
	        : {
	            target: __assign({ value: target }, SHARED_DESCRIPTOR_OPTIONS)
	        }), (currentTarget === undefined
	        ? {}
	        : {
	            currentTarget: __assign({ value: currentTarget }, SHARED_DESCRIPTOR_OPTIONS)
	        }), (relatedTarget === undefined
	        ? {}
	        : {
	            relatedTarget: __assign({ value: relatedTarget }, SHARED_DESCRIPTOR_OPTIONS)
	        })));
	}

	var currentMousePointerId = POINTER_EVENT_DEFAULT_VALUES.pointerId + 1;

	var currentPenOrTouchPointerId = currentMousePointerId + 1;

	/**
	 * Gets a PointerId from a Touch
	 * @param {Touch} touch
	 * @returns {number}
	 */
	function getPointerIdFromTouch(touch) {
	    return touch.identifier + currentPenOrTouchPointerId;
	}

	/**
	 * Returns true if the given event type is cancelable, based on the given event
	 * @param {PointerEventType} type
	 * @param {MouseEvent | TouchEvent} e
	 * @returns {boolean}
	 */
	function isCancelable(type, e) {
	    switch (type) {
	        case "pointerover":
	        case "pointerdown":
	        case "pointermove":
	        case "pointerup":
	            return true;
	        default:
	            return e.cancelable;
	    }
	}

	/**
	 * Returns true if the given event type can bubble, based on the given event
	 * @param {PointerEventType} type
	 * @param {MouseEvent | TouchEvent} e
	 * @returns {boolean}
	 */
	function canBubble(type, e) {
	    switch (type) {
	        case "pointerover":
	        case "pointerdown":
	        case "pointermove":
	        case "pointerup":
	        case "pointercancel":
	        case "pointerout":
	        case "gotpointercapture":
	        case "lostpointercapture":
	            return true;
	        default:
	            return e.bubbles;
	    }
	}

	var CLONEABLE_EVENT_PROPERTIES = new Set([
	    "cancelBubble",
	    "currentTarget",
	    "defaultPrevented",
	    "eventPhase",
	    "returnValue",
	    "scoped",
	    "srcElement",
	    "timeStamp",
	    "deepPath",
	    "AT_TARGET",
	    "BUBBLING_PHASE",
	    "CAPTURING_PHASE",
	    "NONE"
	]);

	var CLONEABLE_UI_EVENT_PROPERTIES = new Set(__spread(CLONEABLE_EVENT_PROPERTIES, [
	    "view"
	], ("sourceCapabilities" in UIEvent.prototype ? ["sourceCapabilities"] : [])));

	/**
	 * Clones an Event as a new PointerEvent
	 * @param {ICloneEventAsPointerEventOptions} options
	 * @returns {PointerEvent}
	 */
	function cloneEventAsPointerEvent(_a) {
	    var dynamicPropertiesHandler = _a.dynamicPropertiesHandler, e = _a.e, initOptions = _a.initOptions, overwrittenMouseEventProperties = _a.overwrittenMouseEventProperties, type = _a.type;
	    // Create a new PointerEvent
	    var clone = new PointerEvent(type, initOptions);
	    // Preventing default on the clone will also prevent default on the original event
	    var rawPreventDefault = clone.preventDefault;
	    var rawStopPropagation = clone.stopPropagation;
	    var rawStopImmediatePropagation = clone.stopImmediatePropagation;
	    clone.preventDefault = function () {
	        rawPreventDefault.call(this);
	        if (!e.defaultPrevented) {
	            e.preventDefault();
	        }
	    };
	    // Stopping propagation on the clone will also stop propagation on the original event
	    clone.stopPropagation = function () {
	        rawStopPropagation.call(this);
	        e.stopPropagation();
	    };
	    // Stopping immediate propagation on the clone will also stop immediate propagation on the original event
	    clone.stopImmediatePropagation = function () {
	        rawStopImmediatePropagation.call(this);
	        e.stopImmediatePropagation();
	    };
	    var additionalPropsToSet = {};
	    CLONEABLE_UI_EVENT_PROPERTIES.forEach(function (key) {
	        return (additionalPropsToSet[key] = __assign({ value: e[key] }, SHARED_DESCRIPTOR_OPTIONS));
	    });
	    additionalPropsToSet = __assign({}, additionalPropsToSet, overwrittenMouseEventProperties, dynamicPropertiesHandler());
	    // Set MouseEvent (and inherited UIEvent) properties on the event object
	    Object.defineProperties(clone, additionalPropsToSet);
	    return clone;
	}

	var pointerIdToCancelFiredSet = new Set();
	/**
	 * Updates the PointerIdToCancelFiredSet
	 * @param {{type: PointerEventType, pointerId: number}} e
	 */
	function updatePointerIdToCancelFiredSet(_a) {
	    var type = _a.type, pointerId = _a.pointerId;
	    switch (type) {
	        case "pointercancel":
	            pointerIdToCancelFiredSet.add(pointerId);
	            break;
	        case "pointerdown":
	        case "pointerup":
	            pointerIdToCancelFiredSet["delete"](pointerId);
	            break;
	    }
	}

	/**
	 * Invokes a listener with the given event
	 * @param {PointerEvent} event
	 * @param {EventListenerOrEventListenerObject} listener
	 */
	function invokeListener(event, listener) {
	    typeof listener === "function" ? listener(event) : listener.handleEvent(event);
	}

	

	var styleDeclarationPropertyName = "touchAction";
	var styleAttributePropertyName = "touch-action";
	var styleAttributePropertyNameRegex = new RegExp(styleAttributePropertyName + ":\\s*([^;]*)");
	/**
	 * Finds all ancestors and their touch-action values
	 * @param {Element} target
	 * @returns {ITouchActionAncestor[]}
	 */
	function findNearestAncestorsWithTouchAction(target) {
	    var path = [];
	    var currentElement = target;
	    while (currentElement != null) {
	        var touchActionPropertyValue = null;
	        if ("style" in currentElement) {
	            touchActionPropertyValue = currentElement.style[styleDeclarationPropertyName];
	            if (touchActionPropertyValue == null || touchActionPropertyValue === "") {
	                var styleAttributeValue = currentElement.getAttribute("style");
	                if (styleAttributeValue != null && styleAttributeValue.includes(styleAttributePropertyName)) {
	                    var match = styleAttributeValue.match(styleAttributePropertyNameRegex);
	                    if (match != null) {
	                        var _a = __read(match, 2), values = _a[1];
	                        touchActionPropertyValue = values;
	                    }
	                }
	            }
	            if (touchActionPropertyValue == null || touchActionPropertyValue === "") {
	                var attributeValue = target.getAttribute("touch-action");
	                if (attributeValue != null && attributeValue !== "") {
	                    touchActionPropertyValue = attributeValue;
	                }
	            }
	            if (touchActionPropertyValue != null) {
	                path.push({
	                    element: currentElement,
	                    touchAction: new Set(touchActionPropertyValue.split(/\s/).map(function (part) { return part.trim(); }))
	                });
	            }
	        }
	        var parent_1 = getParent(currentElement);
	        // If the last Node is equal to the latest parentNode, break immediately
	        if (parent_1 === currentElement)
	            break;
	        currentElement = parent_1;
	    }
	    return path;
	}

	// tslint:disable:no-any
	// tslint:disable:no-identical-conditions
	// tslint:disable:no-collapsible-if
	/**
	 * The name of the property to extend TouchEvents with
	 * @type {string}
	 */
	var TOUCH_ACTION_PROPERTY_NAME = "___touchAction___";
	/**
	 * How great the different between a touchstart and touchmove before it is determined that panning is undergoing
	 * @type {number}
	 */
	var PANNING_DIFFERENCE_THRESHOLD = 5;
	/**
	 * The PointerEvents to track during scrolling
	 * @type {(string)[]}
	 */
	var POINTER_EVENTS_TO_TRACK = ["pointercancel", "pointerleave", "pointerup", "pointerout"];
	var LAST_POINTER_DOWN_EVENT_FOR_POINTER_ID = new Map();
	/**
	 * Handles all those dynamic properties that are specific for a specific PointerEvent type on Touch devices
	 * @param {number} pointerId
	 * @param {PointerEventType} type
	 * @param {Touch} currentTouch
	 * @param {TouchEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForPointerEventOnTouch(pointerId, type, currentTouch, e) {
	    switch (type) {
	        case "pointerdown":
	        case "pointermove":
	        case "pointerup":
	        case "pointerover":
	        case "pointerenter":
	        case "gotpointercapture":
	        case "lostpointercapture":
	            return handleDynamicPropertiesForContactTouch(pointerId, type, currentTouch, e);
	        case "pointercancel":
	        case "pointerout":
	        case "pointerleave":
	            return handleDynamicPropertiesForNoContactTouch(pointerId, type, currentTouch, e);
	        default:
	            throw new TypeError("Error: Could not handle dynamic properties for a PointerEvent of type: '" + type + "'");
	    }
	}
	/**
	 * Handles all those dynamic properties that are specific for pointercancel/pointerleave/pointerout events on Touch devices
	 * @param {number} pointerId
	 * @param {PointerEventType} type
	 * @param {Touch} touch
	 * @param {TouchEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForNoContactTouch(pointerId, type, touch, e) {
	    return {
	        target: __assign({ value: getTouchTarget(pointerId, type, e, touch) }, SHARED_DESCRIPTOR_OPTIONS),
	        // For everything other than pointerover/pointerleave/pointerout/pointerenter, the related target should be null
	        // https://www.w3.org/TR/pointerevents2/
	        relatedTarget: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS),
	        button: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        buttons: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        clientX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        clientY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        width: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.width }, SHARED_DESCRIPTOR_OPTIONS),
	        height: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.height }, SHARED_DESCRIPTOR_OPTIONS),
	        pressure: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.pressure }, SHARED_DESCRIPTOR_OPTIONS),
	        tangentialPressure: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tangentialPressure }, SHARED_DESCRIPTOR_OPTIONS),
	        tiltX: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tiltX }, SHARED_DESCRIPTOR_OPTIONS),
	        tiltY: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tiltY }, SHARED_DESCRIPTOR_OPTIONS),
	        twist: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.twist }, SHARED_DESCRIPTOR_OPTIONS),
	        layerX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        layerY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        movementX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        movementY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        pageX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        pageY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        screenX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        screenY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        x: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        y: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS)
	    };
	}
	/**
	 * Handles all those dynamic properties that are specific for pointercancel events on Touch devices
	 * @param {number} pointerId
	 * @param {string} type
	 * @param {Touch} currentTouch
	 * @param {TouchEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForContactTouch(pointerId, type, currentTouch, e) {
	    var offsetX = currentTouch.clientX - (isElement(currentTouch.target) ? currentTouch.target.offsetLeft : 0);
	    var offsetY = currentTouch.clientY - (isElement(currentTouch.target) ? currentTouch.target.offsetTop : 0);
	    var offsetParent = "offsetParent" in currentTouch.target ? currentTouch.target : null;
	    var layerX = offsetParent == null ? offsetX : currentTouch.clientX - offsetParent.offsetLeft;
	    var layerY = offsetParent == null ? offsetY : currentTouch.clientY - offsetParent.offsetTop;
	    return {
	        target: __assign({ value: getTouchTarget(pointerId, type, e, currentTouch) }, SHARED_DESCRIPTOR_OPTIONS),
	        // For everything other than pointerover/pointerleave/pointerout/pointerenter, the related target should be null
	        // https://www.w3.org/TR/pointerevents2/
	        relatedTarget: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS),
	        button: __assign({ 
	            // Touch contact are indicated by the button value 0
	            value: type === "gotpointercapture" ? -1 : 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        buttons: __assign({ 
	            // During Touch contact, there is a single button in use, hence the value of 1
	            value: type === "pointerup" || type === "lostpointercapture" ? 0 : 1 }, SHARED_DESCRIPTOR_OPTIONS),
	        clientX: __assign({ value: currentTouch.clientX }, SHARED_DESCRIPTOR_OPTIONS),
	        clientY: __assign({ value: currentTouch.clientY }, SHARED_DESCRIPTOR_OPTIONS),
	        screenX: __assign({ value: currentTouch.screenX }, SHARED_DESCRIPTOR_OPTIONS),
	        screenY: __assign({ value: currentTouch.screenY }, SHARED_DESCRIPTOR_OPTIONS),
	        pageX: __assign({ value: currentTouch.pageX }, SHARED_DESCRIPTOR_OPTIONS),
	        pageY: __assign({ value: currentTouch.pageY }, SHARED_DESCRIPTOR_OPTIONS),
	        x: __assign({ value: currentTouch.clientX }, SHARED_DESCRIPTOR_OPTIONS),
	        y: __assign({ value: currentTouch.clientY }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetX: __assign({ value: offsetX }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetY: __assign({ value: offsetY }, SHARED_DESCRIPTOR_OPTIONS),
	        layerX: __assign({ value: layerX }, SHARED_DESCRIPTOR_OPTIONS),
	        layerY: __assign({ value: layerY }, SHARED_DESCRIPTOR_OPTIONS),
	        // For both pointerdown and pointer up events, there has been no movement since the previous event. This is only applicable to pointermove events
	        movementX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // For both pointerdown and pointer up events, there has been no movement since the previous event. This is only applicable to pointermove events
	        movementY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // The width and height in CSS pixels of the contact geometry of the pointer.
	        // Will use the radiusX or webkitRadiusX properties of Touch Events to determine this
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        width: __assign({ value: getTouchWidth(currentTouch) }, SHARED_DESCRIPTOR_OPTIONS),
	        height: __assign({ value: getTouchHeight(currentTouch) }, SHARED_DESCRIPTOR_OPTIONS),
	        // Some browsers like iOS safari reports force values for touches which we can use to determine the pressure.
	        // For "pointerup" events, the pressure will always be 0
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        pressure: __assign({ value: getPressure(type, currentTouch) }, SHARED_DESCRIPTOR_OPTIONS),
	        // There is no known way to detect the tangential pressure currently, so we just default to setting this to 0
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tangentialPressure: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tangentialPressure }, SHARED_DESCRIPTOR_OPTIONS),
	        // Touch pointers doesn't support tilt. Default to values of zero
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tiltX: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tiltX }, SHARED_DESCRIPTOR_OPTIONS),
	        tiltY: __assign({ value: POINTER_EVENT_DEFAULT_VALUES.tiltY }, SHARED_DESCRIPTOR_OPTIONS),
	        // Gets the rotation angle, in degrees, of the contact area ellipse
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        twist: __assign({ value: getTouchTwist(currentTouch) }, SHARED_DESCRIPTOR_OPTIONS)
	    };
	}
	/**
	 * Handles whatever logic needs to come before any given kind of TouchEvent
	 * @param {PointerEventType} pointerEventType
	 * @param {EventTarget} eventTarget
	 * @param {TouchEvent} e
	 * @param {PointerEvent[]} pointerEvents
	 */
	function handlePrePointerEventForTouch(pointerEventType, eventTarget, e, pointerEvents) {
	    switch (pointerEventType) {
	        case "pointermove":
	            if (isElement(e.target) && isElement(e.currentTarget)) {
	                var touchAction_1 = e[TOUCH_ACTION_PROPERTY_NAME];
	                // If only panning in the [x|y]-axis is allowed, test if panning is attempted in the [x|y]-axis and prevent it if that is the case
	                if (touchAction_1 !== "auto") {
	                    pointerEvents.forEach(function (_a) {
	                        var pointerId = _a.pointerId, clientX = _a.clientX, clientY = _a.clientY;
	                        if (e.cancelable && !e.defaultPrevented) {
	                            // Take the last known pointer down event
	                            var pointerDownEvent = LAST_POINTER_DOWN_EVENT_FOR_POINTER_ID.get(pointerId);
	                            if (pointerDownEvent == null)
	                                return;
	                            var diffX = clientX - pointerDownEvent.clientX;
	                            var absDiffX = Math.abs(diffX);
	                            var diffY = clientY - pointerDownEvent.clientY;
	                            var absDiffY = Math.abs(diffY);
	                            var isPanningX = absDiffX > PANNING_DIFFERENCE_THRESHOLD && absDiffX > absDiffY;
	                            var isPanningY = absDiffY > PANNING_DIFFERENCE_THRESHOLD && absDiffY > absDiffX;
	                            var isPanningUp = diffY > 0;
	                            var isPanningDown = diffY < 0;
	                            var isPanningLeft = diffX > 0;
	                            var isPanningRight = diffX < 0;
	                            if (touchAction_1 === "none") {
	                                // Prevent touchmove from performing its default behavior if horizontal or vertical movement happens and none if allowed
	                                if (isPanningX || isPanningY) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-y") {
	                                // Prevent touchmove from performing its default behavior if horizontal movement happens, but only vertical scrolling is allowed
	                                if (isPanningX) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-y pan-left") {
	                                // Prevent touchmove from performing its default behavior if right-going horizontal movement happens
	                                if (isPanningRight) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-y pan-right") {
	                                // Prevent touchmove from performing its default behavior if left-going horizontal movement happens
	                                if (isPanningLeft) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-up") {
	                                if (!isPanningUp) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-down") {
	                                if (!isPanningDown) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-left") {
	                                if (!isPanningLeft) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-right") {
	                                if (!isPanningRight) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-x") {
	                                // Prevent touchmove from performing its default behavior if vertical movement happens, but only horizontal scrolling is allowed
	                                if (isPanningY) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-x pan-up") {
	                                // Prevent touchmove from performing its default behavior if down-going vertical movement happens
	                                if (isPanningDown) {
	                                    e.preventDefault();
	                                }
	                            }
	                            else if (touchAction_1 === "pan-x pan-down") {
	                                // Prevent touchmove from performing its default behavior if up-going vertical movement happens
	                                if (isPanningUp) {
	                                    e.preventDefault();
	                                }
	                            }
	                        }
	                    });
	                    break;
	                }
	                // If the target is not equal to the original target
	                if (e.target !== e.currentTarget) {
	                    // If none of the touches has a pointer id that is used for capturing pointer events and binding them to the current target of the event, do nothing
	                    if (Array.from(e.changedTouches).some(function (touch) { return POINTER_ID_TO_CAPTURED_TARGET_MAP.has(getPointerIdFromTouch(touch)); })) {
	                        break;
	                    }
	                    // Fire a "pointercancel" event if/when the target is no longer equal to the original target
	                    createPointerEventsForTouchOfTypeAndDispatch("pointercancel", e, eventTarget);
	                }
	            }
	            break;
	        case "pointerdown":
	            // All "pointerdown" events must be preceded by a "pointerover" event
	            // https://www.w3.org/TR/pointerevents/#the-pointerover-event
	            createPointerEventsForTouchOfTypeAndDispatch("pointerover", e, eventTarget);
	            // All "pointerdown" events must be preceded by a "pointerenter" event
	            // https://www.w3.org/TR/pointerevents/#the-pointerover-event
	            createPointerEventsForTouchOfTypeAndDispatch("pointerenter", e, eventTarget);
	            break;
	    }
	}
	/**
	 * Handles whatever logic needs to follow any given kind of TouchEvent
	 * @param {PointerEventType} pointerEventType
	 * @param {EventTarget} eventTarget
	 * @param {TouchEvent} e
	 */
	function handlePostPointerEventForTouch(pointerEventType, eventTarget, e) {
	    // Store a reference to the event target and event currentTarget. These may change in the meantime, but we are going to need them when cloning the event
	    var target = e.target;
	    var currentTarget = e.currentTarget;
	    // Immediately after pointerup or pointercancel events, a user agent MUST clear any pointer capture target overrides
	    // https://www.w3.org/TR/pointerevents/#implicit-release-of-pointer-capture
	    if (pointerEventType === "pointerup" || pointerEventType === "pointercancel") {
	        Array.from(e.changedTouches).forEach(function (touch) {
	            var pointerId = getPointerIdFromTouch(touch);
	            var match = POINTER_ID_TO_CAPTURED_TARGET_MAP.get(pointerId);
	            if (match != null && isElement(match)) {
	                match.releasePointerCapture(pointerId);
	            }
	        });
	    }
	    switch (pointerEventType) {
	        case "pointerdown":
	            // The equivalent event is "touchcancel" which won't fire when the finger leaves the element
	            // or when scrolling happens. We need to enforce this behavior to follow the spec.
	            // https://www.w3.org/TR/pointerevents2/#the-pointercancel-event
	            if (isElement(e.currentTarget)) {
	                /**
	                 * We need to listen for "pointermove" events to continuously monitor and update the target
	                 */
	                var pointerMoveHandler_1 = function () { };
	                /**
	                 * We need to make sure to unbind the handler to avoid memory leaks
	                 */
	                var unbindPointerMoveHandler_1 = function () {
	                    eventTarget.removeEventListener("pointermove", pointerMoveHandler_1);
	                    if (POINTER_EVENTS_TO_TRACK != null) {
	                        POINTER_EVENTS_TO_TRACK.forEach(function (type) {
	                            eventTarget.removeEventListener(type, unbindPointerMoveHandler_1);
	                        });
	                    }
	                };
	                eventTarget.addEventListener("pointermove", pointerMoveHandler_1);
	                var ancestorsWithScroll_1 = findNearestAncestorsWithScroll(e.currentTarget);
	                var hasFiredScrollEvent_1 = false;
	                /**
	                 * Unbind the scroll listeners to avoid memory leaks and unnecessary computations
	                 */
	                var unbindScrollListeners_1 = function () {
	                    // Then remove all listeners for scroll events
	                    if (ancestorsWithScroll_1 != null) {
	                        ancestorsWithScroll_1.forEach(function (_a) {
	                            var scrollElement = _a.scrollElement;
	                            return scrollElement.removeEventListener("scroll", scrollHandler_1);
	                        });
	                        ancestorsWithScroll_1 = null;
	                    }
	                    if (POINTER_EVENTS_TO_TRACK != null) {
	                        POINTER_EVENTS_TO_TRACK.forEach(function (type) {
	                            eventTarget.removeEventListener(type, unbindScrollListeners_1);
	                        });
	                    }
	                };
	                /**
	                 * When a scroll event happens, fire a 'pointercancel' event on the element
	                 */
	                var scrollHandler_1 = function () {
	                    if (!hasFiredScrollEvent_1) {
	                        hasFiredScrollEvent_1 = true;
	                        // Re-set the target and currentTarget to the values the event had before.
	                        // It may have changed in the meantime
	                        overwriteTargetsForEvent(e, target, currentTarget);
	                        // Construct a new event and fire it on the EventTarget
	                        createPointerEventsForTouchOfTypeAndDispatch("pointercancel", e, eventTarget);
	                    }
	                    unbindScrollListeners_1();
	                };
	                // Hook up listeners for "scroll" events on all scroll ancestors
	                ancestorsWithScroll_1.forEach(function (_a) {
	                    var scrollElement = _a.scrollElement;
	                    return scrollElement.addEventListener("scroll", scrollHandler_1);
	                });
	                // Make sure to also unbind the scroll handlers on various related PointerEvents
	                POINTER_EVENTS_TO_TRACK.forEach(function (pointerEventToTrack) {
	                    eventTarget.addEventListener(pointerEventToTrack, unbindScrollListeners_1);
	                    eventTarget.addEventListener(pointerEventToTrack, unbindPointerMoveHandler_1);
	                });
	            }
	            break;
	        case "pointercancel":
	            // If we're having to do with a 'pointercancel' event,
	            // The spec requires a "pointerout" and "pointerleave" event to be fired immediately after.
	            // https://www.w3.org/TR/pointerevents2/#the-pointercancel-event
	            createPointerEventsForTouchOfTypeAndDispatch("pointerout", e, eventTarget);
	            createPointerEventsForTouchOfTypeAndDispatch("pointerleave", e, eventTarget);
	            break;
	    }
	}
	/**
	 * Handles touch-action values for an event
	 * @param {PointerEventType} _type
	 * @param {PointerEvent} e
	 */
	function handleTouchAction(_type, e) {
	    // Only consider pointerdown events here
	    if (!isElement(e.currentTarget))
	        return;
	    var touchActionAncestors = findNearestAncestorsWithTouchAction(e.currentTarget);
	    var hasTouchActionNoneAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("none"); });
	    var hasPanXAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-x"); });
	    var hasPanYAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-y"); });
	    var hasPanUpAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-up"); });
	    var hasPanDownAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-down"); });
	    var hasPanLeftAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-left"); });
	    var hasPanRightAncestor = touchActionAncestors.some(function (ancestor) { return ancestor.touchAction.has("pan-right"); });
	    var canPanX = hasTouchActionNoneAncestor || hasPanXAncestor || (hasPanLeftAncestor && hasPanRightAncestor);
	    var canPanY = hasTouchActionNoneAncestor || hasPanYAncestor || (hasPanUpAncestor && hasPanDownAncestor);
	    if (canPanX && canPanY) {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "none" });
	    }
	    else if (canPanX) {
	        if (hasPanUpAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-x pan-up"
	            });
	        }
	        else if (hasPanDownAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-x pan-down"
	            });
	        }
	        else {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "pan-x" });
	        }
	    }
	    else if (canPanY) {
	        if (hasPanLeftAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-y pan-left"
	            });
	        }
	        else if (hasPanRightAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-y pan-right"
	            });
	        }
	        else {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "pan-y" });
	        }
	    }
	    else if (hasPanUpAncestor) {
	        if (hasPanLeftAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-up pan-left"
	            });
	        }
	        else if (hasPanRightAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-up pan-right"
	            });
	        }
	    }
	    else if (hasPanDownAncestor) {
	        if (hasPanLeftAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-down pan-left"
	            });
	        }
	        else if (hasPanRightAncestor) {
	            Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	                value: "pan-down pan-right"
	            });
	        }
	    }
	    else if (hasPanLeftAncestor) {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "pan-left" });
	    }
	    else if (hasPanRightAncestor) {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, {
	            value: "pan-right"
	        });
	    }
	    else if (hasPanUpAncestor) {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "pan-up" });
	    }
	    else if (hasPanDownAncestor) {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "pan-down" });
	    }
	    else {
	        Object.defineProperty(e, TOUCH_ACTION_PROPERTY_NAME, { value: "auto" });
	    }
	}
	/**
	 * Creates a PointerEvent based on a TouchEvent of the given type
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @returns {PointerEvent[]}
	 */
	function createPointerEventsForTouchOfType(type, e) {
	    handleTouchAction(type, e);
	    return Array.from(e.changedTouches)
	        .map(function (currentTouch) {
	        // For Touch, each active pointer corresponds to a finger in direct contact with the digitizer
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        var pointerId = getPointerIdFromTouch(currentTouch);
	        var initOptions = __assign({}, e, { pointerId: pointerId, pointerType: "touch", 
	            // The Touch will be primary if it is the first touch of the list
	            // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	            isPrimary: currentTouch === e.changedTouches[0], bubbles: canBubble(type, e), cancelable: isCancelable(type, e) });
	        // Prevent the event if cancel has been fired and it isn't an event that will always be fired after pointercancel events
	        var shouldPreventBecauseCanceled = type !== "pointerout" && type !== "pointerleave" && pointerIdToCancelFiredSet.has(pointerId);
	        if (shouldPreventBecauseCanceled) {
	            if (e.cancelable && !e.defaultPrevented) {
	                e.preventDefault();
	            }
	            // Update the Set since this won't be invoked otherwise
	            updatePointerIdToCancelFiredSet({ type: type, pointerId: pointerId });
	            return null;
	        }
	        // Define all properties of MouseEvents that should be set on the event object
	        // noinspection JSDeprecatedSymbols
	        var overwrittenMouseEventProperties = __assign({ scoped: __assign({ value: e.scoped }, SHARED_DESCRIPTOR_OPTIONS), 
	            // The 'fromElement' property should be set to 'null' for interoperability reasons according to the spec
	            // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	            fromElement: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS), 
	            // The 'toElement' property should be set to 'null' for interoperability reasons according to the spec
	            // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	            toElement: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS), 
	            // The 'detail' property should always have a value of 0
	            // https://www.w3.org/TR/pointerevents/#attributes-and-default-actions
	            detail: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS), 
	            // The 'composed' property should always have a value of true
	            // https://www.w3.org/TR/pointerevents/#attributes-and-default-actions
	            composed: __assign({ value: true }, SHARED_DESCRIPTOR_OPTIONS), composedPath: __assign({ value: function () { return getEventPath(e.target); } }, SHARED_DESCRIPTOR_OPTIONS) }, (!("region" in Touch.prototype)
	            ? {}
	            : {
	                region: __assign({ value: currentTouch.region }, SHARED_DESCRIPTOR_OPTIONS)
	            }), (!("path" in Event.prototype) || !isElement(currentTouch.target)
	            ? {}
	            : {
	                path: __assign({ value: getEventPath(currentTouch.target) }, SHARED_DESCRIPTOR_OPTIONS)
	            }), (!("deepPath" in Event.prototype) || !isElement(currentTouch.target)
	            ? {}
	            : {
	                path: __assign({ value: function () { return getEventPath(currentTouch.target); } }, SHARED_DESCRIPTOR_OPTIONS)
	            }));
	        // Create a new PointerEvent
	        var clonedEvent = cloneEventAsPointerEvent({
	            e: e,
	            type: type,
	            initOptions: initOptions,
	            overwrittenMouseEventProperties: overwrittenMouseEventProperties,
	            dynamicPropertiesHandler: function () { return handleDynamicPropertiesForPointerEventOnTouch(pointerId, type, currentTouch, e); }
	        });
	        overwriteTargetsForEvent(e, clonedEvent.target, clonedEvent.currentTarget, clonedEvent.relatedTarget);
	        // Store a reference to the last constructed "pointerdown" event
	        if (type === "pointerdown") {
	            LAST_POINTER_DOWN_EVENT_FOR_POINTER_ID.set(pointerId, clonedEvent);
	        }
	        return clonedEvent;
	    })
	        .filter(function (ev) { return ev != null; });
	}
	/**
	 * Creates a PointerEvent based on a TouchEvent of the given type and invokes the listener with it
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @param {EventTarget} eventTarget
	 * @param {EventListenerOrEventListenerObject} listener
	 */
	function createPointerEventsForTouchOfTypeAndInvoke(type, e, eventTarget, listener) {
	    var pointerEvents = createPointerEventsForTouchOfType(type, e);
	    // Handle whatever needs to come before the TouchEvent
	    handlePrePointerEventForTouch(type, eventTarget, e, pointerEvents);
	    pointerEvents.forEach(function (clone) {
	        updatePointerIdToCancelFiredSet(clone);
	        // Invoke the listener with the cloned event
	        invokeListener(clone, listener);
	    });
	    // Handle whatever needs to come after the TouchEvent
	    handlePostPointerEventForTouch(type, eventTarget, e);
	}
	/**
	 * Creates a PointerEvent based on a TouchEvent of the given type and dispatches an event on the event target
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @param {EventTarget} eventTarget
	 */
	function createPointerEventsForTouchOfTypeAndDispatch(type, e, eventTarget) {
	    var pointerEvents = createPointerEventsForTouchOfType(type, e);
	    // Handle whatever needs to come before the TouchEvent
	    handlePrePointerEventForTouch(type, eventTarget, e, pointerEvents);
	    pointerEvents.forEach(function (clone) {
	        updatePointerIdToCancelFiredSet(clone);
	        // Dispatch the event on the target
	        eventTarget.dispatchEvent(clone);
	    });
	    // Handle whatever needs to come after the TouchEvent
	    handlePostPointerEventForTouch(type, eventTarget, e);
	}
	/**
	 * Handles a PointerEvent for a Touch device
	 * @param {EventTarget} eventTarget
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @param {EventListenerOrEventListenerObject} listener
	 */
	function handlePointerEventForTouch(eventTarget, type, e, listener) {
	    createPointerEventsForTouchOfTypeAndInvoke(type, e, eventTarget, listener);
	}

	

	/**
	 * Gets the target for a MouseEvent
	 * @param {number} pointerId
	 * @param {MouseEvent} e
	 * @returns {EventTarget | null}
	 */
	function getMouseTarget(pointerId, e) {
	    var captured = POINTER_ID_TO_CAPTURED_TARGET_MAP.get(pointerId);
	    if (captured !== undefined) {
	        return captured;
	    }
	    return e.target;
	}

	// tslint:disable:no-any
	/**
	 * A Map between Event Targets and disposable objects
	 * @type {Map<EventTarget, IDisposable>}
	 */
	var POINTER_UP_FALLBACK_LISTENER_MAP = new Map();
	/**
	 * Dispatches a 'pointerup' event the next time a 'mouseup' event is fired on the window
	 * @param {MouseEvent} e
	 * @returns {IDisposable}
	 */
	function dispatchPointerUpForPointerEventOnNextGlobalUpEvent(e) {
	    var target = e.target, currentTarget = e.currentTarget;
	    var dispose = function () {
	        window.removeEventListener("mouseup", handler);
	    };
	    var handler = function (upEvent) {
	        // Use the coordinate-specific values from the mouseup event and set it on the constructed 'pointerup' event
	        var _a = isElement(currentTarget) ? currentTarget.getBoundingClientRect() : { left: 0, top: 0 }, left = _a.left, top = _a.top;
	        createPointerEventsForMouseOfTypeAndDispatch("pointerup", e, currentTarget, {
	            target: __assign({ value: target }, SHARED_DESCRIPTOR_OPTIONS),
	            currentTarget: __assign({ value: currentTarget }, SHARED_DESCRIPTOR_OPTIONS),
	            clientX: __assign({ value: upEvent.clientX }, SHARED_DESCRIPTOR_OPTIONS),
	            clientY: __assign({ value: upEvent.clientY }, SHARED_DESCRIPTOR_OPTIONS),
	            screenX: __assign({ value: upEvent.screenX }, SHARED_DESCRIPTOR_OPTIONS),
	            screenY: __assign({ value: upEvent.screenY }, SHARED_DESCRIPTOR_OPTIONS),
	            layerX: __assign({ value: upEvent.layerX }, SHARED_DESCRIPTOR_OPTIONS),
	            layerY: __assign({ value: upEvent.layerY }, SHARED_DESCRIPTOR_OPTIONS),
	            movementX: __assign({ value: upEvent.movementX }, SHARED_DESCRIPTOR_OPTIONS),
	            movementY: __assign({ value: upEvent.movementY }, SHARED_DESCRIPTOR_OPTIONS),
	            offsetX: __assign({ value: upEvent.clientX - left }, SHARED_DESCRIPTOR_OPTIONS),
	            offsetY: __assign({ value: upEvent.clientY - top }, SHARED_DESCRIPTOR_OPTIONS),
	            pageX: __assign({ value: upEvent.pageX }, SHARED_DESCRIPTOR_OPTIONS),
	            pageY: __assign({ value: upEvent.pageY }, SHARED_DESCRIPTOR_OPTIONS),
	            x: __assign({ value: upEvent.x }, SHARED_DESCRIPTOR_OPTIONS),
	            y: __assign({ value: upEvent.y }, SHARED_DESCRIPTOR_OPTIONS)
	        });
	        dispose();
	    };
	    window.addEventListener("mouseup", handler);
	    return { dispose: dispose };
	}
	/**
	 * Handles whatever logic needs to follow any given kind of MouseEvent
	 * @param {PointerEventType} pointerEventType
	 * @param {MouseEvent} e
	 */
	function handlePostPointerEventForMouse(pointerEventType, e) {
	    switch (pointerEventType) {
	        case "pointercancel":
	        case "pointerup":
	            // Clean up after the global "pointerup" listener, if it exists
	            if (e.currentTarget != null && POINTER_UP_FALLBACK_LISTENER_MAP.has(e.currentTarget)) {
	                var handler = POINTER_UP_FALLBACK_LISTENER_MAP.get(e.currentTarget);
	                // Clear the global listener for "mouseup" events
	                handler.dispose();
	                POINTER_UP_FALLBACK_LISTENER_MAP["delete"](e.currentTarget);
	            }
	            // Immediately after pointerup or pointercancel events, a user agent MUST clear any pointer capture target overrides
	            // https://www.w3.org/TR/pointerevents/#implicit-release-of-pointer-capture
	            var match = POINTER_ID_TO_CAPTURED_TARGET_MAP.get(currentMousePointerId);
	            if (match != null && isElement(match)) {
	                match.releasePointerCapture(currentMousePointerId);
	            }
	            break;
	        case "pointerdown":
	            if (e.currentTarget != null && !POINTER_UP_FALLBACK_LISTENER_MAP.has(e.currentTarget)) {
	                POINTER_UP_FALLBACK_LISTENER_MAP.set(e.currentTarget, dispatchPointerUpForPointerEventOnNextGlobalUpEvent(e));
	            }
	    }
	}
	/**
	 * Handles all those dynamic properties that are specific for pointerdown or pointerup events on Mouse devices
	 * @param {number} pointerId
	 * @param {string} type
	 * @param {MouseEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForContactMouse(pointerId, type, e) {
	    return {
	        target: __assign({ value: getMouseTarget(pointerId, e) }, SHARED_DESCRIPTOR_OPTIONS),
	        button: __assign({ 
	            // If the pointer is simply over the element, no pointer contact has changed since last event.
	            // https://www.w3.org/TR/pointerevents2/#the-button-property
	            value: type === "pointerover" || type === "gotpointercapture" ? -1 : type === "lostpointercapture" ? 0 : e.button }, SHARED_DESCRIPTOR_OPTIONS),
	        buttons: __assign({ value: type === "lostpointercapture" ? 0 : type === "gotpointercapture" ? 1 : e.buttons }, SHARED_DESCRIPTOR_OPTIONS),
	        clientX: __assign({ value: e.clientX }, SHARED_DESCRIPTOR_OPTIONS),
	        clientY: __assign({ value: e.clientY }, SHARED_DESCRIPTOR_OPTIONS),
	        screenX: __assign({ value: e.screenX }, SHARED_DESCRIPTOR_OPTIONS),
	        screenY: __assign({ value: e.screenY }, SHARED_DESCRIPTOR_OPTIONS),
	        layerX: __assign({ value: e.layerX }, SHARED_DESCRIPTOR_OPTIONS),
	        layerY: __assign({ value: e.layerY }, SHARED_DESCRIPTOR_OPTIONS),
	        movementX: __assign({ value: e.movementX }, SHARED_DESCRIPTOR_OPTIONS),
	        movementY: __assign({ value: e.movementY }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetX: __assign({ value: e.offsetX }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetY: __assign({ value: e.offsetY }, SHARED_DESCRIPTOR_OPTIONS),
	        pageX: __assign({ value: e.pageX }, SHARED_DESCRIPTOR_OPTIONS),
	        pageY: __assign({ value: e.pageY }, SHARED_DESCRIPTOR_OPTIONS),
	        x: __assign({ value: e.x }, SHARED_DESCRIPTOR_OPTIONS),
	        y: __assign({ value: e.y }, SHARED_DESCRIPTOR_OPTIONS),
	        // For everything other than pointerover/pointerleave/pointerout/pointerenter, the related target should be null
	        // https://www.w3.org/TR/pointerevents2/
	        relatedTarget: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS),
	        // The width and height of active mouse and pen pointers are always equal to 1
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        width: __assign({ value: 1 }, SHARED_DESCRIPTOR_OPTIONS),
	        height: __assign({ value: 1 }, SHARED_DESCRIPTOR_OPTIONS),
	        // if the device doesn't support pressure (mice and pens doesn't), the pressure is always 0.5 except for "up" events (which is zero)
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        pressure: __assign({ value: getPressure(type, e) }, SHARED_DESCRIPTOR_OPTIONS),
	        // if the device doesn't support tangential pressure (mice and pens doesn't), the value is always 0
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tangentialPressure: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // Mouse pointers doesn't support tilt. Default to values of zero
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tiltX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        tiltY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // Mouse pointers doesn't support twist. Default to values of zero
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        twist: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS)
	    };
	}
	/**
	 * Handles all those dynamic properties that are specific for pointerout or pointerleave events on Mouse devices
	 * @param {number} pointerId
	 * @param {MouseEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForNoContactMouse(pointerId, e) {
	    return {
	        target: __assign({ value: getMouseTarget(pointerId, e) }, SHARED_DESCRIPTOR_OPTIONS),
	        button: __assign({ value: e.button }, SHARED_DESCRIPTOR_OPTIONS),
	        buttons: __assign({ value: e.buttons }, SHARED_DESCRIPTOR_OPTIONS),
	        clientX: __assign({ value: e.clientX }, SHARED_DESCRIPTOR_OPTIONS),
	        clientY: __assign({ value: e.clientY }, SHARED_DESCRIPTOR_OPTIONS),
	        screenX: __assign({ value: e.screenX }, SHARED_DESCRIPTOR_OPTIONS),
	        screenY: __assign({ value: e.screenY }, SHARED_DESCRIPTOR_OPTIONS),
	        layerX: __assign({ value: e.layerX }, SHARED_DESCRIPTOR_OPTIONS),
	        layerY: __assign({ value: e.layerY }, SHARED_DESCRIPTOR_OPTIONS),
	        movementX: __assign({ value: e.movementX }, SHARED_DESCRIPTOR_OPTIONS),
	        movementY: __assign({ value: e.movementY }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetX: __assign({ value: e.offsetX }, SHARED_DESCRIPTOR_OPTIONS),
	        offsetY: __assign({ value: e.offsetY }, SHARED_DESCRIPTOR_OPTIONS),
	        pageX: __assign({ value: e.pageX }, SHARED_DESCRIPTOR_OPTIONS),
	        pageY: __assign({ value: e.pageY }, SHARED_DESCRIPTOR_OPTIONS),
	        x: __assign({ value: e.x }, SHARED_DESCRIPTOR_OPTIONS),
	        y: __assign({ value: e.y }, SHARED_DESCRIPTOR_OPTIONS),
	        relatedTarget: __assign({ value: e.relatedTarget }, SHARED_DESCRIPTOR_OPTIONS),
	        // The width and height of active mouse and pen pointers are always equal to 1
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        width: __assign({ value: 1 }, SHARED_DESCRIPTOR_OPTIONS),
	        height: __assign({ value: 1 }, SHARED_DESCRIPTOR_OPTIONS),
	        // if the device doesn't support pressure (mice and pens doesn't), the pressure is always 0.5 except for "up" events (which is zero)
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        pressure: __assign({ value: getPressure("pointerout", e) }, SHARED_DESCRIPTOR_OPTIONS),
	        // if the device doesn't support tangential pressure (mice and pens doesn't), the value is always 0
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tangentialPressure: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // Mouse pointers doesn't support tilt. Default to values of zero
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        tiltX: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        tiltY: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS),
	        // Mouse pointers doesn't support twist. Default to values of zero
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        twist: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS)
	    };
	}
	/**
	 * Handles all those dynamic properties that are specific for a specific PointerEvent type on Mouse devices
	 * @param {number} pointerId
	 * @param {PointerEventType} type
	 * @param {MouseEvent} e
	 * @returns {{[Key in DynamicPointerEventProperty]: PropertyDescriptor}}
	 */
	function handleDynamicPropertiesForPointerEventOnMouse(pointerId, type, e) {
	    switch (type) {
	        case "pointerdown":
	        case "pointermove":
	        case "pointerup":
	        case "pointerover":
	        case "pointerenter":
	        case "gotpointercapture":
	        case "lostpointercapture":
	            return handleDynamicPropertiesForContactMouse(pointerId, type, e);
	        case "pointerout":
	        case "pointerleave":
	        case "pointercancel":
	            return handleDynamicPropertiesForNoContactMouse(pointerId, e);
	        default:
	            throw new TypeError("Error: Could not handle dynamic properties for a PointerEvent of type: '" + type + "'");
	    }
	}
	/**
	 * Creates a PointerEvent based on a MouseEvent of the given type
	 * @param {PointerEventType} type
	 * @param {MouseEvent} e
	 * @returns {PointerEvent[]}
	 */
	function createPointerEventsForMouseOfType(type, e) {
	    var pointerId = currentMousePointerId;
	    var initOptions = __assign({}, e, { 
	        // Mice are always active pointers, so their pointer ids won't increment
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        pointerId: pointerId, pointerType: "mouse", 
	        // Mouse pointers are always active and always considered primary, even if multiple mouse devices are connected
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        isPrimary: true, bubbles: canBubble(type, e), cancelable: isCancelable(type, e) });
	    // Prevent the event if the pointer id is currently being caught by an EventTarget
	    var shouldPreventBecausePointerCapture = (type === "pointerout" || type === "pointerleave") && POINTER_ID_TO_CAPTURED_TARGET_MAP.has(pointerId);
	    if (shouldPreventBecausePointerCapture) {
	        if (e.cancelable && !e.defaultPrevented) {
	            e.preventDefault();
	        }
	        return [];
	    }
	    // Define all properties of MouseEvents that should be set on the event object
	    // noinspection JSDeprecatedSymbols
	    var overwrittenMouseEventProperties = __assign({ scoped: __assign({ value: e.scoped }, SHARED_DESCRIPTOR_OPTIONS), 
	        // The 'fromElement' property should be set to 'null' for interoperability reasons according to the spec
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        fromElement: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS), 
	        // The 'toElement' property should be set to 'null' for interoperability reasons according to the spec
	        // https://www.w3.org/TR/pointerevents/#pointerevent-interface
	        toElement: __assign({ value: null }, SHARED_DESCRIPTOR_OPTIONS), 
	        // The 'detail' property should always have a value of 0
	        // https://www.w3.org/TR/pointerevents/#attributes-and-default-actions
	        detail: __assign({ value: 0 }, SHARED_DESCRIPTOR_OPTIONS), 
	        // The 'composed' property should always have a value of true
	        // https://www.w3.org/TR/pointerevents/#attributes-and-default-actions
	        composed: __assign({ value: true }, SHARED_DESCRIPTOR_OPTIONS), composedPath: __assign({ value: function () { return getEventPath(e.target); } }, SHARED_DESCRIPTOR_OPTIONS) }, (!("region" in MouseEvent.prototype)
	        ? {}
	        : {
	            region: __assign({ value: e.region }, SHARED_DESCRIPTOR_OPTIONS)
	        }), (!("path" in e)
	        ? {}
	        : {
	            path: __assign({ 
	                // Touch contact are indicated by the button value 0
	                value: e.path }, SHARED_DESCRIPTOR_OPTIONS)
	        }), (!("deepPath" in Event.prototype) || !isElement(e.target)
	        ? {}
	        : {
	            path: __assign({ value: function () { return getEventPath(e.target); } }, SHARED_DESCRIPTOR_OPTIONS)
	        }));
	    // Create a new PointerEvent
	    var clonedEvent = cloneEventAsPointerEvent({
	        e: e,
	        type: type,
	        initOptions: initOptions,
	        overwrittenMouseEventProperties: overwrittenMouseEventProperties,
	        dynamicPropertiesHandler: function () { return handleDynamicPropertiesForPointerEventOnMouse(pointerId, type, e); }
	    });
	    overwriteTargetsForEvent(e, clonedEvent.target, clonedEvent.currentTarget, clonedEvent.relatedTarget);
	    return [clonedEvent];
	}
	/**
	 * Creates a PointerEvent based on a TouchEvent of the given type and dispatches an event on the event target
	 * @param {PointerEventType} type
	 * @param {TouchEvent} e
	 * @param {EventTarget} eventTarget
	 * @param {PropertyDescriptorMap} [extraDescriptors]
	 */
	function createPointerEventsForMouseOfTypeAndDispatch(type, e, eventTarget, extraDescriptors) {
	    var pointerEvents = createPointerEventsForMouseOfType(type, e);
	    pointerEvents.forEach(function (clone) {
	        if (extraDescriptors != null) {
	            Object.defineProperties(clone, extraDescriptors);
	        }
	        updatePointerIdToCancelFiredSet(clone);
	        // Dispatch the event on the target
	        eventTarget.dispatchEvent(clone);
	    });
	    // Handle whatever needs to come after the MouseEvent
	    handlePostPointerEventForMouse(type, e);
	}
	/**
	 * Creates a PointerEvent based on a MouseEvent of the given type and invokes the listener with it
	 * @param {PointerEventType} type
	 * @param {MouseEvent} e
	 * @param {EventTarget} eventTarget
	 * @param {EventListenerOrEventListenerObject} listener
	 */
	function createPointerEventsForMouseOfTypeAndInvoke(type, e, eventTarget, listener) {
	    var pointerEvents = createPointerEventsForMouseOfType(type, e);
	    pointerEvents.forEach(function (clone) {
	        updatePointerIdToCancelFiredSet(clone);
	        // Invoke the listener with the cloned event
	        invokeListener(clone, listener);
	    });
	    // Handle whatever needs to come after the MouseEvent
	    handlePostPointerEventForMouse(type, e);
	}
	/**
	 * Handles a PointerEvent related to a MouseEvent
	 * @param {EventTarget} eventTarget
	 * @param {PointerEventType} type
	 * @param {MouseEvent} e
	 * @param {EventListenerOrEventListenerObject} listener
	 */
	function handlePointerEventForMouse(eventTarget, type, e, listener) {
	    createPointerEventsForMouseOfTypeAndInvoke(type, e, eventTarget, listener);
	}

	var boundHandlerMap = new Map();
	/**
	 * Adds a bound handler
	 * @param {EventListenerOrEventListenerObject} listener
	 * @param {Function} handler
	 */
	function addBoundHandler(listener, handler) {
	    var set = boundHandlerMap.get(listener);
	    if (set == null) {
	        set = new Set();
	        boundHandlerMap.set(listener, set);
	    }
	    set.add(handler);
	}

	/**
	 * Checks if the user agent already supports the PointerEvent constructor
	 * @type {boolean}
	 */
	var SUPPORTS_POINTER_EVENTS = "PointerEvent" in window;

	if (!SUPPORTS_POINTER_EVENTS) {
	    // Keep a reference to the original addEventListener prototype method
	    var originalAddEventListener_1 = EventTarget.prototype.addEventListener;
	    /**
	     * Overwrite it such that we can add special handling for PointerEvents
	     * @param {string} type
	     * @param {EventListenerOrEventListenerObject | null} listener
	     * @param {boolean | AddEventListenerOptions} options
	     */
	    EventTarget.prototype.addEventListener = function (type, listener, options) {
	        var _this = this;
	        if (listener == null) {
	            return originalAddEventListener_1(type, listener, options);
	        }
	        if (isPointerEventType(type)) {
	            var convertedEventType = convertPointerEventType(type);
	            var handler = function (e) { return ("changedTouches" in e ? handlePointerEventForTouch(_this, type, e, listener) : handlePointerEventForMouse(_this, type, e, listener)); };
	            var firedPointerEventsHandler = function (e) {
	                // Only call the listener if the PointerEvent is **NOT** trusted
	                // This is to ensure that no duplicate events are fired in browsers that natively supports PointerEvents, but where this polyfill is force-applied anyway
	                if (!e.isTrusted) {
	                    invokeListener(e, listener);
	                }
	            };
	            if (convertedEventType != null) {
	                originalAddEventListener_1.call(this, convertedEventType, handler, options);
	                // Add the original listener to the bound handler Map mapped to the 'handler' function so that we can
	                // remove the listener at a later point
	                addBoundHandler(listener, handler);
	            }
	            // Also add a listener for the pointer event name since these may be fired on the node as well
	            originalAddEventListener_1.call(this, type, firedPointerEventsHandler, options);
	            // Add the original listener to the bound handler Map mapped to the 'firedPointerEventsHandler' function so that we can
	            // remove the listener at a later point
	            addBoundHandler(listener, firedPointerEventsHandler);
	        }
	        else {
	            originalAddEventListener_1.call(this, type, listener, options);
	        }
	    };
	}

	if (!SUPPORTS_POINTER_EVENTS) {
	    // Keep a reference to the original removeEventListener prototype method
	    var originalRemoveEventListener_1 = EventTarget.prototype.removeEventListener;
	    /**
	     * Overwrite the removeEventListener prototype method such that we can provide special handling
	     * for PointerEvents
	     * @param {string} type
	     * @param {EventListenerOrEventListenerObject | null} listener
	     * @param {EventListenerOptions | boolean} options
	     */
	    EventTarget.prototype.removeEventListener = function (type, listener, options) {
	        var _this = this;
	        var convertedEventType = isPointerEventType(type) ? convertPointerEventType(type) : undefined;
	        if (listener == null) {
	            originalRemoveEventListener_1.call(this, type, null, options);
	            if (convertedEventType != null) {
	                originalRemoveEventListener_1.call(this, convertedEventType, null, options);
	            }
	            return;
	        }
	        var boundHandlers = boundHandlerMap.get(listener);
	        if (boundHandlers != null) {
	            boundHandlers.forEach(function (handler) {
	                originalRemoveEventListener_1.call(_this, type, handler, options);
	                if (convertedEventType != null) {
	                    originalRemoveEventListener_1.call(_this, convertedEventType, handler, options);
	                }
	            });
	            boundHandlerMap["delete"](listener);
	        }
	        else {
	            originalRemoveEventListener_1.call(this, type, listener, options);
	            if (convertedEventType != null) {
	                originalRemoveEventListener_1.call(this, convertedEventType, listener, options);
	            }
	        }
	    };
	}

	// tslint:disable:no-any
	// Only patch the dispatchEvent EventTarget prototype method if the user agent
	// doesn't already support Global Event Handlers for Pointer Events
	if (!SUPPORTS_POINTER_EVENT_HANDLERS) {
	    // Add EventHandlers such that "in" checks return true
	    EventTarget.prototype.ongotpointercapture = null;
	    EventTarget.prototype.onlostpointercapture = null;
	    EventTarget.prototype.onpointerdown = null;
	    EventTarget.prototype.onpointermove = null;
	    EventTarget.prototype.onpointerup = null;
	    EventTarget.prototype.onpointercancel = null;
	    EventTarget.prototype.onpointerover = null;
	    EventTarget.prototype.onpointerout = null;
	    EventTarget.prototype.onpointerenter = null;
	    EventTarget.prototype.onpointerleave = null;
	}

	// tslint:disable:no-any
	var hasPointerLock = false;
	var HAS_POINTER_LOCK = function () { return hasPointerLock; };
	/**
	 * Invoked when a "pointerlockchange" event is fired. Is used to
	 * update the value of 'hasPointerLock'
	 */
	var handler = function () {
	    hasPointerLock = document.pointerLockElement != null && document.mozPointerLockElement != null;
	};
	// Listen for PointerLock events
	document.addEventListener("pointerlockchange", handler);
	document.addEventListener("mozpointerlockchange", handler);

	/**
	 * Throws a DOMException if possible, otherwise it falls back to throwing a regular error
	 * @param {string} message
	 * @param {string} name
	 */
	function throwDOMException(message, name) {
	    var exception;
	    try {
	        exception = new DOMException(message, name);
	    }
	    catch (ex) {
	        exception = new Error(name + ": " + message);
	        if (name != null) {
	            exception.name = name;
	        }
	    }
	    throw exception;
	}

	if (!SUPPORTS_POINTER_EVENTS) {
	    /**
	     * Sets pointer capture for the pointer identified by the argument pointerId to the element on which
	     * this method is invoked
	     * https://www.w3.org/TR/pointerevents/#extensions-to-the-element-interface
	     * @param {number} pointerId
	     */
	    Element.prototype.setPointerCapture = function (pointerId) {
	        // If no active pointer exists with the given pointer id, throw a DOMException
	        // with name 'InvalidPointerId'
	        // https://www.w3.org/TR/pointerevents/#setting-pointer-capture
	        if (!SEEN_POINTER_IDS.has(pointerId)) {
	            throwDOMException("Could not set pointer capture on an element: No active pointers exist with the given pointer id: '" + pointerId + "'", "InvalidPointerId");
	        }
	        // If the element is not connected, throw an InvalidStateError
	        // https://www.w3.org/TR/pointerevents/#setting-pointer-capture
	        if (!this.isConnected) {
	            throwDOMException("Could not set pointer capture on an element: It wasn't connected!", "InvalidStateError");
	        }
	        if (HAS_POINTER_LOCK()) {
	            throwDOMException("Could not set pointer capture on an element: The document had a PointerLock!", "InvalidStateError");
	        }
	        // Otherwise, mark the pointer id as captured by this element
	        POINTER_ID_TO_CAPTURED_TARGET_MAP.set(pointerId, this);
	        isTouchDevice
	            ? createPointerEventsForTouchOfTypeAndDispatch("gotpointercapture", new TouchEvent(""), this)
	            : createPointerEventsForMouseOfTypeAndDispatch("gotpointercapture", new MouseEvent(""), this);
	    };
	}

	if (!SUPPORTS_POINTER_EVENTS) {
	    /**
	     * Releases pointer capture for the pointer identified by the argument pointerId to the element on which
	     * this method is invoked
	     * https://www.w3.org/TR/pointerevents/#extensions-to-the-element-interface
	     * @param {number} pointerId
	     */
	    Element.prototype.releasePointerCapture = function (pointerId) {
	        // If no active pointer exists with the given pointer id, throw a DOMException
	        // with name 'InvalidPointerId'
	        // https://www.w3.org/TR/pointerevents/#setting-pointer-capture
	        if (!SEEN_POINTER_IDS.has(pointerId)) {
	            throwDOMException("Could not release pointer capture on an element: No active pointers exist with the given pointer id: '" + pointerId + "'", "InvalidPointerId");
	        }
	        // Otherwise, mark the pointer id as captured by this element
	        POINTER_ID_TO_CAPTURED_TARGET_MAP["delete"](pointerId);
	        isTouchDevice
	            ? createPointerEventsForTouchOfTypeAndDispatch("lostpointercapture", new TouchEvent(""), this)
	            : createPointerEventsForMouseOfTypeAndDispatch("lostpointercapture", new MouseEvent(""), this);
	    };
	}

	// tslint:disable:no-any
	if (!SUPPORTS_POINTER_EVENTS) {
	    /**
	     * Checks if the element has pointer capture for the pointer identified by the argument pointerId
	     * https://www.w3.org/TR/pointerevents/#extensions-to-the-element-interface
	     * @param {number} pointerId
	     */
	    Element.prototype.hasPointerCapture = function (pointerId) {
	        return POINTER_ID_TO_CAPTURED_TARGET_MAP.get(pointerId) != null;
	    };
	}

	// tslint:disable:no-any
	// Only patch the window object if it doesn't already have a PointerEvent constructor
	if (!SUPPORTS_POINTER_EVENTS) {
	    // Set the PointerEvent reference on the window object
	    window.PointerEvent = PointerEvent;
	}

}());


},{}],28:[function(require,module,exports){
(function (global){(function (){
'use strict';

var objectAssign = require('object-assign');

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"object-assign":34,"util/":31}],29:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],30:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],31:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":30,"_process":35,"inherits":29}],32:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],33:[function(require,module,exports){
(function (global){(function (){
/*!
 *  howler.js v2.2.1
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  /** Global Methods **/
  /***************************************************************************/

  /**
   * Create the global controller. All contained methods and properties apply
   * to all sounds that are currently playing or will be in the future.
   */
  var HowlerGlobal = function() {
    this.init();
  };
  HowlerGlobal.prototype = {
    /**
     * Initialize the global Howler object.
     * @return {Howler}
     */
    init: function() {
      var self = this || Howler;

      // Create a global ID counter.
      self._counter = 1000;

      // Pool of unlocked HTML5 Audio objects.
      self._html5AudioPool = [];
      self.html5PoolSize = 10;

      // Internal properties.
      self._codecs = {};
      self._howls = [];
      self._muted = false;
      self._volume = 1;
      self._canPlayEvent = 'canplaythrough';
      self._navigator = (typeof window !== 'undefined' && window.navigator) ? window.navigator : null;

      // Public properties.
      self.masterGain = null;
      self.noAudio = false;
      self.usingWebAudio = true;
      self.autoSuspend = true;
      self.ctx = null;

      // Set to false to disable the auto audio unlocker.
      self.autoUnlock = true;

      // Setup the various state values for global tracking.
      self._setup();

      return self;
    },

    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this || Howler;
      vol = parseFloat(vol);

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        self._volume = vol;

        // Don't update any of the nodes if we are muted.
        if (self._muted) {
          return self;
        }

        // When using Web Audio, we just need to adjust the master gain.
        if (self.usingWebAudio) {
          self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
        }

        // Loop through and change volume for all HTML5 audio nodes.
        for (var i=0; i<self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds();

            // Loop through all sounds and change the volumes.
            for (var j=0; j<ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node) {
                sound._node.volume = sound._volume * vol;
              }
            }
          }
        }

        return self;
      }

      return self._volume;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    mute: function(muted) {
      var self = this || Howler;

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      self._muted = muted;

      // With Web Audio, we just need to mute the master gain.
      if (self.usingWebAudio) {
        self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
      }

      // Loop through and mute all HTML5 Audio nodes.
      for (var i=0; i<self._howls.length; i++) {
        if (!self._howls[i]._webAudio) {
          // Get all of the sounds in this Howl group.
          var ids = self._howls[i]._getSoundIds();

          // Loop through all sounds and mark the audio node as muted.
          for (var j=0; j<ids.length; j++) {
            var sound = self._howls[i]._soundById(ids[j]);

            if (sound && sound._node) {
              sound._node.muted = (muted) ? true : sound._muted;
            }
          }
        }
      }

      return self;
    },

    /**
     * Handle stopping all sounds globally.
     */
    stop: function() {
      var self = this || Howler;

      // Loop through all Howls and stop them.
      for (var i=0; i<self._howls.length; i++) {
        self._howls[i].stop();
      }

      return self;
    },

    /**
     * Unload and destroy all currently loaded Howl objects.
     * @return {Howler}
     */
    unload: function() {
      var self = this || Howler;

      for (var i=self._howls.length-1; i>=0; i--) {
        self._howls[i].unload();
      }

      // Create a new AudioContext to make sure it is fully reset.
      if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
        self.ctx.close();
        self.ctx = null;
        setupAudioContext();
      }

      return self;
    },

    /**
     * Check for codec support of specific extension.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return (this || Howler)._codecs[ext.replace(/^x-/, '')];
    },

    /**
     * Setup various state values for global tracking.
     * @return {Howler}
     */
    _setup: function() {
      var self = this || Howler;

      // Keeps track of the suspend/resume state of the AudioContext.
      self.state = self.ctx ? self.ctx.state || 'suspended' : 'suspended';

      // Automatically begin the 30-second suspend process
      self._autoSuspend();

      // Check if audio is available.
      if (!self.usingWebAudio) {
        // No audio is available on this system if noAudio is set to true.
        if (typeof Audio !== 'undefined') {
          try {
            var test = new Audio();

            // Check if the canplaythrough event is available.
            if (typeof test.oncanplaythrough === 'undefined') {
              self._canPlayEvent = 'canplay';
            }
          } catch(e) {
            self.noAudio = true;
          }
        } else {
          self.noAudio = true;
        }
      }

      // Test to make sure audio isn't disabled in Internet Explorer.
      try {
        var test = new Audio();
        if (test.muted) {
          self.noAudio = true;
        }
      } catch (e) {}

      // Check for supported codecs.
      if (!self.noAudio) {
        self._setupCodecs();
      }

      return self;
    },

    /**
     * Check for browser support for various codecs and cache the results.
     * @return {Howler}
     */
    _setupCodecs: function() {
      var self = this || Howler;
      var audioTest = null;

      // Must wrap in a try/catch because IE11 in server mode throws an error.
      try {
        audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
      } catch (err) {
        return self;
      }

      if (!audioTest || typeof audioTest.canPlayType !== 'function') {
        return self;
      }

      var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, '');

      // Opera version <33 has mixed MP3 support, so we need to check for and block it.
      var checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);
      var isOldOpera = (checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33);

      self._codecs = {
        mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
        mpeg: !!mpegTest,
        opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
        ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType('audio/wav')).replace(/^no$/, ''),
        aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
        caf: !!audioTest.canPlayType('audio/x-caf;').replace(/^no$/, ''),
        m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        m4b: !!(audioTest.canPlayType('audio/x-m4b;') || audioTest.canPlayType('audio/m4b;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ''),
        flac: !!(audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, '')
      };

      return self;
    },

    /**
     * Some browsers/devices will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _unlockAudio: function() {
      var self = this || Howler;

      // Only run this if Web Audio is supported and it hasn't already been unlocked.
      if (self._audioUnlocked || !self.ctx) {
        return;
      }

      self._audioUnlocked = false;
      self.autoUnlock = false;

      // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
      // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
      // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.
      if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
        self._mobileUnloaded = true;
        self.unload();
      }

      // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
      // http://stackoverflow.com/questions/24119684
      self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);

      // Call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS, Android, etc.
      var unlock = function(e) {
        // Create a pool of unlocked HTML5 Audio objects that can
        // be used for playing sounds without user interaction. HTML5
        // Audio objects must be individually unlocked, as opposed
        // to the WebAudio API which only needs a single activation.
        // This must occur before WebAudio setup or the source.onended
        // event will not fire.
        while (self._html5AudioPool.length < self.html5PoolSize) {
          try {
            var audioNode = new Audio();

            // Mark this Audio object as unlocked to ensure it can get returned
            // to the unlocked pool when released.
            audioNode._unlocked = true;

            // Add the audio node to the pool.
            self._releaseHtml5Audio(audioNode);
          } catch (e) {
            self.noAudio = true;
            break;
          }
        }

        // Loop through any assigned audio nodes and unlock them.
        for (var i=0; i<self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds();

            // Loop through all sounds and unlock the audio nodes.
            for (var j=0; j<ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node && !sound._node._unlocked) {
                sound._node._unlocked = true;
                sound._node.load();
              }
            }
          }
        }

        // Fix Android can not play in suspend state.
        self._autoResume();

        // Create an empty buffer.
        var source = self.ctx.createBufferSource();
        source.buffer = self._scratchBuffer;
        source.connect(self.ctx.destination);

        // Play the empty buffer.
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
        if (typeof self.ctx.resume === 'function') {
          self.ctx.resume();
        }

        // Setup a timeout to check that we are unlocked on the next event loop.
        source.onended = function() {
          source.disconnect(0);

          // Update the unlocked state and prevent this check from happening again.
          self._audioUnlocked = true;

          // Remove the touch start listener.
          document.removeEventListener('touchstart', unlock, true);
          document.removeEventListener('touchend', unlock, true);
          document.removeEventListener('click', unlock, true);

          // Let all sounds know that audio has been unlocked.
          for (var i=0; i<self._howls.length; i++) {
            self._howls[i]._emit('unlock');
          }
        };
      };

      // Setup a touch start listener to attempt an unlock in.
      document.addEventListener('touchstart', unlock, true);
      document.addEventListener('touchend', unlock, true);
      document.addEventListener('click', unlock, true);

      return self;
    },

    /**
     * Get an unlocked HTML5 Audio object from the pool. If none are left,
     * return a new Audio object and throw a warning.
     * @return {Audio} HTML5 Audio object.
     */
    _obtainHtml5Audio: function() {
      var self = this || Howler;

      // Return the next object from the pool if one exists.
      if (self._html5AudioPool.length) {
        return self._html5AudioPool.pop();
      }

      //.Check if the audio is locked and throw a warning.
      var testPlay = new Audio().play();
      if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
        testPlay.catch(function() {
          console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
        });
      }

      return new Audio();
    },

    /**
     * Return an activated HTML5 Audio object to the pool.
     * @return {Howler}
     */
    _releaseHtml5Audio: function(audio) {
      var self = this || Howler;

      // Don't add audio to the pool if we don't know if it has been unlocked.
      if (audio._unlocked) {
        self._html5AudioPool.push(audio);
      }

      return self;
    },

    /**
     * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
     * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
     * @return {Howler}
     */
    _autoSuspend: function() {
      var self = this;

      if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      // Check if any sounds are playing.
      for (var i=0; i<self._howls.length; i++) {
        if (self._howls[i]._webAudio) {
          for (var j=0; j<self._howls[i]._sounds.length; j++) {
            if (!self._howls[i]._sounds[j]._paused) {
              return self;
            }
          }
        }
      }

      if (self._suspendTimer) {
        clearTimeout(self._suspendTimer);
      }

      // If no sound has played after 30 seconds, suspend the context.
      self._suspendTimer = setTimeout(function() {
        if (!self.autoSuspend) {
          return;
        }

        self._suspendTimer = null;
        self.state = 'suspending';

        // Handle updating the state of the audio context after suspending.
        var handleSuspension = function() {
          self.state = 'suspended';

          if (self._resumeAfterSuspend) {
            delete self._resumeAfterSuspend;
            self._autoResume();
          }
        };

        // Either the state gets suspended or it is interrupted.
        // Either way, we need to update the state to suspended.
        self.ctx.suspend().then(handleSuspension, handleSuspension);
      }, 30000);

      return self;
    },

    /**
     * Automatically resume the Web Audio AudioContext when a new sound is played.
     * @return {Howler}
     */
    _autoResume: function() {
      var self = this;

      if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      if (self.state === 'running' && self.ctx.state !== 'interrupted' && self._suspendTimer) {
        clearTimeout(self._suspendTimer);
        self._suspendTimer = null;
      } else if (self.state === 'suspended' || self.state === 'running' && self.ctx.state === 'interrupted') {
        self.ctx.resume().then(function() {
          self.state = 'running';

          // Emit to all Howls that the audio has resumed.
          for (var i=0; i<self._howls.length; i++) {
            self._howls[i]._emit('resume');
          }
        });

        if (self._suspendTimer) {
          clearTimeout(self._suspendTimer);
          self._suspendTimer = null;
        }
      } else if (self.state === 'suspending') {
        self._resumeAfterSuspend = true;
      }

      return self;
    }
  };

  // Setup the global audio controller.
  var Howler = new HowlerGlobal();

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Create an audio group controller.
   * @param {Object} o Passed in properties for this group.
   */
  var Howl = function(o) {
    var self = this;

    // Throw an error if no source is provided.
    if (!o.src || o.src.length === 0) {
      console.error('An array of source files must be passed with any new Howl.');
      return;
    }

    self.init(o);
  };
  Howl.prototype = {
    /**
     * Initialize a new Howl group object.
     * @param  {Object} o Passed in properties for this group.
     * @return {Howl}
     */
    init: function(o) {
      var self = this;

      // If we don't have an AudioContext created yet, run the setup.
      if (!Howler.ctx) {
        setupAudioContext();
      }

      // Setup user-defined default properties.
      self._autoplay = o.autoplay || false;
      self._format = (typeof o.format !== 'string') ? o.format : [o.format];
      self._html5 = o.html5 || false;
      self._muted = o.mute || false;
      self._loop = o.loop || false;
      self._pool = o.pool || 5;
      self._preload = (typeof o.preload === 'boolean' || o.preload === 'metadata') ? o.preload : true;
      self._rate = o.rate || 1;
      self._sprite = o.sprite || {};
      self._src = (typeof o.src !== 'string') ? o.src : [o.src];
      self._volume = o.volume !== undefined ? o.volume : 1;
      self._xhr = {
        method: o.xhr && o.xhr.method ? o.xhr.method : 'GET',
        headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
        withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false,
      };

      // Setup all other default properties.
      self._duration = 0;
      self._state = 'unloaded';
      self._sounds = [];
      self._endTimers = {};
      self._queue = [];
      self._playLock = false;

      // Setup event listeners.
      self._onend = o.onend ? [{fn: o.onend}] : [];
      self._onfade = o.onfade ? [{fn: o.onfade}] : [];
      self._onload = o.onload ? [{fn: o.onload}] : [];
      self._onloaderror = o.onloaderror ? [{fn: o.onloaderror}] : [];
      self._onplayerror = o.onplayerror ? [{fn: o.onplayerror}] : [];
      self._onpause = o.onpause ? [{fn: o.onpause}] : [];
      self._onplay = o.onplay ? [{fn: o.onplay}] : [];
      self._onstop = o.onstop ? [{fn: o.onstop}] : [];
      self._onmute = o.onmute ? [{fn: o.onmute}] : [];
      self._onvolume = o.onvolume ? [{fn: o.onvolume}] : [];
      self._onrate = o.onrate ? [{fn: o.onrate}] : [];
      self._onseek = o.onseek ? [{fn: o.onseek}] : [];
      self._onunlock = o.onunlock ? [{fn: o.onunlock}] : [];
      self._onresume = [];

      // Web Audio or HTML5 Audio?
      self._webAudio = Howler.usingWebAudio && !self._html5;

      // Automatically try to enable audio.
      if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.autoUnlock) {
        Howler._unlockAudio();
      }

      // Keep track of this Howl group in the global controller.
      Howler._howls.push(self);

      // If they selected autoplay, add a play event to the load queue.
      if (self._autoplay) {
        self._queue.push({
          event: 'play',
          action: function() {
            self.play();
          }
        });
      }

      // Load the source file unless otherwise specified.
      if (self._preload && self._preload !== 'none') {
        self.load();
      }

      return self;
    },

    /**
     * Load the audio file.
     * @return {Howler}
     */
    load: function() {
      var self = this;
      var url = null;

      // If no audio is available, quit immediately.
      if (Howler.noAudio) {
        self._emit('loaderror', null, 'No audio support.');
        return;
      }

      // Make sure our source is in an array.
      if (typeof self._src === 'string') {
        self._src = [self._src];
      }

      // Loop through the sources and pick the first one that is compatible.
      for (var i=0; i<self._src.length; i++) {
        var ext, str;

        if (self._format && self._format[i]) {
          // If an extension was specified, use that instead.
          ext = self._format[i];
        } else {
          // Make sure the source is a string.
          str = self._src[i];
          if (typeof str !== 'string') {
            self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');
            continue;
          }

          // Extract the file extension from the URL or base64 data URI.
          ext = /^data:audio\/([^;,]+);/i.exec(str);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          }
        }

        // Log a warning if no extension was found.
        if (!ext) {
          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
        }

        // Check if this extension is available.
        if (ext && Howler.codecs(ext)) {
          url = self._src[i];
          break;
        }
      }

      if (!url) {
        self._emit('loaderror', null, 'No codec support for selected audio sources.');
        return;
      }

      self._src = url;
      self._state = 'loading';

      // If the hosting page is HTTPS and the source isn't,
      // drop down to HTML5 Audio to avoid Mixed Content errors.
      if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
        self._html5 = true;
        self._webAudio = false;
      }

      // Create a new sound object and add it to the pool.
      new Sound(self);

      // Load and decode the audio data for playback.
      if (self._webAudio) {
        loadBuffer(self);
      }

      return self;
    },

    /**
     * Play a sound or resume previous playback.
     * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Number}          Sound ID.
     */
    play: function(sprite, internal) {
      var self = this;
      var id = null;

      // Determine if a sprite, sound id or nothing was passed
      if (typeof sprite === 'number') {
        id = sprite;
        sprite = null;
      } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
        // If the passed sprite doesn't exist, do nothing.
        return null;
      } else if (typeof sprite === 'undefined') {
        // Use the default sound sprite (plays the full audio length).
        sprite = '__default';

        // Check if there is a single paused sound that isn't ended.
        // If there is, play that sound. If not, continue as usual.
        if (!self._playLock) {
          var num = 0;
          for (var i=0; i<self._sounds.length; i++) {
            if (self._sounds[i]._paused && !self._sounds[i]._ended) {
              num++;
              id = self._sounds[i]._id;
            }
          }

          if (num === 1) {
            sprite = null;
          } else {
            id = null;
          }
        }
      }

      // Get the selected node, or get one from the pool.
      var sound = id ? self._soundById(id) : self._inactiveSound();

      // If the sound doesn't exist, do nothing.
      if (!sound) {
        return null;
      }

      // Select the sprite definition.
      if (id && !sprite) {
        sprite = sound._sprite || '__default';
      }

      // If the sound hasn't loaded, we must wait to get the audio's duration.
      // We also need to wait to make sure we don't run into race conditions with
      // the order of function calls.
      if (self._state !== 'loaded') {
        // Set the sprite value on this sound.
        sound._sprite = sprite;

        // Mark this sound as not ended in case another sound is played before this one loads.
        sound._ended = false;

        // Add the sound to the queue to be played on load.
        var soundId = sound._id;
        self._queue.push({
          event: 'play',
          action: function() {
            self.play(soundId);
          }
        });

        return soundId;
      }

      // Don't play the sound if an id was passed and it is already playing.
      if (id && !sound._paused) {
        // Trigger the play event, in order to keep iterating through queue.
        if (!internal) {
          self._loadQueue('play');
        }

        return sound._id;
      }

      // Make sure the AudioContext isn't suspended, and resume it if it is.
      if (self._webAudio) {
        Howler._autoResume();
      }

      // Determine how long to play for and where to start playing.
      var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
      var duration = Math.max(0, ((self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000) - seek);
      var timeout = (duration * 1000) / Math.abs(sound._rate);
      var start = self._sprite[sprite][0] / 1000;
      var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
      sound._sprite = sprite;

      // Mark the sound as ended instantly so that this async playback
      // doesn't get grabbed by another call to play while this one waits to start.
      sound._ended = false;

      // Update the parameters of the sound.
      var setParams = function() {
        sound._paused = false;
        sound._seek = seek;
        sound._start = start;
        sound._stop = stop;
        sound._loop = !!(sound._loop || self._sprite[sprite][2]);
      };

      // End the sound instantly if seek is at the end.
      if (seek >= stop) {
        self._ended(sound);
        return;
      }

      // Begin the actual playback.
      var node = sound._node;
      if (self._webAudio) {
        // Fire this when the sound is ready to play to begin Web Audio playback.
        var playWebAudio = function() {
          self._playLock = false;
          setParams();
          self._refreshBuffer(sound);

          // Setup the playback params.
          var vol = (sound._muted || self._muted) ? 0 : sound._volume;
          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
          sound._playStart = Howler.ctx.currentTime;

          // Play the sound using the supported method.
          if (typeof node.bufferSource.start === 'undefined') {
            sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
          } else {
            sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
          }

          // Start a new timer if none is present.
          if (timeout !== Infinity) {
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            setTimeout(function() {
              self._emit('play', sound._id);
              self._loadQueue();
            }, 0);
          }
        };

        if (Howler.state === 'running' && Howler.ctx.state !== 'interrupted') {
          playWebAudio();
        } else {
          self._playLock = true;

          // Wait for the audio context to resume before playing.
          self.once('resume', playWebAudio);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      } else {
        // Fire this when the sound is ready to play to begin HTML5 Audio playback.
        var playHtml5 = function() {
          node.currentTime = seek;
          node.muted = sound._muted || self._muted || Howler._muted || node.muted;
          node.volume = sound._volume * Howler.volume();
          node.playbackRate = sound._rate;

          // Some browsers will throw an error if this is called without user interaction.
          try {
            var play = node.play();

            // Support older browsers that don't support promises, and thus don't have this issue.
            if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
              // Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
              self._playLock = true;

              // Set param values immediately.
              setParams();

              // Releases the lock and executes queued actions.
              play
                .then(function() {
                  self._playLock = false;
                  node._unlocked = true;
                  if (!internal) {
                    self._emit('play', sound._id);
                    self._loadQueue();
                  }
                })
                .catch(function() {
                  self._playLock = false;
                  self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
                    'on mobile devices and Chrome where playback was not within a user interaction.');

                  // Reset the ended and paused values.
                  sound._ended = true;
                  sound._paused = true;
                });
            } else if (!internal) {
              self._playLock = false;
              setParams();
              self._emit('play', sound._id);
              self._loadQueue();
            }

            // Setting rate before playing won't work in IE, so we set it again here.
            node.playbackRate = sound._rate;

            // If the node is still paused, then we can assume there was a playback issue.
            if (node.paused) {
              self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
                'on mobile devices and Chrome where playback was not within a user interaction.');
              return;
            }

            // Setup the end timer on sprites or listen for the ended event.
            if (sprite !== '__default' || sound._loop) {
              self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
            } else {
              self._endTimers[sound._id] = function() {
                // Fire ended on this audio node.
                self._ended(sound);

                // Clear this listener.
                node.removeEventListener('ended', self._endTimers[sound._id], false);
              };
              node.addEventListener('ended', self._endTimers[sound._id], false);
            }
          } catch (err) {
            self._emit('playerror', sound._id, err);
          }
        };

        // If this is streaming audio, make sure the src is set and load again.
        if (node.src === 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') {
          node.src = self._src;
          node.load();
        }

        // Play immediately if ready, or wait for the 'canplaythrough'e vent.
        var loadedNoReadyState = (window && window.ejecta) || (!node.readyState && Howler._navigator.isCocoonJS);
        if (node.readyState >= 3 || loadedNoReadyState) {
          playHtml5();
        } else {
          self._playLock = true;

          var listener = function() {
            // Begin playback.
            playHtml5();

            // Clear this listener.
            node.removeEventListener(Howler._canPlayEvent, listener, false);
          };
          node.addEventListener(Howler._canPlayEvent, listener, false);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      }

      return sound._id;
    },

    /**
     * Pause playback and save current position.
     * @param  {Number} id The sound ID (empty to pause all in group).
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'pause',
          action: function() {
            self.pause(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be paused.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound && !sound._paused) {
          // Reset the seek position.
          sound._seek = self.seek(ids[i]);
          sound._rateSeek = 0;
          sound._paused = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound has been created.
              if (!sound._node.bufferSource) {
                continue;
              }

              if (typeof sound._node.bufferSource.stop === 'undefined') {
                sound._node.bufferSource.noteOff(0);
              } else {
                sound._node.bufferSource.stop(0);
              }

              // Clean up the buffer source.
              self._cleanBuffer(sound._node);
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.pause();
            }
          }
        }

        // Fire the pause event, unless `true` is passed as the 2nd argument.
        if (!arguments[1]) {
          self._emit('pause', sound ? sound._id : null);
        }
      }

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {Number} id The sound ID (empty to stop all in group).
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Howl}
     */
    stop: function(id, internal) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to stop when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'stop',
          action: function() {
            self.stop(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be stopped.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          // Reset the seek position.
          sound._seek = sound._start || 0;
          sound._rateSeek = 0;
          sound._paused = true;
          sound._ended = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound's AudioBufferSourceNode has been created.
              if (sound._node.bufferSource) {
                if (typeof sound._node.bufferSource.stop === 'undefined') {
                  sound._node.bufferSource.noteOff(0);
                } else {
                  sound._node.bufferSource.stop(0);
                }

                // Clean up the buffer source.
                self._cleanBuffer(sound._node);
              }
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.currentTime = sound._start || 0;
              sound._node.pause();

              // If this is a live stream, stop download once the audio is stopped.
              if (sound._node.duration === Infinity) {
                self._clearSound(sound._node);
              }
            }
          }

          if (!internal) {
            self._emit('stop', sound._id);
          }
        }
      }

      return self;
    },

    /**
     * Mute/unmute a single sound or all sounds in this Howl group.
     * @param  {Boolean} muted Set to true to mute and false to unmute.
     * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
     * @return {Howl}
     */
    mute: function(muted, id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to mute when capable.
      if (self._state !== 'loaded'|| self._playLock) {
        self._queue.push({
          event: 'mute',
          action: function() {
            self.mute(muted, id);
          }
        });

        return self;
      }

      // If applying mute/unmute to all sounds, update the group's value.
      if (typeof id === 'undefined') {
        if (typeof muted === 'boolean') {
          self._muted = muted;
        } else {
          return self._muted;
        }
      }

      // If no id is passed, get all ID's to be muted.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          sound._muted = muted;

          // Cancel active fade and set the volume to the end value.
          if (sound._interval) {
            self._stopFade(sound._id);
          }

          if (self._webAudio && sound._node) {
            sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
          } else if (sound._node) {
            sound._node.muted = Howler._muted ? true : muted;
          }

          self._emit('mute', sound._id);
        }
      }

      return self;
    },

    /**
     * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
     *   volume() -> Returns the group's volume value.
     *   volume(id) -> Returns the sound id's current volume.
     *   volume(vol) -> Sets the volume of all sounds in this Howl group.
     *   volume(vol, id) -> Sets the volume of passed sound id.
     * @return {Howl/Number} Returns self or current volume.
     */
    volume: function() {
      var self = this;
      var args = arguments;
      var vol, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // Return the value of the groups' volume.
        return self._volume;
      } else if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
        // First check if this is an ID, and if not, assume it is a new volume.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          vol = parseFloat(args[0]);
        }
      } else if (args.length >= 2) {
        vol = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the volume or return the current volume.
      var sound;
      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        // If the sound hasn't loaded, add it to the load queue to change volume when capable.
        if (self._state !== 'loaded'|| self._playLock) {
          self._queue.push({
            event: 'volume',
            action: function() {
              self.volume.apply(self, args);
            }
          });

          return self;
        }

        // Set the group volume.
        if (typeof id === 'undefined') {
          self._volume = vol;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            sound._volume = vol;

            // Stop currently running fades.
            if (!args[2]) {
              self._stopFade(id[i]);
            }

            if (self._webAudio && sound._node && !sound._muted) {
              sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
            } else if (sound._node && !sound._muted) {
              sound._node.volume = vol * Howler.volume();
            }

            self._emit('volume', sound._id);
          }
        }
      } else {
        sound = id ? self._soundById(id) : self._sounds[0];
        return sound ? sound._volume : 0;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id (omit to fade all sounds).
     * @return {Howl}
     */
    fade: function(from, to, len, id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to fade when capable.
      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'fade',
          action: function() {
            self.fade(from, to, len, id);
          }
        });

        return self;
      }

      // Make sure the to/from/len values are numbers.
      from = Math.min(Math.max(0, parseFloat(from)), 1);
      to = Math.min(Math.max(0, parseFloat(to)), 1);
      len = parseFloat(len);

      // Set the volume to the start position.
      self.volume(from, id);

      // Fade the volume of one or all sounds.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        // Create a linear fade or fall back to timeouts with HTML5 Audio.
        if (sound) {
          // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
          if (!id) {
            self._stopFade(ids[i]);
          }

          // If we are using Web Audio, let the native methods do the actual fade.
          if (self._webAudio && !sound._muted) {
            var currentTime = Howler.ctx.currentTime;
            var end = currentTime + (len / 1000);
            sound._volume = from;
            sound._node.gain.setValueAtTime(from, currentTime);
            sound._node.gain.linearRampToValueAtTime(to, end);
          }

          self._startFadeInterval(sound, from, to, len, ids[i], typeof id === 'undefined');
        }
      }

      return self;
    },

    /**
     * Starts the internal interval to fade a sound.
     * @param  {Object} sound Reference to sound to fade.
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id to fade.
     * @param  {Boolean} isGroup   If true, set the volume on the group.
     */
    _startFadeInterval: function(sound, from, to, len, id, isGroup) {
      var self = this;
      var vol = from;
      var diff = to - from;
      var steps = Math.abs(diff / 0.01);
      var stepLen = Math.max(4, (steps > 0) ? len / steps : len);
      var lastTick = Date.now();

      // Store the value being faded to.
      sound._fadeTo = to;

      // Update the volume value on each interval tick.
      sound._interval = setInterval(function() {
        // Update the volume based on the time since the last tick.
        var tick = (Date.now() - lastTick) / len;
        lastTick = Date.now();
        vol += diff * tick;

        // Round to within 2 decimal points.
        vol = Math.round(vol * 100) / 100;

        // Make sure the volume is in the right bounds.
        if (diff < 0) {
          vol = Math.max(to, vol);
        } else {
          vol = Math.min(to, vol);
        }

        // Change the volume.
        if (self._webAudio) {
          sound._volume = vol;
        } else {
          self.volume(vol, sound._id, true);
        }

        // Set the group's volume.
        if (isGroup) {
          self._volume = vol;
        }

        // When the fade is complete, stop it and fire event.
        if ((to < from && vol <= to) || (to > from && vol >= to)) {
          clearInterval(sound._interval);
          sound._interval = null;
          sound._fadeTo = null;
          self.volume(to, sound._id);
          self._emit('fade', sound._id);
        }
      }, stepLen);
    },

    /**
     * Internal method that stops the currently playing fade when
     * a new fade starts, volume is changed or the sound is stopped.
     * @param  {Number} id The sound id.
     * @return {Howl}
     */
    _stopFade: function(id) {
      var self = this;
      var sound = self._soundById(id);

      if (sound && sound._interval) {
        if (self._webAudio) {
          sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
        }

        clearInterval(sound._interval);
        sound._interval = null;
        self.volume(sound._fadeTo, id);
        sound._fadeTo = null;
        self._emit('fade', id);
      }

      return self;
    },

    /**
     * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
     *   loop() -> Returns the group's loop value.
     *   loop(id) -> Returns the sound id's loop value.
     *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
     *   loop(loop, id) -> Sets the loop value of passed sound id.
     * @return {Howl/Boolean} Returns self or current loop value.
     */
    loop: function() {
      var self = this;
      var args = arguments;
      var loop, id, sound;

      // Determine the values for loop and id.
      if (args.length === 0) {
        // Return the grou's loop value.
        return self._loop;
      } else if (args.length === 1) {
        if (typeof args[0] === 'boolean') {
          loop = args[0];
          self._loop = loop;
        } else {
          // Return this sound's loop value.
          sound = self._soundById(parseInt(args[0], 10));
          return sound ? sound._loop : false;
        }
      } else if (args.length === 2) {
        loop = args[0];
        id = parseInt(args[1], 10);
      }

      // If no id is passed, get all ID's to be looped.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        sound = self._soundById(ids[i]);

        if (sound) {
          sound._loop = loop;
          if (self._webAudio && sound._node && sound._node.bufferSource) {
            sound._node.bufferSource.loop = loop;
            if (loop) {
              sound._node.bufferSource.loopStart = sound._start || 0;
              sound._node.bufferSource.loopEnd = sound._stop;
            }
          }
        }
      }

      return self;
    },

    /**
     * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   rate() -> Returns the first sound node's current playback rate.
     *   rate(id) -> Returns the sound id's current playback rate.
     *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
     *   rate(rate, id) -> Sets the playback rate of passed sound id.
     * @return {Howl/Number} Returns self or the current playback rate.
     */
    rate: function() {
      var self = this;
      var args = arguments;
      var rate, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current rate of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new rate value.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          rate = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        rate = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the playback rate or return the current value.
      var sound;
      if (typeof rate === 'number') {
        // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
        if (self._state !== 'loaded' || self._playLock) {
          self._queue.push({
            event: 'rate',
            action: function() {
              self.rate.apply(self, args);
            }
          });

          return self;
        }

        // Set the group rate.
        if (typeof id === 'undefined') {
          self._rate = rate;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            // Keep track of our position when the rate changed and update the playback
            // start position so we can properly adjust the seek position for time elapsed.
            if (self.playing(id[i])) {
              sound._rateSeek = self.seek(id[i]);
              sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
            }
            sound._rate = rate;

            // Change the playback rate.
            if (self._webAudio && sound._node && sound._node.bufferSource) {
              sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
            } else if (sound._node) {
              sound._node.playbackRate = rate;
            }

            // Reset the timers.
            var seek = self.seek(id[i]);
            var duration = ((self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000) - seek;
            var timeout = (duration * 1000) / Math.abs(sound._rate);

            // Start a new end timer if sound is already playing.
            if (self._endTimers[id[i]] || !sound._paused) {
              self._clearTimer(id[i]);
              self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
            }

            self._emit('rate', sound._id);
          }
        }
      } else {
        sound = self._soundById(id);
        return sound ? sound._rate : self._rate;
      }

      return self;
    },

    /**
     * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   seek() -> Returns the first sound node's current seek position.
     *   seek(id) -> Returns the sound id's current seek position.
     *   seek(seek) -> Sets the seek position of the first sound node.
     *   seek(seek, id) -> Sets the seek position of passed sound id.
     * @return {Howl/Number} Returns self or the current seek position.
     */
    seek: function() {
      var self = this;
      var args = arguments;
      var seek, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current position of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new seek position.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else if (self._sounds.length) {
          id = self._sounds[0]._id;
          seek = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        seek = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // If there is no ID, bail out.
      if (typeof id === 'undefined') {
        return self;
      }

      // If the sound hasn't loaded, add it to the load queue to seek when capable.
      if (typeof seek === 'number' && (self._state !== 'loaded' || self._playLock)) {
        self._queue.push({
          event: 'seek',
          action: function() {
            self.seek.apply(self, args);
          }
        });

        return self;
      }

      // Get the sound.
      var sound = self._soundById(id);

      if (sound) {
        if (typeof seek === 'number' && seek >= 0) {
          // Pause the sound and update position for restarting playback.
          var playing = self.playing(id);
          if (playing) {
            self.pause(id, true);
          }

          // Move the position of the track and cancel timer.
          sound._seek = seek;
          sound._ended = false;
          self._clearTimer(id);

          // Update the seek position for HTML5 Audio.
          if (!self._webAudio && sound._node && !isNaN(sound._node.duration)) {
            sound._node.currentTime = seek;
          }

          // Seek and emit when ready.
          var seekAndEmit = function() {
            self._emit('seek', id);

            // Restart the playback if the sound was playing.
            if (playing) {
              self.play(id, true);
            }
          };

          // Wait for the play lock to be unset before emitting (HTML5 Audio).
          if (playing && !self._webAudio) {
            var emitSeek = function() {
              if (!self._playLock) {
                seekAndEmit();
              } else {
                setTimeout(emitSeek, 0);
              }
            };
            setTimeout(emitSeek, 0);
          } else {
            seekAndEmit();
          }
        } else {
          if (self._webAudio) {
            var realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
            var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
            return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
          } else {
            return sound._node.currentTime;
          }
        }
      }

      return self;
    },

    /**
     * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
     * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
     * @return {Boolean} True if playing and false if not.
     */
    playing: function(id) {
      var self = this;

      // Check the passed sound ID (if any).
      if (typeof id === 'number') {
        var sound = self._soundById(id);
        return sound ? !sound._paused : false;
      }

      // Otherwise, loop through all sounds and check if any are playing.
      for (var i=0; i<self._sounds.length; i++) {
        if (!self._sounds[i]._paused) {
          return true;
        }
      }

      return false;
    },

    /**
     * Get the duration of this sound. Passing a sound id will return the sprite duration.
     * @param  {Number} id The sound id to check. If none is passed, return full source duration.
     * @return {Number} Audio duration in seconds.
     */
    duration: function(id) {
      var self = this;
      var duration = self._duration;

      // If we pass an ID, get the sound and return the sprite length.
      var sound = self._soundById(id);
      if (sound) {
        duration = self._sprite[sound._sprite][1] / 1000;
      }

      return duration;
    },

    /**
     * Returns the current loaded state of this Howl.
     * @return {String} 'unloaded', 'loading', 'loaded'
     */
    state: function() {
      return this._state;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all sound instances attached to this group.
     */
    unload: function() {
      var self = this;

      // Stop playing any active sounds.
      var sounds = self._sounds;
      for (var i=0; i<sounds.length; i++) {
        // Stop the sound if it is currently playing.
        if (!sounds[i]._paused) {
          self.stop(sounds[i]._id);
        }

        // Remove the source or disconnect.
        if (!self._webAudio) {
          // Set the source to 0-second silence to stop any downloading (except in IE).
          self._clearSound(sounds[i]._node);

          // Remove any event listeners.
          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);
          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);
          sounds[i]._node.removeEventListener('ended', sounds[i]._endFn, false);

          // Release the Audio object back to the pool.
          Howler._releaseHtml5Audio(sounds[i]._node);
        }

        // Empty out all of the nodes.
        delete sounds[i]._node;

        // Make sure all timers are cleared out.
        self._clearTimer(sounds[i]._id);
      }

      // Remove the references in the global Howler object.
      var index = Howler._howls.indexOf(self);
      if (index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // Delete this sound from the cache (if no other Howl is using it).
      var remCache = true;
      for (i=0; i<Howler._howls.length; i++) {
        if (Howler._howls[i]._src === self._src || self._src.indexOf(Howler._howls[i]._src) >= 0) {
          remCache = false;
          break;
        }
      }

      if (cache && remCache) {
        delete cache[self._src];
      }

      // Clear global errors.
      Howler.noAudio = false;

      // Clear out `self`.
      self._state = 'unloaded';
      self._sounds = [];
      self = null;

      return null;
    },

    /**
     * Listen to a custom event.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
     * @return {Howl}
     */
    on: function(event, fn, id, once) {
      var self = this;
      var events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(once ? {id: id, fn: fn, once: once} : {id: id, fn: fn});
      }

      return self;
    },

    /**
     * Remove a custom event. Call without parameters to remove all events.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to remove. Leave empty to remove all.
     * @param  {Number}   id    (optional) Only remove events for this sound.
     * @return {Howl}
     */
    off: function(event, fn, id) {
      var self = this;
      var events = self['_on' + event];
      var i = 0;

      // Allow passing just an event and ID.
      if (typeof fn === 'number') {
        id = fn;
        fn = null;
      }

      if (fn || id) {
        // Loop through event store and remove the passed function.
        for (i=0; i<events.length; i++) {
          var isId = (id === events[i].id);
          if (fn === events[i].fn && isId || !fn && isId) {
            events.splice(i, 1);
            break;
          }
        }
      } else if (event) {
        // Clear out all events of this type.
        self['_on' + event] = [];
      } else {
        // Clear out all events of every type.
        var keys = Object.keys(self);
        for (i=0; i<keys.length; i++) {
          if ((keys[i].indexOf('_on') === 0) && Array.isArray(self[keys[i]])) {
            self[keys[i]] = [];
          }
        }
      }

      return self;
    },

    /**
     * Listen to a custom event and remove it once fired.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @return {Howl}
     */
    once: function(event, fn, id) {
      var self = this;

      // Setup the event listener.
      self.on(event, fn, id, 1);

      return self;
    },

    /**
     * Emit all events of a specific type and pass the sound id.
     * @param  {String} event Event name.
     * @param  {Number} id    Sound ID.
     * @param  {Number} msg   Message to go with event.
     * @return {Howl}
     */
    _emit: function(event, id, msg) {
      var self = this;
      var events = self['_on' + event];

      // Loop through event store and fire all functions.
      for (var i=events.length-1; i>=0; i--) {
        // Only fire the listener if the correct ID is used.
        if (!events[i].id || events[i].id === id || event === 'load') {
          setTimeout(function(fn) {
            fn.call(this, id, msg);
          }.bind(self, events[i].fn), 0);

          // If this event was setup with `once`, remove it.
          if (events[i].once) {
            self.off(event, events[i].fn, events[i].id);
          }
        }
      }

      // Pass the event type into load queue so that it can continue stepping.
      self._loadQueue(event);

      return self;
    },

    /**
     * Queue of actions initiated before the sound has loaded.
     * These will be called in sequence, with the next only firing
     * after the previous has finished executing (even if async like play).
     * @return {Howl}
     */
    _loadQueue: function(event) {
      var self = this;

      if (self._queue.length > 0) {
        var task = self._queue[0];

        // Remove this task if a matching event was passed.
        if (task.event === event) {
          self._queue.shift();
          self._loadQueue();
        }

        // Run the task if no event type is passed.
        if (!event) {
          task.action();
        }
      }

      return self;
    },

    /**
     * Fired when playback ends at the end of the duration.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _ended: function(sound) {
      var self = this;
      var sprite = sound._sprite;

      // If we are using IE and there was network latency we may be clipping
      // audio before it completes playing. Lets check the node to make sure it
      // believes it has completed, before ending the playback.
      if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
        setTimeout(self._ended.bind(self, sound), 100);
        return self;
      }

      // Should this sound loop?
      var loop = !!(sound._loop || self._sprite[sprite][2]);

      // Fire the ended event.
      self._emit('end', sound._id);

      // Restart the playback for HTML5 Audio loop.
      if (!self._webAudio && loop) {
        self.stop(sound._id, true).play(sound._id);
      }

      // Restart this timer if on a Web Audio loop.
      if (self._webAudio && loop) {
        self._emit('play', sound._id);
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        sound._playStart = Howler.ctx.currentTime;

        var timeout = ((sound._stop - sound._start) * 1000) / Math.abs(sound._rate);
        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
      }

      // Mark the node as paused.
      if (self._webAudio && !loop) {
        sound._paused = true;
        sound._ended = true;
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        self._clearTimer(sound._id);

        // Clean up the buffer source.
        self._cleanBuffer(sound._node);

        // Attempt to auto-suspend AudioContext if no sounds are still playing.
        Howler._autoSuspend();
      }

      // When using a sprite, end the track.
      if (!self._webAudio && !loop) {
        self.stop(sound._id, true);
      }

      return self;
    },

    /**
     * Clear the end timer for a sound playback.
     * @param  {Number} id The sound ID.
     * @return {Howl}
     */
    _clearTimer: function(id) {
      var self = this;

      if (self._endTimers[id]) {
        // Clear the timeout or remove the ended listener.
        if (typeof self._endTimers[id] !== 'function') {
          clearTimeout(self._endTimers[id]);
        } else {
          var sound = self._soundById(id);
          if (sound && sound._node) {
            sound._node.removeEventListener('ended', self._endTimers[id], false);
          }
        }

        delete self._endTimers[id];
      }

      return self;
    },

    /**
     * Return the sound identified by this ID, or return null.
     * @param  {Number} id Sound ID
     * @return {Object}    Sound object or null.
     */
    _soundById: function(id) {
      var self = this;

      // Loop through all sounds and find the one with this ID.
      for (var i=0; i<self._sounds.length; i++) {
        if (id === self._sounds[i]._id) {
          return self._sounds[i];
        }
      }

      return null;
    },

    /**
     * Return an inactive sound from the pool or create a new one.
     * @return {Sound} Sound playback object.
     */
    _inactiveSound: function() {
      var self = this;

      self._drain();

      // Find the first inactive node to recycle.
      for (var i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          return self._sounds[i].reset();
        }
      }

      // If no inactive node was found, create a new one.
      return new Sound(self);
    },

    /**
     * Drain excess inactive sounds from the pool.
     */
    _drain: function() {
      var self = this;
      var limit = self._pool;
      var cnt = 0;
      var i = 0;

      // If there are less sounds than the max pool size, we are done.
      if (self._sounds.length < limit) {
        return;
      }

      // Count the number of inactive sounds.
      for (i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          cnt++;
        }
      }

      // Remove excess inactive sounds, going in reverse order.
      for (i=self._sounds.length - 1; i>=0; i--) {
        if (cnt <= limit) {
          return;
        }

        if (self._sounds[i]._ended) {
          // Disconnect the audio source when using Web Audio.
          if (self._webAudio && self._sounds[i]._node) {
            self._sounds[i]._node.disconnect(0);
          }

          // Remove sounds until we have the pool size.
          self._sounds.splice(i, 1);
          cnt--;
        }
      }
    },

    /**
     * Get all ID's from the sounds pool.
     * @param  {Number} id Only return one ID if one is passed.
     * @return {Array}    Array of IDs.
     */
    _getSoundIds: function(id) {
      var self = this;

      if (typeof id === 'undefined') {
        var ids = [];
        for (var i=0; i<self._sounds.length; i++) {
          ids.push(self._sounds[i]._id);
        }

        return ids;
      } else {
        return [id];
      }
    },

    /**
     * Load the sound back into the buffer source.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _refreshBuffer: function(sound) {
      var self = this;

      // Setup the buffer source for playback.
      sound._node.bufferSource = Howler.ctx.createBufferSource();
      sound._node.bufferSource.buffer = cache[self._src];

      // Connect to the correct node.
      if (sound._panner) {
        sound._node.bufferSource.connect(sound._panner);
      } else {
        sound._node.bufferSource.connect(sound._node);
      }

      // Setup looping and playback rate.
      sound._node.bufferSource.loop = sound._loop;
      if (sound._loop) {
        sound._node.bufferSource.loopStart = sound._start || 0;
        sound._node.bufferSource.loopEnd = sound._stop || 0;
      }
      sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);

      return self;
    },

    /**
     * Prevent memory leaks by cleaning up the buffer source after playback.
     * @param  {Object} node Sound's audio node containing the buffer source.
     * @return {Howl}
     */
    _cleanBuffer: function(node) {
      var self = this;
      var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf('Apple') >= 0;

      if (Howler._scratchBuffer && node.bufferSource) {
        node.bufferSource.onended = null;
        node.bufferSource.disconnect(0);
        if (isIOS) {
          try { node.bufferSource.buffer = Howler._scratchBuffer; } catch(e) {}
        }
      }
      node.bufferSource = null;

      return self;
    },

    /**
     * Set the source to a 0-second silence to stop any downloading (except in IE).
     * @param  {Object} node Audio node to clear.
     */
    _clearSound: function(node) {
      var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);
      if (!checkIE) {
        node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      }
    }
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Setup the sound object, which each node attached to a Howl group is contained in.
   * @param {Object} howl The Howl parent group.
   */
  var Sound = function(howl) {
    this._parent = howl;
    this.init();
  };
  Sound.prototype = {
    /**
     * Initialize a new Sound object.
     * @return {Sound}
     */
    init: function() {
      var self = this;
      var parent = self._parent;

      // Setup the default parameters.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a unique ID for this sound.
      self._id = ++Howler._counter;

      // Add itself to the parent's pool.
      parent._sounds.push(self);

      // Create the new node.
      self.create();

      return self;
    },

    /**
     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
     * @return {Sound}
     */
    create: function() {
      var self = this;
      var parent = self._parent;
      var volume = (Howler._muted || self._muted || self._parent._muted) ? 0 : self._volume;

      if (parent._webAudio) {
        // Create the gain node for controlling volume (the source will connect to this).
        self._node = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
        self._node.paused = true;
        self._node.connect(Howler.masterGain);
      } else if (!Howler.noAudio) {
        // Get an unlocked Audio object from the pool.
        self._node = Howler._obtainHtml5Audio();

        // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).
        self._errorFn = self._errorListener.bind(self);
        self._node.addEventListener('error', self._errorFn, false);

        // Listen for 'canplaythrough' event to let us know the sound is ready.
        self._loadFn = self._loadListener.bind(self);
        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false);

        // Listen for the 'ended' event on the sound to account for edge-case where
        // a finite sound has a duration of Infinity.
        self._endFn = self._endListener.bind(self);
        self._node.addEventListener('ended', self._endFn, false);

        // Setup the new audio node.
        self._node.src = parent._src;
        self._node.preload = parent._preload === true ? 'auto' : parent._preload;
        self._node.volume = volume * Howler.volume();

        // Begin loading the source.
        self._node.load();
      }

      return self;
    },

    /**
     * Reset the parameters of this sound to the original state (for recycle).
     * @return {Sound}
     */
    reset: function() {
      var self = this;
      var parent = self._parent;

      // Reset all of the parameters of this sound.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._rateSeek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a new ID so that it isn't confused with the previous sound.
      self._id = ++Howler._counter;

      return self;
    },

    /**
     * HTML5 Audio error listener callback.
     */
    _errorListener: function() {
      var self = this;

      // Fire an error event and pass back the code.
      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0);

      // Clear the event listener.
      self._node.removeEventListener('error', self._errorFn, false);
    },

    /**
     * HTML5 Audio canplaythrough listener callback.
     */
    _loadListener: function() {
      var self = this;
      var parent = self._parent;

      // Round up the duration to account for the lower precision in HTML5 Audio.
      parent._duration = Math.ceil(self._node.duration * 10) / 10;

      // Setup a sprite if none is defined.
      if (Object.keys(parent._sprite).length === 0) {
        parent._sprite = {__default: [0, parent._duration * 1000]};
      }

      if (parent._state !== 'loaded') {
        parent._state = 'loaded';
        parent._emit('load');
        parent._loadQueue();
      }

      // Clear the event listener.
      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
    },

    /**
     * HTML5 Audio ended listener callback.
     */
    _endListener: function() {
      var self = this;
      var parent = self._parent;

      // Only handle the `ended`` event if the duration is Infinity.
      if (parent._duration === Infinity) {
        // Update the parent duration to match the real audio duration.
        // Round up the duration to account for the lower precision in HTML5 Audio.
        parent._duration = Math.ceil(self._node.duration * 10) / 10;

        // Update the sprite that corresponds to the real duration.
        if (parent._sprite.__default[1] === Infinity) {
          parent._sprite.__default[1] = parent._duration * 1000;
        }

        // Run the regular ended method.
        parent._ended(self);
      }

      // Clear the event listener since the duration is now correct.
      self._node.removeEventListener('ended', self._endFn, false);
    }
  };

  /** Helper Methods **/
  /***************************************************************************/

  var cache = {};

  /**
   * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
   * @param  {Howl} self
   */
  var loadBuffer = function(self) {
    var url = self._src;

    // Check if the buffer has already been cached and use it instead.
    if (cache[url]) {
      // Set the duration from the cache.
      self._duration = cache[url].duration;

      // Load the sound into this Howl.
      loadSound(self);

      return;
    }

    if (/^data:[^;]+;base64,/.test(url)) {
      // Decode the base64 data URI without XHR, since some browsers don't support it.
      var data = atob(url.split(',')[1]);
      var dataView = new Uint8Array(data.length);
      for (var i=0; i<data.length; ++i) {
        dataView[i] = data.charCodeAt(i);
      }

      decodeAudioData(dataView.buffer, self);
    } else {
      // Load the buffer from the URL.
      var xhr = new XMLHttpRequest();
      xhr.open(self._xhr.method, url, true);
      xhr.withCredentials = self._xhr.withCredentials;
      xhr.responseType = 'arraybuffer';

      // Apply any custom headers to the request.
      if (self._xhr.headers) {
        Object.keys(self._xhr.headers).forEach(function(key) {
          xhr.setRequestHeader(key, self._xhr.headers[key]);
        });
      }

      xhr.onload = function() {
        // Make sure we get a successful response back.
        var code = (xhr.status + '')[0];
        if (code !== '0' && code !== '2' && code !== '3') {
          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');
          return;
        }

        decodeAudioData(xhr.response, self);
      };
      xhr.onerror = function() {
        // If there is an error, switch to HTML5 Audio.
        if (self._webAudio) {
          self._html5 = true;
          self._webAudio = false;
          self._sounds = [];
          delete cache[url];
          self.load();
        }
      };
      safeXhrSend(xhr);
    }
  };

  /**
   * Send the XHR request wrapped in a try/catch.
   * @param  {Object} xhr XHR to send.
   */
  var safeXhrSend = function(xhr) {
    try {
      xhr.send();
    } catch (e) {
      xhr.onerror();
    }
  };

  /**
   * Decode audio data from an array buffer.
   * @param  {ArrayBuffer} arraybuffer The audio data.
   * @param  {Howl}        self
   */
  var decodeAudioData = function(arraybuffer, self) {
    // Fire a load error if something broke.
    var error = function() {
      self._emit('loaderror', null, 'Decoding audio data failed.');
    };

    // Load the sound on success.
    var success = function(buffer) {
      if (buffer && self._sounds.length > 0) {
        cache[self._src] = buffer;
        loadSound(self, buffer);
      } else {
        error();
      }
    };

    // Decode the buffer into an audio source.
    if (typeof Promise !== 'undefined' && Howler.ctx.decodeAudioData.length === 1) {
      Howler.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
    } else {
      Howler.ctx.decodeAudioData(arraybuffer, success, error);
    }
  }

  /**
   * Sound is now loaded, so finish setting everything up and fire the loaded event.
   * @param  {Howl} self
   * @param  {Object} buffer The decoded buffer sound source.
   */
  var loadSound = function(self, buffer) {
    // Set the duration.
    if (buffer && !self._duration) {
      self._duration = buffer.duration;
    }

    // Setup a sprite if none is defined.
    if (Object.keys(self._sprite).length === 0) {
      self._sprite = {__default: [0, self._duration * 1000]};
    }

    // Fire the loaded event.
    if (self._state !== 'loaded') {
      self._state = 'loaded';
      self._emit('load');
      self._loadQueue();
    }
  };

  /**
   * Setup the audio context when available, or switch to HTML5 Audio mode.
   */
  var setupAudioContext = function() {
    // If we have already detected that Web Audio isn't supported, don't run this step again.
    if (!Howler.usingWebAudio) {
      return;
    }

    // Check if we are using Web Audio and setup the AudioContext if we are.
    try {
      if (typeof AudioContext !== 'undefined') {
        Howler.ctx = new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        Howler.ctx = new webkitAudioContext();
      } else {
        Howler.usingWebAudio = false;
      }
    } catch(e) {
      Howler.usingWebAudio = false;
    }

    // If the audio context creation still failed, set using web audio to false.
    if (!Howler.ctx) {
      Howler.usingWebAudio = false;
    }

    // Check if a webview is being used on iOS8 or earlier (rather than the browser).
    // If it is, disable Web Audio as it causes crashing.
    var iOS = (/iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform));
    var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    var version = appVersion ? parseInt(appVersion[1], 10) : null;
    if (iOS && version && version < 9) {
      var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
      if (Howler._navigator && !safari) {
        Howler.usingWebAudio = false;
      }
    }

    // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).
    if (Howler.usingWebAudio) {
      Howler.masterGain = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
      Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
      Howler.masterGain.connect(Howler.ctx.destination);
    }

    // Re-run the setup on Howler.
    Howler._setup();
  };

  // Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  // Add support for CommonJS libraries such as browserify.
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // Add to global in Node.js (for testing, etc).
  if (typeof global !== 'undefined') {
    global.HowlerGlobal = HowlerGlobal;
    global.Howler = Howler;
    global.Howl = Howl;
    global.Sound = Sound;
  } else if (typeof window !== 'undefined') {  // Define globally in case AMD is not available or unused.
    window.HowlerGlobal = HowlerGlobal;
    window.Howler = Howler;
    window.Howl = Howl;
    window.Sound = Sound;
  }
})();


/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.1
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  // Setup default properties.
  HowlerGlobal.prototype._pos = [0, 0, 0];
  HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];

  /** Global Methods **/
  /***************************************************************************/

  /**
   * Helper method to update the stereo panning position of all current Howls.
   * Future Howls will not use this value unless explicitly set.
   * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
   * @return {Howler/Number}     Self or current stereo panning value.
   */
  HowlerGlobal.prototype.stereo = function(pan) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Loop through all Howls and update their stereo panning.
    for (var i=self._howls.length-1; i>=0; i--) {
      self._howls[i].stereo(pan);
    }

    return self;
  };

  /**
   * Get/set the position of the listener in 3D cartesian space. Sounds using
   * 3D position will be relative to the listener's position.
   * @param  {Number} x The x-position of the listener.
   * @param  {Number} y The y-position of the listener.
   * @param  {Number} z The z-position of the listener.
   * @return {Howler/Array}   Self or current listener position.
   */
  HowlerGlobal.prototype.pos = function(x, y, z) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._pos[1] : y;
    z = (typeof z !== 'number') ? self._pos[2] : z;

    if (typeof x === 'number') {
      self._pos = [x, y, z];

      if (typeof self.ctx.listener.positionX !== 'undefined') {
        self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
      }
    } else {
      return self._pos;
    }

    return self;
  };

  /**
   * Get/set the direction the listener is pointing in the 3D cartesian space.
   * A front and up vector must be provided. The front is the direction the
   * face of the listener is pointing, and up is the direction the top of the
   * listener is pointing. Thus, these values are expected to be at right angles
   * from each other.
   * @param  {Number} x   The x-orientation of the listener.
   * @param  {Number} y   The y-orientation of the listener.
   * @param  {Number} z   The z-orientation of the listener.
   * @param  {Number} xUp The x-orientation of the top of the listener.
   * @param  {Number} yUp The y-orientation of the top of the listener.
   * @param  {Number} zUp The z-orientation of the top of the listener.
   * @return {Howler/Array}     Returns self or the current orientation vectors.
   */
  HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    var or = self._orientation;
    y = (typeof y !== 'number') ? or[1] : y;
    z = (typeof z !== 'number') ? or[2] : z;
    xUp = (typeof xUp !== 'number') ? or[3] : xUp;
    yUp = (typeof yUp !== 'number') ? or[4] : yUp;
    zUp = (typeof zUp !== 'number') ? or[5] : zUp;

    if (typeof x === 'number') {
      self._orientation = [x, y, z, xUp, yUp, zUp];

      if (typeof self.ctx.listener.forwardX !== 'undefined') {
        self.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
      }
    } else {
      return or;
    }

    return self;
  };

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core init.
   * @param  {Function} _super Core init method.
   * @return {Howl}
   */
  Howl.prototype.init = (function(_super) {
    return function(o) {
      var self = this;

      // Setup user-defined default properties.
      self._orientation = o.orientation || [1, 0, 0];
      self._stereo = o.stereo || null;
      self._pos = o.pos || null;
      self._pannerAttr = {
        coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
        coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
        coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
        distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
        maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
        panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
        refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
        rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
      };

      // Setup event listeners.
      self._onstereo = o.onstereo ? [{fn: o.onstereo}] : [];
      self._onpos = o.onpos ? [{fn: o.onpos}] : [];
      self._onorientation = o.onorientation ? [{fn: o.onorientation}] : [];

      // Complete initilization with howler.js core's init function.
      return _super.call(this, o);
    };
  })(Howl.prototype.init);

  /**
   * Get/set the stereo panning of the audio source for this sound or all in the group.
   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Number}    Returns self or the current stereo panning value.
   */
  Howl.prototype.stereo = function(pan, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'stereo',
        action: function() {
          self.stereo(pan, id);
        }
      });

      return self;
    }

    // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.
    var pannerType = (typeof Howler.ctx.createStereoPanner === 'undefined') ? 'spatial' : 'stereo';

    // Setup the group's stereo panning if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's stereo panning if no parameters are passed.
      if (typeof pan === 'number') {
        self._stereo = pan;
        self._pos = [pan, 0, 0];
      } else {
        return self._stereo;
      }
    }

    // Change the streo panning of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof pan === 'number') {
          sound._stereo = pan;
          sound._pos = [pan, 0, 0];

          if (sound._node) {
            // If we are falling back, make sure the panningModel is equalpower.
            sound._pannerAttr.panningModel = 'equalpower';

            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || !sound._panner.pan) {
              setupPanner(sound, pannerType);
            }

            if (pannerType === 'spatial') {
              if (typeof sound._panner.positionX !== 'undefined') {
                sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
              } else {
                sound._panner.setPosition(pan, 0, 0);
              }
            } else {
              sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
            }
          }

          self._emit('stereo', sound._id);
        } else {
          return sound._stereo;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the 3D spatial position of the audio source for this sound or group relative to the global listener.
   * @param  {Number} x  The x-position of the audio source.
   * @param  {Number} y  The y-position of the audio source.
   * @param  {Number} z  The z-position of the audio source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
   */
  Howl.prototype.pos = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change position when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'pos',
        action: function() {
          self.pos(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? 0 : y;
    z = (typeof z !== 'number') ? -0.5 : z;

    // Setup the group's spatial position if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial position if no parameters are passed.
      if (typeof x === 'number') {
        self._pos = [x, y, z];
      } else {
        return self._pos;
      }
    }

    // Change the spatial position of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._pos = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || sound._panner.pan) {
              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.positionX !== 'undefined') {
              sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
              sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
              sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setPosition(x, y, z);
            }
          }

          self._emit('pos', sound._id);
        } else {
          return sound._pos;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
   * space. Depending on how direction the sound is, based on the `cone` attributes,
   * a sound pointing away from the listener can be quiet or silent.
   * @param  {Number} x  The x-orientation of the source.
   * @param  {Number} y  The y-orientation of the source.
   * @param  {Number} z  The z-orientation of the source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
   */
  Howl.prototype.orientation = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change orientation when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'orientation',
        action: function() {
          self.orientation(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._orientation[1] : y;
    z = (typeof z !== 'number') ? self._orientation[2] : z;

    // Setup the group's spatial orientation if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial orientation if no parameters are passed.
      if (typeof x === 'number') {
        self._orientation = [x, y, z];
      } else {
        return self._orientation;
      }
    }

    // Change the spatial orientation of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._orientation = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner) {
              // Make sure we have a position to setup the node with.
              if (!sound._pos) {
                sound._pos = self._pos || [0, 0, -0.5];
              }

              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.orientationX !== 'undefined') {
              sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
              sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
              sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setOrientation(x, y, z);
            }
          }

          self._emit('orientation', sound._id);
        } else {
          return sound._orientation;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the panner node's attributes for a sound or group of sounds.
   * This method can optionall take 0, 1 or 2 arguments.
   *   pannerAttr() -> Returns the group's values.
   *   pannerAttr(id) -> Returns the sound id's values.
   *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
   *   pannerAttr(o, id) -> Set's the values of passed sound id.
   *
   *   Attributes:
   *     coneInnerAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      inside of which there will be no volume reduction.
   *     coneOuterAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      outside of which the volume will be reduced to a constant value of `coneOuterGain`.
   *     coneOuterGain - (0 by default) A parameter for directional audio sources, this is the gain outside of the
   *                     `coneOuterAngle`. It is a linear value in the range `[0, 1]`.
   *     distanceModel - ('inverse' by default) Determines algorithm used to reduce volume as audio moves away from
   *                     listener. Can be `linear`, `inverse` or `exponential.
   *     maxDistance - (10000 by default) The maximum distance between source and listener, after which the volume
   *                   will not be reduced any further.
   *     refDistance - (1 by default) A reference distance for reducing volume as source moves further from the listener.
   *                   This is simply a variable of the distance model and has a different effect depending on which model
   *                   is used and the scale of your coordinates. Generally, volume will be equal to 1 at this distance.
   *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener. This is simply a
   *                     variable of the distance model and can be in the range of `[0, 1]` with `linear` and `[0, ∞]`
   *                     with `inverse` and `exponential`.
   *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
   *                     Can be `HRTF` or `equalpower`.
   *
   * @return {Howl/Object} Returns self or current panner attributes.
   */
  Howl.prototype.pannerAttr = function() {
    var self = this;
    var args = arguments;
    var o, id, sound;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // Determine the values based on arguments.
    if (args.length === 0) {
      // Return the group's panner attribute values.
      return self._pannerAttr;
    } else if (args.length === 1) {
      if (typeof args[0] === 'object') {
        o = args[0];

        // Set the grou's panner attribute values.
        if (typeof id === 'undefined') {
          if (!o.pannerAttr) {
            o.pannerAttr = {
              coneInnerAngle: o.coneInnerAngle,
              coneOuterAngle: o.coneOuterAngle,
              coneOuterGain: o.coneOuterGain,
              distanceModel: o.distanceModel,
              maxDistance: o.maxDistance,
              refDistance: o.refDistance,
              rolloffFactor: o.rolloffFactor,
              panningModel: o.panningModel
            };
          }

          self._pannerAttr = {
            coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== 'undefined' ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
            coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== 'undefined' ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
            coneOuterGain: typeof o.pannerAttr.coneOuterGain !== 'undefined' ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
            distanceModel: typeof o.pannerAttr.distanceModel !== 'undefined' ? o.pannerAttr.distanceModel : self._distanceModel,
            maxDistance: typeof o.pannerAttr.maxDistance !== 'undefined' ? o.pannerAttr.maxDistance : self._maxDistance,
            refDistance: typeof o.pannerAttr.refDistance !== 'undefined' ? o.pannerAttr.refDistance : self._refDistance,
            rolloffFactor: typeof o.pannerAttr.rolloffFactor !== 'undefined' ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
            panningModel: typeof o.pannerAttr.panningModel !== 'undefined' ? o.pannerAttr.panningModel : self._panningModel
          };
        }
      } else {
        // Return this sound's panner attribute values.
        sound = self._soundById(parseInt(args[0], 10));
        return sound ? sound._pannerAttr : self._pannerAttr;
      }
    } else if (args.length === 2) {
      o = args[0];
      id = parseInt(args[1], 10);
    }

    // Update the values of the specified sounds.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      sound = self._soundById(ids[i]);

      if (sound) {
        // Merge the new values into the sound.
        var pa = sound._pannerAttr;
        pa = {
          coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
          coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
          coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
          distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
          maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
          refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
          rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor,
          panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel
        };

        // Update the panner values or create a new panner if none exists.
        var panner = sound._panner;
        if (panner) {
          panner.coneInnerAngle = pa.coneInnerAngle;
          panner.coneOuterAngle = pa.coneOuterAngle;
          panner.coneOuterGain = pa.coneOuterGain;
          panner.distanceModel = pa.distanceModel;
          panner.maxDistance = pa.maxDistance;
          panner.refDistance = pa.refDistance;
          panner.rolloffFactor = pa.rolloffFactor;
          panner.panningModel = pa.panningModel;
        } else {
          // Make sure we have a position to setup the node with.
          if (!sound._pos) {
            sound._pos = self._pos || [0, 0, -0.5];
          }

          // Create a new panner node.
          setupPanner(sound, 'spatial');
        }
      }
    }

    return self;
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core Sound init.
   * @param  {Function} _super Core Sound init method.
   * @return {Sound}
   */
  Sound.prototype.init = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Setup user-defined default properties.
      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // Complete initilization with howler.js core Sound's init function.
      _super.call(this);

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      }
    };
  })(Sound.prototype.init);

  /**
   * Override the Sound.reset method to clean up properties from the spatial plugin.
   * @param  {Function} _super Sound reset method.
   * @return {Sound}
   */
  Sound.prototype.reset = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Reset all spatial plugin properties on this sound.
      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      } else if (self._panner) {
        // Disconnect the panner.
        self._panner.disconnect(0);
        self._panner = undefined;
        parent._refreshBuffer(self);
      }

      // Complete resetting of the sound.
      return _super.call(this);
    };
  })(Sound.prototype.reset);

  /** Helper Methods **/
  /***************************************************************************/

  /**
   * Create a new panner node and save it on the sound.
   * @param  {Sound} sound Specific sound to setup panning on.
   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
   */
  var setupPanner = function(sound, type) {
    type = type || 'spatial';

    // Create the new panner node.
    if (type === 'spatial') {
      sound._panner = Howler.ctx.createPanner();
      sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
      sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
      sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
      sound._panner.distanceModel = sound._pannerAttr.distanceModel;
      sound._panner.maxDistance = sound._pannerAttr.maxDistance;
      sound._panner.refDistance = sound._pannerAttr.refDistance;
      sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
      sound._panner.panningModel = sound._pannerAttr.panningModel;

      if (typeof sound._panner.positionX !== 'undefined') {
        sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);
        sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);
        sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
      }

      if (typeof sound._panner.orientationX !== 'undefined') {
        sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);
        sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);
        sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
      }
    } else {
      sound._panner = Howler.ctx.createStereoPanner();
      sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
    }

    sound._panner.connect(sound._node);

    // Update the connections.
    if (!sound._paused) {
      sound._parent.pause(sound._id, true).play(sound._id, true);
    }
  };
})();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],34:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],35:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[22])

