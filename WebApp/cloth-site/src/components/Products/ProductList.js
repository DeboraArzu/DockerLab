import React, { Component } from 'react';
import './ProductList.css';
import { Button, Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('/home/products')
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products fetched...', products)));
  }

  render() {
    this.products = JSON.stringify(this.state.products)
    console.log(this.products)
    if (!(this.products === null) && this.products != '[]') {
      return (
        <div className="items-list">
          <ul>
            {
              this.state.products['undefined'].map(product =>
                <tbody>
                  <tr className="list">
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                    <td>{product.color}</td>
                    <td>{product.cost}</td>
                    <td>{product.status}</td>
                    <td>{product.codigobarra}</td>
                    <div className="buttons">
                      <Button className="ButtonEdit">Edit</Button>
                      <Button className="ButtonDelete">Delete</Button>
                    </div>
                  </tr>
                </tbody>
              )}
          </ul>

        </div>
      )
    }
    return ""
  }
}

export default ProductList;