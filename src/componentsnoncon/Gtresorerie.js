import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
function Gtresorerie(){

    return(
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Fonctionnalités</a></li>
                            <li className="breadcrumb-item ">Gestion de la trésorerie</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="form-wrapper">
                    <h2>Gestion de la trésorerie </h2>
                    <p style={{"marginTop": "40px"}}>Notre logiciel permet de suivre les dépenses,
                        les recettes et le portefielle à fin d'avoir une idée claire sur l'etat financier
                        de votre projet qui sera afficher dans un tableaux de bord</p>
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
export default Gtresorerie;