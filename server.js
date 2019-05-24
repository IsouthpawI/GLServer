let global = require('./global');
const app = require('express')();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/log', function (req, res) {

    let login = req.body.login;
    let password = req.body.password;

    if (login == "" || password == "") {
        res.status(400).send("Incorrect login or password!");
    }

    global.getLog(login, password, function (result) {

        if (result == null) {
            res.status(400).send("User is not exist!");
        } else {
            res.status(200).send(result);
        }

    });

});


app.post('/logout', function (req, res) {

    let login = req.body.login;
    let token = req.body.token;

    global.getLogout(login, token, function (result) {
        console.log(result);
        res.status(result).send(login + " logged out!");
    });

});


app.post('/userinfo', function (req, res) {

    let login = req.body.login;
    let token = req.body.token;

    global.getUserInfo(login, token, function (result) {
        res.status(200).send(result);
    });

});


app.post('/account', function (req, res) {

    let login = req.body.login;
    let id = req.body.id;
    let token = req.body.token;


    global.getAccount(login, id, token, function (result) {
        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});


app.post('/accinfo', function (req, res) {

    let login = req.body.login;
    let token = req.body.token;
    let accNum = req.body.accNum;

    global.getAccInfo(login, token, accNum, function (result) {

        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});


app.post('/transactionhistory', function (req, res) {

    let login = req.body.login;
    let idAcc = req.body.idAcc;
    let token = req.body.token;

    global.getTransactionHistory(login, idAcc, token, function (result) {

        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});


app.post('/card', function (req, res) {

    let login = req.body.login;
    let idAcc = req.body.idAcc;
    let token = req.body.token;


    global.getCard(login, idAcc, token, function (result) {

        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});


app.post('/cardinfo', function (req, res) {

    let login = req.body.login;
    let idCard = req.body.idCard;
    let token = req.body.token;


    global.getCardInfo(login, idCard, token, function (result) {

        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});


app.post('/cardtransaction', function (req, res) {

    let login = req.body.login;
    let idCard = req.body.idCard;
    let token = req.body.token;


    global.getCardTransaction(login, idCard, token, function (result) {

        if (result == null) {
            res.status(400).send("Error!");
        } else {
            res.status(200).send(result);
        }
    });

});

app.listen(1203, () => {
    console.log("Sever listening on port 1203");
});
