import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

import {createInvoice, getUserInvoice, getSelectedInvoice, updateInvoiceStatus} from '../controllers/new-invoice-controller.js'

router.post('/createInvoice', createInvoice)
router.get('/userInvoice/:userToken', getUserInvoice)
router.get('/selectedInvoice/:id', getSelectedInvoice)
router.get('/updateStatus/:id', updateInvoiceStatus)

export default router