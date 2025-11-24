import express from 'express';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON bodies (for API requests)
app.use(express.json());



// Middleware for parsing URL-encoded form data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Load routes
import router from './Routes/route.js';
app.use('/', router);

// Define the server port
const port = process.env.PORT || 3008;

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});























// const express = require('express');
// const route = require('./Routes/route');
// const { Sequelize } = require('sequelize');

// const app = express();

// app.use(express.json());

// // Create a Sequelize instance and connect to MySQL
// const sequelize = new Sequelize('demo', 'root', '#BMWrootsql@010', {
//     host: 'localhost', // Change this to your MySQL server host
//     dialect: 'mysql',
// });

// sequelize.authenticate()
//     .then(() => console.log('MySQL database connected'))
//     .catch(err => console.error('Error connecting to MySQL:', err));

// // Import your Sequelize model
// const userModel = require('./Models/UserModel'); // Adjust the path accordingly

// // Define associations or any other Sequelize configurations if needed

// // Sync Sequelize models with the database
// sequelize.sync({ force: true }) // This will recreate the tables. Use { force: false } in production
//     .then(() => console.log('Sequelize models synchronized successfully'))
//     .catch(err => console.error('Error synchronizing Sequelize models:', err));

// app.use('/', route);

// app.listen(3000, function () {
//     console.log('Express app running on port ' + 3000);
// });



// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3002;


// app.use(bodyParser.json());
// app.use(cors(
//    {
//       origin: ["http://localhost:3000"],
//       methods: ["GET", "POST"],
//       credentials: true,
//    }
// ));

// const db = mysql.createConnection({
//    user: "root",
//    host: "localhost",
//    password: "",
//    database: "sample_database"
// });

// db.connect((err) => {
//    if (err) {
//       console.error('Database connection failed:', err.stack);
//       return;
//    }
//    console.log('Connected to database');
// });

// // ----------------Register API Start

// app.post('/register', (req, res) => {

//    const username = req.body.username;
//    const email = req.body.email;
//    const password = req.body.password;



//    db.query(
//       "INSERT INTO reg_login (username, email, password) VALUES (?,?,?)",
//       [username, email, password],
//       (err, result) => {
//          console.log(err);
//       }
//    );
// });

// // ----------------Register API End

// // ----------------Login API Start
// app.post('/login', (req, res) => {
//    const username = req.body.username;
//    const password = req.body.password;

//    db.query(
//       "SELECT * FROM reg_login WHERE username = ? AND password = ?",
//       [username, password],
//       (err, result) => {
//          if (err) {
//             res.send({ err: err });
//          }

//          if (result.length > 0) {
//             res.send(result);
//          }
//          else ({ message: "Wrong username/password combination!" });
//       }

//    )
// });

// // ----------------Login API End


// // ----------------Scanner GTS screen1 API Start


// const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//    },
//    filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//    },
// });

// const upload = multer({ storage: storage });

// // API to handle form submission
// app.post('/gotoscan', upload.single('file'), (req, res) => {
//    const { textValue, dropdownValue } = req.body;
//    const filePath = req.file ? req.file.path : null;

//    const query = 'INSERT INTO scanner_gts_screen1 (text_value, dropdown_value, stud_path) VALUES (?, ?, ?)';
//    db.query(query, [textValue, dropdownValue, filePath], (err, result) => {
//       if (err) {
//          console.error('Error inserting data:', err);
//          res.status(500).send('Internal Server Error');
//          return;
//       }

//       res.status(200).send('Form submitted successfully');
//    });
// });


// // ----------------Scanner GTS screen1 API End





// app.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
// });








// app.use(
//    cors({
//       origin: ["http://localhost:3000"],
//       methods: ["GET", "POST"],
//       credentials: true,
//    })
// );



// ----------------


// db.query("CREATE DATABASE database_name",
//    function (err, result) {
//       //Display message in our console.
//       console.log("Database is created");
//    });



