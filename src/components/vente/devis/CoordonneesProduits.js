import React, { Component } from 'react'
import styles from '../../css/Invoice.module.scss'

import LineItems from './produits'

import uuidv4 from 'uuid/dist/v4'

class CoordonneesProduit extends Component {

  locale = 'en-US'
  currency = 'USD'

   constructor(props){
    super(props);

    this.sendTTC= this.sendTTC.bind(this);
    this.sendTH= this.sendTH.bind(this);
    this.sendTVA= this.sendTVA.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      totalTTC:0.00,
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
  onSubmit=()=>{
    this.sendTH();
    this.sendTTC();
    this.sendTVA();
  }
  sendTTC = () => {
    this.props.onSubmitMessage(this.calcGrandTotal(), this.calcLineItemsTotal(),this.calcTaxTotal());
  }
  sendTH = () => {
    this.props.onSubmitMessage(this.calcLineItemsTotal());
  }
  sendTVA = () => {
    this.props.onSubmitMessage(this.calcTaxTotal());
  }
  onChangeTotalTTC(e) {
    this.setState({
        totalTTC: e.target.value
    })
  }
  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat(
        [{ id: uuidv4(), libelle: '', TVA: 0, quantite: 0, prixht: 0.00 }]
      )
    })
  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handlePayButtonClick = () => {
    alert('Not implemented')
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcTaxAmount = (c) => {
    return c * (this.state.lineItems.reduce(cur => cur.TVA) / 100)
    
  }
  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantite * cur.prixht)), 0)
  }

  calcTaxTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => ( prev+((cur.TVA * cur.prixht))/100), 0)
  }
  calcGrandTotalTax = () => {
    
    return this.state.lineItems.reduce((k) => (k + this.calcTaxTotal()), 0)
  }
  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  render = () => {
    return (

      <div >
          <br/><br/>

          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

        <div className={styles.totalContainer}>
        <form>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Total HT</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total TVA </div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total TTC</div>
                <div className={`${styles.value} ${styles.currency}`} >{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
          </form>
        </div>
        <br/>
        <center><div >
          <button className="btn btn-primary"  onClick={this.sendTTC}>Valider</button>
        </div></center>


      </div>

    )
  }

}

export default CoordonneesProduit










































/*import React from "react"
import ProduitList from "./ProduitList"
class Form extends React.Component {
   
    constructor(props){
      super(props);
      this.onChangeTottva = this.onChangeTottva.bind(this);
      this.calculate = this.calculate.bind(this);

    this.state = {
        produitList: [{ index: Math.random(),
            libelle: "",
            quantite: 0, 
            prixht: '0.000', 
            TVA: 0 ,
            totalht: '0.000'}],
        dateD: "",
        dateF: "",
        note: "",
        totht:'0.000',
        tottva:'0.000',
        totttc:'0.000',
        netpayer:'0.000'
    }}
    calculate() {
        if(isNaN(this.state.prixht)) {
          alert('Please enter a valid number');
          this.setState({
            totalht: ''
          });
        } else {
        this.setState({
          totalht: ((Number(this.state.prixht) * 100)/Number(this.state.TVA) ).toFixed(3),
          
        });
        }
      }
    addNewRow = (e) => {
        this.setState((prevState) => ({
            produitList: [...prevState.produitList, { index: Math.random(), libelle: "", quantite: "", prixht: "", TVA: "",totalht:"" }],
        }));
    }

    deteteRow = (index) => {
        this.setState({
            produitList: this.state.produitList.filter((s, sindex) => index !== sindex),
        });
    }
    onChangeTottva(e) {
        this.setState({
            tottva: this.state.totalht
        })
      }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    clickOnDelete(record) {
        this.setState({
            produitList: this.state.produitList.filter(r => r !== record)
        });
    }
    render() {
        let { produitList } = this.state//let { notes, date, description, produitList } = this.state
        return (
            <div className="content">
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="required" >Produit</th>
                                    <th className="required" >Quantité</th>
                                    <th>Prix HT</th>
                                    <th> TVA</th>
                                    <th>Total HT</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ProduitList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} produitList={produitList} />
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="7">
                                        <button onClick={this.addNewRow} type="button" className="btn btn-primary text-center">
                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <table style={{width:"50%"}} className="table  mx-auto">
                            <thead>
                                <tr>
                                    <th>Total HT</th>
                                    <th>{this.state.totht} TND</th>
                                </tr>
                                <tr>
                                    <th>Total TVA</th>
                                    <th>{this.state.tottva} TND</th>
                                </tr>
                                <tr>
                                    <th>Total TTC</th>
                                    <th>{this.state.totttc} TND</th>
                                </tr>
                                <tr>
                                    <th>Net à payer</th>
                                    <th>{this.state.netpayer} TND</th>
                                </tr>
                            </thead>
                        </table>
                        <br/>
                        <div className="card-footer text-center"> 
                            <button type="submit" className="btn btn-primary text-center">Submit</button>
                        </div>    
                    </div> 
                                      
                </form>
            </div>
        )
    }
}
export default Form*/