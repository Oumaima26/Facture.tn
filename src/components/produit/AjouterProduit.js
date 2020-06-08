import React, { Component } from 'react';
import axios from 'axios';
import '../css/Style.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export const add = prod => {
  
  return axios
    .post(' http://localhost:3001/Produit/ajouter', {
      reference:prod.reference,
      description:prod.description,
      libelle:prod.libelle,
      quantite:prod.quantite,
      TVA:prod.TVA,
      prix:prod.prix,
      nomcategorie:prod.nomcategorie

    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class AjouterProduit extends Component {
    constructor(props){
      super(props);

      this.onChangeReference = this.onChangeReference.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeLibelle = this.onChangeLibelle.bind(this);
      this.onChangeQuantite = this.onChangeQuantite.bind(this);
      this.onChangeTva = this.onChangeTva.bind(this);
      this.onChangePrix = this.onChangePrix.bind(this);
      this.onChangeNomcategorie = this.onChangeNomcategorie.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        reference:0,
        description:'',
        libelle:'',
        quantite:0,
        TVA:0,       
        prix:0,
        nomcategorie:'',
        categories :[],
        tvas:[0,7,13],
           formErrors:{
            reference:0,
            description:'',
            libelle:'',
            quantite:0,
            prix:0,
          }
        };
     
      }
        onChangeReference  (e)  {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='reference')
            formErrors.reference =value.length < 3 ? "minimum 3 characaters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            reference: e.target.value
          })
        }
        onChangeLibelle(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='libelle')
            formErrors.libelle =value.length < 3  ? "minimum 3 characters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            libelle: e.target.value
          })
        }
        onChangeDescription(e) {
          
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='description')
            formErrors.description =value.length < 3  ? "minimum 3 characters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            description: e.target.value
          })
        }
        onChangeQuantite(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='quantite')
            formErrors.quantite =value > 1 ? "" :"minimum 1 product required"; 
          this.setState({ formErrors, [name]: value });
          this.setState({
            quantite: e.target.value
          })
        }
        
        
        onChangePrix(e) {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='prix')
            formErrors.prix =value < 1 ? "prix non validé" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            prix: e.target.value
          })
        }
        onChangeTva(e) {
          this.setState({
            TVA: e.target.value
          })
        }
        onChangeNomcategorie(e) {
          this.setState({
            nomcategorie: e.target.value
          })
        }
        componentDidMount() {
          axios.get('http://localhost:3001/Categorie/')
            .then(response => {
              if (response.data.length > 0) {
                this.setState({
                  categories: response.data.map(categorie => categorie.nomcategorie)
                })
              }
            })
            .catch((error) => {
              console.log(error);
            })
      
        }
        
       
        
        onSubmit = (e) => {
            e.preventDefault();
           
            const produit = {
                reference: this.state.reference,
                libelle: this.state.libelle,
                description: this.state.description,
                quantite: this.state.quantite,
                prix: this.state.prix,
                TVA: this.state.TVA,
                nomcategorie:this.nomcategorie,
              
              }
              console.log(produit);
              add(produit);/*
           axios.post('http://localhost:3001/Produit/ajouter', produit)
              .then(res => console.log(res.data));*/
              this.setState({
                reference:0,
                description:'',
                libelle:'',
                quantite:0,
                prix:0,
                TVA:0,
                nomcategorie:'',
              })
              
          }
        render(){
          const { formErrors  } = this.state;
          
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
                            <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                            <li className="breadcrumb-item active">Ajouter produit</li>
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
                              
                                <div >Ajouter Produit</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                                <div className="produit"> 
                                  <label htmlFor="nomcatgorie">Catégorie: </label>
                                  <select name="nomcategorie"
                                      className="form-control"
                                      value={this.state.nomcategorie}
                                      onChange={this.onChangeNomcategorie}>                                    
                                      {
                                        this.state.categories.map((nomcategorie,index)=> {
                                          return <option 
                                            key={index}
                                            value={nomcategorie}>{nomcategorie}
                                            </option>
                                        })
                                      }
                                  </select>
                                </div>
                            <div className="ref">
                              <label htmlFor="reference">Réference :</label>
                              <input  
                              className={formErrors.reference.length > 0 ? 'error' : null}
                              required
                              type="text"  
                              name="reference"  
                              value={this.state.reference}                
                              onChange={this.onChangeReference} 
                              />
                              {
                                formErrors.reference.length > 0 && (
                                  <span className="errorMessage">{formErrors.reference}</span>
                                )
                              }
                              </div>
                              <div className="quantite">
                                <label htmlFor="quantite">Quantité :</label>
                                <input  
                                className={formErrors.quantite.length > 0 ? 'error' : null}
                                  required
                                  type="text"  
                                  name="quantite"
                                  value={this.state.quantite}
                                  onChange={this.onChangeQuantite} 
                                />
                                {
                                  formErrors.quantite.length > 0 && (
                                    <span className="errorMessage">{formErrors.quantite}</span>
                                  )
                                }
                              </div>
                              <div className="produit">
                                <label htmlFor="libelle">Libelle :</label>
                                <input 
                                  className={formErrors.libelle.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="Libelle"   
                                  name="libelle" 
                                  value={ this.state.libelle}
                                  onChange={this.onChangeLibelle}
                                />
                                {
                                  formErrors.libelle.length > 0 && (
                                    <span className="errorMessage">{formErrors.libelle}</span>
                                  )
                                }
                              </div>                                           
                              <div className="produit">

                                <label htmlFor="description">Description :</label>
                                <input 
                                className={formErrors.description.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                placeholder="Description" 
                                name="description"     
                                value={ this.state.description}             
                                onChange={this.onChangeDescription} 
                                />
                                
                                {
                                  formErrors.description.length > 0 && (
                                    <span className="errorMessage">{formErrors.description}</span>
                                  )
                                }
                                </div>                              
                              <div className="ref">

                                <label htmlFor="prix">Prix :</label>
                                <input 
                                className={formErrors.prix.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                name="prix"   
                                value={ this.state.prix}
                                onChange={this.onChangePrix} 
                                />
                                {
                                  formErrors.prix.length > 0 && (
                                    <span className="errorMessage">{formErrors.prix}</span>
                                  )
                                }
                              </div>
                              <div className="quantite">

                                <label htmlFor="TVA">TVA :</label>
                                <select 
                                  className="form-control"
                                  onChange={this.onChangeTva}
                                  value={this.state.TVA}  
                                  name="TVA"                                  
                                >
                                  {
                                    this.state.tvas.map((TVA ,index)=>{
                                      return <option key={index} value={ TVA }>{TVA}</option>
                                    })
                                  }
                                </select>
                                </div>
                              
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter produit" className="btn btn-primary" />
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
export default AjouterProduit;