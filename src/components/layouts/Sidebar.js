import React,{Component} from 'react';

class Sidebar extends Component {
    
    render(){
                    return(
                        <aside className="main-sidebar sidebar-dark-primary elevation-4">
                            <a href="/" className="brand-link">
                                <center>
                                    <span className="brand-text font-weight-light" >FACTURE.TN</span>
                                </center>
                            </a>        
                            <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image"></div>
                                <div className="info">
                                </div>
                            </div>
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-item has-treeview menu-open">
                                        <a href="/dashboard" className="nav-link ">
                                        <i className="nav-icon fa fa-dashboard"></i>
                                        <p>
                                            Dashboard
                                        </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="nav-link">
                                            <i className="nav-icon fa fa-shopping-cart"></i>
                                            <p>
                                                Vente
                                                <i className="fa fa-angle-right right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="/ajouterdevis" className="nav-link">
                                                <i className="fa fa-circle nav-icon"></i>
                                                <p>Devis</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/" className="nav-link">
                                                <i className="fa fa-circle nav-icon"></i>
                                                <p>Facture</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/" className="nav-link">
                                                <i className="fa fa-circle nav-icon"></i>
                                                <p>Ligne Vente</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="/" className="nav-link">
                                        <i className="nav-icon fa fa-shopping-bag"></i>
                                        <p> Achat
                                            <i className="fa fa-angle-right right"></i>
                                        </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="/" className="nav-link">
                                                <i className="fa fa-circle nav-icon"></i>
                                                <p>Ligne d'achat</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/" className="nav-link">
                                                <i className="fa fa-circle nav-icon"></i>
                                                <p>Facture</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="/client" className="nav-link">
                                        <i className="nav-icon fa fa-users"></i>
                                        <p>
                                            Client
                                        </p>
                                        </a>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="/fournisseur" className="nav-link">
                                        <i className="nav-icon fa fa-user"></i>
                                        <p>
                                            Fournisseur
                                        </p>
                                        </a>
                                        
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="/produit" className="nav-link">
                                            <i className="nav-icon fa fa-qrcode"></i>
                                            <p>
                                            Produit
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="/" className="nav-link">
                                        <i className="nav-icon fa fa-credit-card"></i>
                                        <p>
                                        Trésorerie
                                            <i className="fa fa-angle-right right"></i>
                                        </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="/" className="nav-link">
                                            <i className="fa fa-circle nav-icon"></i>
                                            <p>Trésorerie</p>
                                            </a>
                                        </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </aside>  
                       
        );
    }  
}
export default Sidebar;