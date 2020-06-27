import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";


import './css/Formulaire.css';
import Menu from './layouts/Menu';
class Register extends Component {
  constructor() {
    super();
    
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeNomentreprise = this.onChangeNomentreprise.bind(this);
    this.onChangeActivite = this.onChangeActivite.bind(this);
    this.onChangePays = this.onChangePays.bind(this);
    this.onChangeRegion = this.onChangeRegion.bind(this);
    this.onChangeDevise = this.onChangeDevise.bind(this);
    this.onChangeCodepostal = this.onChangeCodepostal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nom:'',
      nom:'',
      prenom:'',
      email:'',
      password:'',
      tel:0,
      nomentreprise:'',
      activite:'',
      pays:'',
      region:'',
      devises:'',
      codepostal:0,
      formErrors:{
        nom:'',
        prenom:'',
        email:"",
        password:'',
        tel:0,
        nomentreprise:'',
        activite:'',
        pays:'',
        region:'',
        devise:'',
        codepostal:0
      },
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  
  onChangeNom(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nom')
      formErrors.nom =value.length < 3  ? "minimum 3 characters required" :"";
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
  
  onChangeNomentreprise(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nomentreprise')
      formErrors.nomentreprise =value.length < 3 ? "minimum 3 characaters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      nomentreprise: e.target.value
    })
  }
  onChangeActivite(e) {
    this.setState({
      activite: e.target.value
    })
  }
  
  onChangePays(e) {
    this.setState({
      pays: e.target.value
    })
  }
  
  onChangeRegion(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='region')
      formErrors.region =value.length < 3 ? "minimum 3 characaters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      region: e.target.value
    })
  }
  
  onChangeDevise(e) {
    this.setState({
      devises: e.target.value
    })
  }
  
  onChangeCodepostal(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='codepostal')
      formErrors.codepostal =value.length ===4 ? "":"minimum 4 characters required";
    this.setState({ formErrors, [name]: value });
    this.setState({
      codepostal: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      tel: this.state.tel,
      nomentreprise:this.state.nomentreprise,
      activite : this.state.activite,
      pays : this.state.pays,
      region : this.state.region,
      devises : this.state.devises,      
      codepostal: this.state.codepostal,
    };
    console.log(newUser)
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors ,formErrors} = this.state;
    return (
      <div><Menu/>
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">

                    <h5 >
                      <form>
                        <div className="ip"><i className="fa fa-user "> </i>Personnelle</div>
                        <div className="ie"><i className="fa fa-building fa-x"></i>Entreprise</div>
                      </form>
                    </h5>
                    
                    <form noValidate onSubmit={this.onSubmit}>
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

                      <div className="entreprise">
                        <label htmlFor="nomentreprise">Nom d'entreprise:</label>
                        <input 
                          className={formErrors.nomentreprise.length > 0 ? "error" : null}
                          required
                          type="text" 
                          placeholder="Nom d'entreprise"  
                          name="nomentreprise"
                          value={this.state.nomentreprise}
                          onChange={this.onChangeNomentreprise} 
                        />
                        {
                          formErrors.nomentreprise.length > 0 && (
                            <span className="errorMessage">{formErrors.nomentreprise}</span>
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
                        <div className="entreprise">
                        <label htmlFor="activite">Activité d'entreprise :</label>
                        <input 
                          className="form-control"
                          onChange={this.onChangeActivite}
                          value={this.state.activite}  
                          name="activite" />
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

                        
                      <div className="pays">
                      <label htmlFor="pays">Pays :</label>
                      <input 
                        className="form-control"                   
                        onChange={this.onChangePays} 
                        name="pays" 
                        value={this.state.pays}/>
                      </div>
                      
                      <div className="pays">
                        <label htmlFor="devise">Devise :</label>
                        <input 
                          className=" form-control"
                          onChange={this.onChangeDevise}  
                          value={this.state.devise}  
                          name="devises" />
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

                      
                      <div className="entreprise">
                        <label htmlFor="region">Région :</label>
                        <input 
                            className={formErrors.region.length > 0 ? "error" :null} 
                            type="text" 
                            noValidate 
                            placeholder="Région"                           
                            value={this.state.region}
                            name="region" 
                            onChange={this.onChangeRegion} 
                        />
                        {
                            formErrors.region.length > 0 && (
                            <span className="errorMessage">{formErrors.region}</span>
                            )
                        }
                      </div>
                      
                      <div className="tel">

                        <label htmlFor="tel">Téléphone :</label>
                        <input 
                        className={formErrors.tel.length > 0 ? 'error' : null }
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

                        
                      <div className="entreprise">
                        <label htmlFor="codepostal">Code postal :</label>
                        <input 
                            className={formErrors.codepostal.length > 0 ? "error" :null} 
                            required
                            type="text"                          
                            value={ this.state.codepostal}
                            name="codepostal" 
                            onChange={this.onChangeCodepostal} 
                        />
                        {
                            formErrors.codepostal.length > 0 && (
                            <span className="errorMessage">{formErrors.codepostal}</span>
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
      
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));


/*

import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import './css/Formulaire.css';
import Menu from './layouts/Menu';
class Register extends Component {
  constructor() {
    super();
    
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeNomentreprise = this.onChangeNomentreprise.bind(this);
    this.onChangeActivite = this.onChangeActivite.bind(this);
    this.onChangePays = this.onChangePays.bind(this);
    this.onChangeRegion = this.onChangeRegion.bind(this);
    this.onChangeDevise = this.onChangeDevise.bind(this);
    this.onChangeCodepostal = this.onChangeCodepostal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nom:'',
      prenom:'',
      email:'',
      password:'',
      tel:0,
      nomentreprise:'',
      activite:'',
      activites :[],
      pays:'',
      lespays :[],
      region:'',
      devise:'', 
      devises :[],     
      codepostal:0,
      formErrors:{
        nom:'',
        prenom:'',
        email:"",
        password:'',
        tel:0,
        nomentreprise:'',
        activite:'',
        pays:'',
        region:'',
        devise:'',
        codepostal:0
      },
      errors:{}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
      
    
    
    fetch("https://api.exchangeratesapi.io/latest")
        .then(response => {
          return response.json();
        })
        .then(data => {
          let currenciesFromApi = Object.keys(data.rates);
          console.log(currenciesFromApi);
          this.setState({
            lespays: currenciesFromApi,
            
            activites: currenciesFromApi,
            devises: currenciesFromApi
          });
        })
        .catch(error => {
          console.log(error);
        });
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  
  onChangeNom(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nom')
      formErrors.nom =value.length < 3  ? "minimum 3 characters required" :"";
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
  
  onChangeNomentreprise(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nomentreprise')
      formErrors.nomentreprise =value.length < 3 ? "minimum 3 characaters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      nomentreprise: e.target.value
    })
  }
  onChangeActivite(e) {
    this.setState({
      activite: e.target.value
    })
  }
  
  onChangePays(e) {
    this.setState({
      pays: e.target.value
    })
  }
  
  onChangeRegion(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='region')
      formErrors.region =value.length < 3 ? "minimum 3 characaters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      region: e.target.value
    })
  }
  
  onChangeDevise(e) {
    this.setState({
      devise: e.target.value
    })
  }
  
  onChangeCodepostal(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='codepostal')
      formErrors.codepostal =value.length ===4 ? "":"minimum 4 characters required";
    this.setState({ formErrors, [name]: value });
    this.setState({
      codepostal: e.target.value
    })
  }


  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      tel: this.state.tel,
      nomentreprise:this.state.nomentreprise,
      activite : this.state.activite,
      pays : this.state.pays,
      region : this.state.region,
      devises : this.state.devises,      
      codepostal: this.state.codepostal,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    
    const { formErrors  } = this.state;

    return (
      <div><Menu/>
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">

                    <h5 >
                      <form>
                        <div className="ip"><i className="fa fa-user "> </i>Personnelle</div>
                        <div className="ie"><i className="fa fa-building fa-x"></i>Entreprise</div>
                      </form>
                    </h5>
                    
                    <form noValidate onSubmit={this.onSubmit}>
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

                      <div className="entreprise">
                        <label htmlFor="nomentreprise">Nom d'entreprise:</label>
                        <input 
                          className={formErrors.nomentreprise.length > 0 ? "error" : null}
                          required
                          type="text" 
                          placeholder="Nom d'entreprise"  
                          name="nomentreprise"
                          value={this.state.nomentreprise}
                          onChange={this.onChangeNomentreprise} 
                        />
                        {
                          formErrors.nomentreprise.length > 0 && (
                            <span className="errorMessage">{formErrors.nomentreprise}</span>
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
                        <div className="entreprise">
                        <label htmlFor="activite">Activité d'entreprise :</label>
                        <select 
                          className="form-control"
                          onChange={this.onChangeActivite}
                          value={this.state.activite}  
                          name="activite" 
                          
                        >
                          {
                            this.state.activites.map((activite ,index)=>{
                              return <option key={index} value={ activite }>{activite}</option>
                            })
                          }
                        </select>
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

                        
                      <div className="pays">
                      <label htmlFor="pays">Pays :</label>
                      <select 
                        className="select form-control"                   
                        onChange={this.onChangePays} 
                        name="pays" 
                        value={this.state.pays}  
                        >
                          {
                            this.state.lespays.map((pays ,index)=>{
                              return <option key={index} value={ pays }>{pays}</option>
                            })
                          }
                        </select>
                      </div>
                      
                      <div className="pays">
                        <label htmlFor="devise">Devise :</label>
                        <select 
                          className="select form-control"
                          onChange={this.onChangeDevise}  
                          value={this.state.devise}  
                          name="devise" 
                        >
                          {
                            this.state.devises.map((devise ,index) =>{
                              return <option key={index} value={ devise }>{devise}</option>
                            })
                          }
                        </select>
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

                      
                      <div className="entreprise">
                        <label htmlFor="region">Région :</label>
                        <input 
                            className={formErrors.region.length > 0 ? "error" :null} 
                            type="text" 
                            noValidate 
                            placeholder="Région"                           
                            value={this.state.region}
                            name="region" 
                            onChange={this.onChangeRegion} 
                        />
                        {
                            formErrors.region.length > 0 && (
                            <span className="errorMessage">{formErrors.region}</span>
                            )
                        }
                      </div>
                      
                      <div className="tel">

                        <label htmlFor="tel">Téléphone :</label>
                        <input 
                        className={formErrors.tel.length > 0 ? 'error' : null }
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

                        
                      <div className="entreprise">
                        <label htmlFor="codepostal">Code postal :</label>
                        <input 
                            className={formErrors.codepostal.length > 0 ? "error" :null} 
                            required
                            type="text"                          
                            value={ this.state.codepostal}
                            name="codepostal" 
                            onChange={this.onChangeCodepostal} 
                        />
                        {
                            formErrors.codepostal.length > 0 && (
                            <span className="errorMessage">{formErrors.codepostal}</span>
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
      
      </div>
                
                
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));



*/