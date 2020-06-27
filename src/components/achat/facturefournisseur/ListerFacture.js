import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
const Devis = props => (
  
  <tr>
    <td>{props.index + 1}</td>
    <td>{props.devis.DateFinDoc}</td>
    <td>{props.devis.client}</td>
    <td>{props.devis.TotalTTC}</td>
    <td>{props.devis.TotalHT}</td>
    <td>
      <a href="/produit" onClick={() => { props.deleteDevis(props.devis._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>
  </tr>
)

export default class FactureListFournisseur extends Component {
  constructor(props) {
    super(props);

    this.deleteDevis = this.deleteDevis.bind(this)

    this.state = {devisl: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Devis/')
      .then(response => {
        this.setState({ devisl: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDevis(id) {
    axios.delete('http://localhost:3001/Devis/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      devisl: this.state.devisl.filter(el => el._id !== id)
    })
  }

  devisList() {
    return this.state.devisl.map(currentdevis=> {
      return <Devis devis={currentdevis} deleteProduit={this.deleteDevis} key={currentdevis._id}/>;
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
                      <li className="breadcrumb-item"><a href="/facturelist">Facture</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/ajouterfacture">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter facture</button>
                </Link> <br/>
                <br/>
                <h1 >
                  <center>
                    <div >Facture</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Montant TTC</th>
                        <th>Total HT</th>
                        <th>Action</th>
                      </tr>
                    </thead>         
                    <tbody >
                      { this.devisList() }
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