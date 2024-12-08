const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt').expressjwt

const cors = require('cors')

const authRouter = require('./router/auth')
const taskRouter = require('./router/task')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api',authRouter)
app.use('/api',taskRouter)

app.listen(3000, ()=>{
    console.log("server running at http://127.0.0.1:3000")
})