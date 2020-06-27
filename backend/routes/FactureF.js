const express = require('express');
const router = express.Router();
let FactureF = require('../models/FactureF.model');
//select tous les factures "get http://localhost:3001/FactureF/"
router.route('/').get((req, res) => {
    FactureF.find()
      .then(FactureF => res.json(devis))
      .catch(err => res.status(400).json('Error: ' + err));
});
//ajouter une facture "post http://localhost:3001/Devis/ajouter"
router.route('/ajouter').post((req, res) => {
    const DateDoc = req.body.DateDoc;
    const DateFinDoc= req.body.DateFinDoc;  
    const Note= req.body.Note;  
    const TotalHT = Number(req.body.TotalHT);
    const TotalTVA = Number(req.body.TotalTVA);
    const TotalNet  = Number(req.body.TotalNet);
    const commercant = "5ed0ec85c37bf9406433e50d";  
   
    const FactureFModel = new FactureF({
      DateDoc,
      Note,
      DateFinDoc,
      TotalHT,
      TotalTVA,
      TotalNet,
      commercant,
    
    });
    FactureFModel.save()
  .then(() => res.json("Facture added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//modifier une facture avec id "post http://localhost:3001/FactureF/update/:id"
router.route('/update/:id').post((req, res) => {
    FactureF.findById(req.params.id)
      .then(factureF => {
        factureF. DateDoc = req.body. DateDoc;
        factureF.Note = req.body.Note;
        factureF.DateFinDoc = req.body.DateFinDoc;
        factureF.TotalHT = Number(req.body.TotalHT);
        factureF.TotalTVA = Number(req.body.TotalTVA);
        factureF.TotalNet = Number(req.body.TotalNet);
        factureF.client_id = Numebr(req.body.client_id)
        factureF.save()
          .then(() => res.json('Facture updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;