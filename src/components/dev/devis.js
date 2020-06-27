import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Form from './prod';

class AjouterDevis extends Component {
    constructor(props){
      super(props);

      this.onChangeNom = this.onChangeNom.bind(this);

      this.state = {
        clients:[],
        nom:'',
        };
     
      }
        onChangeNom(e) {
          this.setState({
            nom: e.target.value
          })
        }
        componentDidMount() {
          axios.get('http://localhost:3001/Client/')
            .then(response => {
              if (response.data.length > 0) {
                this.setState({
                  clients: response.data.map(client => client.nom)
                })
              }
            })
            .catch((error) => {
              console.log(error);
            })
      
        }
    
        render(){
          
            return(
                <div >
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
                                        <li className="breadcrumb-item"><a href="/produit">Ajouter devis</a></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <section className="content" >
                        <div className="container-fluid">
                            <div className="row">         
                                <div className="col-lg-3 col-6" >
                                    <div className="small-box rg-info">
                                        <div className="inner">
                                            <div>
                                                {this.renderClientSelector()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                                {this.renderSelectedClient(this.state.nom)}
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>
        
  )
  } 
    renderClientSelector(){
        return( 
            <div className="produit"> 
                <label htmlFor="nom">
                    <h1><i className="nav-icon fa fa-user"></i> Client</h1>
                </label>
                <select name="nom"
                    className="form-control"
                    value={this.state.nom}
                    onChange={this.onChangeNom}> 
                    <option></option>                                   
                    {
                        this.state.clients.map((nom,index)=> {
                        return <option 
                            key={index}
                            value={nom}>{nom}
                            </option>
                        })
                    }
                </select>
            </div>
        )
    }
    renderSelectedClient(nom){
        axios.get('http://localhost:3001/Client/nom/'+nom)
        .then(response => {
            this.setState({
            nom: response.data.nom,
            prenom: response.data.prenom,
            email: response.data.email,
            tel: response.data.tel
        })  
        })
        .catch(function (error) {
            console.log(error);
        })
        if(!nom){
            return(
                <div></div>
            )
        }
        return(
            <div>
                <div className="row" style={{ "marginTop": "20" }}>
                    <div className="col-lg-3 col-6"></div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header" >
                                <table className="table col-md-6 mx-auto" style={{"float":"left","position": "relative","width":"50%"}}>
                                    <tbody>
                                        <tr>
                                            <td>Nom:</td>
                                            <td>{this.state.nom}</td>
                                        </tr>
                                        <tr>
                                            <td>Prenom:</td>
                                            <td>{this.state.prenom}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{this.state.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Tel:</td>
                                            <td>{this.state.tel}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="col-sm-4" style={{"float":"right","position": "relative","width":"100%"}}>
                                    <div className="form-group ">
                                        <label className="required">Date du document :</label>
                                        <input type="date"  name="date" id="date" className="form-control" placeholder="Enter Date" />
                                    </div>
                                </div>
                                <div className="col-sm-4" style={{"float":"right","position": "relative","width":"100%"}}>
                                    <div className="form-group ">
                                        <label className="required">Date fin validation :</label>
                                        <input type="date"  name="date" id="date" className="form-control" placeholder="Enter Date" />
                                    </div>
                                </div>
                                <div className="col-sm-4" style={{"float":"right","position": "relative","width":"100%"}}>
                                    <div className="form-group " >
                                        <label className="required">Note :</label>
                                        <textarea name="description"  id="description" className="form-control"></textarea>
                                    </div>
                                </div>                                
                            </div>   
                                <Form/>
                        </div>
                    </div>
                </div> 
            </div>
                
                
        )
    }
      
}
export default AjouterDevis;