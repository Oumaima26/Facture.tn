/*import React, { Component } from 'react'
import Invoice from './components/devis/dev';

class App extends Component {
  render() {
    return (
      <div >
        <Invoice />
      </div>
    )
  }
}

export default App
*/import React, { Component } from 'react';
import 'bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";


import Creecompte from './components/Creecompte';
import Authentification from './components/Authentification';
import Dashboard from './components/Dashboard';
import Profil from './components/Profil';
import AjouterProduit from './components/produit/AjouterProduit';
import ProduitList from './components/produit/Produits';
import ModifierProduit from './components/produit/ModifierProduit';

import AjouterClient from './components/client/AjouterClient';
import ClientList from './components/client/Clients';
import ModifierClient from './components/client/ModifierClient';


import AjouterFournisseur from './components/fournisseur/AjouterFournisseur';
import FournisseurList from './components/fournisseur/Fournisseurs';
import ModifierFournisseur from './components/fournisseur/ModifierFournisseur';

import AjouterCategorie from './components/categorie/AjouterCategorie';
import CategorieList from './components/categorie/Categories';

import ModifierCategorie from './components/categorie/ModifierCategorie';





import PrivateRoute from "./components/private-route/PrivateRoute";
import Gfacturation from './componentsnoncon/Gfacturation';
import Gstock from './componentsnoncon/Gstock';
import Gtresorerie from './componentsnoncon/Gtresorerie';
import AjouterDevis from './components/vente/devis/AjouterDevis';
import AjouterFacture from './components/vente/facture/AjouterFacture';
import FactureList from './components/vente/facture/ListerFacture';
import DevisList from './components/vente/devis/ListerDevis';
import AjouterCmd from './components/achat/cmdfournisseur/AjouterCmd';
import CmdList from './components/achat/cmdfournisseur/ListeCmd';
import AjouetrFactureFournisseur from './components/achat/facturefournisseur/AjouterFacture';
import FactureListFournisseur from './components/achat/facturefournisseur/ListerFacture';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}



class App extends Component{

    
  render(){
    return (
      <Provider store={store}>
      <Router>
          <Route  path="/" exact component={Authentification}/>
          <Route  path="/gfacturation" exact component={Gfacturation}/>
          <Route  path="/gstock" exact component={Gstock}/>
          <Route  path="/gtresorerie" exact component={Gtresorerie}/>

          <Route exact path="/creecompte" component={Creecompte}/> 
          <PrivateRoute path="/dashboard" component={Dashboard}/> 

          <Route path="/profil" component={Profil}/> 

          <Route path="/ajouterproduit" component={AjouterProduit}/> 
          <Route path="/produit" component={ProduitList}/> 
          <Route path="/modifierproduit/:id" component={ModifierProduit}/>

          <Route path="/ajoutercategorie" component={AjouterCategorie}/> 
          <Route path="/categorie" component={CategorieList}/> 
          <Route path="/modifiercategorie/:id" component={ModifierCategorie}/>

          <Route path="/ajouterclient" component={AjouterClient}/> 
          <Route path="/client" component={ClientList}/> 
          <Route path="/modifierclient/:id" component={ModifierClient}/> 

          <Route path="/AjouterFournisseur" component={AjouterFournisseur}/> 
          <Route path="/fournisseur" component={FournisseurList}/> 
          <Route path="/modifierFournisseur/:id" component={ModifierFournisseur}/> 
          <PrivateRoute path="/ajouterdevis" component={AjouterDevis}/> 
          <PrivateRoute path="/devislist" component={DevisList}/> 
          <PrivateRoute path="/ajouterfacture" component={AjouterFacture}/> 
          <PrivateRoute path="/facturelist" component={FactureList}/> 
          <PrivateRoute path="/ajoutercmd" component={AjouterCmd}/> 
          <PrivateRoute path="/listcmd" component={CmdList}/> 
          <PrivateRoute path="/ajouterfacturefournisseur" component={AjouetrFactureFournisseur}/> 
          <PrivateRoute path="/facturelistfournisseur" component={FactureListFournisseur}/> 
      </Router>
      </Provider>
    );
  }
}
export default App;
