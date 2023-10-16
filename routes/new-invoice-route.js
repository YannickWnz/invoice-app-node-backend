import express from 'express'
import { body, query, validationResult } from 'express-validator'

const router = express.Router()

import {createInvoice, updateInvoice, getUserInvoice, getSelectedInvoice, updateInvoiceStatus, deleteInvoice} from '../controllers/new-invoice-controller.js'

router.post('/createInvoice', createInvoice)
router.put('/updateInvoice', updateInvoice)
router.get('/userInvoice/:userToken', getUserInvoice)
router.get('/selectedInvoice/:id', getSelectedInvoice)
router.get('/updateStatus/:id', updateInvoiceStatus)
router.get('/deleteInvoice/:id', deleteInvoice)

export default router