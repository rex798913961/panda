const path = require('path')
const ThreeExamples = require('import-three-examples')
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '西门大熊猫'
        return args
      })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/css/reset.less'),
      ]
    },
    ...ThreeExamples
  }
}