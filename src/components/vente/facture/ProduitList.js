import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MdCancel as DeleteIcon } from 'react-icons/md'
import styles from '../../css/LineItem.module.scss'

import axios from 'axios';

class LineItem extends Component {
constructor(props){
    super(props);
    this.state={   
        produits:[],
        libelle:'',
        prixht:0.00,

    }
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
  
  /*renderSelectedClient(libelle){
    axios.get('http://localhost:3001/Produit/libelle/'+libelle)
    .then(response => {
        return this.setState({
        prixht: response.data.prix
    })  
    })
    .catch(function (error) {
        console.log(error);
    })}*/
  render = () => {
    const { index, quantite,libelle, TVA ,prixht} = this.props

    return (
      <div className={styles.lineItem}>
        <div>{index + 1}</div>
        <div>
        <select 
            name="libelle"
            value={libelle}
            type="text"
            onChange={this.props.changeHandler(index)}
                > 
                    <option></option>                                   
                    {
                        this.state.produits.map((libelle,i)=> {
                        return <option 
                            key={i}
                            value={libelle}>{libelle}
                            </option>
                        })
                    }
                </select>
            
        </div>
        
        <div><input name="quantite" type="number" value={quantite} onChange={this.props.changeHandler(index)}  /></div>
        <div>
            <select name="TVA" type="number" value={TVA} onChange={this.props.changeHandler(index)}>
                <option></option>
                <option >0</option>
                <option >7</option>
                <option >13</option>
              </select>
        </div>
        <div className={styles.currency}>{/*this.renderSelectedClient(libelle) value={this.state.prixht}*/}
        <input name="prixht" type="number" value={prixht} onChange={this.props.changeHandler(index)} /></div>
        <div className={styles.currency}>{this.props.currencyFormatter( prixht *quantite)}</div>
        <div>
          <button type="button"
            className={styles.deleteItem}
            onClick={this.props.deleteHandler(index)}
          ><DeleteIcon size="1.25em" /></button>
        </div>
      </div>
    )
  }
}

export default LineItem

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  libelle: PropTypes.string,  
  TVA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prixht: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

