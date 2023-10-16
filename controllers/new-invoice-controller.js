import db from '../config/config.js'
import { query, validationResult } from 'express-validator'


const createInvoice = (req, res, next) => {

    // console.log(req.body)

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

}

const updateInvoice = (req, res, next) => {

    const {
        invoiceID,
        billFromStreetAddress, 
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
        token
    } 
    = req.body

    // const updateInvoiceQuery = 'INSERT INTO invoice (streetAddressBillFrom, cityBillFrom, postCodeBillFrom, CountryBillFrom, clientName, clientEmail, clientAddress, clientCity, clientPostCode, clientCountry, paymentTerms, dueDate, projectDescription, item_list, itemsTotalPrice, token) VALUES (?) WHERE token = ?';

    const updateInvoiceQuery = `
        UPDATE invoice 
        SET 
            streetAddressBillFrom = ?, 
            cityBillFrom = ?, 
            postCodeBillFrom = ?, 
            CountryBillFrom = ?, 
            clientName = ?, 
            clientEmail = ?, 
            clientAddress = ?, 
            clientCity = ?, 
            clientPostCode = ?, 
            clientCountry = ?, 
            paymentTerms = ?, 
            dueDate = ?, 
            projectDescription = ?, 
            item_list = ?, 
            itemsTotalPrice = ?
        WHERE invoiceID = ?`;


    const invoiceDetails = [
        billFromStreetAddress, 
        cityBillFrom,
        postCodeBillFrom,
        countryBillFrom,
        clientName,
        clientEmail,
        clientAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        termsOfPayment,
        dueDate,
        projectDescription,
        listitems,
        sumOfTotalPrice,
        invoiceID
    ]

    // return res.json(invoiceDetails)

    db.query(updateInvoiceQuery, invoiceDetails, (err, results) => {

        if(err) { return res.status(400).json({err}) }

        return res.status(200).json({Message: 'Invoice updated successfully'})

    } )
    

}

const getUserInvoice = (req, res) => {

    
    let token = req.params.userToken

    const fetchInvoice = 'SELECT * FROM invoice WHERE token = ?'

    db.query(fetchInvoice, [token],(err, results) => {

        if(err) { return res.status(400).json({err}) }

        // console.log(results)

        return res.status(200).json(results)

    })

}

const getSelectedInvoice = (req, res) => {

    let id = req.params.id

    // console.log(id)

    const fetchSelectedInvoice = 'SELECT * FROM invoice WHERE invoiceID = ?'

    db.query(fetchSelectedInvoice, [id], (err, results) => {

        if(err) { return res.status(400).json({err}) }

        // console.log(results)

        return res.status(200).json(results)

    })


}

const updateInvoiceStatus = (req, res) => {

    let id = req.params.id

    const updateStatusQuery = `UPDATE invoice SET invoiceStatus = 'Paid' WHERE invoiceID = ?`

    db.query(updateStatusQuery, [id],(err, results) => {

        if(err) { return res.status(400).json({err}) }

        return res.status(200).json({Message: 'Invoice status updated successfully'})

    })

}

const deleteInvoice = (req, res) => {

    let id = req.params.id

    const deleteInvoiceQuery = `DELETE FROM invoice WHERE invoiceID = ?`

    db.query(deleteInvoiceQuery, [id],(err, results) => {

        if(err) { return res.status(400).json({err}) }

        return res.status(200).json({Message: 'Invoice deleted successfully'})

    })


}



export {createInvoice,updateInvoice, getUserInvoice, getSelectedInvoice, updateInvoiceStatus, deleteInvoice}
// export default createInvoice
// export default getUserInvoice