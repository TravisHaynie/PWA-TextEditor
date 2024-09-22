const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production', 
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js', // Output for different entry points
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Output path
    },
    plugins: [
      // Plugin to generate an HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
        scriptLoading: 'defer',
      }),

      // Inject the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Custom service worker file path
        swDest: 'service-worker.js', // Output service worker file
      }),

      // Create a manifest.json for the PWA
      new WebpackPwaManifest({
        name: 'PWA App',
        short_name: 'PWA',
        description: 'A progressive web app setup example',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: './',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to source image
            sizes: [96, 128, 192, 256, 384, 512],     // Various icon sizes
            destination: path.join('assets', 'icons') // Ensure this is 'assets/icons'
          }
        ],
        filename: 'manifest.json',
        publicPath: './', 
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
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource', // Webpack 5 asset module for handling images
        },
      ],
    },
  };
};
