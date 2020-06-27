const express = require('express');
const router = express.Router();
let Devis = require('../models/CommandeF.model');
const CommandeF = require('../models/CommandeF.model');
//select tous les Commande "get http://localhost:3001/CommandeF/"
router.route('/').get((req, res) => {
    CommandeF.find()
      .then(commandeF => res.json(devis))
      .catch(err => res.status(400).json('Error: ' + err));
});
//ajouter un devis "post http://localhost:3001/Devis/ajouter"
router.route('/ajouter').post((req, res) => {
    const DateDoc = req.body.DateDoc;
    const DateFinDoc= req.body.DateFinDoc;  
    const Note= req.body.Note;  
    const TotalHT = Number(req.body.TotalHT);
    const TotalTVA = Number(req.body.TotalTVA);
    const TotalNet  = Number(req.body.TotalNet);
    const commercant = "5ed0ec85c37bf9406433e50d";  
   
    const CommandeFModel = new CommandeF({
      DateDoc,
      Note,
      DateFinDoc,
      TotalHT,
      TotalTVA,
      TotalNet,
      commercant,
    
    });
    CommandeFModel.save()
  .then(() => res.json("Commande added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//modifier une commande avec id "post http://localhost:3001/Devis/update/:id"
router.route('/update/:id').post((req, res) => {
    CommandeF.findById(req.params.id)
      .then(commandeF => {
        commandeF. DateDoc = req.body. DateDoc;
        commandeF.Note = req.body.Note;
        commandeF.DateFinDoc = req.body.DateFinDoc;
        commandeF.TotalHT = Number(req.body.TotalHT);
        commandeF.TotalTVA = Number(req.body.TotalTVA);
        commandeF.TotalNet = Number(req.body.TotalNet);
        commandeF.client_id = Numebr(req.body.client_id)
        commandeF.save()
          .then(() => res.json('commande updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;