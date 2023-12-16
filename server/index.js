const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv= require('dotenv')
dotenv.config()

const userRoute = require('./routes/userRoutes')
const residenciesRoute = require('./routes/residenciesRoute')
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRoute)
app.use("/api/residencies",residenciesRoute)

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("connected")
})