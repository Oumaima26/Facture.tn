const express = require('express');
const router = express.Router();
let Devis = require('../models/Devis.model');
//select tous les Devis "get http://localhost:3001/Devis/"
router.route('/').get((req, res) => {
    Devis.find()
      .then(devis => res.json(devis))
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
    const DevisModel = new Devis({
      DateDoc,
      Note,
      DateFinDoc,
      TotalHT,
      TotalTVA,
      TotalNet,
      commercant
    });
    DevisModel.save()
  .then(() => res.json("Devis added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//modifier un devis avec id "post http://localhost:3001/Devis/update/:id"
router.route('/update/:id').post((req, res) => {
    Devis.findById(req.params.id)
      .then(devis => {
        devis. DateDoc = req.body. DateDoc;
        devis.Note = req.body.Note;
        devis.DateFinDoc = req.body.DateFinDoc;
        devis.TotalHT = Number(req.body.TotalHT);
        devis.TotalTVA = Number(req.body.TotalTVA);
        devis. TotalNet = Number(req.body. TotalNet);
        devis.save()
          .then(() => res.json('Devis updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;