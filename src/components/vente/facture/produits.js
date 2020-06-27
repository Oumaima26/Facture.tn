import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import LineItem from './ProduitList'

import { MdAddCircle as AddIcon } from 'react-icons/md'
import styles from '../../css/LineItems.module.scss'


class LineItems extends Component {

  handleDragEnd = (result) => {

    if (!result.destination) return

    // helper function to reorder result (src: react-beautiful-dnd docs)
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }

    // perform reorder
    const lineItems = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    )

    // call parent handler with new state representation
    this.props.reorderHandler(lineItems)

  }

  render = () => {

    const {items, addHandler, reorderHandler, ...functions} = this.props

    return (
      <form>

        <div className={styles.lineItems}>
          <div className={`${styles.gridTable}`}>

            <div className={`${styles.row} ${styles.header}`}>
              <div>#</div>
              <div>Libelle</div>
              <div>Qte</div>
              <div>TVA</div>
              <div>PrixHT</div>
              <div>TotalHT</div>
              <div></div>
            </div>

            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
                  >
                    {this.props.items.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={snapshot.isDragging ? styles.listItemDragging : ''}
                          >
                            <LineItem
                              style={{color: 'red'}}
                              key={i + item.id} index={i} libelle={item.libelle}
                              TVA={item.TVA} quantite={item.quantite} prixht={item.prixht}
                              {...functions}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
            </Droppable>
          </DragDropContext>

          </div>

          <div className={styles.addItem}>
            <button type="button" onClick={addHandler}><AddIcon size="1.25em" className={styles.addIcon} />Ajouter produit</button>
          </div>

        </div>
      </form>

    )
  }
}

export default LineItems

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  currencyFormatter: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  reorderHandler: PropTypes.func.isRequired,
}






















/*import React from "react"
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
export default Form*/