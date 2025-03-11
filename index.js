// Подключение файла проекта
const app = require('./app')

// Создание параметра где указывается порт через консоль или значение по умолчанию
const port = process.env.PORT || 5000

// Прослушивание порта, запуск простого сервера
app.listen(5000, () => console.log(`Server has been started on ${port}`))

