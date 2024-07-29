const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const https = require('https')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:54327',
    'https://clinic-admin-b762d.web.app',
    'http://127.0.0.1:5500'
  ];

const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  };

const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/SEKGOPO-CLINIC")
    .catch(err => console.log('Something went wrong...', err))

//Middleware
app.use(express.json())
app.use(cors(corsOptions))

// Routes
const routes = require('./Routes/routes');
app.use(routes);

//SSL server
// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app)
// Listen to port 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`)
})