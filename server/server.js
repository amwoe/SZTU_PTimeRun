const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt').expressjwt

const cors = require('cors')

const authRouter = require('./router/auth')
const taskRouter = require('./router/task')

// learning guidance 路由导入
const learnGuidanceRouter = require('./router/learnGuidance.js')

// talk 路由导入
const talkRouter = require('./router/Talking.js')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api',authRouter)
app.use('/api',taskRouter)

// learning guidance
app.use('/api',learnGuidanceRouter)

// talk
app.use('/api',talkRouter)

app.listen(3000, ()=>{
    console.log("server running at http://127.0.0.1:3000")
})