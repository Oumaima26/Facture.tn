import React, { Component } from 'react';
import axios from 'axios';
import '../css/Style.css';
import { render } from 'react-dom';
class CoordonneesClient extends Component{
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
        email:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Client/nom/'+this.props.match.params.nom)
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

    render(){
        return (
            
          <section className="content">
          <div className="container-fluid">                  
            <div className="content-header" >
              <div className="wrapper">
                <div className="form-wrapper">
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
                        name="email"     
                        value={ this.state.email}             
                        onChange={this.onChangeEmail} 
                        />
                     </div> 
                    <div className="produit">
                    <label htmlFor="tel">Téléphone :</label>
                              <input   
                              name="tel" 
                              value={ this.state.tel}
                              onChange={this.onChangeTel} 
                              />
                    </div>      
                </div>
              </div>
            </div>
          </div>
        </section>
        )
    }
}
export default CoordonneesClient;