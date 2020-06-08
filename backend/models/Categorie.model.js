const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const CategorieSchema = new Schema({
  nomcategorie: { 
    type: String,
    required: true,
    unique: true,
    minlength: 3
  }, 
  commercant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'commercants'
  },
}, {timestamps: { createdAt: "created_at" }});

const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = Categorie;