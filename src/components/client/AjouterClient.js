import React, { Component } from 'react';
import axios from 'axios';
import '../css/Produit.css';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import SweetAlert from 'react-bootstrap-sweetalert';
export const add = cl => {
  
  return axios
    .post(' http://localhost:3001/Client/ajouter', {
      nom:cl.nom,
      prenom:cl.prenom,
      email:cl.email,
      tel:cl.tel
    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class AjouterClient extends Component {
    constructor(props){
      super(props);

      this.onChangeNom = this.onChangeNom.bind(this);
      this.onChangePrenom = this.onChangePrenom.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeTel = this.onChangeTel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.successAlert = this.successAlert.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.showAlert = this.showAlert.bind(this);
      this.onConfirm = this.onConfirm.bind(this);

      this.state = {
        nom:'',
        prenom:'',
        tel:0,
        email:'',   
        alert:null, 
           formErrors:{
            nom:'',
            prenom:'',
            tel:0,
            email:''
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
        
       
      successAlert() {
        const getAlert = () => (
          <SweetAlert 
          success 
          title="Good job!" 
          onConfirm={()=>this.onConfirm} 
          onCancel={()=>this.onCancel}>
            You clicked the button!
        </SweetAlert>
        );
    
        this.setState({
          alert: getAlert()
        });
      }
      
     onConfirm(){
       window.location = '/client';       
     }
      onCancel(){
        this.setState({
            alert: null
        });
    }
    showAlert(err) {
      this.setState({
          alert: (
              <SweetAlert 
                  danger
                  showCancel
                  cancelBtnText = "No"
                  cancelBtnBsStyle = "default"
                  customIcon = "thumbs-up.jpg"
                  title ="Erreur"
                  onCancel = {this.onCancel}
              >
                  {err}
              </SweetAlert>
          )            
      });
  }
      

        onSubmit = (e) => {
            e.preventDefault();
           
            const client = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                tel: this.state.tel,
              
              }
              console.log(client);
              add(client).then((res) => {
                this.successAlert()
                window.location = '/client';
              })/*
           axios.post('http://localhost:3001/Client/ajouter', client)
              .then(res => console.log(res.data));*/
              this.setState({
                nom:'',
                prenom:'',
                email:'',
                tel:0,
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
                            <li className="breadcrumb-item"><a href="/client">Client</a></li>
                            <li className="breadcrumb-item active">Ajouter client</li>
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
                              
                                <div >Ajouter Client</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                            <div className="produit">

                              <label htmlFor="nom">Nom :</label>
                              <input  
                              className={formErrors.nom.length > 0 ? 'error' : null}
                              required
                              type="text"  
                              placeholder="Nom" 
                              name="nom"  
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
                                <label htmlFor="prenom">Prenom :</label>
                                <input 
                                  className={formErrors.prenom.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="Prenom"   
                                  name="prenom" 
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
                              
                              

                              
                              
                              <div className="produit">

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

                                
                            
                              
                            
                              
                              
                            

                              
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter client" className="btn btn-primary" />
                                </div>
                              
                            </form>
                        </div>
                        
                        
                  </div>
                </div>
                    </div>
                  </section>
                </div></div>
            )
        } 
      
}
export default AjouterClient;