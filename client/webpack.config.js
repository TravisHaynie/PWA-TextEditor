const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set the mode to development
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: 'main.bundle.js', // Output for different entry points
      path: path.resolve(__dirname, 'dist'), // Output path
    },
    plugins: [
      // Plugin to generate an HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA App'
      }),

      // Inject the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Custom service worker file path
        swDest: 'service-worker.js', // Output service worker file
      }),

      // Create a manifest.json for the PWA
      new WebpackPwaManifest({
        name: "PWA App",
        short_name: "PWA",
        description: "A progressive web app setup example",
        background_color: '#ffffff',
        theme_color: '#317EFB',
        display: 'standalone',
        start_url: './', // App start page
        crossorigin: 'use-credentials', // Ensure credentials mode is used
        icons: [
          {
            src: path.resolve('src/assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Various icon sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Loaders for CSS files
        },
        // Babel loader for JS
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Preset for modern JavaScript
            },
          },
        },
      ],
    },
  };
};
