const express = require('express')
const app = express()
const fs = require('fs')
const router = require('./route')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen('5000', () => {
    console.log('服务器已经启动')
}
)

app.get('/', (req, res) => {
    res.send("sr")
})
app.use('/api', router)