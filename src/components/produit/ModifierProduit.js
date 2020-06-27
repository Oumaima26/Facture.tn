import React, { Component } from 'react';
import axios from 'axios';
import '../css/Style.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export default class ModifierProduit extends Component {
  constructor(props) {
    super(props);

    this.onChangeReference = this.onChangeReference.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLibelle = this.onChangeLibelle.bind(this);
    this.onChangeQuantite = this.onChangeQuantite.bind(this);
    this.onChangePrix = this.onChangePrix.bind(this);
    this.onChangeTVA = this.onChangeTVA.bind(this);
    this.onChangeNomcategorie = this.onChangeNomcategorie.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      reference:0,
      description:'',
      libelle:'',
      quantite:0,
      tva:0, 
      tvas:[0,7,13],
      prix:0.00,
      nomcategorie:'',
      categories:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Produit/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          reference: response.data.reference,
          description: response.data.description,
          libelle: response.data.libelle,
          quantite: response.data.quantite,
          tva: response.data.TVA,
          prix: response.data.prix,
          nomcategorie:response.data.nomcategorie
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
      
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

  onChangeReference(e) {
    this.setState({
        reference: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeLibelle(e) {
    this.setState({
        libelle: e.target.value
    })
  }
  onChangeQuantite(e) {
    this.setState({
        quantite: e.target.value
    })
  }
  onChangeTVA(e) {
    this.setState({
        tva: e.target.value
    })
  }
  onChangePrix(e) {
    this.setState({
        prix: e.target.value
    })
  }
  onChangeNomcategorie(e) {
    this.setState({
        nomcategorie: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const produit = {
      reference: this.state.reference,
      description: this.state.description,
      libelle: this.state.libelle,
      quantite: this.state.quantite,
      TVA: this.state.tva,
      prix: this.state.prix,
      nomcategorie: this.state.nomcategorie
    }

    console.log(produit);

    axios.post('http://localhost:3001/Produit/update/'+ this.props.match.params.id, produit)
      .then(res => console.log(res.data));

    window.location = '/produit';
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
                    <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                    <li className="breadcrumb-item active">Modifier produit</li>
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
                        <div >Modifier Produit</div>            
                      </center>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                      <div className="produit"> 
                                  <label htmlFor="nomcategorie">Catégorie: </label>
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
                              className="form-control"
                              required
                              type="text"  
                              name="reference"  
                              value={this.state.reference}                
                              onChange={this.onChangeReference} 
                              />
                              </div>
                              <div className="quantite">
                                <label htmlFor="quantite">Quantité :</label>
                                <input  
                                className="form-control"
                                  required
                                  type="text"  
                                  name="quantite"
                                  value={this.state.quantite}
                                  onChange={this.onChangeQuantite} 
                                />
                              </div>
                              <div className="produit">
                                <label htmlFor="libelle">Libelle :</label>
                                <input 
                                  className="form-control"
                                  required
                                  type="text"
                                  placeholder="Libelle"   
                                  name="libelle" 
                                  value={ this.state.libelle}
                                  onChange={this.onChangeLibelle}
                                />
                              </div>                                           
                              <div className="produit">

                                <label htmlFor="description">Description :</label>
                                <input 
                                className="form-control"
                                required
                                type="text" 
                                placeholder="Description" 
                                name="description"     
                                value={ this.state.description}             
                                onChange={this.onChangeDescription} 
                                />
                                
                                </div>                              
                              <div className="ref">

                                <label htmlFor="prix">Prix :</label>
                                <input 
                                className="form-control"
                                required
                                type="text" 
                                name="prix"   
                                value={ this.state.prix}
                                onChange={this.onChangePrix} 
                                />
                              </div>
                              <div className="quantite">

                                <label htmlFor="tva">TVA :</label>
                                <select 
                                  className="form-control"
                                  onChange={this.onChangeTVA}
                                  value={this.state.tva}  
                                  name="tva"                                  
                                >
                                  <option></option>
                                  {
                                    this.state.tvas.map((tva ,index)=>{
                                      return <option key={index} value={tva}>{tva}</option>
                                    })
                                  }
                                </select>
                                </div>
                      <div className="ajouter">
                        <input type="submit" value="Modifier produit" className="btn btn-primary" />
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