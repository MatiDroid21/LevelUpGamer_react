module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/setupTests.js',
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/setupTests.js': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic', development: true }]
                ]
              }
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: 'asset/inline'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['spec', 'coverage'],
    specReporter: {
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
