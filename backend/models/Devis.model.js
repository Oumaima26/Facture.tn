const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose,6);
//cree schema
const DevisSchema = new Schema({
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
        required: true 
    },
    TotalHT: { 
        type:Float,
        required: true 
    },
    TotalTVA :{
        type:Float,
        required: true 
    },
    TotalNet :{
        type:Float,
        required: true 
    },
    commercant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commercants'
    },
}, {timestamps: { createdAt: "created_at" }});
const Devis = mongoose.model('Devis', DevisSchema);
module.exports = Devis;