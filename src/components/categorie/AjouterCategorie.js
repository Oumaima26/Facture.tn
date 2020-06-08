import React, { Component } from 'react';
import axios from 'axios';
import '../css/Produit.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export const add = cat => {
  
  return axios
    .post(' http://localhost:3001/Categorie/ajouter', {
      nomcategorie:cat.nomcategorie

    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class AjouterCategorie extends Component {
    constructor(props){
      super(props);


      this.state = {
        nomcategorie:'',  
           formErrors:{
             nomcategorie:''
          }
        };
     
        this.onChangeNomcategorie = this.onChangeNomcategorie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
        onChangeNomcategorie  (e)  {
          const {name,value } = e.target;    
          let formErrors ={ ...this.state.formErrors };
          if(name==='nomcategorie')
            formErrors.nomcategorie =value.length < 3 ? "minimum 3 characaters required" :"";
          this.setState({ formErrors, [name]: value });
          this.setState({
            nomcategorie: e.target.value
          })
        }
       
      

        onSubmit = (e) => {
            e.preventDefault();
           
            const categorie = {
              nomcategorie: this.state.nomcategorie,
              
              }
              console.log(categorie);
              add(categorie).then(res => 
                  window.location = '/produit'
                )/*
           axios.post('http://localhost:3001/Produit/ajouter', produit)
              .then(res => console.log(res.data));*/
              this.setState({
                nomcategorie:''
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
                            <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                            <li className="breadcrumb-item active">Ajouter catégorie</li>
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
                              
                                <div >Ajouter catégorie</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                              <div className="produit">
                                <label htmlFor="nomcategorie">Nom catégorie :</label>
                                <input 
                                  className={formErrors.nomcategorie.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="Nom catégorie"   
                                  name="nomcategorie" 
                                  value={ this.state.nomcategorie}
                                  onChange={this.onChangeNomcategorie}
                                />
                                {
                                  formErrors.nomcategorie.length > 0 && (
                                    <span className="errorMessage">{formErrors.nomcategorie}</span>
                                  )
                                }
                              </div>

                              
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter catégorie" className="btn btn-primary" />
                                </div>
                              
                            </form>
                        </div>
                        
                        
                  </div>
                </div>
                    </div>
                  </section>
                </div><Footer/></div>
            )
        } 
      
}
export default AjouterCategorie;