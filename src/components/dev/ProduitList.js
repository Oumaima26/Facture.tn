import React, { Component } from "react"
import axios from 'axios';
class ProduitList extends Component {
  constructor(props){
    super(props);
    this.onChangeLibelle = this.onChangeLibelle.bind(this);
    this.onChangePrixHT = this.onChangePrixHT.bind(this);
    this.onChangeQuantite = this.onChangeQuantite.bind(this);
    this.onChangeTotalHT = this.onChangeTotalHT.bind(this);
    this.onChangeTva = this.onChangeTva.bind(this);
    this.state={      
      produits:[],
      libelle:'',
      quantite: 0,
      TVA: 0,
      prixht: 0,
      totalht:0,

    }
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
  onChangePrixHT(e) {
    this.setState({
      prixht: e.target.value
    })
  }
  onChangeTotalHT(e) {
    this.setState({
      totalht: e.target.value
    })
  }
  onChangeTva(e) {
    this.setState({
      TVA: e.target.value
    })
  }
  
  componentDidMount() {
    axios.get('http://localhost:3001/Produit/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            produits: response.data.map(produit => produit.libelle)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  render(){
    return (
      this.props.produitList.map((val, idx) => {
        let libelle = `libelle-${idx}`, 
        quantite = `quantite-${idx}`, 
        prixht = `prixht-${idx}`,
         TVA = `TVA-${idx}`,
         totalht = `totalht-${idx}`
        return (
          <tr key={val.index}>
            <td>
              <select name="libelle"
              id={libelle}
                    className="form-control"
                    value={this.state.libelle}
                    onChange={this.onChangeLibelle}> 
                    <option></option>                                   
                    {
                        this.state.produits.map((libelle,index)=> {
                        return <option 
                            key={index}
                            value={libelle}>{libelle}
                            </option>
                        })
                    }
                </select>
            </td>
            <td>
              <input 
                type="text"  
                name="quantite" 
                id={quantite} 
                data-id={idx} 
                className="form-control " 
                value={this.state.quantite} 
                onChange={this.onChangeQuantite}
              />
            </td>
            <td>
              <input type="text"  name="prixht" data-id={idx} id={prixht} className="form-control " />
            </td>
            <td>
              <select name="TVA" id={TVA} data-id={idx} className="form-control" >
                <option></option>
                <option value="pending">0</option>
                <option value="In Progress">7</option>
                <option value="Completed">13</option>
              </select>
            </td>
            <td>
              <input type="text"  name="totalht" data-id={idx} id={totalht} className="form-control " />
            </td>
            <td>
                <a href="/produit" onClick={() => { this.props.deleteProduit(this.props.produit._id) }}>
                  <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
                </a>
            </td>
            <td>
              {
                  idx===0?<button onClick={()=>this.props.add()} type="button" className="btn btn-primary text-center">
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </button>
                  : <button className="btn btn-danger" onClick={(() => this.props.delete(val))} >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
              }
            </td>
          </tr >
        )
      })
    )

  }
  renderSelectedProduit(libelle){
    console.log(libelle)
    axios.get('http://localhost:3001/Produit/libele/'+libelle)
    .then(response => {
        this.setState({
        libelle: response.data.libelle,
        quantite: response.data.quantite,
        TVA: response.data.TVA,
        prixht: response.data.prix,
        totalht: response.data.prix,

    })  
    })
    .catch(function (error) {
        console.log(error);
    })
  
  }
  
}

export default ProduitList