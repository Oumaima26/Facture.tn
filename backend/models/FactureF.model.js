const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose,6);

//cree schema
const FactureFSchema = new Schema({
    DateDoc: { 
        type: Date,
        default: Date.now,
        required: true 
    },
    DateFinDoc: { 
        type: Date,
        default: Date.now,
        required: true 
    },
     Note: { 
        type:String,
    },
    TotalHT: { 
        type:Float,
        required: true 
    },
    TotalTVA :{
        type:Float,
        required: true 
    },
    TotalTTC :{
        type:Float,
        required: true 
    },
    commercant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commercants'
    },
    Ref: {
      type: Number,      
      required: true ,
      default:0
    },    
    Etat: {
        type: String,      
        required: true 
      },
    nom: {
        type: String,      
        required: true 
    },
}, {timestamps: { createdAt: "created_at" }});
const FactureF = mongoose.model('FactureF', FactureFSchema);
module.exports = FactureF;