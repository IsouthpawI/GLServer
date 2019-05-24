const mysql = require('mysql');
const TokenGenerator = require('uuid-token-generator');
const tokeen = new TokenGenerator();
const crypto = require('crypto');

let tokens = [];

const con = mysql.createConnection({
    host: "itsovy.sk",
    user: "glbank",
    password: "password",
    database: "glbank",
    port: "3306"

});

const getLog = (login, password, callback) => {
    console.log(login, password);

    con.connect(function (err) {
        if (err) throw err
        let hash = crypto.createHash('md5').update(password).digest("hex");
        let sql = "select id,login,password from loginclient " + "where login like '" + login + "' " + "and password like '" + hash + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                console.log("User" + " " + login + " doesn’t exist!");
                let rslt = null;
                callback(rslt);
            } else {
                let token = tokeen.generate();
                let obj = new Object();
                obj.login = login;
                obj.token = token;
                tokens = tokens.filter(person => person.login != login);
                tokens.push(obj);
                console.log(tokens);
                let newresult = JSON.stringify(obj);
                callback(newresult);
            }
        });
    });
}

const getLogout = (login, token, callback) => {
    if (tokens.find(person => (person.login == login && person.token == token))) {
        tokens = tokens.filter(person => (person.login != login && person.token != token));
        callback(200);
        console.log(tokens);
    } else {
        callback(401);
        console.log(tokens);
    }

}


const getUserInfo = (login, token, callback) => {

    con.connect(function (err) {
        if (err) throw err
        // let sql = "select client.fname,client.lname,client.email from client inner join loginclient on loginclient.id = client.id where login like'" + login + "';";
        let sql = "SELECT client.fname as FirstName, client.lname as LastName, client.email as Mail, client.id as ID " +
            "FROM client inner join loginclient on client.id=loginclient.idc " +
            "WHERE  loginclient.login like \"" + login + "\";";
        con.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                console.log("User " + login + ' doesn’t exist!');

                let rslt = null;
                callback(rslt);
            } else {

                let obj = new Object();
                obj.FirstName = result[0].fname;
                obj.LastName = result[0].lname;
                obj.Mail = result[0].email;
                obj.ID = result[0].id;
                let newresult = JSON.stringify(obj);
                console.log(newresult);
                callback(newresult);
            }
        });
    });
}


const getAccount = (login, id, token, callback) => {

    con.connect(function (err) {
        if (err) throw err
        let sql = "select AccNum from account where idc like'" + id + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                console.log("User" + login + ' doesn’t exist!');

                let rslt = null;
                callback(rslt);
            } else {

                let newresult = JSON.stringify(result);
                console.log(newresult);
                callback(newresult);
            }
        });
    });
}


const getAccInfo = (login, token, accNum, callback) => {

    let objGetted = new Object();
    objGetted.login = login;
    objGetted.token = token;
    console.log(objGetted);

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].login == objGetted.login && tokens[i].token == objGetted.token) {
            con.connect(function (err) {
                if (err) throw err
                let sql = "select * from account where AccNum like '" + accNum + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Account is not exist!");

                        let rslt = null;
                        callback(rslt);
                    } else {

                        let obj = new Object();
                        obj.id = result[0].id;
                        obj.amount = result[0].amount;
                        let newresult = JSON.stringify(obj);
                        console.log(newresult);
                        callback(newresult);
                    }
                });
            });

            break;

        } else {
            console.log("Incorrect credentials!");
            let newresult = null;
            callback(newresult);
            break;
        }

    }
}

const getTransactionHistory = (login, idAcc, token, callback) => {

    let objGetted = new Object();
    objGetted.login = login;
    objGetted.token = token;
    console.log(objGetted);

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].login == objGetted.login && tokens[i].token == objGetted.token) {
            con.connect(function (err) {
                if (err) throw err
                let sql = "select * from transaction where idAcc like '" + idAcc + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Account is not exist!");

                        let rslt = null;
                        callback(rslt);
                    } else {

                        let obj = new Object();
                        obj.transAmout = result[0].TransAmout;
                        obj.idcAccount = result[0].idAcc;
                        let newresult = JSON.stringify(obj);
                        console.log(newresult);
                        callback(newresult);
                    }
                });
            });

            break;

        } else {
            console.log("Incorrect credentials");
            let newresult = null;
            callback(newresult);
            break;
        }

    }
}


const getCard = (login, idAcc, token, callback) => {

    let objGetted = new Object();
    objGetted.login = login;
    objGetted.token = token;
    console.log(objGetted);

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].login == objGetted.login && tokens[i].token == objGetted.token) {
            con.connect(function (err) {
                if (err) throw err
                let sql = "select id from card where ida like'" + idAcc + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Account is not exist!");

                        let rslt = null;
                        callback(rslt);
                    } else {

                        let newresult = JSON.stringify(result);
                        console.log(newresult);
                        callback(newresult);
                    }
                });
            });

            break;

        } else {
            console.log("Incorrect credentials");
            let newresult = null;
            callback(newresult);
            break;
        }

    }
}


const getCardInfo = (login, idCard, token, callback) => {

    let objGetted = new Object();
    objGetted.login = login;
    objGetted.token = token;
    console.log(objGetted);

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].login == objGetted.login && tokens[i].token == objGetted.token) {
            con.connect(function (err) {
                if (err) throw err
                let sql = "select Active,ExpireM,ExpireY from card where id like'" + idCard + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Account is not exist!");

                        let rslt = null;
                        callback(rslt);
                    } else {

                        let newresult = JSON.stringify(result);
                        console.log(newresult);
                        callback(newresult);
                    }
                });
            });

            break;

        } else {
            console.log("Incorrect credentials");
            let newresult = null;
            callback(newresult);
            break;
        }

    }
}


const getCardTransaction = (login, idCard, token, callback) => {

    let objGetted = new Object();
    objGetted.login = login;
    objGetted.token = token;
    console.log(objGetted);

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].login == objGetted.login && tokens[i].token == objGetted.token) {
            con.connect(function (err) {
                if (err) throw err
                let sql = "select * from cardtrans where idCard like'" + idCard + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Account is not exist!");

                        let rslt = null;
                        callback(rslt);
                    } else {

                        let newresult = JSON.stringify(result);
                        console.log(newresult);
                        callback(newresult);
                    }
                });
            });

            break;

        } else {
            console.log("Incorrect credentials");
            let newresult = null;
            callback(newresult);
            break;
        }

    }
}

module.exports = {
    getLog,
    getLogout,
    getUserInfo,
    getAccount,
    getAccInfo,
    getTransactionHistory,
    getCard,
    getCardInfo,
    getCardTransaction,
};