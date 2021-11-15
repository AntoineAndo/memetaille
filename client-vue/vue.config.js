/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  outputDir: '../dist',
  devServer: {
    proxy: 'https://localhost',
    port: '8080',
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
}