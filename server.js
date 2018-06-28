const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const config = require('./config/database')

const app = express()

const userRoute = require('./routes/users')
const mosqueRoute = require('./routes/mosques')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use('/api/users', userRoute)
app.use('/api/mosques', mosqueRoute)

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to nothingness"
    })
})

app.listen(3000, () => {
    console.log('app listening in http://localhost:3000')
})