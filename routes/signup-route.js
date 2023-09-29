import express from 'express'
import { body, query, validationResult } from 'express-validator'


const router = express.Router()

import signupUser from '../controllers/signup-controllers.js'

router.post('', [ 
    body('username').notEmpty().trim().isLength({ min: 4 }),
    body('email').notEmpty().trim().isEmail(),
    body('password').notEmpty().trim().isLength({ min: 6 }),
], signupUser)

export default router

