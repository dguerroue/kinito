module.exports = {
  plugins: [
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    }),
    require('autoprefixer')(),
    require('postcss-discard-duplicates')()
  ]
}
