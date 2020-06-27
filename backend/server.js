//chargement de module
// Importez toutes les dépendances et middleware ici 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
//const connectDB = require('./Connection');
const cors = require('cors');

require('dotenv').config();

//On définit notre objet express nommé app

// Lancez une application express. 
const app = express();
app.use(cors());
app.use(express.json());


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  
  // DB Config
  const db = require("./config/keys").mongoURI;
  
  // Connect to MongoDB
  mongoose
    .connect(
      db,
      { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex :true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
  
  // Passport middleware
  app.use(passport.initialize());
  
  // Passport config
  require("./config/passport")(passport);

  //routes
 
 /* const users = require("./routes/api/user");
  app.use("/api/users", users);
*/
// utilise tous les contrôleurs (API) 
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

const FactureRouter = require('./routes/Facture');
app.use('/Facture', FactureRouter);

const CommandeFRouter = require('./routes/CommandeF');
app.use('/CommandeF', CommandeFRouter);

const FactureFRouter = require('./routes/FactureF');
app.use('/FactureF', FactureFRouter);
//Définition et mise en place du port d'écoute
// Démarrez le serveur ici 
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
