module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
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
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      devtool: 'inline-source-map'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};