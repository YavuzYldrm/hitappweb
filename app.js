require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const compression = require('compression')
const cookieParser = require('cookie-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');

var app = express();

app.use(express.json());
app.use(compression());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/game',express.static(path.join(__dirname,'public','game')));
app.use('/recommendation',express.static(path.join(__dirname,'public','recommendation')));

// Routers
app.use('/', indexRouter);
app.use('/game', gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //   res.render('error');
    //console.log(err);
});

module.exports = app;
