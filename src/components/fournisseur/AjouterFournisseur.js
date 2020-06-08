import React, { Component } from 'react';
import axios from 'axios';
import '../css/Produit.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export const add = four => {
  
  return axios
    .post(' http://localhost:3001/Fournisseur/ajouter', {
      nom:four.nom,
      prenom:four.prenom,
      tel:four.tel,
      email:four.email,
      nomentreprise:four.nomentreprise

    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class AjouterFournisseur extends Component {
    constructor(props){
      super(props);

     
      this.onChangeNom = this.onChangeNom.bind(this);
      this.onChangePrenom = this.onChangePrenom.bind(this);
      this.onChangeTel = this.onChangeTel.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeNomentreprise = this.onChangeNomentreprise.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        nom:'',
        prenom:'',
        tel:0,
        email:'',       
        nomentreprise:'',
           formErrors:{
            nom:'',
            prenom:'',
            tel:0,
            email:'',       
            nomentreprise:''
          }
        };
    
      }
        onChangeNom  (e)  {
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
       
        onChangeTel(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='tel')
            formErrors.tel =value > 7 ? "" :"minimum 8 chiffres"; 
          this.setState({ formErrors, [name]: value });
          this.setState({
            tel: e.target.value
          })
        }
        onChangeEmail(e) {
            this.setState({
              email: e.target.value
            })
          }
          onChangeNomentreprise(e) {
          
            const {name,value } = e.target;    
            let formErrors ={ ...this.state.formErrors };
            if(name==='nomentreprise')
              formErrors.nomentreprise =value.length < 3  ? "minimum 3 characters required" :"";
            this.setState({ formErrors, [name]: value });
            this.setState({
              nomentreprise: e.target.value
            })
          }
        
        
        
        
        
       
      

        onSubmit = (e) => {
            e.preventDefault();
           
            const fournisseur = {
               
                nom: this.state.nom,
                prenom: this.state.prenom,
                tel: this.state.tel,
                email : this.state.email,
                nomentreprise : this.state.nomentreprise,
              
              }
              console.log(fournisseur);
              add(fournisseur).then(res => {
                  window.location = '/fournisseur';
                })/*
           axios.post('http://localhost:3001/Fournisseur/ajouter', produit)
              .then(res => console.log(res.data));*/
              this.setState({
                nom:'',
                prenom:'',
                tel:0,
                email:'',       
                nomentreprise:''
              })
              
          }
        render(){
          const { formErrors  } = this.state;
          
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
                            <li className="breadcrumb-item active">Ajouter Fournisseur</li>
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
                              
                                <div >Ajouter Fournisseur</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                            <div className="produit">

                              <label htmlFor="nom">Nom:</label>
                              <input  
                              className={formErrors.nom.length > 0 ? 'error' : null}
                              required
                              type="text"  
                              name="nom"  
                              placeholder="Nom" 
                              value={this.state.nom}                
                              onChange={this.onChangeNom} 
                              />
                              {
                                formErrors.nom.length > 0 && (
                                  <span className="errorMessage">{formErrors.nom}</span>
                                )
                              }
                              </div>
                              <div className="produit">
                                <label htmlFor="prenom">Prénom :</label>
                                <input 
                                  className={formErrors.prenom.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="prenom"   
                                  name="Prenom" 
                                  value={ this.state.prenom}
                                  onChange={this.onChangePrenom}
                                />
                                {
                                  formErrors.prenom.length > 0 && (
                                    <span className="errorMessage">{formErrors.prenom}</span>
                                  )
                                }
                              </div>

                              <div className="produit">
                                <label htmlFor="tel">Téléphone :</label>
                                <input  
                                className={formErrors.tel.length > 0 ? 'error' : null}
                                  required
                                  type="text"  
                                  name="tel"
                                  value={this.state.tel}
                                  onChange={this.onChangeTel} 
                                />
                                {
                                  formErrors.tel.length > 0 && (
                                    <span className="errorMessage">{formErrors.tel}</span>
                                  )
                                }
                              </div>
                              
                              

                              
                              
                              <div className="produit">

                                <label htmlFor="email">Email :</label>
                                <input 
                                className="form-control" 
                                required
                                type="text" 
                                placeholder="Email" 
                                name="email"     
                                value={ this.state.email}             
                                onChange={this.onChangeEmail} 
                                />
                                </div>

                                
                            
                              
                            
                              
                              <div className="produit">

                                <label htmlFor="nomentreprise">Nom Entreprise :</label>
                                <input 
                                className={formErrors.nomentreprise.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                name="nomentreprise"   
                                placeholder="Nom Entreprise " 
                                value={ this.state.nomentreprise}
                                onChange={this.onChangeNomentreprise} 
                                />
                                {
                                  formErrors.nomentreprise.length > 0 && (
                                    <span className="errorMessage">{formErrors.nomentreprise}</span>
                                  )
                                }
                              </div>

                              
                              
                              
                            

                              
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter fournisseur" className="btn btn-primary" />
                                </div>
                              
                            </form>
                        </div>
                        
                        
                  </div>
                </div>
                    </div>
                  </section>
                </div>
                <Footer/></div>
            )
        } 
      
}
export default AjouterFournisseur;