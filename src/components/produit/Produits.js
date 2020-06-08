import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
const Produit = props => (
  <tr>
    <td>{props.produit.reference}</td>
    <td>{props.produit.libelle}</td>
    <td>{props.produit.quantite}</td>
    <td>{props.produit.description}</td>
    <td>{props.produit.prix}</td>
    <td>{props.produit.TVA}</td>
    <td>{props.produit.nomcategorie}</td>
    <td>
      <Link to={"/modifierproduit/"+props.produit._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      |
      <a href="/produit" onClick={() => { props.deleteProduit(props.produit._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>
  </tr>
)

export default class ProduitList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduit = this.deleteProduit.bind(this)

    this.state = {produits: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Produit/')
      .then(response => {
        this.setState({ produits: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduit(id) {
    axios.delete('http://localhost:3001/Produit/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      produits: this.state.produits.filter(el => el._id !== id)
    })
  }

  produitList() {
    return this.state.produits.map(currentproduit => {
      return <Produit produit={currentproduit} deleteProduit={this.deleteProduit} key={currentproduit._id}/>;
    })
  }

    render() {
      return (
        <div>
          <Header/>
          <Sidebar/>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-1">
                    <h1 className="m-0 text-dark">Dashboard</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/ajouterproduit">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter produit</button>
                </Link> <br/><br/>                 
                <Link to="/ajoutercategorie">
                  <button className="btn btn-primary" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter catégorie</button>
                </Link>
                <br/>
                <h1 >
                  <center>
                    <div >Produit</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Réference</th>
                        <th>Libelle</th>
                        <th>Quantité</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>TVA</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                      </tr>
                    </thead>         
                    <tbody >
                      { this.produitList() }
                    </tbody>
                  </table>
                </form>
              </div>
            </section>
          </div>
          <Footer/>
        </div>
      )
    }
  }