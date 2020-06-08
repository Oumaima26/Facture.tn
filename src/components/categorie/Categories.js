import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
const Categorie = props => (
  <tr>
    <td>{props.categorie.nomcategorie}</td>
    <td>
      <Link to={"/modifiercategorie/"+props.categorie._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      |
      <a href="/categorie" onClick={() => { props.deleteCategorie(props.categorie._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>
  </tr>
)

export default class CategorieList extends Component {
  constructor(props) {
    super(props);

    this.deleteCategorie = this.deleteCategorie.bind(this)

    this.state = {categories: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Categorie/')
      .then(response => {
        this.setState({ categories: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCategorie(id) {
    axios.delete('http://localhost:3001/Categorie/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      categories: this.state.categories.filter(el => el._id !== id)
    })
  }

  categorieList() {
    return this.state.categories.map(currentcategorie => {
      return <Categorie categorie={currentcategorie} deleteCategorie={this.deleteCategorie} key={currentcategorie._id}/>;
    })
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
                      <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/ajoutercategorie">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter catégorie</button>
                </Link>
                <br/>
                <h1 >
                  <center>
                    <div >Catégorie</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"50%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Nom catégorie</th>
                        <th>Actions</th>
                      </tr>
                    </thead>         
                    <tbody >
                      { this.categorieList() }
                    </tbody>
                  </table>
                </form>
              </div>
            </section>
          </div>
          <Footer/>
        </div>
      )
    }
  }