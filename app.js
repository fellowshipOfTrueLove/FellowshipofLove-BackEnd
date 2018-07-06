let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let calendar    = require('./routes/calendar')
let songbook    = require('./routes/songbook')
let biblebus    = require('./routes/biblebus')
let wishingwell = require('./routes/wishingwell')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/calendar',    calendar)
app.use('/songbook',    songbook)
app.use('/biblebus',    biblebus)
app.use('/wishingwell', wishingwell)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
