const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const VendeurSchema = new Schema({
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
        type: String, 
        required: true 
    },
}, {timestamps: { createdAt: "created_at" }});

const Vendeur = mongoose.model('Vendeur', VendeurSchema);

module.exports = Vendeur;