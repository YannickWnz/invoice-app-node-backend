import express from 'express'

const router = express.Router()

import signUserIn from '../controllers/login-controllers.js'

router.post('', signUserIn)

export default router

