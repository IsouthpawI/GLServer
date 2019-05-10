const http = require('http');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());


app.post('/getemployee', (req, res, callbackL) => {
    console.log("Request on /getemployee");
    callbackL = function (status, value) {
        res.status(status).send(value);
    };


    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "glbank",
        port: "3306"
    });


    con.connect((err) => {

        if (err) console.log(err);

        let sql = "SELECT id,login,password,ide FROM loginEmp;";

        con.query(sql, (err, res) => {
            if (err) console.log(err);

            if (res.length == 0) {
                console.log("No user in database!");
                callbackL(401, "No user in database!");
            }
            else {
                console.log(res);
                callbackL(200, res);
            }
            con.end();
        });
    });
});


app.listen(1203, () => {
    console.log("Sever listening on port 1203");
});
