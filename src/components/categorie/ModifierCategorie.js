import React, { Component } from 'react';
import axios from 'axios';
import '../css/Produit.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export default class ModifierProduit extends Component {
  constructor(props) {
    super(props);
    this.onChangeNomcategorie = this.onChangeNomcategorie.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        nomcategorie:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Categorie/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          nomcategorie:response.data.nomcategorie
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
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
 
  onSubmit(e) {
    e.preventDefault();

    const categorie = {
      nomcategorie: this.state.nomcategorie
    }

    console.log(categorie);

    axios.post('http://localhost:3001/Categorie/update/'+ this.props.match.params.id, categorie)
      .then(res => console.log(res.data));

    window.location = '/categorie';
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
                  <h1 className="m-0 text-dark">Tableau de bord</h1>
                </div>
                <div className="col-sm-11">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/produit">Catégorie</a></li>
                    <li className="breadcrumb-item active">Modifier Catégorie</li>
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
                        <div >Modifier Catégorie</div>            
                      </center>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                      <div className="produit">
                        <label htmlFor="nomcategorie">Nom Catégorie :</label>
                        <input 
                          className="form-control"
                          required
                          type="text" 
                          name="nomcategorie" 
                          value={ this.state.nomcategorie}
                          onChange={this.onChangeNomcategorie}
                        />
                      </div>
                      <div className="ajouter">
                        <input type="submit" value="Modifier catégorie" className="btn btn-primary" />
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