import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import Odometer from "odometer"

export default class SOdometerComponent extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : inline-block;
      }
      ${componentNameDash}.odometer.odometer-auto-theme, .odometer.odometer-theme-default {
        display: inline-block;
        vertical-align: middle;
        *vertical-align: auto;
        *zoom: 1;
        *display: inline;
        position: relative;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit, .odometer.odometer-theme-default .odometer-digit {
        display: inline-block;
        vertical-align: middle;
        *vertical-align: auto;
        *zoom: 1;
        *display: inline;
        position: relative;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer, .odometer.odometer-theme-default .odometer-digit .odometer-digit-spacer {
        display: inline-block;
        vertical-align: middle;
        *vertical-align: auto;
        *zoom: 1;
        *display: inline;
        visibility: hidden;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner, .odometer.odometer-theme-default .odometer-digit .odometer-digit-inner {
        text-align: left;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-ribbon, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon {
        display: block;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon-inner {
        display: block;
        -webkit-backface-visibility: hidden;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-value, .odometer.odometer-theme-default .odometer-digit .odometer-value {
        display: block;
        -webkit-transform: translateZ(0);
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-digit .odometer-value.odometer-last-value, .odometer.odometer-theme-default .odometer-digit .odometer-value.odometer-last-value {
        position: absolute;
      }
      ${componentNameDash}.odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up .odometer-ribbon-inner {
        -webkit-transition: -webkit-transform 2s;
        -moz-transition: -moz-transform 2s;
        -ms-transition: -ms-transform 2s;
        -o-transition: -o-transform 2s;
        transition: transform 2s;
      }
      ${componentNameDash}.odometer.odometer-auto-theme.odometer-animating-up.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up.odometer-animating .odometer-ribbon-inner {
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -ms-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
      }
      ${componentNameDash}.odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down .odometer-ribbon-inner {
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -ms-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
      }
      ${componentNameDash}.odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
        -webkit-transition: -webkit-transform 2s;
        -moz-transition: -moz-transform 2s;
        -ms-transition: -ms-transform 2s;
        -o-transition: -o-transform 2s;
        transition: transform 2s;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -ms-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
      }
      ${componentNameDash}.odometer.odometer-auto-theme, .odometer.odometer-theme-default {
        font-family: "Helvetica Neue", sans-serif;
        line-height: 1.1em;
      }
      ${componentNameDash}.odometer.odometer-auto-theme .odometer-value, .odometer.odometer-theme-default .odometer-value {
        text-align: center;
      }
    `
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    // track current displayed value
    this._currentValueIdx = -1

    // if theiry no values in the props stack,
    // take the value from the innerHTML
    if (!this.props.values.length) {
      this.props.values.push(this.innerHTML)
    }

    // initiate the odometer
    this._odometer = new Odometer({
      el: this,
      value:
        this.props.initialValue !== null
          ? this.props.initialValue
          : this._randomNumber(this.props.values[0].toString().length),
      format: this.props.format,
      duration: this.props.duration
    })

    // go to next (first) value
    this.next()
  }

  /**
   * Pass to the next value
   */
  next() {
    if (
      !this.props.loop &&
      this._currentValueIdx + 1 === this.props.values.length
    )
      return
    this._currentValueIdx =
      this._currentValueIdx + 1 === this.props.values.length
        ? 0
        : this._currentValueIdx + 1
    // update the odometer
    this._odometer.update(this.props.values[this._currentValueIdx])
    // timeout if needed
    if (this.props.timeout) {
      setTimeout(this.next.bind(this), this.props.timeout)
    }
  }

  /**
   * Update the odometer to a new value
   * @param    {Number}    value    The new value for the odometer
   */
  updateOdometer(value) {
    this._odometer.update(value)
  }

  /**
   * Generate a random number
   * @param    {Integer}    length    The length of the number to generate
   * @return    {String}    The generated number
   */
  _randomNumber(length) {
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
}
