import React from 'react';
import '../../App.css';
import {NavLink,Link} from 'react-router-dom';
function Menu(){
      
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
            <Link className="navbar-brand" to="/">facture.tn</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto"> 
                <li className="nav-item dropdown ">
                        <NavLink className="nav-link dropdown-toggle" to="/fonctionnalite" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Fonctionnalités
                        </NavLink>
                        <div className="dropdown-menu" >
                            <NavLink className="dropdown-item" to="/gfacturation">Gestion de la facturation</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/gstock">Gestion de stock</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/gtresorerie">Gestion de la trésorerie</NavLink>
                        </div>
                    </li>  
                    
                    <li className="nav-item " >
                        <NavLink className="nav-link" to="/" >Connecter</NavLink>
                    </li>
                    <li className="nav-item " >
                        <form >
                            <NavLink to="/creecompte"><button className="btn btn-outline-success my-sm-0" type="submit">Cree un compte</button></NavLink>
                        </form>
                    </li>
                </ul>
            </div>
        </nav> 
    );
    
}
export default Menu;