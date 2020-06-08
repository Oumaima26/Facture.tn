import React, { Component } from 'react';
import axios from 'axios';
import '../css/Formulaire.css';

export const register = vend => {
  
  return axios
    .post('http://localhost:3001/Vendeur/ajouter', {
      nom:vend.nom,
      prenom: vend.prenom,
      email: vend.email,
      password: vend.password,
      tel: vend.tel
    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class AjouterVendeur extends Component {
    constructor(props){
      super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            nom:'',
            prenom:'',
            email:'',
            password:'',
            tel:0,
            formErrors:{
              nom:'',
              prenom:'',
              email:"",
              password:'',
              tel:0
            }
          };
        }
        onChangeNom(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='nom')
            formErrors.nom =value.length < 3 ? "minimum 3 characaters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            nom: e.target.value
          })
        }
        onChangePrenom(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='prenom')
            formErrors.prenom =value.length < 3  ? "minimum 3 characters required" :"";
          this.setState({ formErrors, [name]: value });
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
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='tel')
            formErrors.tel =value.length === 8 ? "" :"minimum 8 characters required"; 
          this.setState({ formErrors, [name]: value });
          this.setState({
            tel: e.target.value
          })
        }
        onChangePassword(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='password')
            formErrors.password =value.length < 6  ? "minimum 6 characters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            password: e.target.value
          })
        }
        
        

        onSubmit(e) {
            e.preventDefault();
        
            const vendeur = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                password: this.state.password,
                tel: this.state.tel,
              }
              console.log(vendeur);
              register(vendeur).then(res => {                
                window.location = '/authentification'
                  alert("Bienvenue!")
              }
                )/*
           axios.post('http://localhost:3001/Vendeur/ajouter', vendeur)
              .then(res => console.log(res.data));*/
              this.setState({
                nom:'',
                prenom:'',
                email:'',
                password:'',
                tel:0
              
              })
              
          }
        render(){
          const { formErrors  } = this.state;
          
            return(
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">

                    <h5 >
                      <form>
                        <div className="ip"><i className="fa fa-user "> </i>Personnelle</div>
                        <div className="ie"><i className="fa fa-building fa-x"></i>Entreprise</div>
                      </form>
                    </h5>

                    <form onSubmit={this.onSubmit}>
                      <div className="nom">
                        <label htmlFor="nom">Nom :</label>
                        <input 
                          className={formErrors.nom.length > 0 ? 'error' : null}
                          required
                          type="text"
                          placeholder="Nom"   
                          name="nom" 
                          value={ this.state.nom}
                          onChange={this.onChangeNom}
                        />
                        {
                          formErrors.nom.length > 0 && (
                            <span className="errorMessage">{formErrors.nom}</span>
                          )
                        }
                      </div>
                      
                      <div className="prenom">

                        <label htmlFor="nom">Prenom :</label>
                        <input 
                        className={formErrors.prenom.length > 0 ? 'error' : null}
                        required
                        type="text"  
                        placeholder="Prenom" 
                        name="prenom"  
                        value={this.state.prenom}                
                        onChange={this.onChangePrenom} 
                        />
                        {
                          formErrors.nom.length > 0 && (
                            <span className="errorMessage">{formErrors.prenom}</span>
                          )
                        }
                        </div>
                      <div className="email">

                        <label htmlFor="email">Email :</label>
                        <input 
                        className="form-control" 
                        required
                        type="email" 
                        placeholder="Email" 
                        name="email"     
                        value={ this.state.email}             
                        onChange={this.onChangeEmail} 
                        />
                        </div>
                      
                      <div className="password">

                        <label htmlFor="password">Mot de passe :</label>
                        <input 
                        className={formErrors.password.length > 0 ? 'error' : null}
                        required
                        type="password" 
                        placeholder="Password"  
                        name="password"   
                        value={ this.state.password}
                        onChange={this.onChangePassword} 
                        />
                        {
                          formErrors.nom.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                          )
                        }
                      </div>

                      
                      <div className="tel">

                        <label htmlFor="tel">Téléphone :</label>
                        <input 
                        className={formErrors.tel.length > 0 ? 'error' : null}
                        required
                        type="text"  
                        name="tel" 
                        value={ this.state.tel}
                        onChange={this.onChangeTel} 
                        />
                        {
                          formErrors.tel.length > 0 && (
                            <span className="errorMessage">{formErrors.tel}</span>
                          )
                        }
                        </div>

                      <div className="createAccount">
                          <input type="submit" value="cree compte" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                
                
          </div>
        </div>
      
            )
        } 
      
}
export default AjouterVendeur;