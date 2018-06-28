const User = require('../models/').User
const Animal = require('../models').Animal
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/database')

module.exports = {
    index:async (req, res) => {
        try {
            let users = await User.findAll({
                include: [{
                    model: Animal
                }]
            })
            return res.status(200).json(users)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    authenticate:async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
    
            let user = await User.find({
                where: {
                    email
                }
            })

            if (!user) {
                return res.json({
                    success: false,
                    msg: 'User not Found'
                })
            }

            let isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: '1d'
                })
                return res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        sex: user.sex
                    }
                })
            } else {
                return res.json({success: false, msg: "Wrong Password"})
            }

        } catch (err) {
            return res.status(400).send(err)
        }
    },

    create:async (req, res) => {
    
        try {
            let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            sex: req.body.sex
            }

            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(newUser.password, salt)
            newUser.password = hash
            let user = await User.create(newUser)
            return res.status(200).json(user)            
        } catch (err) {
            return res.status(400).json(err)
        }



        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         if(err) throw err
        //         newUser.password = hash
        //         return User.create(newUser)
        //         .then(user => res.status(200).send(user))
        //         .catch(error => res.status(400).send(error))
        //     })
        // })

        // return User.create(newUser)
        // .then(user => res.status(200).send(user))
        // .catch(error => res.status(400).send(error))
    },

    show:async (req, res) => {
        try {
            let user = await User.findById(req.params.userId, {
                include:[{
                    model: Animal
                }]
            })
            if (!user) {
                return res.status(404).send({
                  message: 'User Not Found',
                });
            }
            return res.status(200).send(user);
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    update:async (req, res) => {
        try {
            let user = await User.findById(req.params.userId, {
                include: [{
                    model: Animal
                }]
            })
            if (!user) {
                return res.status(404).json({
                message: 'User Not Found',
                });
            } else {
                let updatedUser = await user.update(req.body, { fields: Object.keys(req.body) })
                return res.status(200).json(updatedUser)
            }

        } catch (err) {
            res.status(400).json(err)
        }
    },

    destroy:async (req, res) => {
        try {
            let user = await User.findById(req.params.userId, {
                include: [{
                    model: Animal
                }]
            })
            if (!user) {
                return res.status(404).send({
                message: 'User Not Found',
                });
            } else {
                let destroyedUser = await user.destroy()
                return res.status(200).json(destroyedUser)
            }
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}