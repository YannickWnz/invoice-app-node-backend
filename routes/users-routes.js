import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
    // console.log('in the users router routes')
    // res.json({message: 'in the users router routes'})
    res.json('in the users router routes')
} )

// module.exports = router;
export default router;
