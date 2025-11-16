const path = require('path');
const dotenv = require("dotenv");
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3030
const bodyParser = require('body-parser');
const cors = require('cors');
const { error } = require('console');
require('dotenv').config();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());



const router = express.Router();
app.use(router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use("/js", express.static(path.join(__dirname, 'js')));
app.use("/css", express.static(path.join(__dirname, 'css')));
app.use("/image", express.static(path.join(__dirname, 'image')));

let whiteList = ['http://localhost:3030', 'http://localhost:3031']

let corsOptions = {
    origin: whiteList,
    methods: 'GET,POST,PUT,DELETE'
}



var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

router.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/home2.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})

router.get("/home", (req, res) => {
    res.sendFile(path.join(`${__dirname}/home.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})

router.get("/search", (req, res) => {
    res.sendFile(path.join(`${__dirname}/search.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})

router.get("/team", (req, res) => {
    res.sendFile(path.join(`${__dirname}/team.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})
router.get("/product", (req, res) => {
    res.sendFile(path.join(`${__dirname}/Product.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})
router.get("/product_manage", (req, res) => {
    res.sendFile(path.join(`${__dirname}/Product2.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})
router.get("/login", (req, res) => {
    res.sendFile(path.join(`${__dirname}/login.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})
router.get("/admin_login", (req, res) => {
    res.status(200).sendFile(path.join(`${__dirname}/admin_login.html`));
    console.log(`Request at ${req.url}`);
})
router.post('/form-submit', function (req, res) {
    console.log(req.method);
    console.log(req.body.Username)
    res.status(200);
});
router.get('/welcome', function (req, res) {
    res.sendFile(path.join(`${__dirname}/welcome.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})

router.get('/artist_details', function (req, res) {
    res.sendFile(path.join(`${__dirname}/artist_details.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})

router.get('/search_artist', function (req, res) {
    res.sendFile(path.join(`${__dirname}/search_artist.html`))
    res.status(200)
    console.log(`Request at ${req.url}`);
})
app.listen(process.env.PORT, function () {
    console.log("Server listening at Port "
        + process.env.PORT);
});

