import express from 'express'
import cors from 'cors'
import { check, validationResult } from 'express-validator';
import xss from 'xss';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'



import db from './config/config.js'

const app = express()

app.use(express.json())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Acceept, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     // next()
// })

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

app.use(cookieParser())


// importing routes files
import registerRoute from './routes/signup-route.js'
import loginRoute from './routes/login-route.js'
import newInvoiceRoute from './routes/new-invoice-route.js'


app.use('/signup', registerRoute)
app.use('/signin', loginRoute)
app.use('/createInvoice', newInvoiceRoute)


const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ error: 'Not authorized. Please login 1' });
    } 
    else {
        jwt.verify(token, 'jwt-key', (err, decoded) => {
            if(err) {
                return res.status(401).json({ error: 'Not authorized. Please login 2' });
            }
            next()
        })
    }
}


app.get('/checkToken', verifyToken, (req, res) => {

    return res.status(200).json({Status: 'success'})

}) 



app.listen(1556, () => {
    console.log('listening on port 1556')
})
