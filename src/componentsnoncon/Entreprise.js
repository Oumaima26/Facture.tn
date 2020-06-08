import React, { Component } from 'react';
import '../Formulaire.css';
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};
class Entreprise extends Component {

    state = {
      nomentreprise:null,
      activite:null,
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
      pays:null,
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
      region:null,
      devise:null, 
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
      codepostal:null,
      formErrors:{
        nomentreprise:"",
        activite:"",
        pays:"",
        region:"",
        devise:"",
        codepostal:""
      }
    };
  
  //action sur le boutton submit 
  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)){
      console.log(`
        Nom d'entreprise : ${this.state.nomentreprise}
        Activité : ${this.state.activite}
        Pays : ${this.state.pays}
        Région : ${this.state.region}
        Devise : ${this.state.devise}        
        Code postal : ${this.state.codepostal}
      `);
    }else{
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e =>{
    e.preventDefault();
    console.log(e.target.value);

   /* const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };

    switch(name){
      case "nomentreprise" :
        formErrors.nomentreprise =value.length !== 0 ? "" :"Non d'entreprise est obligatoire";
        break;
      case "activite" :
        formErrors.activite =value.length < 3  ? "minimum 3 characters required" :"";
        break;
      case "pays" :
        formErrors.pays = value.length < 3   ? "minimum 3 characters required" :"";
        break;
      case "region" :
        formErrors.region =value.length < 6  ? "minimum 6 characters required" :"";
        break;
      case "devise" :
        formErrors.devise =value.length === 8 ? "" :"minimum 8 characters required";
        break;
      case "codepostal" :
        formErrors.codepostal =value.length === 4 ? "" :"minimum 8 characters required";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));*/
  };

  render() {
    const { formErrors } = this.state;
    return (
        <div className="content-header">
           
            <div className="wrapper">
                <div className="form-wrapper">
                  <center>
                    <h5><i className="fa fa-building fa-x"></i>Entreprise</h5>
                  </center>
                <form onSubmit={this.handleSubmit} noValidate>

                <h1>{this.props.children}</h1>
                    <div className="entreprise">
                      <label htmlFor="nomentreprise">Nom d'entreprise:</label>
                      <input 
                          className={formErrors.nomentreprise.length > 0 ? "error" : null}
                          type="text" 
                          noValidate 
                          placeholder="Nom d'entreprise"  
                          name="nomentreprise" 
                          onChange={this.handleChange} 
                      />
                      {
                          formErrors.nomentreprise.length > 0 && (
                          <span className="errorMessage">{formErrors.nomentreprise}</span>
                          )
                      }
                    </div>
                    
                    <div className="entreprise">
                      <label htmlFor="activite">Activité d'entreprise :</label>
                      <select 
                        className={formErrors.activite.length > 0 ? "error" : null} 
                        onChange={this.handleChange} 
                        
                      >
                        {
                          this.state.activites.map((activite ,index)=>{
                            return <option key={index} value={ activite }>{activite}</option>
                          })
                        }
                      </select>
                      {
                          formErrors.activite.length >0 && (
                          <span className="errorMessage">{formErrors.activite}</span>
                          )
                      }
                    </div>
                    
                    <div className="entreprise">
                    <label htmlFor="pays">Pays :</label>
                    <select 
                      className={formErrors.pays.length > 0 ? "error" : null}                      
                      onChange={this.handleChange} 
                      >
                        {
                          this.state.lespays.map((pays ,index)=>{
                            return <option key={index} value={ pays }>{pays}</option>
                          })
                        }
                      </select>
                      {
                          formErrors.pays.length >0 && (
                          <span className="errorMessage">{formErrors.pays}</span>
                          )
                      }
                    </div>
                    <div className="entreprise">
                      <label htmlFor="devise">Devise :</label>
                      <select 
                        className={formErrors.devise.length > 0 ? "error" : null}
                        onChange={this.handleChange} 
                      >
                        {
                          this.state.devises.map((devise ,index) =>{
                            return <option key={index} value={ devise }>{devise}</option>
                          })
                        }
                      </select>
                      {
                          formErrors.devise.length > 0 && (
                          <span className="errorMessage">{formErrors.devise}</span>
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
                          name="codepostal" 
                          onChange={this.handleChange} 
                      />
                      {
                          formErrors.region.length > 0 && (
                          <span className="errorMessage">{formErrors.region}</span>
                          )
                      }
                    </div>
                    
                    
                    <div className="entreprise">
                      <label htmlFor="codepostal">Code postal :</label>
                      <input 
                          className={formErrors.codepostal.length > 0 ? "error" :null} 
                          type="text" 
                          noValidate 
                          placeholder="Code postal" 
                          name="codepostal" 
                          onChange={this.handleChange} 
                      />
                      {
                          formErrors.codepostal.length > 0 && (
                          <span className="errorMessage">{formErrors.codepostal}</span>
                          )
                      }
                    </div>
                    
                    <div className="createAccount">
                            <button type="submit">Valider</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}
}
export default Entreprise;