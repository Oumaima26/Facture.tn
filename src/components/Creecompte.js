import React, { Component } from 'react';
import axios from 'axios';
import './css/Formulaire.css';
import Menu from './layouts/Menu';

export const register = com => {
  
  return axios
    .post('http://localhost:3001/Commercant/ajouter', {
      nom:com.nom,
      prenom: com.prenom,
      email: com.email,
      password: com.password,
      tel: com.tel,
      nomentreprise:com.nomentreprise,
      activite : com.activite,
      pays : com.pays,
      region : com.region,
      devises : com.devise,      
      codepostal: com.codepostal
    })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    });
}
class Creecompte extends Component {
    constructor(props){
      super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
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
            activites :["","Transports et services connexes","Télécommunication et technologies de l'information",
                        "Services et équipements pour la santé","Services aux entreprises","Pétrole et gaz","Artisanat",
                        "Mécanique et sous-traitance industrielle","Maison et décoration","Loisirs, tourisme et bien-être",
                        "Logistique, manutention et stockage","Informatique, bureautique et NTIC","Impression, papier et édition",
                        "Hydraulique et pneumatique","Habillement et industrie textile","Equipements pour la distribution",
                        "Environnement","Energie, minerais et matières premières","Emballage et conditionnement",
                        "Electricité , électronique et électroménager","Communication, événement et équipements audiovisuels",
                        "Chimie, cosmétique et hygiène","Chauffage et climatisation","Caoutchouc et plastique",
                        "Biens et équipements d'hôtellerie et de restauration","Biens et équipements d'entreprise",
                        "Bâtiment et construction","Analyse, mesure et pesage","Agroalimentaire","Agriculture , élevage et pêche",
                        "Administration et organismes","Autre"],
            pays:'',
            lespays :["Tunisie","Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Arabie saoudite",
                      "Argentine","Arménie","Australie","Autriche","Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Belgique",
                      "Belize","Bénin","Bhoutan","Bélarus","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunei",
                      "Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Cap-Vert","Chili","Chine","Chypre","Colombie",
                      "Comores","Congo-Brazzaville","Congo-Kinshasa","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire",
                      "Croatie","	Cuba","Danemark","Djibouti","Dominique","Égypte","Équateur","Érythrée","Espagne","Estonie",
                      "Eswatini","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie","Géorgie","Ghana","Grèce",
                      "Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie",
                      "Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","l'Italie","Japon","Jordanie","Kazakhstan ",
                      "Kenya","Kirghizistan","Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Libéria","Libye",
                      "Liechtenstein","Lituanie","Luxembourg","Macédoine du Nord","Madagascar","Malaisie","Malawi","Maldives",
                      "Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco",
                      "Monténégro","Mozambique","Namibie","	Nauru","Népal","Nicaragua","Niger","Nigéria","Niue","Norvège","Oman",
                      "Ouganda","Ouzbékistan","Pakistan","Palaos","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas",
                      "Pérou","Philippines","Pologne","Portugal","Qatar","République centrafricaine","Roumanie","Royaume-Uni",
                      "Russie","Rwanda","Saint-Vincent-et-les-Grenadines","Salomon","Salvador","Samoa","Sao Tomé-et-Principe",
                      "Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan",
                      "Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie","Tadjikistan","Tanzanie","Tchad",
                      "Tchéquie","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan",
                      " Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"],
            region:'',
            devise:'', 
            devises :["Dinar Tunisiens","Afghani","Rand","Lek","Dinar algériens","Euro","Kwanza","Dollar des Caraïbes orienta","Riyal Saoudiens",
                      "	Peso Argentin","Dram Armenien","Aruban Florin","Australian Dollar","Azerbaijanian Manat","Dollar Bahaméen",
                      "Dinar Bahraini","Taka","Dollars Barbados","Dollar de Bélize","Franc CFA","	Dollar Bermudien","	Ngultrum",
                      "Ruble Biélorusse","Mvdol","Boliviano","Mark Convertible","Pula","Couronne Norvégienne","Brunei Dollar",
                      "	Real Brésilien","Lev Bulgare","Franc Burundi","Cabo Verde Escudo","Riel","Dollar Canadien",
                      "Cayman Islands Dollar","Peso Chilien","Yuan Renminbi","Peso Colombien","Franc Comorien","Dollar Néo-Zélandais","Won",
                      "Won Nord-coréen","	Costa Rican Colon","Kuna","Peso Convertible","Peso Cubain","Florin des Antilles",
                      "néerlandaises","Couronne Danoise","Franc Djiboutien","Pound Égyptien","Dollar US","Nakfa","Birr Éthiopienne",
                      "Livre des Îles Malouines","Dollar des Fiji","Dalasi","Lari","Cedi du Ghana","Pound de Gibraltar",
                      "Couronne Danoise","Quetzal","Livre Sterlling","Franc Guinéen","Dollar guyanien","Gourde","	Lempira",
                      "Dollar de Hong Kong","Forint","Dollar Australien","Couronne Danoise","Roupie Indienne",
                      "Roupie Indonésienne","Rial Iranien","Dinar Iraquien","Couronne Islandaise","Nouveau Sheqel Israélien",
                      "Dollars Jamaïcain","Yen","Livre Sterlling","Dinar Jordanien","Tenge","Shilling Kenyan","Som",
                      "Dinar Koweïtien","Kip","Pound Libanais","Dollar du Liberia","Dinar Libien","Franc Suisse","Pataca",
                      "Denar","Ariary Malgache","Kwacha","Ringgit Malaisien","Rufiyaa","Mauritius Roupie","Ouguiya",
                      "Peso Mexicain","Leu Moldavien","Tugrik","Dirham Marocain","Metical","Kyat","Dollar Namibien","Cordoba",
                      "Naira","Roupie Népalais","Rial Omani","Shilling Ougandaisg","Sum d’Oubekistan","Roupie du Pakistan","Balboa",
                      "Kina","Guarani","Nouveau Sol","Peso Phillipins","Zloty","Franc CFP","Rial Qatari","Leu Roumain","Livre Sterling",
                      "Rouble Russe","Franc Rwandais","Peso Dominicain","Couronne Tchèque","Dobra","Dinar Serbe",
                      "Roupie seychellois","Leone","Dollar Singaporien","Dollar des îles Solomon","Shilling Somalien",
                      "Livre Soudanais","Livre sud-soudanaise","Roupie Sri Lankais","Dollars du Surinam","Couronne Suédoise",
                      "Lilangeni","Pound Syrien","Somoni","Nouveau dollars Taiwanais","Shilling Tanzanien","US Dollar","Baht",
                      "Pa’anga","Dollars de Trinidad et Tobago","Manat turkmène","Livre Turque","Dollars Australiens","Hryvnia",
                      "Dirham UAE","Peso Uruguayen","Vatu","Bolivar","Dong","Rial du Yemen","Kwacha Zambien","Dollars du Zimbabwe"],     
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

        onSubmit(e) {
            e.preventDefault();
        
            const commercant = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                password: this.state.password,
                tel: this.state.tel,
                nomentreprise:this.state.nomentreprise,
                activite : this.state.activite,
                pays : this.state.pays,
                region : this.state.region,
                devise : this.state.devise,      
                codepostal: this.state.codepostal,
              }
              console.log(commercant);
              register(commercant).then(res => {                
                window.location = '/authentification'
                  alert("Bienvenue!")
              }
                )/*
           axios.post('http://localhost:3001/Commercant/ajouter', commercant)
              .then(res => console.log(res.data));*/
              this.setState({
                nom:'',
                prenom:'',
                email:'',
                password:'',
                tel:0,
                nomentreprise:'',
                activite:'',
                pays:'',
                region:'',
                devise:'',
                codepostal:0
              
              })
              
          }
        render(){
          const { formErrors  } = this.state;
          
            return(
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
        </div></div>
      
            )
        } 
      
}
export default Creecompte;