const express = require('express')
const bodyParser = require('body-parser')

const ServiceRoute = require('./service/service');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/UI/Login_INF'));
app.use('/', express.static(__dirname + '/UI/Main_INF'));

app.use('/service', ServiceRoute);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/UI/Login_INF/login.html')
})

app.get('/login-callback', function (req, res) {
  res.sendFile(__dirname + '/UI/Login_INF/loginCallback.html')
})

app.get('/profile', function (req, res) {
  res.sendFile(__dirname + '/UI/Main_INF/profile.html')
})

// app.get('/post', function (req, res) {
//   res.sendFile(__dirname + '/UI/Main_INF/Share.html')
// })

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})