const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require("cors")
const dbConnection = require('./database/dbconnection.js')
const error = require('./middlewares/error.js')
dotenv.config()
dbConnection()
const taskRouter = require('./taskRouter/taskRouter.js')
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/static/', express.static('./public'))
app.use('/api/v1', taskRouter)

app.use(error)


app.listen(port, () => {
    console.log(`server is listening at PORT ${port}`)
})