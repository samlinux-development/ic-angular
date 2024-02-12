const { EnvironmentPlugin } = require('webpack');

require('dotenv').config()

module.exports = {
  plugins: [
    new EnvironmentPlugin([
        'CANISTER_ID_BACKEND',
        'DFX_NETWORK'
    ])
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    hot: true
  },   
}
