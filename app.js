const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());

app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.post('/image', (req, res) => {
    res.sendFile(__dirname + '/public/html/logo-growplus.png');
});

app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    const _token = req.body._token;
    const token = Buffer.from(
        `_token=${_token}&growId=SVPS&password=SVPS`,
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"","url":"","accountType":"growtopia"}`,
    );
});

app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

app.get('/', function (req, res)  {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.listen(443, function () {
    console.log('Listening on port 443');
});
