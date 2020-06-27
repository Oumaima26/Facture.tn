const express = require('express');
const router = express.Router();
let Facture = require('../models/Facture.model');
//select tous les factures "get http://localhost:3001/Facture/"
router.route('/').get((req, res) => {
    Facture.find()
      .then(facture => res.json(facture))
      .catch(err => res.status(400).json('Error: ' + err));
});
//ajouter une facture "post http://localhost:3001/Devis/ajouter"
router.route('/ajouter').post((req, res) => {
    const DateDoc = req.body.DateDoc;
    const DateFinDoc= req.body.DateFinDoc;  
    const Note= req.body.Note;  
    const TotalHT = Number(req.body.TotalHT);
    const TotalTVA = Number(req.body.TotalTVA);
    const TotalTTC  = Number(req.body.TotalTTC);
    const commercant = "5ed0ec85c37bf9406433e50d";     
    const client =req.body.client;
    const FactureModel = new Facture({
      DateDoc,
      Note,
      DateFinDoc,
      TotalHT,
      TotalTVA,
      TotalTTC,
      commercant,
      client,
    });
    FactureModel.save()
  .then(() => res.json("Facture added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//modifier une facture avec id "post http://localhost:3001/Facture/update/:id"
router.route('/update/:id').post((req, res) => {
    Facture.findById(req.params.id)
      .then(facture => {
        facture. DateDoc = req.body. DateDoc;
        facture.Note = req.body.Note;
        facture.DateFinDoc = req.body.DateFinDoc;
        facture.TotalHT = Number(req.body.TotalHT);
        facture.TotalTVA = Number(req.body.TotalTVA);
        facture.TotalNet = Number(req.body.TotalNet);
        facture.client_id = Numebr(req.body.client_id)
        facture.save()
          .then(() => res.json('Facture updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;
//suppremer un devis avec id "delete http://localhost:3001/Devis/:id"
router.route('/:id').delete((req, res) => {
    Facture.findByIdAndDelete(req.params.id)
      .then(() => res.json('Devis deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
