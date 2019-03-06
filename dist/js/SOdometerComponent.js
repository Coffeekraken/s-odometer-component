"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.default = void 0

var _SWebComponent2 = _interopRequireDefault(
  require("coffeekraken-sugar/js/core/SWebComponent")
)

var _odometer = _interopRequireDefault(require("odometer"))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)
      if (desc.get) {
        return desc.get.call(receiver)
      }
      return desc.value
    }
  }
  return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }
  return object
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function")
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

var SOdometerComponent =
  /*#__PURE__*/
  (function(_SWebComponent) {
    _inherits(SOdometerComponent, _SWebComponent)

    function SOdometerComponent() {
      _classCallCheck(this, SOdometerComponent)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(SOdometerComponent).apply(this, arguments)
      )
    }

    _createClass(
      SOdometerComponent,
      [
        {
          key: "componentMount",

          /**
           * Mount component
           * @definition    SWebComponent.componentMount
           * @protected
           */
          value: function componentMount() {
            _get(
              _getPrototypeOf(SOdometerComponent.prototype),
              "componentMount",
              this
            ).call(this) // track current displayed value

            this._currentValueIdx = -1 // if theiry no values in the props stack,
            // take the value from the innerHTML

            if (!this.props.values.length) {
              this.props.values.push(this.innerHTML)
            } // initiate the odometer

            this._odometer = new _odometer.default({
              el: this,
              value:
                this.props.initialValue !== null
                  ? this.props.initialValue
                  : this._randomNumber(this.props.values[0].toString().length),
              format: this.props.format,
              duration: this.props.duration
            }) // go to next (first) value

            this.next()
          }
          /**
           * Pass to the next value
           */
        },
        {
          key: "next",
          value: function next() {
            if (
              !this.props.loop &&
              this._currentValueIdx + 1 === this.props.values.length
            )
              return
            this._currentValueIdx =
              this._currentValueIdx + 1 === this.props.values.length
                ? 0
                : this._currentValueIdx + 1 // update the odometer

            this._odometer.update(this.props.values[this._currentValueIdx]) // timeout if needed

            if (this.props.timeout) {
              setTimeout(this.next.bind(this), this.props.timeout)
            }
          }
          /**
           * Update the odometer to a new value
           * @param    {Number}    value    The new value for the odometer
           */
        },
        {
          key: "updateOdometer",
          value: function updateOdometer(value) {
            this._odometer.update(value)
          }
          /**
           * Generate a random number
           * @param    {Integer}    length    The length of the number to generate
           * @return    {String}    The generated number
           */
        },
        {
          key: "_randomNumber",
          value: function _randomNumber(length) {
            var text = ""
            var possible = "0123456789"

            for (var i = 0; i < length; i++) {
              text += possible.charAt(
                Math.floor(Math.random() * possible.length)
              )
            }

            return text
          }
        }
      ],
      [
        {
          key: "defaultCss",

          /**
           * Css
           * @protected
           */
          value: function defaultCss(componentName, componentNameDash) {
            return "\n      "
              .concat(
                componentNameDash,
                " {\n        display : inline-block;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme, .odometer.odometer-theme-default {\n        display: inline-block;\n        vertical-align: middle;\n        *vertical-align: auto;\n        *zoom: 1;\n        *display: inline;\n        position: relative;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit, .odometer.odometer-theme-default .odometer-digit {\n        display: inline-block;\n        vertical-align: middle;\n        *vertical-align: auto;\n        *zoom: 1;\n        *display: inline;\n        position: relative;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer, .odometer.odometer-theme-default .odometer-digit .odometer-digit-spacer {\n        display: inline-block;\n        vertical-align: middle;\n        *vertical-align: auto;\n        *zoom: 1;\n        *display: inline;\n        visibility: hidden;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner, .odometer.odometer-theme-default .odometer-digit .odometer-digit-inner {\n        text-align: left;\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        overflow: hidden;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-ribbon, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon {\n        display: block;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon-inner {\n        display: block;\n        -webkit-backface-visibility: hidden;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-value, .odometer.odometer-theme-default .odometer-digit .odometer-value {\n        display: block;\n        -webkit-transform: translateZ(0);\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-digit .odometer-value.odometer-last-value, .odometer.odometer-theme-default .odometer-digit .odometer-value.odometer-last-value {\n        position: absolute;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up .odometer-ribbon-inner {\n        -webkit-transition: -webkit-transform 2s;\n        -moz-transition: -moz-transform 2s;\n        -ms-transition: -ms-transform 2s;\n        -o-transition: -o-transform 2s;\n        transition: transform 2s;\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme.odometer-animating-up.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up.odometer-animating .odometer-ribbon-inner {\n        -webkit-transform: translateY(-100%);\n        -moz-transform: translateY(-100%);\n        -ms-transform: translateY(-100%);\n        -o-transform: translateY(-100%);\n        transform: translateY(-100%);\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down .odometer-ribbon-inner {\n        -webkit-transform: translateY(-100%);\n        -moz-transform: translateY(-100%);\n        -ms-transform: translateY(-100%);\n        -o-transform: translateY(-100%);\n        transform: translateY(-100%);\n      }\n      "
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down.odometer-animating .odometer-ribbon-inner {\n        -webkit-transition: -webkit-transform 2s;\n        -moz-transition: -moz-transform 2s;\n        -ms-transition: -ms-transform 2s;\n        -o-transition: -o-transform 2s;\n        transition: transform 2s;\n        -webkit-transform: translateY(0);\n        -moz-transform: translateY(0);\n        -ms-transform: translateY(0);\n        -o-transform: translateY(0);\n        transform: translateY(0);\n      }\n      "
              )
              .concat(
                componentNameDash,
                '.odometer.odometer-auto-theme, .odometer.odometer-theme-default {\n        font-family: "Helvetica Neue", sans-serif;\n        line-height: 1.1em;\n      }\n      '
              )
              .concat(
                componentNameDash,
                ".odometer.odometer-auto-theme .odometer-value, .odometer.odometer-theme-default .odometer-value {\n        text-align: center;\n      }\n    "
              )
          }
        },
        {
          key: "defaultProps",

          /**
           * Default props
           * @definition    SWebComponent.defaultProps
           * @protected
           */
          get: function get() {
            return {
              /**
               * The format option allows you to configure how the digit groups are formatted, and how many digits are shown after the decimal point.
               * Format    -  Example
               * (,ddd)    -  12,345,678
               * (,ddd).dd -  12,345,678.09
               * (.ddd),dd -  12.345.678,09
               * ( ddd),dd -  12 345 678,09
               * d         -  12345678
               *
               * @prop
               * @type    {String}
               */
              format: "d",

              /**
               * Specify the initial value to transition from
               * @prop
               * @type    {Number}
               */
              initialValue: null,

              /**
               * Set the values to iterate over
               * @prop
               * @type    {Array<Number>}
               */
              values: [],

              /**
               * Set the timeout between 2 numbers
               * @prop
               * @type    {Integer}
               */
              timeout: null,

              /**
               * Specify if the odometer has to loop on the values or not
               * @prop
               * @type    {Boolean}
               */
              loop: false,

              /**
               * Specify the duration of the number transitions in ms
               * @prop
               * @type    {Integer}
               */
              duration: 3000
            }
          }
        }
      ]
    )

    return SOdometerComponent
  })(_SWebComponent2.default)

exports.default = SOdometerComponent
