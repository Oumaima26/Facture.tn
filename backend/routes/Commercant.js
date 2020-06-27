const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const Commercant = require("../models/Commerçant.model");
// @route POST api/users/register
// @desc Register user
// @access Public
//select tous les commercants "get http://localhost:3001/Commercant/"
router.route('/').get((req, res) => {
  Commercant.find()
    .then(Commercant => res.json(Commercant))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Commercant.findOne({ email: req.body.email }).then(commercant => {
    if (commercant) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newCommercant = new Commercant({
      nom : req.body.nom,
      prenom : req.body.prenom,
      tel : Number(req.body.tel),
      email : req.body.email,
      password : req.body.password,
      nomentreprise : req.body.nomentreprise,
      pays : req.body.pays,
      activite: req.body.activite,
      region : req.body.region,
      devises : req.body.devises,
      codepostal : Number(req.body.codepostal)
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCommercant.password, salt, (err, hash) => {
          if (err) throw err;
          newCommercant.password = hash;
          newCommercant
            .save()
            .then(() => res.json("Commerçant added!"))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Commercant.findOne({ email : req.body.email }).then(commercant => {
    // Check if user exists
    if (!commercant) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(req.body.password, commercant.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: commercant.id,
          nom: commercant.nom,
          prenom: commercant.prenom,
            email: commercant.email,
            tel:commercant.tel,
            nomentreprise :commercant.nomentreprise,
            pays : commercant.pays,
            activite : commercant.activite,
            region : commercant.region,
            devises :commercant.devises,  
            codepostal : commercant.codepostal
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user: {
                _id: commercant._id ,
                nom: commercant.nom,
              prenom: commercant.prenom,
              email: commercant.email,
              tel:commercant.tel,
              nomentreprise :commercant.nomentreprise,
              pays : commercant.pays,
              activite : commercant.activite,
              region : commercant.region,
              devises :commercant.devises,  
              codepostal : commercant.codepostal,
              },
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
module.exports = router;