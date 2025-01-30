const path = require('path') // Подключаем модуль path для работы с путями файловой системы

const CopyWebpackPlugin = require('copy-webpack-plugin') // Подключаем плагин для копирования файлов
const HtmlWebpackPlugin = require('html-webpack-plugin') // Подключаем плагин для работы с HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Подключаем плагин для извлечения CSS в отдельный файл

module.exports = {
  entry: ['./src/js/index.js'], // Указываем точку входа - главный JS файл
  output: {
    filename: './js/bundle.js', // Имя выходного JS файла
    path: path.resolve(__dirname, 'dist'), // Путь для выходных файлов
    clean: true // Очищать папку dist перед каждой сборкой
  },
  devtool: 'source-map', // Генерировать source maps для отладки
  module: {
    rules: [
      {
        test: /\.js$/, // Обрабатывать файлы с расширением .js
        include: path.resolve(__dirname, 'src/js'), // Обрабатывать только файлы из папки src/js
        exclude: /node_modules/, // Исключить папку node_modules
        use: {
          loader: 'babel-loader', // Использовать babel-loader для транспиляции JS
          options: {
            presets: ['@babel/preset-env'] // Использовать preset-env для поддержки современных стандартов JS
          }
        }
      },
      {
        test: /\.scss$/, // Обрабатывать файлы с расширением .scss
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
          'css-loader', // Переводит CSS в CommonJS
          'postcss-loader', // Добавляет вендорные префиксы
          'sass-loader' // Компилирует SCSS в CSS
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/, // Обрабатывать шрифты
        type: 'asset/resource', // Использовать asset/resource для обработки файлов
        generator: {
          filename: 'fonts/[name][ext]' // Сохранять шрифты в папку fonts
        }
      },
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/, // Обрабатывать изображения
        type: 'asset/resource', // Использовать asset/resource для обработки файлов
        generator: {
          filename: 'img/[name][ext]' // Сохранять изображения в папку img
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CPS Full', // Заголовок HTML файла
      template: './src/index.html', // Шаблон HTML файла
      inject: true, // Внедрять скрипты и стили в HTML
      minify: {
        removeComments: true, // Удалять комментарии в HTML
        collapseWhitespace: false // Не удалять пробелы
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css' // Имя выходного CSS файла
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/img', // Копировать файлы из папки src/img
          to: 'img' // В папку dist/img
        }
      ]
    })
  ]
}
