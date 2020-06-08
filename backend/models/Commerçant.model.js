const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const CommercantSchema = new Schema({
  nom: { 
    type: String,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    required: true 
  },
  prenom: { 
    type: String,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    required: true 
  },
  tel: { 
    type: Number,
    required: true 
  },
  email: { 
    type: String,
    lowercase: true,
    unique: true,
    required: true 
  },
  password: { 
    type: String
  },
  nomentreprise: { 
    type: String, 
    required: true 
  },
  pays: { 
    type: String, 
    required: true 
  },
  activite: { 
    type: String, 
    required: true 
  },
  region: { 
    type: String, 
    required: true 
  },
  devises: { 
    type: String, 
    required: true 
  },
  codepostal: { 
    type: Number, 
    
    required: true },
}, {timestamps: { createdAt: "created_at" }});



const Commercant = mongoose.model('Commercant', CommercantSchema);

module.exports = Commercant;