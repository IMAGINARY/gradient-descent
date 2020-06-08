(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        action: false
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
     *   action: Boolean
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

},{}],2:[function(require,module,exports){
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

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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
        _this.modifyState(gp.index, "left", gp.axes[0] < -0.5);

        _this.modifyState(gp.index, "right", gp.axes[0] > 0.5);

        _this.modifyState(gp.index, "action", gp.buttons[1].pressed || gp.buttons[2].pressed);
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
     *   action: Boolean
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

},{"./controls":1}],3:[function(require,module,exports){
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

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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

},{"./controls":1}],4:[function(require,module,exports){
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

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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

},{"./controls":1}],5:[function(require,module,exports){
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

var PlayerNumberMode = /*#__PURE__*/function (_GameMode) {
  _inherits(PlayerNumberMode, _GameMode);

  var _super = _createSuper(PlayerNumberMode);

  function PlayerNumberMode() {
    _classCallCheck(this, PlayerNumberMode);

    return _super.apply(this, arguments);
  }

  _createClass(PlayerNumberMode, [{
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
  }, {
    key: "handleEnterMode",
    value: function () {
      var _handleEnterMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var $overlay, maxPlayers, $selector, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                $overlay = $(this.game.overlay);
                maxPlayers = this.game.config.maxPlayers;
                this.selectedNumber = 1;
                this.selectorItems = {};
                $('<div class="text text-center numPlayers-title" />').text(IMAGINARY.i18n.t('choose-num-players')).appendTo($overlay);
                $selector = $('<div class="numPlayers-selector" />').addClass("numPlayers-selector-with-".concat(maxPlayers)).appendTo($overlay);

                for (i = 1; i <= maxPlayers; i += 1) {
                  this.selectorItems[i] = $('<div class="item" />').addClass("item-".concat(i)).toggleClass('selected', this.selectedNumber === i).text(i).appendTo($selector);
                }

              case 7:
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
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts) {
      var maxPlayers = this.game.config.maxPlayers;
      var newSelection = null;

      if (inputs.find(function (ctrl, i) {
        return ctrl.direction === -1 && lastInputs[i].direction !== -1;
      })) {
        newSelection = Math.max(1, this.selectedNumber - 1);
      } else if (inputs.find(function (ctrl, i) {
        return ctrl.direction === 1 && lastInputs[i].direction !== 1;
      })) {
        newSelection = Math.min(maxPlayers, this.selectedNumber + 1);
      }

      if (newSelection && newSelection !== this.selectedNumber) {
        this.selectorItems[this.selectedNumber].removeClass('selected');
        this.selectorItems[newSelection].addClass('selected');
        this.selectedNumber = newSelection;
      } // If any button was pressed


      if (inputs.find(function (ctrl, i) {
        return ctrl.action && !lastInputs[i].action;
      })) {
        this.game.numPlayers = this.selectedNumber;
        this.triggerEvent('done');
      }
    }
  }, {
    key: "draw",
    value: function draw(delta, ts) {// Move boats
      // Draw bottom
      // etc...
    }
  }]);

  return PlayerNumberMode;
}(_gameMode["default"]);

exports["default"] = PlayerNumberMode;

},{"./game-mode":8}],6:[function(require,module,exports){
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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var WATER_HEIGHT_SCALE = 10;
var NUM_WATER_POINTS = 300;
var WATER_DISTANCE = 200;
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
var TREASURE_SIZE = 0.03;
var UNCOVER_DURATION = 2000;
var ENDING_SEQUENCE_FST_DELAY = 0;
var ENDING_SEQUENCE_SND_DELAY = 1000;
var ENDING_SEQUENCE_RESTART_DELAY = 2000;

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

        var _this$game, draw, config, numPlayers, $gameStats, $remainingTimeContainer, $remainingProbesContainer, modeGroup, terrainOptions, terrainHeights, terrainPoints, behindGroundGroup, treasure;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$game = this.game, draw = _this$game.draw, config = _this$game.config, numPlayers = _this$game.numPlayers;
                this.isGameOver = false;
                this.discardInputs = false;
                this.remainingTime = config.maxTime * 1000;
                this.$overlay = $('<div class="play" />').appendTo(this.game.overlay);
                $gameStats = $('<div class="game-stats"/>').appendTo(this.$overlay);
                $remainingTimeContainer = $('<div />').text(IMAGINARY.i18n.t('remaining-time')).appendTo($gameStats);
                if (config.maxTime === Number.POSITIVE_INFINITY) $remainingTimeContainer.hide();
                $remainingProbesContainer = $('<div />').text(IMAGINARY.i18n.t('remaining-probes')).appendTo($gameStats);
                this.$remainingTime = $('<span class="counter"/>').appendTo($remainingTimeContainer);
                this.$remainingProbes = $('<span />').appendTo($remainingProbesContainer);
                if (config.maxProbes === Number.POSITIVE_INFINITY) $remainingProbesContainer.hide();
                this.$endingSequenceContainer = $('<div />').appendTo(this.$overlay);
                modeGroup = draw.group().addClass('play').addClass('draw').translate(0, WATER_DISTANCE); // Create a boat for each player

                this.players = Array(numPlayers).fill(null).map(function (_, playerIndex) {
                  var x = (playerIndex + 1) / (numPlayers + 1);
                  var group = modeGroup.group();
                  group.addClass("player-".concat(playerIndex)).transform({
                    translateX: x * draw.width()
                  });
                  var boat = group.use(_this2.shipSymbol).center(0, BOAT_DRAFT);
                  var probeParent = group.group();
                  var probe = probeParent.group();
                  probe.line(0, -draw.height(), 0, -PROBE_SIZE / 2);
                  probe.circle(PROBE_SIZE).center(0, 0);
                  probe.transform({
                    translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST
                  }); // Clip the probe such that only the part below the boat is visible.

                  var probeClip = probeParent.rect(PROBE_SIZE * 4, draw.height()).move(-PROBE_SIZE * 2, BOAT_DRAFT);
                  probeParent.clipWith(probeClip); // Add an element for displaying the number of remaining probes

                  var $remainingProbes = $("<span class=\"counter player-".concat(playerIndex, "\"/>")).appendTo(_this2.$remainingProbes);
                  return {
                    id: playerIndex,
                    group: group,
                    boat: boat,
                    probe: probe,
                    x: x,
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
                        var _this3 = this;

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
                                  return _this3._probeEventEmitter.addListener("probe-off", resolve);
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
                });
                this.water = modeGroup.group().polyline(this.wavesPoints(0)).addClass('water');
                this.groundGroup = modeGroup.group();
                terrainOptions = {
                  marginWidth: TERRAIN_MARGIN_WIDTH
                };
                terrainHeights = (0, _terrain["default"])(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
                terrainPoints = terrainHeights.map(function (h, i) {
                  return [draw.width() * (i / (terrainHeights.length - 1)), TERRAIN_HEIGHT_SCALE * h];
                });
                this.terrainHeights = terrainHeights;
                this.treasureLocation = this.locateTreasure();
                console.log("Treasure location:", this.treasureLocation);
                behindGroundGroup = this.groundGroup.group();
                treasure = behindGroundGroup.group().addClass('treasure').transform({
                  translateX: this.treasureLocation.x * draw.width(),
                  translateY: TERRAIN_DISTANCE + this.treasureLocation.y * TERRAIN_HEIGHT_SCALE
                });
                this.treasureClosed = treasure.use(this.treasureClosedSymbol);
                this.treasureOpened = treasure.use(this.treasureOpenedSymbol).hide();
                this.ground = this.groundGroup.polyline(terrainPoints).addClass('ground').translate(0, TERRAIN_DISTANCE).hide();
                behindGroundGroup.clipWith(this.groundGroup.use(this.ground));
                this.groundClip = this.groundGroup.clip();
                this.groundGroup.clipWith(this.groundClip);
                this.tangents = modeGroup.group().translate(0, TERRAIN_DISTANCE);

              case 32:
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
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function handleExitMode() {
        return _handleExitMode.apply(this, arguments);
      }

      return handleExitMode;
    }()
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts) {
      var _this4 = this;

      // Move the boats or check if they're lowering the probe
      var _this$game2 = this.game,
          draw = _this$game2.draw,
          config = _this$game2.config,
          numPlayers = _this$game2.numPlayers;
      this.remainingTime = Math.max(0, this.remainingTime - delta);
      if (this.discardInputs) return;

      if (!this.isGameOver) {
        if (this.remainingTime === 0) {
          console.log("Time is up - GAME OVER!");
          this.gameOver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt("return", _this4.showLoseSequenceTimeIsUp());

                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          })));
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
                      return _context6.abrupt("return", _this4.showLoseSequenceNoProbesLeft());

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            })));
          }
        }
      }

      inputs.slice(0, numPlayers) // discard inputs that don't belong to an active player
      .forEach(function (input, playerIndex) {
        var lastInput = lastInputs[playerIndex];
        var actionDown = input.action && !lastInput.action;
        if (_this4.isGameOver && actionDown) _this4.triggerEvent('done');
        var player = _this4.players[playerIndex];

        if (!player.probing && !_this4.isGameOver) {
          player.x += SPEED_FACTOR * (delta * input.direction);
          player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x), 1.0 - TERRAIN_MARGIN_WIDTH);
          player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;

          if (actionDown && player.remainingProbes > 0) {
            // Switch to probe mode
            player.probing = true;
            player.remainingProbes = Math.max(0, player.remainingProbes - 1); // Lower the probe, wait and raise it again

            var terrainHeight = _this4.terrainHeight(player.x);

            var probeHeight = TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * terrainHeight;
            var probeDuration = probeHeight * (PROBE_MIN_DURATION / TERRAIN_DISTANCE);
            var runnerDown = player.probe.animate(probeDuration, 0, 'now').transform({
              translateY: probeHeight
            }).after(function () {
              return _this4.addGroundClip(player.x);
            }).after(function () {
              return _this4.addTangent(player);
            });
            var yUp = TERRAIN_DISTANCE * (player.remainingProbes > 0 ? PROBE_DISTANCE_AT_REST : 0);
            var runnerUp = runnerDown.animate(probeDuration, PROBE_DELAY).transform({
              translateY: yUp
            }).after(function () {
              return player.probing = false;
            });
            var treasureFound = Math.abs(player.x - _this4.treasureLocation.x) <= TREASURE_SIZE / 2;
            runnerDown.after( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!(treasureFound && !_this4.isGameOver)) {
                        _context8.next = 4;
                        break;
                      }

                      console.log("Treasure found - GAME OVER!");
                      _context8.next = 4;
                      return _this4.gameOver( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                return _context7.abrupt("return", _this4.showWinSequence(player));

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
      var _this5 = this;

      var _this$game3 = this.game,
          draw = _this$game3.draw,
          numPlayers = _this$game3.numPlayers; // Move boats
      // Draw bottom
      // etc...

      this.water.plot(this.wavesPoints(ts / WATER_LOOP_DURATION));

      var pad = function pad(num, places, _char) {
        return String(num).padStart(places, _char);
      };

      var padRemainingProbes = function padRemainingProbes(num) {
        return pad(num, String(_this5.game.config.maxProbes).length, ' ');
      };

      var padRemainingTime = function padRemainingTime(num) {
        return pad(num, String(_this5.game.config.maxTime).length, ' ');
      };

      this.players.forEach(function (player, playerIndex) {
        var x = player.x;
        var y = WATER_HEIGHT_SCALE * waves.height(x, ts / WATER_LOOP_DURATION);
        var slope = WATER_HEIGHT_SCALE * waves.slope(x, ts / WATER_LOOP_DURATION);
        var angle = 0.25 * 180 * Math.atan2(slope, draw.width()) / Math.PI;
        var boatTransform = {
          rotate: angle
        };
        if (player.flipX) boatTransform.flip = 'x';
        player.boat.transform(boatTransform);
        player.group.transform({
          translateX: x * draw.width(),
          translateY: y
        });
        player.$remainingProbes.text(padRemainingProbes(player.remainingProbes));
        if (player.remainingProbes === 0) player.$remainingProbes.addClass("blinking");
      });
      this.$remainingTime.text(padRemainingTime(Math.ceil(this.remainingTime / 1000.0)));
      if (this.remainingTime === 0) this.$remainingTime.addClass("blinking");
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

      var treasureIndex = argmax(this.terrainHeights);
      return {
        x: treasureIndex / (this.terrainHeights.length - 1),
        y: this.terrainHeights[treasureIndex]
      };
    }
  }, {
    key: "addTangent",
    value: function addTangent(player) {
      var draw = this.game.draw;
      var width = draw.width();

      var _this$terrainHeightEx = this.terrainHeightExt(player.x),
          value = _this$terrainHeightEx.value,
          slope = _this$terrainHeightEx.slope;

      var angle = 180 * Math.atan2(slope * TERRAIN_HEIGHT_SCALE, width) / Math.PI;
      this.tangents.line(-width * TANGENT_LENGTH / 2, 0, width * TANGENT_LENGTH / 2, 0).addClass("player-".concat(player.id)).transform({
        translateX: width * player.x,
        translateY: TERRAIN_HEIGHT_SCALE * value,
        rotate: angle
      });
    }
  }, {
    key: "addGroundClip",
    value: function addGroundClip(x) {
      var draw = this.game.draw;
      var w = draw.width();
      var h = draw.height();
      var rect = this.groundClip.polygon([[-w, -h], [w, -h], [w, h], [-w, h]]).center(draw.width() * x, 0).transform({
        scaleX: 0.001
      });
      this.groundClip.add(rect);
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
        var draw, treasureSpotlight, uncoverGround;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                draw = this.game.draw;
                this.ground.show();
                treasureSpotlight = this.groundClip.circle(2 * TREASURE_SIZE * draw.width()).center(draw.width() * this.treasureLocation.x, TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * this.treasureLocation.y); // Move the treasure spotlight up a bit so it doesn't point at the treasure location on the
                // curve, but rather at the treasure chest

                treasureSpotlight.dy(-2 * 0.3 * TREASURE_SIZE * draw.width()); // Add at least a clipping rectangle at the treasure location such that this method also
                // works when no player probed yet.

                this.addGroundClip(this.treasureLocation.x);

                uncoverGround = function uncoverGround(clip) {
                  return new Promise(function (resolve) {
                    clip.animate(UNCOVER_DURATION).ease(function (pos) {
                      return -(Math.sqrt(1 - pos * pos) - 1);
                    }).transform({
                      scaleX: 1.0
                    }).after(resolve);
                  });
                };

                return _context10.abrupt("return", Promise.all(this.groundClip.children().map(uncoverGround)));

              case 7:
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
    key: "showWinSequence",
    value: function () {
      var _showWinSequence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(winner) {
        var _this6 = this;

        var winAnnouncement, randomElement, treasure, openTreaureChest;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                winAnnouncement = IMAGINARY.i18n.t('win-announcement-begin') + (winner.id + 1) + IMAGINARY.i18n.t('win-announcement-end');

                randomElement = function randomElement(arr) {
                  return arr[Math.floor(Math.random() * (arr.length - 1))];
                };

                treasure = randomElement(IMAGINARY.i18n.t('treasures'));

                openTreaureChest = function openTreaureChest() {
                  _this6.treasureOpened.show();

                  _this6.treasureClosed.hide();
                };

                _context11.next = 6;
                return this.showGameOverSequence(winAnnouncement, treasure, openTreaureChest, ["player-".concat(winner.id)]);

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function showWinSequence(_x2) {
        return _showWinSequence.apply(this, arguments);
      }

      return showWinSequence;
    }()
  }, {
    key: "showLoseSequenceTimeIsUp",
    value: function () {
      var _showLoseSequenceTimeIsUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.showGameOverSequence(IMAGINARY.i18n.t('time-is-up'), IMAGINARY.i18n.t('game-over'));

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function showLoseSequenceTimeIsUp() {
        return _showLoseSequenceTimeIsUp.apply(this, arguments);
      }

      return showLoseSequenceTimeIsUp;
    }()
  }, {
    key: "showLoseSequenceNoProbesLeft",
    value: function () {
      var _showLoseSequenceNoProbesLeft = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.showGameOverSequence(IMAGINARY.i18n.t('no-probes-left'), IMAGINARY.i18n.t('game-over'));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function showLoseSequenceNoProbesLeft() {
        return _showLoseSequenceNoProbesLeft.apply(this, arguments);
      }

      return showLoseSequenceNoProbesLeft;
    }()
  }, {
    key: "showGameOverSequence",
    value: function () {
      var _showGameOverSequence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(firstMessage, secondMessage) {
        var secondMessageCallback,
            cssClasses,
            draw,
            delay,
            restartMessage,
            $firstMessageDiv,
            $secondMessageDiv,
            $restartDiv,
            $endingSequenceDiv,
            left,
            top,
            $announcementAnchor,
            _args14 = arguments;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                secondMessageCallback = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : Function.prototype;
                cssClasses = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : [];
                draw = this.game.draw;

                delay = function delay(ms) {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                  });
                };

                restartMessage = IMAGINARY.i18n.t('press-to-restart');
                $firstMessageDiv = $('<div>').text(firstMessage);
                $secondMessageDiv = $('<div>').text(secondMessage).css('visibility', 'hidden');
                $restartDiv = $('<div class="blinking">').text(restartMessage).css('visibility', 'hidden');
                $endingSequenceDiv = $('<div class="ending-sequences-text" />').addClass(cssClasses).append([$firstMessageDiv, $secondMessageDiv, $('<br>'), $restartDiv]);
                left = 100 * this.treasureLocation.x;
                top = 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
                $announcementAnchor = $('<div class="ending-sequences-text-anchor" />').css({
                  left: "".concat(left, "%"),
                  top: "".concat(top, "%"),
                  width: "0px",
                  height: "0px"
                });
                _context14.next = 14;
                return delay(ENDING_SEQUENCE_FST_DELAY);

              case 14:
                this.$endingSequenceContainer.empty().append([$announcementAnchor, $endingSequenceDiv]); // popper.js places the ending sequence text in a popup-like fashion above the announcement
                // anchor and makes sure that is does not move off the screen if the anchor is to close to a
                // screen edge.

                (0, _core.createPopper)($announcementAnchor.get(0), $endingSequenceDiv.get(0), {
                  placement: 'top'
                });
                _context14.next = 18;
                return delay(ENDING_SEQUENCE_SND_DELAY);

              case 18:
                $secondMessageDiv.css("visibility", "visible");
                secondMessageCallback();
                _context14.next = 22;
                return delay(ENDING_SEQUENCE_RESTART_DELAY);

              case 22:
                $restartDiv.css("visibility", "visible");

              case 23:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function showGameOverSequence(_x3, _x4) {
        return _showGameOverSequence.apply(this, arguments);
      }

      return showGameOverSequence;
    }()
  }]);

  return PlayMode;
}(_gameMode["default"]);

exports["default"] = PlayMode;

},{"./game-mode":8,"./terrain":11,"./waves":12,"@popperjs/core":14,"events":15}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameMode = _interopRequireDefault(require("./game-mode"));

var _wavyAnimation = _interopRequireDefault(require("./wavy-animation"));

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

var TitleMode = /*#__PURE__*/function (_GameMode) {
  _inherits(TitleMode, _GameMode);

  var _super = _createSuper(TitleMode);

  function TitleMode() {
    _classCallCheck(this, TitleMode);

    return _super.apply(this, arguments);
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
        var draw, pressToStart, gradientLogo;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                draw = this.game.draw;
                pressToStart = document.createElement('div');
                pressToStart.classList.add('blinking', 'text', 'text-center', 'text-vcenter');
                pressToStart.textContent = IMAGINARY.i18n.t('press-to-start');
                this.game.overlay.append(pressToStart);
                gradientLogo = draw.use(this.logoSprite).size(1200, 400).stroke({
                  color: '#00368a',
                  width: 2
                }).fill('transparent').center(1920 / 2, 1080 / 2.5);
                gradientLogo.animate({
                  duration: 5000
                }).stroke({
                  color: '#34c6ff'
                });
                this.wavyStep = (0, _wavyAnimation["default"])(this.logoSprite, {
                  duration: 3500
                });
                this.animCounter = 0;

              case 9:
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
  }, {
    key: "handleInputs",
    value: function handleInputs(inputs, lastInputs, delta, ts0) {
      // If any button was pressed
      if (inputs.find(function (ctrl, i) {
        return ctrl.action && !lastInputs[i].action;
      })) {
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

},{"./game-mode":8,"./wavy-animation":13}],8:[function(require,module,exports){
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

},{"events":15}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameModePlay = _interopRequireDefault(require("./game-mode-play"));

var _gameModeTitle = _interopRequireDefault(require("./game-mode-title"));

var _gameModeNumplayers = _interopRequireDefault(require("./game-mode-numplayers"));

var _gamepad = _interopRequireDefault(require("./controls/gamepad"));

var _screen = _interopRequireDefault(require("./controls/screen"));

var _keyboard = _interopRequireDefault(require("./controls/keyboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    this.gameLoop = null;
    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;
    this.controls = {};
    this.debugControlsPane = null;
    this.numPlayers = this.config.maxPlayers;
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
        var width, height, viewContainer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                width = 1920, height = 864;
                this.overlay = document.createElement('div');
                this.overlay.classList.add('overlay');
                viewContainer = document.createElement('div');
                viewContainer.classList.add('game-view');
                this.container.append(viewContainer);
                this.svgDoc = SVG().addTo(viewContainer);
                this.svgDoc.viewbox(0, 0, width, height).attr('preserveAspectRatio', 'xMinYMin meet');
                this.draw = this.svgDoc.nested().size(width, height);
                this.overlay = document.createElement('div');
                this.overlay.classList.add('overlay');
                this.container.append(this.overlay);

                if (this.config.useScreenControls) {
                  this.controls.screen = new _screen["default"](this.config.maxPlayers);
                  this.container.appendChild(this.controls.screen.element);
                }

                if (this.config.useGamepads) {
                  this.controls.gamepad = new _gamepad["default"](this.config.maxPlayers);
                }

                if (this.config.useKeyboardControls) {
                  this.controls.keyboard = new _keyboard["default"](this.config.maxPlayers);
                }

                if (this.config.debugControls) {
                  this.debugControlsPane = document.createElement('div');
                  this.debugControlsPane.classList.add('debug-pane');
                  this.debugControlsPane.classList.add('debug-pane-controls');
                  this.container.appendChild(this.debugControlsPane);
                }

                _context.next = 18;
                return this.registerMode('title', new _gameModeTitle["default"](this));

              case 18:
                _context.next = 20;
                return this.registerMode('numplayers', new _gameModeNumplayers["default"](this));

              case 20:
                _context.next = 22;
                return this.registerMode('play', new _gameModePlay["default"](this));

              case 22:
                if (!this.config.continuousGame) {
                  _context.next = 28;
                  break;
                }

                this.transition('play', 'done', 'play');
                _context.next = 26;
                return this.setMode('play');

              case 26:
                _context.next = 33;
                break;

              case 28:
                this.transition('title', 'done', this.config.maxPlayers > 1 ? 'numplayers' : 'play');
                this.transition('numplayers', 'done', 'play');
                this.transition('play', 'done', 'title');
                _context.next = 33;
                return this.setMode('title');

              case 33:
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
    key: "readInputs",
    value: function readInputs() {
      this.inputsLast = this.inputs;
      var states = Object.values(this.controls).map(function (c) {
        return c.getStates();
      });

      var inputReducer = function inputReducer(accInput, curState) {
        return {
          direction: curState.right ? 1 : curState.left ? -1 : accInput.direction,
          action: curState.action || accInput.action
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
    /**
     * Game loop
     */

  }, {
    key: "run",
    value: function run() {
      var _this = this;

      if (!this.gameLoop) {
        var lastTs = 0;
        var lag = 0;
        var MAX_DELTA = 125;

        this.gameLoop = function (ts) {
          if (!_this.isPaused) {
            _this.readInputs();

            lag += Math.max(0, ts - lag - lastTs - MAX_DELTA);
            ts -= lag;
            var delta = ts - lastTs;

            _this.currentMode.handleInputs(_this.inputs, _this.inputsLast, delta, ts);

            _this.currentMode.draw(delta, ts);

            lastTs = ts;
            window.requestAnimationFrame(_this.gameLoop);
          }
        };
      }

      window.requestAnimationFrame(this.gameLoop);
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
      var _this2 = this;

      var nextModeId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (this.modes[modeId] === undefined) {
        throw new Error("Can't define transition from unknown game mode '".concat(modeId, "'"));
      }

      if (nextModeId && this.modes[nextModeId] === undefined) {
        throw new Error("Can't define transition to unknown game mode '".concat(nextModeId, "'"));
      }

      this.modes[modeId].events.on(event, function () {
        if (_this2.currentMode !== _this2.modes[modeId]) {
          throw new Error("Mode ".concat(modeId, " triggered the event ").concat(event, " while not active. Something was not cleaned up?"));
        }

        if (nextModeId !== null) {
          _this2.setMode(nextModeId);
        }

        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    }
  }]);

  return GradientDescentGame;
}();

exports["default"] = GradientDescentGame;

},{"./controls/gamepad":2,"./controls/keyboard":3,"./controls/screen":4,"./game-mode-numplayers":5,"./game-mode-play":6,"./game-mode-title":7}],10:[function(require,module,exports){
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
  maxTime: Number.POSITIVE_INFINITY,
  maxProbes: Number.POSITIVE_INFINITY,
  continuousGame: false,
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
    var response, config, titleCase;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(uri);

          case 2:
            response = _context2.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context2.next = 17;
              break;
            }

            _context2.prev = 4;
            _context2.next = 7;
            return response.json();

          case 7:
            config = _context2.sent;

            // Take into account the INFINITY is a valid value for maxTime and maxProbes
            titleCase = function titleCase(s) {
              return function (l) {
                return l.charAt(0).toUpperCase() + l.slice(1);
              }(String(s).toLowerCase());
            };

            if (Number(titleCase(config.maxTime)) === Number.POSITIVE_INFINITY) config.maxTime = Number.POSITIVE_INFINITY;
            if (Number(titleCase(config.maxProbes)) === Number.POSITIVE_INFINITY) config.maxProbes = Number.POSITIVE_INFINITY;
            return _context2.abrupt("return", config);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](4);
            throw new Error("Error parsing config file: ".concat(_context2.t0.message));

          case 17:
            throw new Error("Server returned status ".concat(response.status, " (").concat(response.statusText, ") loading config file."));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 14]]);
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
            window.game = game;
            _context.next = 14;
            return game.init();

          case 14:
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

},{"./game":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = terrain;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    index: Math.floor(length * Math.random()),
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
  var heights = new Float32Array(numPoints);
  var marginIndices = [Math.floor(marginWidth * numPoints), Math.floor(marginWidth + (1 - 2 * marginWidth) * numPoints)];
  var predefinedHeights = [[0, Math.random() * marginHeight], [marginIndices[0], marginHeight], [marginIndices[0] + 1 + Math.floor(Math.random() * (marginIndices[1] - marginIndices[0])), 1.0], [marginIndices[1], marginHeight], [numPoints - 1, Math.random() * marginHeight]];

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

var defaultOptions = {
  marginWidth: 0.1,
  marginHeight: 0.1,
  jitter: 0.25,
  smoothing: 6
};

function terrain(numSamples, length) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = Object.assign({}, defaultOptions, options);
  var roughTerrainPoints = generateTerrainPoints(numSamples, options.marginWidth, options.marginHeight, options.jitter);
  var smoothTerrainPoints = smoothChaikin(roughTerrainPoints, options.smoothing);
  var smoothTerrainHeights = convertPointsToHeights(smoothTerrainPoints, length);
  return smoothTerrainHeights;
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.height = height;
exports.slope = slope;
exports.heights = heights;
exports.points = points;
exports.animatedSVG = animatedSVG;
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
 * This will probably doesn't work in a lot of browsers.
 * Problems: It's not possible to the the timestamp (progress) of the animation,
 * which would be needed to keep it in sync with other elements in the scene.
 */


function animatedSVG(svgContainer, numPoints, numSteps, xScale, yScale, duration) {
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

},{}],13:[function(require,module,exports){
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

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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

},{}],14:[function(require,module,exports){
(function (process){
/**
 * @popperjs/core v2.4.0 - MIT License
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
    return ownerDocument ? ownerDocument.defaultView : window;
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
  return (isElement(element) ? element.ownerDocument : element.document).documentElement;
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
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (!isFixed) {
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

  return element.offsetParent;
}

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

  while (offsetParent && isTableElement(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || window;
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
    merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
      options: Object.assign({}, existing.options, {}, current.options),
      data: Object.assign({}, existing.data, {}, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
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
      options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
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
        state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
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

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
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
    state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
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

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
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

function getViewportRect(element) {
  var win = getWindow(element);
  var visualViewport = win.visualViewport;
  var width = win.innerWidth;
  var height = win.innerHeight; // We don't know which browsers have buggy or odd implementations of this, so
  // for now we're only applying it to iOS to fix the keyboard issue.
  // Investigation required

  if (visualViewport && /iPhone|iPod|iPad/.test(navigator.platform)) {
    width = visualViewport.width;
    height = visualViewport.height;
  }

  return {
    width: width,
    height: height,
    x: 0,
    y: 0
  };
}

function getDocumentRect(element) {
  var win = getWindow(element);
  var winScroll = getWindowScroll(element);
  var documentRect = getCompositeRect(getDocumentElement(element), win);
  documentRect.height = Math.max(documentRect.height, win.innerHeight);
  documentRect.width = Math.max(documentRect.width, win.innerWidth);
  documentRect.x = -winScroll.scrollLeft;
  documentRect.y = -winScroll.scrollTop;
  return documentRect;
}

function toNumber(cssValue) {
  return parseFloat(cssValue) || 0;
}

function getBorders(element) {
  var computedStyle = isHTMLElement(element) ? getComputedStyle(element) : {};
  return {
    top: toNumber(computedStyle.borderTopWidth),
    right: toNumber(computedStyle.borderRightWidth),
    bottom: toNumber(computedStyle.borderBottomWidth),
    left: toNumber(computedStyle.borderLeftWidth)
  };
}

function getDecorations(element) {
  var win = getWindow(element);
  var borders = getBorders(element);
  var isHTML = getNodeName(element) === 'html';
  var winScrollBarX = getWindowScrollBarX(element);
  var x = element.clientWidth + borders.right;
  var y = element.clientHeight + borders.bottom; // HACK:
  // document.documentElement.clientHeight on iOS reports the height of the
  // viewport including the bottom bar, even if the bottom bar isn't visible.
  // If the difference between window innerHeight and html clientHeight is more
  // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
  // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
  //   is about 17px)
  // * The mobile bar is 114px tall

  if (isHTML && win.innerHeight - element.clientHeight > 50) {
    y = win.innerHeight - borders.bottom;
  }

  return {
    top: isHTML ? 0 : element.clientTop,
    right: // RTL scrollbar (scrolling containers only)
    element.clientLeft > borders.left ? borders.right : // LTR scrollbar
    isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
    bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
    left: isHTML ? winScrollBarX : element.clientLeft
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
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
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(element);
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement);
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
    accRect.top = Math.max(rect.top + decorations.top, accRect.top);
    accRect.right = Math.min(rect.right - decorations.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left + decorations.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
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
  return Object.assign({}, getFreshSideObject(), {}, paddingObject);
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
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
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
  var placements$1 = (variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements).filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  }); // $FlowFixMe: Flow seems to have problems with two array unions...

  var overflows = placements$1.reduce(function (acc, placement) {
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
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
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
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
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

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

exports.createPopper = createPopper;
exports.defaultModifiers = defaultModifiers;
exports.detectOverflow = detectOverflow;
exports.popperGenerator = popperGenerator;


}).call(this,require('_process'))

},{"_process":16}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}]},{},[10])

