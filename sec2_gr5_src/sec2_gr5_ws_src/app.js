const dotenv = require("dotenv");
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = 3031
const path = require('path');
dotenv.config();


app.use(cors());
const router = express.Router();
app.use(router);


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let whiteList = ['http://localhost:3030', 'http://localhost:3031']

let corsOptions = {
    origin: whiteList,
    methods: 'GET,POST,PUT,DELETE'
}


const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const artistRouter = require('./artist')(connection);

connection.connect(function (error) {
    if (error) throw error;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});
app.use('/artist', artistRouter);

router.get("/", (req, res) => {
    console.log("Hello, this is backend.")
})

router.get('/admin', (req, res) => {
    const username = req.query.username;
    connection.query("SELECT * FROM Adminlogin WHERE Username = ?", [username], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ error: false, data: results[0], message: 'Admin username' });
        } else {
            res.send({ error: false, data: {}, message: 'No admin found' });
        }
    });
});
router.post('/login', (req, res) => {
    let admin_username = req.body.Username;
    let admin_password = req.body.Password;
    console.log('admin', admin_username, 'log in', `at ${Date()}`);
    if (!admin_username || !admin_password) {
        return res.status(400).send({
            error: true,
            message: 'Please enter username and password'
        });
    }
    connection.query("SELECT * FROM Adminlogin WHERE Username = ? AND Password = ? ",
        [admin_username, admin_password],
        function (error, results) {
            if (error) throw error;
            if (results.length == 0) {
                return res.status(401).send({
                    error: true,
                    message: 'Invalid Login',
                    status: 401
                });
            }
            else {
                return res.status(200).send({
                    error: false,
                    data: results[0],
                    Username: results[0].Username,
                    message: 'Successfully log in',
                    status: 200
                });
            }
        });
});


app.listen(port, function () {
    console.log("Server listening at Port "
        + port);
});
