/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  ssr: true,
  target: "server",
  head: {
    title: 'Hanime Desktop - Stream Hentai Via Desktop',
    meta: [{ charset: "utf-8" },]
  },
  loading: {
    color: 'white',
    height: '2px'
  },
  plugins: [
    { ssr: true, src: '@/plugins/icons.js' },
  ],
  buildModules: [

  ],
  components: true,
  css: ['~/assets/style.css'],
  modules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    theme: {
      dark: true,
      themes: {
        light:{
          primary: '#00bcd4',
          secondary: '#fafafa',
          accent: '#ff9800',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#2196f3',
          success: '#4caf50'
        }
      }
    },
  }
};
