const Animal = require("../../models").Animal;

module.exports = {
  index(req, res) {
    return Animal.findAll({
      where: {
        mosqueId: req.params.mosqueId
      }
    })
      .then(animals => res.status(200).json(animals))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    console.log(req.user);
    return Animal.create({
      jenis: req.body.jenis,
      umur: req.body.umur,
      berat: req.body.berat,
      sex: req.body.sex,
      userId: req.user.id,
      mosqueId: req.params.mosqueId
    })
      .then(animal => res.status(200).send(animal))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return Animal.find({
      where: {
        id: req.params.animalId,
        mosqueId: req.params.mosqueId
      }
    })
      .then(animal => {
        if (!animal) {
          return res.status(404).send({
            message: "Animal Not Found"
          });
        }
        return res.status(200).send(animal);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Animal.find({
      where: {
        id: req.params.animalId,
        mosqueId: req.params.mosqueId
      }
    })
      .then(animal => {
        if (!animal) {
          return res.status(404).send({
            message: "Animal Not Found"
          });
        }
        return animal
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).send(updatedUser));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Animal.find({
      where: {
        id: req.params.animalId,
        mosqueId: req.params.mosqueId
      }
    })
      .then(animal => {
        if (!animal) {
          return res.status(404).send({
            message: "Animal Not Found"
          });
        }
        return animal.destroy().then(() => res.status(204).send());
      })
      .catch(error => res.status(400).send(error));
  }
};
