module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-odometer-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <s-odometer class="s-bigger" values="[2989,2345,3214,8654]" timeout="4000" loop></s-odometer>
      `
    },
    css: {
      language: "sass",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @include s-init();
        @include s-classes();
        @include s-typography-classes();
        body {
          padding: s-space(bigger);
        }
      `
    },
    js: {
      language: "js",
      data: `
        import 'webcomponents.js/webcomponents-lite'
        import SOdometerComponent from './dist/index'
      `
    }
  }
}
