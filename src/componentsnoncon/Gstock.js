import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
function Gstock(){

    return(
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Fonctionnalités</a></li>
                            <li className="breadcrumb-item ">Gestion de stock</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="form-wrapper">
                    <h2>Gestion de stock </h2>
                    <p style={{"marginTop": "40px"}}>Notre logiciel de gestion commerciale est équipé d'un 
                        module de gestion de stock intelligent et relié à la partie faturation.Lorsqu'une facture 
                        est payée la quantité des produits ralatif sera reduite.Le logicielvous affichera ensuite
                        un historique contenant l'utilisateur responsable du changement sur le produit.</p>
                    <center>
                        <NavLink to="/creecompte">
                            <button type="button" className="btn btn-dark">Commencer</button>   
                        </NavLink>                         
                    </center>
                </div>
            </div>
        </div>
    );
    
}
export default Gstock;