const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'); // данный плагин отвечает за генерацию html файла
const CopyWebpackPlugin = require('copy-webpack-plugin'); // данный плагин отвечает за копирование файлов из одной папки в другую
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // данный плагин отвечает за очистку папки bundle перед генерацией
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // данный плагин отвечает за извлечение css в отдельный файл 
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 8080,
    hot: true,
  },
};

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  context: path.resolve(__dirname, 'src'), // путь к папке из которой будет выполняться проект
  entry: {
    bundle: './index.ts',
  }, // путь к файлам из которых будет выполняться проект
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // assetModuleFilename: 'assets/[hash][ext]',


  },

  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      }, // проверяет на наличие файлов с расширением .gif, .png, .jpg, .svg
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss', '.json', '.html'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'), // путь к файлу или папке которую нужно копировать
          to: path.resolve(__dirname, 'dist', 'assets'), // путь к папке в которой будет лежать копированный файл или папка
          noErrorOnMissing: true
        },

      ]
    }), // данный плагин отвечает за копирование файлов из одной папки в другую
    new CleanWebpackPlugin(), // данный плагин отвечает за очистку папки bundle перед генерацией
    new MiniCssExtractPlugin({
      filename: 'style/[name].css', // имя файла будет иметь имя последнего входного файла и приписать к нему контентхеш
    }),
    ...esLintPlugin(develop),
  ],
  ...devServer(develop),
});