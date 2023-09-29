import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

import createInvoice from '../controllers/new-invoice-controller.js'

router.post('', createInvoice)

export default router