import db from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




const signUserIn = async (req, res, next) => {

    
    const { username, password } = req.body
    
    
    const checkUsersame = ' SELECT * FROM users WHERE username = ? '
    
    db.query(checkUsersame, [username], (err, data) => {
        if(err) { return res.json({Error: "An error occured"}) }
        
        if(data.length > 0 ) {
            // res.json({ message: 'in the login metaverse' })

            bcrypt.compare(password.toString(), data[0].password, (err, response) => {

                if(err) { return res.status(400).json({Error: 'An error occured'})  }

                if(response) {
                    const userDetails = { 
                        username: data[0].username,  
                        email: data[0].email,
                        token: data[0].token
                    }

                    const name = userDetails.username

                    const token = jwt.sign({ username }, 'jwt-key', {expiresIn: '1d'}  )
                    res.cookie('token', token)

                    return res.status(200).json({ userDetails })
                } else {
                    return res.status(404).json({ Error: 'Invalid username or password' })
                }


            } )

        } else {
            return res.status(404).json({ Error: 'No user found'})
        }

    } )


}

export default signUserIn