import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
function Gfacturation(){

    return(
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Fonctionnalités</a></li>
                            <li className="breadcrumb-item ">Gestion de la facturation</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="form-wrapper">
                    <h2>Gestion de la facturation </h2>
                    <p style={{"marginTop": "40px"}}>Notre module de facturation du logiciel de gestion commerciale doit permettre de gérer:</p>
                    <ul className=""> 
                        <li>les devis </li>
                        <li>les bons de commande </li>
                        <li>les factures </li>
                    </ul>
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
export default Gfacturation;