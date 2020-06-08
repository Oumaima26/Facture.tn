const express = require('express');
const router = express.Router();
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Vendeur = require('../models/Vendeur.model');

//select tous les vendeurs "get http://localhost:3001/Vendeur/"
router.route('/').get((req, res) => {
    Vendeur.find()
      .then(vendeur => res.json(vendeur))
      .catch(err => res.status(400).json('Error: ' + err));
});

//ajouter une vendeur "post http://localhost:3001/Vendeur/ajouter"
router.route('/ajouter').post(async(req, res) => {
  
  const salt = Bcrypt.genSaltSync();
  const hashedPassword = await Bcrypt.hash(req.body.password , salt);
    const nom = req.body.nom;
    const prenom = req.body.prenom;  
    const tel = Number(req.body.tel);
    const email = req.body.email;
    const password =hashedPassword;


    const VendeurModel = new Vendeur({
        nom,
        prenom,
        tel,
        email,
        password
    });
    VendeurModel.save()
  .then(() => res.json("Vendeur added!"))
  .catch(err => res.status(400).json('Error: ' + err));


});

//recherche a une vendeur avec id "get http://localhost:3001/Vendeur/:id"
router.route('/:id').get((req, res) => {
    Vendeur.findById(req.params.id)
      .then(vendeur => res.json(vendeur))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une vendeur avec id "delete http://localhost:3001/Vendeur/:id"
router.route('/:id').delete((req, res) => {
    Vendeur.findByIdAndDelete(req.params.id)
      .then(() => res.json('Vendeur deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier une vendeur avec id "post http://localhost:3001/Vendeur/update/:id"
router.route('/update/:id').post((req, res) => {
    Vendeur.findById(req.params.id)
      .then(vendeur => {
        vendeur.nom = req.body.nom;
        vendeur.prenom = req.body.prenom;
        vendeur.email = req.body.email;
        vendeur.password = req.body.password;
        vendeur.tel = Number(req.body.tel);
  
        vendeur.save()
          .then(() => res.json('Vendeur updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //authentification "post http://localhost:3001/Vendeur/login"
  router.post('/login', (req, res) => {
    Vendeur.findOne({
      email: req.body.email
    })
      .then(vendeur => {
        if (vendeur) {
          if (Bcrypt.compareSync(req.body.password,vendeur.password)) {
            // Passwords match
            const payload = {
              _id: vendeur._id,
              nom: vendeur.nom,
              prenom: vendeur.prenom,
              email: vendeur.email,
              tel:vendeur.tel
            }
            let token = jwt.sign(payload, 'secret', {
              expiresIn: 1440
            })
            res.send(token)
          } else {
            // Passwords don't match
            res.json({ error: 'Vendeur does not exist' })
          }
        } else {
          res.json({ error: 'Vendeur does not exist' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  

//profile "get http://localhost:3001/Vendeur/profile"
router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret')
  
    Vendeur.findOne({
      _id: decoded._id
    })
      .then(vendeur => {
        if (vendeur) {
          res.json(vendeur)
        } else {
          res.send('Vendeur does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  

module.exports = router;