/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  outputDir: '../dist',
  devServer: {
    proxy: 'http://localhost:8080',
  },
}