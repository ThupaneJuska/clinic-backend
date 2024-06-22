const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}

const mongoose = require('mongoose')

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_CONNECTION)
//     .catch(err => console.log('Something went wrong...', err))

//Middleware
app.use(express.json())
app.use(cors(corsOptions))

// Routes
const routes = require('./Routes/routes');
app.use(routes);

// Listen to port 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`)
})