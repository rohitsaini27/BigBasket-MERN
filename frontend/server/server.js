const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const connectDB = require('./config/db.js')

app.use(cors())

app.use(express.json())

const port = process.env.PORT || 5000

connectDB()

app.use('/api' , require('./router/ProductRouter'))


app.get('/', (req,res) => {
    res.send('<h2>Welcome to bigbasket</h2>')
})

app.listen(port, () => console.log(`Server started on port ${port}`));

