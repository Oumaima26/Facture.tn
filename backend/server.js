//chargement de module
const express = require('express');
//const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const connectDB = require('./Connection');
const cors = require('cors');

require('dotenv').config();

//On définit notre objet express nommé app


const app = express();
app.use(cors());
app.use(express.json());
//Connexion à la base de donnée
connectDB();

//pour eviter erreur par default
app.use(bodyparser.urlencoded({extended : false}));


const CommercantRouter = require('./routes/Commercant');
app.use('/Commercant', CommercantRouter);

const VendeurRouter = require('./routes/Vendeur');
app.use('/Vendeur', VendeurRouter);

const ProduitRouter = require('./routes/Produit');
app.use('/Produit', ProduitRouter);

const CategorieRouter = require('./routes/Categorie');
app.use('/Categorie', CategorieRouter);


const ClientRouter = require('./routes/Client');
app.use('/Client', ClientRouter);

const FournisseurRouter = require('./routes/Fournisseur');
app.use('/Fournisseur', FournisseurRouter);

const DevisRouter = require('./routes/Devis');
app.use('/Devis', DevisRouter);
//Définition et mise en place du port d'écoute
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
