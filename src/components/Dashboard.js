import React, { Component } from 'react';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.onChangeNbclient = this.onChangeNbclient.bind(this);
        this.onChangeNbfournisseur = this.onChangeNbfournisseur.bind(this);
        this.onChangeNbproduit = this.onChangeNbproduit.bind(this);
        this.onChangeNbdocument = this.onChangeNbdocument.bind(this);
        
            this.state ={
                nbclient:0,
                nbfournisseur:0,
                nbproduit:0,
                nbdocument:0,
        
            };
          }
    
    onChangeNbclient(e) {
        this.setState({
          nbclient: e.target.value
        })
      }
      onChangeNbfournisseur(e) {
        this.setState({
          nbfournisseur: e.target.value
        })
      }
      onChangeNbproduit(e) {
        this.setState({
          nbproduit: e.target.value
        })
      }
      onChangeNbdocument(e) {
        this.setState({
            nbdocument: e.target.value
        })
      }
      /*componentDidUpdate() {
        return axios
          .get('http://localhost:3001/Client/countclient')
          .then(res => {
              this.setState({
                  nbclient:res.data,
              })
          })
          .catch(err => {
            console.log(err);        
          });
      }*/
      componentDidMount() {
        axios
        .get('http://localhost:3001/Client/countclient')
        .then(res => {
            this.setState({
                nbclient:res.data,
            })
        })
        .catch(err => {
          console.log(err);        
        });
          axios
          .get('http://localhost:3001/Fournisseur/countfournisseur')
          .then(res => {
              this.setState({
                  nbfournisseur:res.data,
              })
          })
          .catch(err => {
            console.log(err);        
          });
          axios
          .get('http://localhost:3001/Produit/countproduit')
          .then(res => {
              this.setState({
                  nbproduit:res.data,
              })
          })
          .catch(err => {
            console.log(err);        
          });
      }
    render(){
        return(
            <div>
                <Header/>
                <Sidebar/>
                <div className="content-wrapper">
                <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-1">
                            <h2 className="m-0 text-dark">Tableau de bord</h2>
                        </div>
                        <div className="col-sm-11">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Tableau de bord </li>
                            </ol>
                        </div>
                    </div>
                </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">         
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbfournisseur" 
                                        onChange={this.onChangeNbfournisseur}
                                        >
                                            {this.state.nbfournisseur}
                                        </h3>
                                        <p>Fournisseurs</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/fournisseur" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>         
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbclient" 
                                        onChange={this.onChangeNbclient}
                                        >
                                            {this.state.nbclient}
                                        </h3>
                                        <p>Clients</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/client" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>         
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbproduit" 
                                        onChange={this.onChangeNbproduit}
                                        >
                                            {this.state.nbproduit}
                                        </h3>
                                        <p>Produits</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/produit" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>        
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                    <h3 
                                        name="nbdocument" 
                                        onChange={this.onChangeNbdocument}
                                        >
                                            {this.state.nbdocument}
                                        </h3>
                                        <p>Documents</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div> 
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
        )
    }
}
export default Dashboard;