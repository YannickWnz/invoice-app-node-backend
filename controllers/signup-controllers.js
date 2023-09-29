import db from '../config/config.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import { query, validationResult } from 'express-validator'

const signupUser = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: 'Username not long enough'});
        // return res.json({ errors });
        return res.status(422).json({ errors: errors.array() });
    }

    const {username, email, password} = req.body

    const insertUsersQuery = 'INSERT INTO users (username, email, password, token) VALUES (?)'

    const checkIfProvidedDetailsExists = 'SELECT * FROM users (username, email, password) WHERE values (?)'

    const checkIfUsernameExists = 'SELECT * FROM users WHERE username = ?'

    const checkIfEmailExists = 'SELECT * FROM users WHERE email = ?'

    const checkIfPwdExists = 'SELECT * FROM users WHERE password = ?'

    db.query(checkIfUsernameExists, [username], (err, results) => {


        if(results.length > 0) {
            return res.status(409).json({Error: 'User already exists'})
        }


        db.query(checkIfEmailExists, [email], (err, results) =>  {

            if(results.length > 0) return res.status(409).json({Error: 'Email already exists'})

            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    return res.json({Error: err})
                }
                db.query(checkIfPwdExists, [hash], (err, results) => {
                    if( results.length > 0 ) {
                        return res.status(409).json({Error: 'Password taken. Please provide another password.'});
                    }

                    const userToken = uuidv4()

                    const usersDetails = [
                        username, 
                        email, 
                        hash,
                        userToken
                    ]

                    db.query(insertUsersQuery, [usersDetails], (err, results) => {
                        if(err) return res.status(400).json({Error: err})
                        if(results) {
                            const token = jwt.sign({username}, 'jwt-key', { expiresIn: '1d' })
                            res.cookie('token', token)

                            const userDetails = {
                                username,
                                email,
                                token: userToken
                            }

                            // res.status(200).json({ message: `hello from the signup - ${token}` })
                            res.status(200).json({ userDetails })
                            // res.status(200).json({ message: `hello from the signup - ${token}` })
                        } else {

                            return res.status(404).json({ Error: 'Oops! An error occured. Try again later' })

                        }
                    } )

                })
            })


        })
        
    } )

}

export default signupUser;
