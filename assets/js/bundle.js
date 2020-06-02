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
/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
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
var PROBE_EXPOSURE_RADIUS = 0.01;

var PlayMode = /*#__PURE__*/function (_GameMode) {
  _inherits(PlayMode, _GameMode);

  var _super = _createSuper(PlayMode);

  function PlayMode(game) {
    var _this;

    _classCallCheck(this, PlayMode);

    _this = _super.call(this, game);
    var wavesPoints = Array(NUM_WATER_POINTS).fill(null);

    _this.wavesPoints = function (ts) {
      return waves.points(wavesPoints, ts);
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

              case 3:
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
        var _this2 = this;

        var _this$game, draw, numPlayers, modeGroup, terrainOptions, terrainHeights, terrainPoints;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$game = this.game, draw = _this$game.draw, numPlayers = _this$game.numPlayers;
                modeGroup = draw.group().addClass('play').translate(0, 200); // Create a boat for each player

                this.players = Array(numPlayers).fill(null).map(function (_, playerIndex) {
                  var x = (playerIndex + 1) / (numPlayers + 1);
                  var group = modeGroup.group();
                  group.addClass("boat-".concat(playerIndex)).transform({
                    translateX: x * draw.width()
                  });
                  var boat = group.use(_this2.shipSymbol);
                  boat.size(300, 200).center(0, -35);
                  var probeParent = group.group();
                  var probe = probeParent.group();
                  probe.line(0, -draw.height(), 0, -PROBE_SIZE / 2);
                  probe.circle(PROBE_SIZE).center(0, 0);
                  probe.transform({
                    translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST
                  }); // Clip the probe such that only the part below the boat is visible.

                  var probeClip = probeParent.rect(PROBE_SIZE * 4, draw.height()).move(-PROBE_SIZE * 2, 20);
                  probeParent.clipWith(probeClip);
                  return {
                    group: group,
                    boat: boat,
                    probe: probe,
                    x: x,
                    flipX: false,
                    probing: false
                  };
                });
                this.water = modeGroup.polyline(this.wavesPoints(0)).addClass('water').scale(draw.width(), WATER_HEIGHT_SCALE, 0, 0);
                this.groundGroup = modeGroup.group();
                terrainOptions = {
                  marginWidth: TERRAIN_MARGIN_WIDTH
                };
                terrainHeights = (0, _terrain["default"])(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
                terrainPoints = terrainHeights.map(function (h, i) {
                  return [i / (terrainHeights.length - 1), h];
                });
                this.ground = this.groundGroup.polyline(terrainPoints).addClass('ground').scale(draw.width(), TERRAIN_HEIGHT_SCALE, 0, 0).translate(0, TERRAIN_DISTANCE);
                this.terrainHeights = terrainHeights;
                this.groundClip = this.groundGroup.clip();
                this.groundGroup.clipWith(this.groundClip);

              case 12:
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
      var _this3 = this;

      // Move the boats or check if they're lowering the probe
      var _this$game2 = this.game,
          draw = _this$game2.draw,
          numPlayers = _this$game2.numPlayers;
      inputs.slice(0, numPlayers) // discard inputs that don't belong to an active player
      .forEach(function (input, playerIndex) {
        var player = _this3.players[playerIndex];

        if (!player.probing) {
          player.x += SPEED_FACTOR * (delta * input.direction);
          player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x), 1.0 - TERRAIN_MARGIN_WIDTH);
          player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;

          if (input.action) {
            // Switch to probe mode
            player.probing = true; // Lower the probe, wait and raise it again

            var terrainHeight = _this3.terrainHeight(player.x);

            var probeHeight = TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * terrainHeight;
            var probeDuration = probeHeight * (PROBE_MIN_DURATION / TERRAIN_DISTANCE);
            player.probe.animate(probeDuration, 0, 'now').transform({
              translateY: probeHeight
            }).after(function () {
              return _this3.addGroundClip(player.x);
            }).animate(probeDuration, PROBE_DELAY).transform({
              translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST
            }).after(function () {
              return player.probing = false;
            });
          }
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(delta, ts) {
      var _this$game3 = this.game,
          draw = _this$game3.draw,
          numPlayers = _this$game3.numPlayers; // Move boats
      // Draw bottom
      // etc...

      this.water.plot(this.wavesPoints(ts));
      this.players.forEach(function (player, playerIndex) {
        var x = player.x;
        var y = WATER_HEIGHT_SCALE * waves.height(x, ts);
        var slope = WATER_HEIGHT_SCALE * waves.slope(x, ts);
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
      });
    }
  }, {
    key: "terrainHeight",
    value: function terrainHeight(x) {
      var xInArray = (this.terrainHeights.length - 1) * x;
      var i0 = Math.floor(xInArray);
      var i1 = Math.ceil(xInArray);
      var h0 = this.terrainHeights[i0];
      var h1 = this.terrainHeights[i1];
      var t = xInArray - i0;
      return h0 + t * (h1 - h0);
    }
  }, {
    key: "addGroundClip",
    value: function addGroundClip(x) {
      var draw = this.game.draw;
      var width = 2 * PROBE_EXPOSURE_RADIUS * draw.width();
      var rect = this.groundGroup.rect(width, draw.height()).transform({
        translateX: draw.width() * x - width / 2
      });
      this.groundClip.add(rect);
    }
  }]);

  return PlayMode;
}(_gameMode["default"]);

exports["default"] = PlayMode;

},{"./game-mode":8,"./terrain":11,"./waves":12}],7:[function(require,module,exports){
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

},{"events":14}],9:[function(require,module,exports){
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
        var width, height;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                width = 1920, height = 1080;
                this.svgDoc = SVG().addTo(this.container).size(width, height);
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

                _context.next = 12;
                return this.registerMode('title', new _gameModeTitle["default"](this));

              case 12:
                _context.next = 14;
                return this.registerMode('numplayers', new _gameModeNumplayers["default"](this));

              case 14:
                _context.next = 16;
                return this.registerMode('play', new _gameModePlay["default"](this));

              case 16:
                if (!this.config.continuousGame) {
                  _context.next = 22;
                  break;
                }

                this.transition('play', 'done', 'play');
                _context.next = 20;
                return this.setMode('play');

              case 20:
                _context.next = 27;
                break;

              case 22:
                this.transition('title', 'done', this.config.maxPlayers > 1 ? 'numplayers' : 'play');
                this.transition('numplayers', 'done', 'play');
                this.transition('play', 'done', 'title');
                _context.next = 27;
                return this.setMode('title');

              case 27:
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

      var lastTs = 0;
      var lag = 0;
      var MAX_DELTA = 125;

      var gameLoop = function gameLoop(ts) {
        if (!_this.isPaused) {
          _this.readInputs();

          lag += Math.max(0, ts - lag - lastTs - MAX_DELTA);
          ts -= lag;
          var delta = ts - lastTs;

          _this.currentMode.handleInputs(_this.inputs, _this.inputsLast, delta, ts);

          _this.currentMode.draw(delta, ts);

          lastTs = ts;
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

function height(x, ts) {
  ts = ts / 500;
  return (Math.sin(x * 100 + ts) + Math.sin(x * 50 - 1 * ts) + Math.sin(x * 30 + 2 * ts) + Math.sin(x * 10 - 3 * ts)) / 4;
}

function slope(x, ts) {
  ts = ts / 500;
  return (100 * Math.cos(100 * x + ts) + 50 * Math.cos(50 * x - ts) + 30 * Math.cos(30 * x + 2 * ts) + 10 * Math.cos(10 * x - 3 * ts)) / 4;
}

function heights(arr, ts) {
  arr.forEach(function (_, i) {
    return arr[i] = height(i / (arr.length - 1), ts);
  });
  return arr;
}

function points(arr, ts) {
  arr.forEach(function (_, i) {
    var x = i / (arr.length - 1);
    arr[i] = [x, height(x, ts)];
  });
  return arr;
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

},{}]},{},[10])

