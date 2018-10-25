"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Component =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(Component, _SWebComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "componentMount",

    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */
    value: function componentMount() {
      var _this = this;

      _get(_getPrototypeOf(Component.prototype), "componentMount", this).call(this); // load library depending on driver


      this._injectLibraryDependingOnDriver(); // generate icon html


      this._generateIconHtmlDependingOnDriver().then(function (html) {
        // inject the html
        _this._injectIcon(html);
      }); // apply default attributes on icon


      this._applyDefaultAttributes();
    }
    /**
     * Apply default attributes on the component like aria-hidden, etc...
     */

  }, {
    key: "_applyDefaultAttributes",
    value: function _applyDefaultAttributes() {
      // aria hidden
      this.setAttribute('aria-hidden', true);
    }
    /**
     * Generate the icon html depending on the driver
     */

  }, {
    key: "_generateIconHtmlDependingOnDriver",
    value: function _generateIconHtmlDependingOnDriver() {
      switch (this.props.driver) {
        case 'fonticon':
          return Promise.resolve("<i class=\"".concat(this.props.iconsPrefix).concat(this.props.icon, "\" aria-hidden></i>"));
          break;

        case 'img':
          return Promise.resolve("<img src=\"".concat(this.props.iconsPath, "/").concat(this.props.icon, ".svg\" alt=\"").concat(this.props.title, "\" />"));
          break;

        case 'svg':
          return Promise.resolve(this._loadSvgIcon());
          break;

        case 'fontawesome':
          return Promise.resolve("<i class=\"fa fa-".concat(this.props.icon, "\" aria-hidden></i>"));
          break;

        case 'material':
          return Promise.resolve("<i class=\"material-icons\" aria-hidden>".concat(this.props.icon, "</i>"));
          break;

        case 'foundation':
          return Promise.resolve("<i class=\"fi-".concat(this.props.icon, "\" aria-hidden></i>"));
          break;
      }
    }
    /**
     * Inject library depending on the driver
     */

  }, {
    key: "_injectLibraryDependingOnDriver",
    value: function _injectLibraryDependingOnDriver() {
      switch (this.props.driver) {
        case 'fontawesome':
          var fontawesomeElm = document.querySelector('link#s-fontawesome');
          if (fontawesomeElm) return;
          var linkFontawesomeElm = document.createElement('link');
          linkFontawesomeElm.setAttribute('id', 's-fontawesome');
          linkFontawesomeElm.setAttribute('rel', 'stylesheet');
          linkFontawesomeElm.setAttribute('href', 'https://use.fontawesome.com/releases/v5.4.1/css/all.css');
          linkFontawesomeElm.setAttribute('integrity', 'sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz');
          linkFontawesomeElm.setAttribute('crossorigin', 'anonymous');
          document.head.appendChild(linkFontawesomeElm);
          break;

        case 'material':
          var materialElm = document.querySelector('link#s-material');
          if (materialElm) return;
          var linkMaterialElm = document.createElement('link');
          linkMaterialElm.setAttribute('id', 's-material');
          linkMaterialElm.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
          linkMaterialElm.setAttribute('rel', 'stylesheet');
          document.head.appendChild(linkMaterialElm);
          break;

        case 'foundation':
          var foundationElm = document.querySelector('link#s-foundation');
          if (foundationElm) return;
          var foundationLinkElm = document.createElement('link');
          foundationLinkElm.setAttribute('id', 's-foundation');
          foundationLinkElm.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css');
          foundationLinkElm.setAttribute('rel', 'stylesheet');
          document.head.appendChild(foundationLinkElm);
          break;
      }
    }
    /**
     * Load the svg icon
     */

  }, {
    key: "_loadSvgIcon",
    value: function () {
      var _loadSvgIcon2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _axios.default.get("".concat(_this2.props.iconsPath, "/").concat(_this2.props.icon, ".svg")).then(function (response) {
                    var domParser = new DOMParser();
                    var docElm = domParser.parseFromString(response.data, 'text/html');
                    var svgElm = docElm.querySelector('svg');
                    svgElm.setAttribute('aria-hidden', true);
                    resolve(svgElm.outerHTML);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function _loadSvgIcon() {
        return _loadSvgIcon2.apply(this, arguments);
      };
    }()
    /**
     * Inject icon
     * @param    {String}    iconHtml    The html of the icon to inject
     */

  }, {
    key: "_injectIcon",
    value: function _injectIcon(iconHtml) {
      // replace the html
      this.innerHTML = iconHtml;
    }
    /**
     * Component will receive prop
     * @definition    SWebComponent.componentWillReceiveProp
     * @protected
     */

  }, {
    key: "componentWillReceiveProp",
    value: function () {
      var _componentWillReceiveProp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(name, newVal, oldVal) {
        var html;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _get(_getPrototypeOf(Component.prototype), "componentWillReceiveProp", this).call(this, name, newVal, oldVal);

                _context2.t0 = name;
                _context2.next = _context2.t0 === 'icon' ? 4 : _context2.t0 === 'driver' ? 9 : 11;
                break;

              case 4:
                _context2.next = 6;
                return this._generateIconHtmlDependingOnDriver();

              case 6:
                html = _context2.sent;

                this._injectIcon(html);

                return _context2.abrupt("break", 11);

              case 9:
                // inject library depending on driver
                this._injectLibraryDependingOnDriver();

                return _context2.abrupt("break", 11);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function componentWillReceiveProp(_x, _x2, _x3) {
        return _componentWillReceiveProp.apply(this, arguments);
      };
    }()
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display : inline-block;\n        font-size: 1em;\n        vertical-align: middle;\n      }\n      ").concat(componentNameDash, " img,\n      ").concat(componentNameDash, " svg {\n        width: auto; height: 1em;\n      }\n    ");
    }
  }, {
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
      return {
        /**
         * Specify the icon to display. If the icon file is `my-icon.svg`,
         * the icon parameter will be just `my-icon`.
         * @prop
         * @type    {String}
         */
        icon: null,

        /**
         * Specify the driver to use. It can be:
         * - `fonticon` : Use a font icon set
         * - `img` : Use an img tag to load the svg icon
         * - `svg` : Inline the svg directly in the page
         * - 'fontawesome` : Using fontawesome icons. You still need to load the library by yourself
         * - `material` : Using google material icons. You still need to load the library by yourself
         * @prop
         * @type    {String}
         */
        driver: 'svg',

        /**
         * Specify the path to the icons folder relative to the document root of your project
         * @prop
         * @type    {String}
         */
        iconsPath: '/dist/icons',

        /**
         * Specify the icon prefix to use when using the `fonticon` driver
         * @prop
         * @type    {String}
         */
        iconsPrefix: 'icon-',

        /**
         * Specify a title for a11y
         * @prop
         * @type    {String}
         */
        title: null
      };
    }
  }]);

  return Component;
}(_SWebComponent2.default);

exports.default = Component;