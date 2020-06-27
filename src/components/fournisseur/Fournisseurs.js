import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
const Fournisseur = props => (
  <tr>
    <td>{props.fournisseur.nom}</td>
    <td>{props.fournisseur.prenom}</td>
    <td>{props.fournisseur.tel}</td>
    <td>{props.fournisseur.email}</td>
    <td>{props.fournisseur.nomentreprise}</td>
    <td> <button>
      <Link to={"/modifierFournisseur/"+props.fournisseur._id}>          
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
    </Link> </button>
    <button>
      <a href="/fournisseur" onClick={(e) => { props.deleteThisGoal(e,props.fournisseur._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a></button>
    </td>
  </tr>
)

export default class FournisseurList extends Component {
  constructor(props) {
    super(props);

    this.deleteFournisseur = this.deleteFournisseur.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {
      fournisseurs: [],
      alert:null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Fournisseur/')
      .then(response => {
        this.setState({ fournisseurs: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteFournisseur(id) {
    
    axios.delete('http://localhost:3001/Fournisseur/'+id)
      .then(response => { 
        console.log(response.data)});

    this.setState({
        fournisseurs: this.state.fournisseurs.filter(el => el._id !== id),
        alert:null
    })
  }

  deleteThisGoal(e,id) {
    e.preventDefault();
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Supprimer"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Supprimer cette fournisseur?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteFournisseur(id)}
        >
        </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }
  onCancelDelete(){
    this.setState({
        alert: null
    });
}
  fournisseurList() {
    return this.state.fournisseurs.map(currentfournisseur => {
      return <Fournisseur fournisseur={currentfournisseur} deleteThisGoal={this.deleteThisGoal} key={currentfournisseur._id}/>;
    })
  }

  render() {
          return(
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
                    <li className="breadcrumb-item"><a href="/fournisseur">Fournisseur</a></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
                            
                  <Link to="/ajouterfournisseur">
                      <button className="btn btn-danger" type="submit" 
                      style={{"float":"right","position": "relative"}}>
                          Ajouter Fournisseur</button>
                  </Link>
                  <br/>
                  <h1 >
                      <center>
                        <div >Fournisseur</div>
                        
          
                      </center>
                    </h1><br/><form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                  <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Nom Entreprise</th>
                    <th>Actions</th>{this.state.alert}
                  </tr>
                </thead>
                
                  
                <tbody >
                  { this.fournisseurList() }
                </tbody>
              
              </table>
              </form>
            </div>
                 
                        </section>
                      </div>
                      <Footer/></div>
          
          

          )
    
  }
}