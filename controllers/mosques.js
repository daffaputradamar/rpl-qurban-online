const Mosque = require('../models/').Mosque
const Animal = require('../models').Animal

module.exports = {
    index (req, res) {
        return Mosque.findAll({
            include: [{
                model: Animal
            }]
        })
        .then(mosques => res.status(200).json(mosques))
        .catch(err => res.status(400).send(err))
    },
    create (req, res) {
        return Mosque.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })
        .then(mosque => res.status(200).send(mosque))
        .catch(error => res.status(400).send(error))
    },

    show (req, res) {
        return Mosque.findById(req.params.mosqueId, {
            include:[{
                model: Animal
            }]
        })
        .then(mosque => {
            if (!mosque) {
              return res.status(404).send({
                message: 'Mosque Not Found',
              });
            }
            return res.status(200).send(mosque);
        })
        .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return Mosque.findById(req.params.mosqueId, {
            include: [{
                model: Animal
            }]
        })
        .then(mosque => {
            if (!mosque) {
                return res.status(404).send({
                message: 'Mosque Not Found',
                });
            }
            return mosque
                .update(req.body, { fields: Object.keys(req.body) })
                .then((updatedUser) => res.status(200).send(updatedUser))
        })
        .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Mosque.findById(req.params.mosqueId, {
            include: [{
                model: Animal
            }]
        })
        .then(mosque => {
            if (!mosque) {
                return res.status(404).send({
                message: 'Mosque Not Found',
                });
            }
            return mosque
                .destroy()
                .then(() => res.status(204).send())
        })
        .catch(error => res.status(400).send(error));
    }
}