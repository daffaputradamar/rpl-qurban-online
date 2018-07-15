const bcrypt = require("bcryptjs");
const passport = require("passport");

//include Article Module
let User = require("../models").User;
let Animal = require("../models").Animal;
let Proof = require("../models").Proof;

const multer = require("multer");
const path = require("path");

const storageBukti = multer.diskStorage({
  destination: "./public/bukti/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const uploadBukti = multer({
  storage: storageBukti,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("bukti");

const storageProfil = multer.diskStorage({
  destination: "./public/profiluser/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const uploadProfil = multer({
  storage: storageProfil,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("profiluser");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error Image Only!");
  }
}

module.exports = {
  register: (req, res) => {
    res.render("users/register");
  },

  store: (req, res) => {
    uploadProfil(req, res, err => {
      if (err) {
        req.flash("danger", "Tidak ada foto yang diupload");
        res.redirect(`/users/register`);
      } else {
        if (req.file == undefined) {
          req.flash("danger", "Tidak ada foto yang diupload");
          res.redirect(`/users/register`);
        } else {
          let newUser = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            sex: req.body.sex,
            imagePath: req.file.filename
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              newUser.password = hash;
              User.create(newUser)
                .then(() => {
                  // req.flash("success", "You are now registered and can log in");
                  res.redirect("/users/login");
                })
                .catch(err => console.log(err));
            });
          });
        }
      }
    });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: (req, res, next) => {
    passport.authenticate("user", {
      successRedirect: "/mosques/",
      failureRedirect: "/users/login",
      badRequestMessage: "Login Information Invalid",
      failureFlash: true
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    // req.flash("success", "You are logged out");
    res.redirect("/");
  },

  donation: (req, res) => {
    Proof.find({
      where: {
        animalId: req.params.donationId
      }
    }).then(proof => {
      res.render("users/proof", {
        proof
      });
    });
  },

  donations: (req, res) => {
    Animal.findAll({
      where: {
        userId: req.params.id
      },
      include: {
        model: Proof
      }
    }).then(donations => {
      res.render("users/donationsUser", {
        title: "Donasi",
        donations
      });
    });
  },

  proof: (req, res) => {
    uploadBukti(req, res, err => {
      if (err) {
        req.flash("danger", "Tidak ada foto yang diupload");
        res.redirect(`/mosques/${req.user.id}/donations`);
      } else {
        if (req.file == undefined) {
          req.flash("danger", "Tidak ada foto yang diupload");
          res.redirect(`/mosques/${req.user.id}/donations`);
        } else {
          let newProof = {
            pesan: req.body.pesan,
            userId: req.body.userId,
            mosqueId: req.body.mosqueId,
            animalId: req.body.animalId,
            imagePath: req.file.filename
          };
          Proof.create(newProof).then(proof => {
            Animal.findById(proof.animalId).then(animal => {
              animal
                .update({
                  proofId: proof.id
                })
                .then(() => {
                  req.flash("success", "Bukti telah dikirim");
                  res.redirect(`/mosques/${newProof.mosqueId}/donations`);
                });
            });
          });
        }
      }
    });
  },

  show: (req, res) => {
    User.findById(req.params.id).then(user => {
      res.render("users/user", {
        pengguna: user
      });
    });
  }
};
