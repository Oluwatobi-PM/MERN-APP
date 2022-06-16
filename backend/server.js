const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')

const app = express()

//Connect to databse
connectDB()

app.get('/', (req,res) => {
    res.status(201).json({message: 'Welcome to the Support Desk API'})
})


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))