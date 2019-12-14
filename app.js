const express = require('express');
const app = express();
const mysql = require('mysql2');
//const morgan = require('morgan');

//app.use(morgan('combined'));

// Import Body parser
let bodyParser = require('body-parser');
// Configure bodyparser to handle post requests
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


//POST
app.post("/api/properties", (req, res) => {
    console.log('reqbody' + req.body);

    if (!req.body.price)
        return res.badRequest();

    //var id = req.body.id;
    var street = req.body.street;
    var propertyType = req.body.propertyType;
    var externalNumber = req.body.externalNumber;
    var zipCode = req.body.zipCode;
    var operationType = req.body.transactionType;
    var price = req.body.price;
    pool.query("INSERT INTO `properties` (`property_type`,`street`," +
        "`external_number`,`zip_code`,`operation_type`,`price`) " +
        "values('" + propertyType + "','" + street +
        "','" + externalNumber + "','" + zipCode
        + "','" + operationType + "','" + price + "')",
        (err, result) => {
            if (err) {
                console.log(err.message);
                //throw err;
            }
            else {
                console.log("1 record inserted");
            }
        })
});

//GET USERS
app.get("/api/users", (req, res) => {
    var user1 = { firsName: "Juan", lastName: "Villa" };
    var user2 = { firstName: "Kari", lastName: "Gomez" };
    res.send(JSON.stringify(user1, user2));
});

//POST USER
app.post("/api/user",(req,res)=>{
    console.log('reqbody' + JSON.stringify(req.body));

var email = req.body.userName;
var password = req.body.password;
var first_name = req.body.firstName;
var last_name = req.body.lastName;


    pool.query("INSERT INTO `users` (`email`,`password`," +
    "`first_name`,`last_name`) " +
    "values('" + email + "','" + password +
    "','" + first_name + "','" + last_name
    + "')",
    (err, result) => {
        if (err) {
            console.log(err.message);
            //throw err;
        }
        else {
            
            console.log("1 record inserted");
            return res;
        }
    })
});

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    })
});


module.exports = app;