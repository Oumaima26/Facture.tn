const express = require('express');
const router = express.Router();
let Client = require('../models/Client.model');

//select tous les clients "get http://localhost:3001/Client/"
router.route('/').get((req, res) => {
    Client.find()
      .then(client => res.json(client))
      .catch(err => res.status(400).json('Error: ' + err));
});  
// recherche d'un client par nom de client
router.route('/nom/:nom')
    .get(function(request, response) {
            var nom = request.params.nom;       
            Client.findOne({nom:nom},  function(err, client) {
              if (err) {
                response.json(err);
              }
      
              response.json(client);
            });
         });
//calculer le nombre de client
router.route('/countclient').get(function(req,res){

  Client.count( {}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })


})/*router.route('/countclient').get(function(req,res){

  Client.countDocuments( {commercant : "5ed0ec85c37bf9406433e50d"}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })


}) */
//ajouter un client "post http://localhost:3001/Client/ajouter"
router.route('/ajouter').post((req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;  
    const tel = Number(req.body.tel);
    const email = req.body.email;
    const commercant = "5ed0ec85c37bf9406433e50d";  


    const ClientModel = new Client({
        nom,
        prenom,
        tel,
        email,
        commercant
    });
    ClientModel.save()
  .then(() => res.json("Client added!"))
  .catch(err => res.status(400).json('Error: ' + err));


});

//recherche a un client avec id "get http://localhost:3001/Client/:id"
router.route('/:id').get((req, res) => {
    Client.findById(req.params.id)
      .then(client => res.json(client))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer un client avec id "delete http://localhost:3001/Client/:id"
router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
      .then(() => res.json('Client deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier un client avec id "post http://localhost:3001/Client/update/:id"
router.route('/update/:id').post((req, res) => {
    Client.findById(req.params.id)
      .then(client => {
        client.nom = req.body.nom;
        client.prenom = req.body.prenom;
        client.email = req.body.email;
        client.tel = Number(req.body.tel);
  
        client.save()
          .then(() => res.json('Client updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;