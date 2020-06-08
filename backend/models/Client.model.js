const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const ClientSchema = new Schema({
    nom: { 
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: true ,
        unique: true,
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
    commercant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commercants'
    },
}, {timestamps: { createdAt: "created_at" }});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;