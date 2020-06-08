const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,6);

const Schema = mongoose.Schema;
//cree schema
const ProduitSchema = new Schema({
  
  nomcategorie: { 
    type: String, 
    required: true ,
    minlength: 3
  },
  reference: { 
    type: Number,
    required: true ,
    lowercase: true,
    unique: true,
  },
  prix: { 
    type:Float,
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  libelle: { 
    type: String,
    required: true 
  },
  quantite: { 
    type: Number,
    required: true 
  },
  TVA: { 
    type: Number, 
    required: true 
  },
  commercant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'commercants'
  },
}, {timestamps: { createdAt: "created_at" }});

const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;
