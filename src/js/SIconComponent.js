import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import __axios from 'axios'

export default class Component extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps () {
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
      iconsPrefix: 'icon-'
    }
  }

  /**
   * Css
   * @protected
   */
  static defaultCss (componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : inline-block;
        font-size: 1em;
        vertical-align: middle;
      }
      ${componentNameDash} img,
      ${componentNameDash} svg {
        width: auto; height: 1em;
      }
    `
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount () {
    super.componentMount()
    // load library depending on driver
    this._injectLibraryDependingOnDriver()
    // generate icon html
    this._generateIconHtmlDependingOnDriver().then((html) => {
      // inject the html
      this._injectIcon(html)
    })
    // apply default attributes on icon
    this._applyDefaultAttributes()
  }

  /**
   * Apply default attributes on the component like aria-hidden, etc...
   */
  _applyDefaultAttributes () {
    // aria hidden
    this.setAttribute('aria-hidden', true)
  }

  /**
   * Generate the icon html depending on the driver
   */
  _generateIconHtmlDependingOnDriver () {
    switch (this.props.driver) {
      case 'fonticon':
        return Promise.resolve(`<i class="${this.props.iconsPrefix}${this.props.icon}" aria-hidden></i>`)
      break
      case 'img':
        return Promise.resolve(`<img src="${this.props.iconsPath}/${this.props.icon}.svg" alt="${this.props.title}" />`)
      break
      case 'svg':
        return Promise.resolve(this._loadSvgIcon())
      break
      case 'fontawesome':
        return Promise.resolve(`<i class="fa fa-${this.props.icon}" aria-hidden></i>`)
      break
      case 'material':
        return Promise.resolve(`<i class="material-icons" aria-hidden>${this.props.icon}</i>`)
      break
      case 'foundation':
        return Promise.resolve(`<i class="fi-${this.props.icon}" aria-hidden></i>`)
      break
    }
  }

  /**
   * Inject library depending on the driver
   */
  _injectLibraryDependingOnDriver () {
    switch (this.props.driver) {
      case 'fontawesome':
        const fontawesomeElm = document.querySelector('link#s-fontawesome')
        if (fontawesomeElm) return
        const linkFontawesomeElm = document.createElement('link')
        linkFontawesomeElm.setAttribute('id', 's-fontawesome')
        linkFontawesomeElm.setAttribute('rel', 'stylesheet')
        linkFontawesomeElm.setAttribute('href', 'https://use.fontawesome.com/releases/v5.4.1/css/all.css')
        linkFontawesomeElm.setAttribute('integrity', 'sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz')
        linkFontawesomeElm.setAttribute('crossorigin', 'anonymous')
        document.head.appendChild(linkFontawesomeElm)
      break
      case 'material':
        const materialElm = document.querySelector('link#s-material')
        if (materialElm) return
        const linkMaterialElm = document.createElement('link')
        linkMaterialElm.setAttribute('id', 's-material')
        linkMaterialElm.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
        linkMaterialElm.setAttribute('rel', 'stylesheet')
        document.head.appendChild(linkMaterialElm)
      break
      case 'foundation':
        const foundationElm = document.querySelector('link#s-foundation')
        if (foundationElm) return
        const foundationLinkElm = document.createElement('link')
        foundationLinkElm.setAttribute('id', 's-foundation')
        foundationLinkElm.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css')
        foundationLinkElm.setAttribute('rel', 'stylesheet')
        document.head.appendChild(foundationLinkElm)
      break
    }
  }

  /**
   * Load the svg icon
   */
  async _loadSvgIcon () {
    return new Promise((resolve, reject) => {
      __axios.get(`${this.props.iconsPath}/${this.props.icon}.svg`).then((response) => {
        const domParser = new DOMParser()
        const docElm = domParser.parseFromString(response.data, 'text/html')
        const svgElm = docElm.querySelector('svg')
        svgElm.setAttribute('aria-hidden', true)
        resolve(svgElm.outerHTML)
      })
    })
  }

  /**
   * Inject icon
   * @param    {String}    iconHtml    The html of the icon to inject
   */
  _injectIcon (iconHtml) {
    // replace the html
    this.innerHTML = iconHtml
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  async componentWillReceiveProp (name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
    switch (name) {
      case 'icon':
        // inject the new icon
        const html = await this._generateIconHtmlDependingOnDriver()
        this._injectIcon(html)
      break
      case 'driver':
        // inject library depending on driver
        this._injectLibraryDependingOnDriver()
      break
    }
  }
}
