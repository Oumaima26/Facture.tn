import React, { Component } from 'react'
import styles from '../../css/Invoice.module.scss'
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import CoordonneesProduit from './CoordonneesProduits'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
export const add = devis => {
  
    return axios
      .post(' http://localhost:3001/Devis/ajouter', {
        DateDoc: devis.DateDoc,
        DateFinDoc: devis.DateFinDoc,
        Note: devis.Note,
        TotalHT: devis.TotalHT,
        TotalTVA: devis.totalTVA,
        TotalTTC: devis.totalTTC,
        client: devis.client,
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err)
      });
  }
class AjouterCmd extends Component {
    
  locale = 'en-US'
  currency = 'USD'
    constructor(props){
        super(props);
  
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onChangeDateDoc = this.onChangeDateDoc.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDateFinDoc = this.onChangeDateFinDoc.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
   


        this.state = {
            fournisseurs:[],
          nom:'',
          id:0,
          prixht:0,
          totalTVA:0,
          totalTTC:0,
          DateFinDoc:moment(new Date(),'YYYY-MM-DD').format(),//moment.utc('YYYY-MM-DD').inspect(),//moment.utc().inspect() // 'moment.utc("2016-11-10T06:24:10.638+00:00")'
          DateDoc: moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),

          note:'',
          lineItems: [
            {
              id: 'initial',      // react-beautiful-dnd unique key
              libelle: '',
              TVA:0,
              quantite: 0,
              prixht: 0.00,
            },
          ]
          };
       
        }
        onSubmitMessage(ttc,th,tva){
            this.setState({
                totalTTC:ttc,
                prixht:th,
                totalTVA:tva

            })
        }
          onChangeNom(e) {
            this.setState({
              nom: e.target.value
            })
          } 
          onChangeDateFinDoc(e) {
            this.setState({
                DateFinDoc: e.target.value
            })
          }
          onChangeDateDoc(e) {
            this.setState({
                DateDoc: e.target.value
            })
          }
          onChangeNote(e) {
            this.setState({
                note: e.target.value
            })
          }
          componentDidMount() {
            axios.get('http://localhost:3001/Fournisseur/')
              .then(response => {
                if (response.data.length > 0) {
                  this.setState({
                    fournisseurs: response.data.map(fournisseur => fournisseur._id)
                  })
                }
              })
              .catch((error) => {
                console.log(error);
              })
              this.renderSelectedFournisseur(this.state.nom)
          }
          componentDidUpdate(prevProps, prevState) {
            if (prevState.nom !== this.state.nom) {
              console.log('pokemons state has changed to :',this.state.nom)
              
            }
          }
          
          onSubmit = (e) => {
            e.preventDefault();
           
            const commande = {
                DateDoc:this.state.DateDoc,
                DateFinDoc: this.state.DateFinDoc,
                Note: this.state.note,
                TotalHT: this.state.prixht,
                TotalTVA: this.state.totalTVA,
                TotalTTC: this.state.totalTTC,
                fournisseur: this.state.nom,
              
              }
              console.log(commande);
              
           axios.post('http://localhost:3001/Commande/ajouter', commande)
              .then(res => console.log(res.data));
              
          }

  render = () => {
    return (
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
                                <li className="breadcrumb-item"><a href="/devislist">Commande</a></li>
                                <li className="breadcrumb-item"><a href="/ajouterdevis">Ajouter commande</a></li>
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
                                        {this.renderFournisseurSelector()}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        {this.renderSelectedFournisseur(this.state.nom)}
                        </form>
                </div>
            </section>
        </div>
        <Footer/>
    </div>






      
    )
  }


  renderFournisseurSelector(){
    return( 
        <div className="produit"> 
            <Link to="/ajouterfournisseur"> 
                <button className="btn btn-primary" type="submit" 
                    style={{"float":"right","position": "relative","fontSize":"10px"}}>
                    <i className="fa fa-user-plus" ></i>
                </button>
            </Link>
            <label htmlFor="nom">
                <h1><i className="nav-icon fa fa-user"></i> Fournisseur</h1>
            </label>
            <select name="nom"
                className="form-control"
                value={this.state.nom}
                onChange={this.onChangeNom}> 
                <option></option>                                   
                {
                    this.state.fournisseurs.map((nom,index)=> {
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


renderSelectedFournisseur=(nom)=>{
    console.log(nom)
    let token = localStorage.getItem('jwt');
    const headers= { 'Authorization': token };
     axios.get('http://localhost:3001/Fournisseur/'+nom,headers)
    .then(response => {
        this.setState({
        id:response.data._id,
        nom: response.data.nom,
        prenom: response.data.prenom,
        email: response.data.email,
        tel: response.data.tel,
        nomentreprise:response.data.nomentreprise
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
        <div><div className={styles.invoice}>
        <div className={styles.addresses}>
              <table className="table col-md-6 mx-auto" style={{"float":"left","position": "relative","width":"50%"}}>
                                <tbody>
                                    <tr>
                                        <td>Entreprise:</td>
                                        <td>{this.state.nomentreprise}</td>
                                    </tr>
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
          
            <div className={`${styles.valueTable} ${styles.to}`}>
           
            <div className={styles.label} >
                    <label className="required">Date du document :</label>
            </div>
                    
            <div className={styles.value}>
                    <input type="date"  name="DateDoc" value={this.state.DateDoc} onChange={this.onChangeDateDoc}/>
            </div> 
                <div className={styles.label} >
                <label className="required">Date de livraison :</label></div>
                    
                    
                <div className={styles.value}>
                    <input type="date"  name="DateFinDoc" value={this.state.DateFinDoc} onChange={this.onChangeDateFinDoc}/>
                </div>
                    
                <div className={styles.label} >
                    <label className="required">Note :</label></div>
                    
                    
                <div className={styles.value}><textarea name="note"  onChange={this.onChangeNote}></textarea></div>
                
            </div>
          </div>
          
        <CoordonneesProduit onSubmitMessage={this.onSubmitMessage}/>
        
        </div>

        </div>
            
            
    )
}
  
}
export default AjouterCmd

