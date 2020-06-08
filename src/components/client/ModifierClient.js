import React, { Component } from 'react';
import axios from 'axios';
import '../css/Produit.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export default class ModifierClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        nom:'',
        prenom:'',
        tel:0,
        emil:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Client/'+this.props.match.params.id)
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
  }

  onChangeNom(e) {
    this.setState({
        nom: e.target.value
    })
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
        email: e.target.value
    })
  }
  onChangeTel(e) {
    this.setState({
        tel: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const client = {
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        tel: this.state.tel,
    }

    console.log(client);

    axios.post('http://localhost:3001/Client/update/'+ this.props.match.params.id, client)
      .then(res => console.log(res.data));

    window.location = '/client';
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
                    <li className="breadcrumb-item"><a href="/client">Client</a></li>
                    <li className="breadcrumb-item active">Modifier client</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">                  
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">
                    <h1 >
                      <center>            
                        <div >Modifier Client</div>            
                      </center>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                      <div className="produit">

                        <label htmlFor="nom">Nom :</label>
                        <input  
                        className="form-control"
                        required
                        type="text"  
                        placeholder="Nom" 
                        name="nom"  
                        value={this.state.nom}                
                        onChange={this.onChangeNom} 
                        />
                      </div>
                      <div className="produit">
                                <label htmlFor="prenom">Prenom :</label>
                                <input 
                                  className="form-control"
                                  required
                                  type="text"
                                  placeholder="Prenom"   
                                  name="prenom" 
                                  value={ this.state.prenom}
                                  onChange={this.onChangePrenom}
                                />
                      </div>
                      
                      <div className="produit">

                          <label htmlFor="email">Email :</label>
                          <input 
                          className="form-control" 
                          type="email" 
                          placeholder="Email" 
                          name="email"     
                          value={ this.state.email}             
                          onChange={this.onChangeEmail} 
                          />
                       </div> 
                      <div className="produit">
                      <label htmlFor="tel">Téléphone :</label>
                                <input 
                                className="form-control"
                                required
                                type="text"  
                                name="tel" 
                                value={ this.state.tel}
                                onChange={this.onChangeTel} 
                                />
                      </div>      
                      <div className="ajouter">
                        <input type="submit" value="Modifier client" className="btn btn-primary" />
                      </div>            
                    </form>
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