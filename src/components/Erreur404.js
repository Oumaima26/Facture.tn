import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AngryJoe from './components/AngryJoe';
import * as Cards from './components/cards';


class App extends Component {
  state = {
    selectedCardType: ''
  };


  render(){
    return (
      <Fragment>
        <div className="app-bar">
          <h1 className="app-bar-title">MARVEL CARD SELECTOR!</h1>
        </div>
        <section className="app-section container">
          {this.renderCardSelector()}

          <div className="top-margin-small">
            {this.renderSelectedCard(this.state.selectedCardType)}
          </div>
        </section>
      </Fragment>
    );
  }


  renderCardSelector() {
    return (
      <div className="form-group top-margin-small">
        <label className="card-selector-label">Select Card Style</label>
        <select className="card-selector form-control"
          onChange={(e) => this.setState({ selectedCardType: e.target.value })}>
          <option></option>
          <option>CardA</option>
          <option>CardB</option>
        </select>
      </div>
    );
  }


  renderSelectedCard(selectedCardType) {
    if (!selectedCardType)
      return <AngryJoe text="Pick a card style bruh!" />;

    const Card = Cards[selectedCardType];

    return <Card />;
  }
}




























/*import axios from 'axios';
export const getProfile = user => {
    return axios
      .get('http://localhost:3001/Commercant/profile', {
        //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(res=> {
        console.log(res)
        return res.data
      })
      .catch(err => {
        console.log(err)
    })
}
export class Coordonnee extends Component {
  state = {
      nom: '',
      prenom: '',
      email: '',
      tel:'',
      nomentreprise:'',
      id:'',

      errors: {}
    }
  

  componentDidMount() {
    const token = localStorage.Commercanttoken;
    const decoded = jwt_decode(token);
    this.setState({
      nom: decoded.nom,
      prenom: decoded.prenom,
      tel : decoded.tel,
      email: decoded.email,
      nomentreprise:decoded.nomentreprise,        
      id:decoded.id,
    })
  }

  render() {
    return (
      <MyContext.Provider value={{...this.state}}>
          {this.props.children}
      </MyContext.Provider>
    )
  }
}
Coordonnee.contextType = MyContext;*/