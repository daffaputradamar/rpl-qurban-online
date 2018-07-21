const bcrypt = require("bcryptjs");
const passport = require("passport");

//include Article Module
let Mosque = require("../models").Mosque;
let Animal = require("../models/").Animal;
let Proof = require("../models/").Proof;

const multer = require("multer");
const path = require("path");

const storageDonasi = multer.diskStorage({
  destination: "./public/hewan/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const uploadDonasi = multer({
  storage: storageDonasi,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("hewan");

const storageProfil = multer.diskStorage({
  destination: "./public/profilmasjid/",
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
}).single("profilmasjid");

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
  index: (req, res) => {
    Mosque.findAll().then(mosques => {
      res.render("mosques/mosques", {
        title: "List Masjid",
        mosques
      });
    });
  },

  register: (req, res) => {
    res.render("mosques/mosqueRegister");
  },

  store: (req, res) => {
    uploadProfil(req, res, err => {
      if (err) {
        req.flash("danger", "Tidak ada foto yang diupload");
        res.redirect(`/mosques/register`);
      } else {
        if (req.file == undefined) {
          req.flash("danger", "Tidak ada foto yang diupload");
          res.redirect(`/mosques/register`);
        } else {
          let newMosque = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            alamat: req.body.alamat,
            phone: req.body.phone,
            description: req.body.description,
            imagePath: req.file.filename
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newMosque.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              newMosque.password = hash;
              Mosque.create(newMosque)
                .then(() => {
                  res.redirect("/mosques/login");
                })
                .catch(err => console.log(err));
            });
          });
        }
      }
    });
  },

  login: (req, res) => {
    res.render("mosques/mosqueLogin");
  },

  authenticate: (req, res, next) => {
    passport.authenticate("mosque", {
      successRedirect: "/mosques/",
      failureRedirect: "/mosques/login",
      badRequestMessage: "Login Information Invalid",
      failureFlash: true
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/");
  },

  donate: (req, res) => {
    Mosque.findById(req.params.id).then(mosque => {
      res.render("mosques/createDonation", {
        title: "createDonation",
        mosque
      });
    });
  },

  storeDonate: (req, res) => {
    uploadDonasi(req, res, err => {
      if (err) {
        req.flash("danger", "Tidak ada foto yang diupload");
        res.redirect(`/mosques/${req.user.id}/donate`);
      } else {
        if (req.file == undefined) {
          req.flash("danger", "Tidak ada foto yang diupload");
          res.redirect(`/mosques/${req.user.id}/donate`);
        } else {
          let newAnimal = {
            jenis: req.body.jenis,
            umur: req.body.umur,
            berat: req.body.berat,
            proofId: null,
            mosqueId: req.params.id,
            userId: req.user.id,
            imagePath: req.file.filename
          };

          Animal.create(newAnimal)
            .then(() => {
              req.flash("success", "Donasi telah terupload");
              res.redirect("/mosques/" + req.params.id);
            })
            .catch(err => console.log(err));
        }
      }
    });
  },

  donations: (req, res) => {
    Animal.findAll({
      where: {
        mosqueId: req.params.id
      },
      include: {
        model: Proof
      }
    }).then(donations => {
      // return res.json(donations);
      res.render("mosques/donations", {
        title: "List Donasi",
        donations
      });
    });
  },

  show: (req, res) => {
    Mosque.findById(req.params.id).then(mosque => {
      res.render("mosques/mosque", {
        title: "Masjid",
        mosque
      });
    });
  }
};
