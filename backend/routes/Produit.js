const express = require('express');
const router = express.Router();
let Produit = require('../models/Produit.model');

const auth = require('../middleware/auth');
//select tous les produits "get http://localhost:3001/Produit/"
router.route('/').get((req, res) => {
    Produit.find()
      .then(produit => res.json(produit))
      .catch(err => res.status(400).json('Error: ' + err));
});
//calculer le nombre de produit
router.route('/countproduit').get(function(req,res){

  Produit.count({}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })


})

// recherche d'un produit par nom de produit
router.route('/libelle/:libelle')
    .get(function(request, response) {
            var libelle = request.params.libelle;       
            Produit.findOne({libelle:libelle},  function(err, produit) {
              if (err) {
                response.json(err);
              }
      
              response.json(produit);
            });
         });
//ajouter une produit "post http://localhost:3001/Produit/ajouter"
router.route('/ajouter').post((req, res) => {
    const reference = Number(req.body.reference);
    const description = req.body.description;   
    const nomcategorie = req.body.nomcategorie;   
    const libelle = req.body.libelle;  
    const quantite = Number( req.body.quantite);  
    const TVA = Number(req.body.TVA);  
    const prix = Number(req.body.prix);   
    const commercant= "5ed0ec85c37bf9406433e50d";  


    const ProduitModel = new Produit({
        reference,
        description,
        libelle,
        quantite,
        TVA,
        prix,
        nomcategorie,
        commercant
    });
    ProduitModel.save()
  .then(() => res.json("Produit added!"))
  .catch(err => res.status(400).json('Error: ' + err));


});
router.get('/liste', auth, async (req, res) => {
  try {
    const produits = await Produit.find({ commercant: req.commercant.id })
    res.json(produits)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})

//recherche a une produit avec id "get http://localhost:3001/Produit/:id"
router.route('/:id').get((req, res) => {
    Produit.findById(req.params.idCommercant)
      .then(produit => res.json(produit))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une produit avec id "delete http://localhost:3001/Produit/:id"
router.route('/:id').delete((req, res) => {
    Produit.findByIdAndDelete(req.params.id)
      .then(() => res.json('Produit deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier une produit avec id "post http://localhost:3001/Produit/update/:id"
router.route('/update/:id').post((req, res) => {
    Produit.findById(req.params.id)
      .then(produit => {
        produit.reference = Number(req.body.reference);
        produit.description = req.body.description;
        produit.nomcategorie = req.body.nomcategorie;
        produit.libelle = req.body.libelle;
        produit.quantite = Number(req.body.quantite);
        produit.TVA = Number(req.body.TVA);
        produit.prix = Number(req.body.prix);
  
        produit.save()
          .then(() => res.json('Produit updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;
