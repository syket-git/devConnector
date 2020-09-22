const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../modals/User');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// @route Get auth 
// get the user
// private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({err: 'Internal Server Error'})
    }
})


router.post('/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send({errors: errors.array()})
        }

        const {email, password} = req.body; 

        try {
            let user = await User.findOne({email})
            if(!user){
                res.status(400).json({errors:[{ msg: "Invalid Credentials"}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({errors: [{msg: "Invalid Credentials"}]})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload , 
                config.get("jwtToken"), 
                {expiresIn: 360000}, 
                (err, token) => {
                    if(err) throw err; 
                    res.json({token})
                }    
            )

        } catch (err) {
            res.status(500).json({err: "Internal Server error"})
        }


    })


module.exports = router; 