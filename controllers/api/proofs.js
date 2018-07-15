const Proof = require("../../models").Proof;

module.exports = {
  index(req, res) {
    return Proof.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(proofs => res.status(200).json(proofs))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    console.log(req.user);
    return Proof.create({
      image: req.body.image,
      userId: req.params.userId,
      mosqueId: req.user.id
    })
      .then(proof => res.status(200).send(proof))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return Proof.find({
      where: {
        id: req.params.proofId,
        userId: req.params.userId
      }
    })
      .then(proof => {
        if (!proof) {
          return res.status(404).send({
            message: "Proof Not Found"
          });
        }
        return res.status(200).send(proof);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Proof.find({
      where: {
        id: req.params.proofId,
        userId: req.params.userId
      }
    })
      .then(proof => {
        if (!proof) {
          return res.status(404).send({
            message: "Proof Not Found"
          });
        }
        return proof
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).send(updatedUser));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Proof.find({
      where: {
        id: req.params.proofId,
        userId: req.params.userId
      }
    })
      .then(proof => {
        if (!proof) {
          return res.status(404).send({
            message: "Proof Not Found"
          });
        }
        return proof.destroy().then(() => res.status(204).send());
      })
      .catch(error => res.status(400).send(error));
  }
};
