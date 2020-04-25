(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameMode = _interopRequireDefault(require("./game-mode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PlayMode = /*#__PURE__*/function (_GameMode) {
  _inherits(PlayMode, _GameMode);

  var _super = _createSuper(PlayMode);

  function PlayMode() {
    _classCallCheck(this, PlayMode);

    return _super.apply(this, arguments);
  }

  _createClass(PlayMode, [{
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    key: "handleInput",
    value: function handleInput(input, lastInput) {// Move the boats or check if they're lowering the probe
    }
  }, {
    key: "draw",
    value: function draw(ts) {// Draw sea
      // Draw boats
      // Draw bottom
      // etc...
    }
  }]);

  return PlayMode;
}(_gameMode["default"]);

exports["default"] = PlayMode;

},{"./game-mode":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this,no-unused-vars,no-empty-function */

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
     * @param {[{direction: Number, action: Boolean}]} input
     * @param {[{direction: Number, action: Boolean}]} lastInput
     */

  }, {
    key: "handleInput",
    value: function handleInput(input, lastInput) {}
    /**
     * Called once per frame so the mode can draw based on the game's state
     *
     * @param {Number} ts
     */

  }, {
    key: "draw",
    value: function draw(ts) {}
  }]);

  return GameMode;
}();

exports["default"] = GameMode;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameModePlay = _interopRequireDefault(require("./game-mode-play"));

var _screenControls = _interopRequireDefault(require("./screen-controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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
    this.input = [];
    this.inputLast = [];
    this.initInput();
    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;
    this.screenControls = null;
    this.debugControlsPane = null;
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
        var preloaders;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.svg = SVG().addTo(this.container);

                if (this.config.useScreenControls) {
                  this.screenControls = new _screenControls["default"](this.config.maxPlayers);
                  this.container.appendChild(this.screenControls.element);
                }

                if (this.config.debugControls) {
                  this.debugControlsPane = document.createElement('div');
                  this.debugControlsPane.classList.add('debug-pane');
                  this.debugControlsPane.classList.add('debug-pane-controls');
                  this.container.appendChild(this.debugControlsPane);
                }

                _context.next = 5;
                return this.registerMode('play', new _gameModePlay["default"](this));

              case 5:
                preloaders = Object.entries(this.modes).map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      mode = _ref2[1];

                  return function () {
                    mode.preLoadAssets();
                  };
                });
                _context.next = 8;
                return Promise.all(preloaders);

              case 8:
                _context.next = 10;
                return this.setMode('play');

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * Initializes the input state
     *
     * @private
     */

  }, {
    key: "initInput",
    value: function initInput() {
      this.input = Array(this.config.maxPlayers).fill(null).map(function () {
        return {
          direction: 0,
          action: false
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
    key: "readInput",
    value: function readInput() {
      var _this = this;

      this.inputLast = this.input;
      this.initInput();

      if (this.screenControls) {
        this.screenControls.getState().forEach(function (ctrl, i) {
          if (ctrl.left) {
            _this.input[i].direction = -1;
          }

          if (ctrl.right) {
            _this.input[i].direction = 1;
          }

          _this.input[i].action = _this.input[i].action || ctrl.action;
        });
      }

      if (this.config.useGamepads) {
        Array.from(navigator.getGamepads()).forEach(function (gp, i) {
          if (gp !== null) {
            if (gp.axes[0] < -0.5) {
              _this.input[i].direction = -1;
            }

            if (gp.axes[0] > 0.5) {
              _this.input[i].direction = 1;
            }

            _this.input[i].action = _this.input[i].action || gp.buttons[1].pressed || gp.buttons[2].pressed;
          }
        });
      }

      if (this.debugControlsPane) {
        this.debugControlsPane.textContent = this.input.map(function (ctrl, i) {
          return "C".concat(i, ": d=").concat(ctrl.direction, " a=").concat(ctrl.action ? 'T' : 'F');
        }).join("\xA0\xA0\xA0\xA0"); // four &nbsp;
      }
    }
    /**
     * Game loop
     */

  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var gameLoop = function gameLoop(ts) {
        if (!_this2.isPaused) {
          _this2.readInput();

          _this2.currentMode.handleInput(_this2.input, _this2.inputLast);

          _this2.currentMode.draw(ts);

          window.requestAnimationFrame(gameLoop);
        }
      };

      window.requestAnimationFrame(gameLoop);
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
      var _registerMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, mode) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.modes[id] = mode;

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function registerMode(_x, _x2) {
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
      var _setMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(modeID) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.pause();

                if (!this.currentMode) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return this.currentMode.handleExitMode();

              case 4:
                if (!(this.modes[modeID] === undefined)) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Can't change to unknown mode ".concat(modeID));

              case 6:
                this.currentMode = this.modes[modeID];
                _context3.next = 9;
                return this.currentMode.handleEnterMode();

              case 9:
                this.resume();

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setMode(_x3) {
        return _setMode.apply(this, arguments);
      }

      return setMode;
    }()
  }]);

  return GradientDescentGame;
}();

exports["default"] = GradientDescentGame;

},{"./game-mode-play":1,"./screen-controls":5}],4:[function(require,module,exports){
"use strict";

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaultConfig = {
  defaultLanguage: 'en',
  useGamepads: true,
  useScreenControls: true,
  maxPlayers: 2,
  debugControls: false
};
/**
 * Loads the config file from an external JSON file
 *
 * @param {String} uri
 * @return {Promise<any>}
 */

function loadConfig(_x) {
  return _loadConfig.apply(this, arguments);
}
/**
 * Load config files and start the program
 */


function _loadConfig() {
  _loadConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uri) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(uri);

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
            throw new Error("Error parsing config file: ".concat(_context2.t0.message));

          case 13:
            throw new Error("Server returned status ".concat(response.status, " (").concat(response.statusText, ") loading config file."));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 10]]);
  }));
  return _loadConfig.apply(this, arguments);
}

(function () {
  var _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var config, game;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = Object;
            _context.t1 = {};
            _context.t2 = defaultConfig;
            _context.next = 6;
            return loadConfig('./config.json');

          case 6:
            _context.t3 = _context.sent;
            config = _context.t0.assign.call(_context.t0, _context.t1, _context.t2, _context.t3);
            _context.next = 10;
            return IMAGINARY.i18n.init({
              queryStringVariable: 'lang',
              translationsDirectory: 'tr',
              defaultLanguage: config.defaultLanguage || 'en'
            });

          case 10:
            // eslint-disable-next-line no-unused-vars
            game = new _game["default"](document.querySelector('.main'), config);
            _context.next = 13;
            return game.init();

          case 13:
            game.run();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t4 = _context["catch"](0);
            // eslint-disable-next-line no-console
            console.error(_context.t4);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  function main() {
    return _main.apply(this, arguments);
  }

  return main;
})()();

},{"./game":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
 *
 */
var ScreenControls = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  function ScreenControls(count) {
    var _this = this;

    _classCallCheck(this, ScreenControls);

    this.element = document.createElement('div');
    this.element.classList.add('screen-controls');
    this.element.classList.add("with-".concat(count, "-controls"));
    this.state = []; // Initialize the state of each controller

    for (var i = 0; i < count; i += 1) {
      this.state.push({
        left: false,
        right: false,
        action: false
      });
      this.element.appendChild(this.buildControl(i));
    } // Global mouseup handling for all buttons


    this.mousePressedButton = null;
    window.addEventListener('mouseup', function () {
      if (_this.mousePressedButton !== null) {
        _this.state[_this.mousePressedButton.id][_this.mousePressedButton.name] = false;

        _this.mousePressedButton.element.classList.remove('active');

        _this.mousePressedButton = null;
      }
    });
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
            _this2.state[id][name] = true;
            button.classList.add('active');
          } else {
            _this2.state[id][name] = false;
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
          _this2.state[id][name] = true;
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
    /**
     * Returns state of all controllers
     *
     * State is returned as an array with one object per controller
     * with properties indicating the state of each button.
     *
     * @return {[{
     *   left: Boolean,
     *   right: Boolean,
     *   action: Boolean
     * }]}
     */

  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);

  return ScreenControls;
}();

exports["default"] = ScreenControls;

},{}]},{},[4]);
