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
                    
                    <li className="nav-item " >
                        <NavLink className="nav-link" to="/" >Connecter</NavLink>
                    </li>
                    <li className="nav-item " >
                        <form >
                            <NavLink to="/signup"><button className="btn btn-outline-success my-sm-0" type="submit">Cree un compte</button></NavLink>
                        </form>
                    </li>
                </ul>
            </div>
        </nav> 
    );
    
}
export default Menu;