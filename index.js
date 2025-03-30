const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')


//configuring dotenv
dotenv.config()

//importing connectDB to connect to database
const connectDB = require('./connection/db')
const { postRequest, postData } = require('./controllers/controller')

const PORT = process.env.PORT
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse form data

app.use(express.json())
//implementing cors and bodyparser
app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

app.use("/checkout",postRequest)
app.use("/contact",postData)


// calling the connectDB function 

connectDB().catch(err => console.error("MongoDB Connection Error:", err));




 
 app.listen(PORT , ()=>{
    console.log("app is listening")
 })
module.exports  = app