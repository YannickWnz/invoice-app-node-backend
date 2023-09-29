import db from '../config/config.js'
import { query, validationResult } from 'express-validator'


const createInvoice = (req, res, next) => {

    console.log(req.body)

    const {
        receiptNo, 
        billFormStreetAddress, 
        countryBillFrom,
        cityBillFrom,
        postCodeBillFrom,
        clientName,
        clientEmail,
        clientAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        dateOfIssue,
        termsOfPayment,
        dueDate,
        projectDescription,
        listitems,
        sumOfTotalPrice,
        invoiceStatus,
        token
    } 
    = req.body

    const insertInvoice = 'INSERT INTO invoice (streetAddressBillFrom, cityBillFrom, postCodeBillFrom, CountryBillFrom, clientName, clientEmail, clientAddress, clientCity, clientPostCode, clientCountry, dateOfIssue, paymentTerms, dueDate, projectDescription, item_list, itemsTotalPrice, invoiceStatus, receiptNumber, token) VALUES (?)';


    const invoiceDetails = [
        billFormStreetAddress, 
        cityBillFrom,
        postCodeBillFrom,
        countryBillFrom,
        clientName,
        clientEmail,
        clientAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        dateOfIssue,
        termsOfPayment,
        dueDate,
        projectDescription,
        listitems,
        sumOfTotalPrice,
        invoiceStatus,
        receiptNo, 
        token
    ]


    db.query(insertInvoice, [invoiceDetails], (err, results) => {

        if(err) { return res.status(400).json({err}) }

        return res.status(200).json({Message: 'Invoice added successfully'})

    } )



    // return res.json({message: 'got it'})

}

export default createInvoice