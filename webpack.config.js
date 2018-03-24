const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin').default,
      MinifyPlugin = require("babel-minify-webpack-plugin"),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/js/index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
    // publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/ffminiwiki/',
		filename: "[name].bundle.js"
	},
  devServer: {
    open: false,
    historyApiFallback: true
  },
	module: {
    rules: [
			{
	      test: /\.js$/,
	      exclude: /node_modules/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: [
	            ['env', {
	            	modules: false
	            }]
	          ]
	        }
	      }
	    },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [240, 150],
            placeholder: true,
            placeholderSize: 50,
            name: 'images/[name]-[width].[ext]'
          }
        }
      },
      {
        test: /\.json/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'data/',
            name: '[name].[ext]'
          }
        }
      }
    ]
	},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      inject: false,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    }),
    new ImageminPlugin({test: /\.(png|jpg|gif)$/}),
    new MinifyPlugin({}, {
      exclude: /node_modules/
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      browser: ["chrome", "iexplore"]
    },
    {
      reload: false
    })
  ]
}
