const express = require('express');
const app = express();
const mysql = require('mysql2');

let bosyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSucecessStatus: 200
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.send("Hello from root");
});
const pool = mysql.createPool({
    host: 'www.ingenieriaconale.com',
    user: 'cartoapp',
    password: 'P4$$w0Rd2',
    database: 'DBCarto',
    port: '3306'
});

//GETbyid
app.get("/users/:id", (req, res) => {
    pool.query("SELECT * FROM properties", (err, rows, fields) => {
        res.send(JSON.stringify(rows));
    });
});

module.exports = app;