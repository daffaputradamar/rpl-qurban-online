const Mosque = require('../models/').Mosque
const Animal = require('../models').Animal
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/database')

module.exports = {
    index: async (req, res) => {
        try {
            let mosques = await Mosque.findAll({
                include: [{
                    model: Animal
                }]
            })
            console.log(req.user.name)
            return res.status(200).json(mosques)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    authenticate:async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
    
            let mosque = await Mosque.find({
                where: {
                    email
                }
            })

            if (!mosque) {
                return res.json({
                    success: false,
                    msg: 'User not Found'
                })
            }

            let isMatch = await bcrypt.compare(password, mosque.password)

            if (isMatch) {
                const token = jwt.sign({data: mosque}, config.secret, {
                    expiresIn: '1d'
                })
                return res.json({
                    success: true,
                    token: 'JWT '+token,
                    mosque: {
                        id: mosque.id,
                        name: mosque.name,
                        email: mosque.email,
                        phone: mosque.phone,
                    }
                })
            } else {
                return res.json({success: false, msg: "Wrong Password"})
            }

        } catch (err) {
            return res.status(400).send(err)
        }
    },

    create: async (req, res) => {
        try {
            let newMosque = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            }

            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(newMosque.password, salt)
            newMosque.password = hash
            let mosque = await Mosque.create(newMosque)
            
            return res.status(200).json(mosque)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    show: async (req, res) => {
        try {
            let mosque = await Mosque.findById(req.params.mosqueId, {
                include:[{
                    model: Animal
                }]
            })
    
            if (!mosque) {
                return res.status(404).send({
                message: 'Mosque Not Found',
                });
            }
            return res.status(200).send(mosque);
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    update: async (req, res) => {
        try {
            let mosque = await Mosque.findById(req.params.mosqueId, {
                include: [{
                    model: Animal
                }]
            })
            if (!mosque) {
                return res.status(404).send({
                message: 'Mosque Not Found',
                });
            } else {
                let updatedMosque = await mosque.update(req.body, { fields: Object.keys(req.body) })
                return res.status(200).send(updatedMosque)
            }
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    destroy: async (req, res) => {
        try {
            let mosque = await Mosque.findById(req.params.mosqueId, {
                include: [{
                    model: Animal
                }]
            })
            if (!mosque) {
                return res.status(404).send({
                message: 'Mosque Not Found',
                });
            } else {
                let destroyedMosque = await Mosque.destroy()
                return res.status(200).json(destroyedMosque)
            }
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}