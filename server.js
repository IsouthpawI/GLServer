const http = require('http');
const express = require('express');
const TokenGenerator = require('uuid-token-generator');
const crypto = require('crypto');
const mysql = require('mysql');
const cors = require('cors');

let token = [];

function checkToken(user) {
    return user.token == this.token;
}

let app = express();
app.use(express.json());
app.use(cors());

function getIndex(array, name) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].name == name) {
            return i;
        }
    }
    return -1;
}

app.post('/getemployee', (req, res, callbackL) => {
    console.log("Request on /getemployee");
    callbackL = function (status, value) {
        res.status(status).send(value);
    };

    // my database;
    // let con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "glbank",
    //     port: "3306"
    // });

    // school database;
    let con = mysql.createConnection({
        host: "itsovy.sk",
        user: "glbank",
        password: "password",
        database: "glbank",
        port: "3306"
    });


    con.connect((err) => {

        if (err) console.log(err);

        // my database;
        // let sql = "SELECT id,login,password,ide FROM loginEmp;";

        // school database;
        let sql = "SELECT id,login,password,ide FROM loginemp;";

        con.query(sql, (err, res) => {
            if (err) console.log(err);

            if (res.length == 0) {
                console.log("No employee in database!");
                callbackL(401, "No employee in database!");
            }
            else {
                console.log(res);
                callbackL(200, res);
            }
            con.end();
        });
    });
});

app.post('/getclient', (req, res, callbackL) => {
    console.log("Request on /getclient");
    callbackL = function (status, value) {
        res.status(status).send(value);
    };

    // my database;
    // let con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "glbank",
    //     port: "3306"
    // });

    // school database;
    let con = mysql.createConnection({
        host: "itsovy.sk",
        user: "glbank",
        password: "password",
        database: "glbank",
        port: "3306"
    });


    con.connect((err) => {

        if (err) console.log(err);

        // my database;
        // let sql = "SELECT id,login,password,ide FROM loginEmp;";

        // school database;
        let sql = "SELECT id,login,password,idc FROM loginclient;";

        con.query(sql, (err, res) => {
            if (err) console.log(err);

            if (res.length == 0) {
                console.log("No employee in database!");
                callbackL(401, "No employee in database!");
            }
            else {
                console.log(res);
                callbackL(200, res);
            }
            con.end();
        });
    });
});

app.post('/log', (req, res, callbackFunction) => {
    callbackFunction = function (status, value) {
        res.status(status).send(value);
    };

    let con = mysql.createConnection({
        host: "itsovy.sk",
        user: "glbank",
        password: "password",
        database: "glbank",
        port: "3306"
    });

    let name = req.body.name;
    let password = req.body.password;
    if (!name || !password) {
        callbackFunction(401, "Wrong login or password!");
    } else {

        con.connect((err) => {

            if (err) console.log(err);
            let hash = crypto.createHash('md5').update(password).digest("hex");
            let sql = "SELECT login, password FROM loginclient WHERE login like + login AND password like + password;";
            console.log(sql);
            console.log("tye: " + typeof(name) + ", " + name);
            con.query(sql, (err, res) => {
                if (err || res.length == 0) {
                    console.log(err);
                    console.log("Type login and password!");
                    callbackFunction(401, "Type login and password!");
                }
                else {
                    const tokenGenerator = new TokenGenerator(128, TokenGenerator.BASE62);
                    let r = {};

                    r.token = tokenGenerator.generate();
                    r.name = name;
                    let index = getIndex(token, name);

                    if (index >= 0) {
                        token[index].token = r.token;
                    } else {
                        let l = Object.assign({}, r);
                        l.id = res[0].idc;
                        console.log(l);
                        token.push(l);
                    }
                    console.log("try");
                    console.log(r);
                    callbackFunction(200, r);
                }

            });
            con.end();
        });
    }
});

app.listen(1203, () => {
    console.log("Sever listening on port 1203");
});
