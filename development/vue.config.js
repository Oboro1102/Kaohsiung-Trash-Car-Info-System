module.exports = {
  productionSourceMap: false,
  publicPath: '',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '高雄垃圾車及資源回收車動態資訊',
    },
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/_mixin.scss";`
      }
    }
  },
}