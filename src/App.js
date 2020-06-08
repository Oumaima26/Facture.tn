import React, { Component } from 'react';
import 'bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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


import AuthState from './components/context/authContext/AuthState'
import setAuthToken from './components/utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';
import Gfacturation from './componentsnoncon/Gfacturation';
import Gstock from './componentsnoncon/Gstock';
import Gtresorerie from './componentsnoncon/Gtresorerie';
import AjouterDevis from './components/devis/AjouterDevis';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
class App extends Component{

    
  render(){
    return (
    <AuthState>
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
          <Route path="/ajouterdevis" component={AjouterDevis}/> 
      </Router></AuthState>
    );
  }
}
export default App;
