const express = require('express')
const app = express()
const Routes = require('./src/routes/router')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use('/',Routes)


mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('MongoDB is connected') })
    .catch((error) => { console.log(error); })

app.listen(process.env.PORT, () => {
    console.log('App is running on port', + process.env.PORT)
})



