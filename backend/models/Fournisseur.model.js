const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const FournisseurSchema = new Schema({
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
    nomentreprise: { 
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: true 
    },
    commercant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commercants'
    },
}, {timestamps: { createdAt: "created_at" }});

const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);

module.exports = Fournisseur;