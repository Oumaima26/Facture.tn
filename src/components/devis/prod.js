import React from "react"
import ProduitList from "./ProduitList"
import axios from 'axios';
import {  NotificationManager } from 'react-notifications';
class Form extends React.Component {
    state = {
        produitList: [{ index: Math.random(),
            libelle: "",
            quantite: 0, 
            prixht: 0, 
            TVA: 0 ,
            totalht: 0}],
        dateD: "",
        dateF: "",
        note: "",
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
                                    <th>TVA</th>
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
                        <div className="card-footer text-center"> 
                            <button type="submit" className="btn btn-primary text-center">Submit</button>
                        </div>    
                    </div> 
                                      
                </form>
            </div>
        )
    }
}
export default Form