require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const cors = require('cors');
let Commercant = require('../models/Commerçant.model');
router.use(cors());
//select tous les commercants "get http://localhost:3001/Commercant/"
router.route('/').get((req, res) => {
    Commercant.find()
      .then(Commercant => res.json(Commercant))
      .catch(err => res.status(400).json('Error: ' + err));
});
//ajouter un commercant "post http://localhost:3001/Commercant/ajouter"
router.route('/ajouter').post(async (req, res) => {
  const salt = Bcrypt.genSaltSync();
  const hashedPassword = await Bcrypt.hash(req.body.password , salt);
    const CommercantModel = new Commercant({
      nom : req.body.nom,
      prenom : req.body.prenom,
      tel : Number(req.body.tel),
      email : req.body.email,
      password : hashedPassword,
      nomentreprise : req.body.nomentreprise,
      pays : req.body.pays,
      activite: req.body.activite,
      region : req.body.region,
      devises : req.body.devises,
      codepostal : Number(req.body.codepostal)
    });
    CommercantModel.save()
  .then(() => res.json("Commerçant added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/ajouter').post(async (req, res) => {
  const salt = Bcrypt.genSaltSync();
  const hashedPassword = await Bcrypt.hash(req.body.password , salt);
  console.log(salt)
  console.log(hashedPassword)
 const CommercantModel = new Commercant({
   nom : req.body.nom,
   prenom : req.body.prenom,
   tel : Number(req.body.tel),
   email : req.body.email,
   password : hashedPassword,
   nomentreprise : req.body.nomentreprise,
   pays : req.body.pays,
   activite: req.body.activite,
   region : req.body.region,
   devises : req.body.devises,
   codepostal : Number(req.body.codepostal)
 });
 CommercantModel.save()
.then(() => res.json("Commerçant added!"))
.catch(err => res.status(400).json('Error: ' + err));
});*/
//recherche a un commercant avec id "get http://localhost:3001/Commercant/:id"
router.route('/:id').get((req, res) => {
  Commercant.findById(req.params.id)
    .then(commercant => res.json(commercant))
    .catch(err => res.status(400).json('Error: ' + err));
});
//suppremer une commercant avec id "delete http://localhost:3001/Commercant/:id"
router.route('/:id').delete((req, res) => {
  Commercant.findByIdAndDelete(req.params.id)
    .then(() => res.json('Commerçant deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//modifier un commercant avec id "post http://localhost:3001/Commercant/update/:id"
router.route('/update/:id').post((req, res) => {
  Commercant.findById(req.params.id)
    .then(commercant => {
      commercant.nom = req.body.nom;
      commercant.prenom = req.body.prenom;
      commercant.email = req.body.email;
      commercant.password = Bcrypt.hashSync('req.body.password',10);
      commercant.tel = Number(req.body.tel);
      commercant.nomentreprise = req.body.nomentreprise;
      commercant.pays = req.body.pays;
      commercant.activite = req.body.activite;
      commercant.region = req.body.region;
      commercant.devises = req.body.devises;  
      commercant.codepostal = Number(req.body.codepostal);
      commercant.save()
        .then(() => res.json('Commerçant updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});












//authentification
router.post('/login',  (req, res) => {
  Commercant.findOne({
    email: req.body.email
  })
    .then(  com => {
      if (com) {
        if (Bcrypt.compareSync(req.body.password,com.password)) {
          // Passwords match
          const payload = {
            _id: com._id,
            nom: com.nom,
            prenom: com.prenom,
            email: com.email,
            tel:com.tel,
            nomentreprise :com.nomentreprise,
            pays : com.pays,
            activite : com.activite,
            region : com.region,
            devises :com.devises,  
            codepostal : com.codepostal
          }
          let token = jwt.sign(payload, 'secret', {
            expiresIn: 1440
          })
          //res.send(token)
          res.json({  
            token,
            user: {
              _id: com._id ,
              nom: com.nom,
            prenom: com.prenom,
            email: com.email,
            tel:com.tel,
            nomentreprise :com.nomentreprise,
            pays : com.pays,
            activite : com.activite,
            region : com.region,
            devises :com.devises,  
            codepostal : com.codepostal,
            },
          });
        } else {
          // Passwords don't match
          res.json({ error: 'Commerçant does not exist password incorrect' })
        }
      } else {
        res.json({ error: 'Commerçant does not exist email incorrect' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
//les coordonnées de commerçant
router.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret')
  Commercant.findOne({
    _id: decoded._id
  })
    .then(commercant => {
      if (commercant) {
        res.json(commercant)
      } else {
        res.send('Commercant does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
module.exports = router;