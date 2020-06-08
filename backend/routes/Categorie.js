const express = require('express');
const router = express.Router();
let Categorie = require('../models/Categorie.model');

//select tous les categories "get http://localhost:3001/Categorie/"
router.route('/').get((req, res) => {
    Categorie.find()
      .then(categorie => res.json(categorie))
      .catch(err => res.status(400).json('Error: ' + err));
});

//ajouter une categorie "post http://localhost:3001/Categorie/ajouter"
router.route('/ajouter').post((req, res) => {

    const nomcategorie = req.body.nomcategorie; 
    const commercant = "5ed0ec85c37bf9406433e50d";    

    const CategorieModel = new Categorie({
        nomcategorie,
        commercant
    });
    CategorieModel.save()
  .then(() => res.json("Categorie added!"))
  .catch(err => res.status(400).json('Error: ' + err));


});

//recherche a une categorie avec id "get http://localhost:3001/Categorie/:id"
router.route('/:id').get((req, res) => {
    Categorie.findById(req.params.id)
      .then(categorie => res.json(categorie))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une categorie avec id "delete http://localhost:3001/Categorie/:id"
router.route('/:id').delete((req, res) => {
    Categorie.findByIdAndDelete(req.params.id)
      .then(() => res.json('Categorie deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier une categorie avec id "post http://localhost:3001/Categorie/update/:id"
router.route('/update/:id').post((req, res) => {
    Categorie.findById(req.params.id)
      .then(categorie => {
        categorie.nomcategorie = req.body.nomcategorie;
  
        categorie.save()
          .then(() => res.json('Categorie updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;