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
  Edit = (product) => {
    let name = product.name
    let cost = product.cost
    let size = product.size
    let color = product.color
    let codigobarra = product.codigobarra

    let info = {
      name: name,
      size: size,
      color: color,
      cost: cost,
      codigobarra: codigobarra
    };
    console.log(JSON.stringify(info))
    this.refs.NewProductForm.reset()
    this.EditMethod(info, codigobarra)
  }
  EditMethod(data, id) {
    fetch('home/' + id + '/update', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products edited...', products)));
  }
  DeleteMethod = () => {
    let urlm = '/home';
    let id = '5bc62973c62e94253c903ac0';
    fetch(urlm + '/' + id + '/delete', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products deleted...', products)))

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
                  <tr className="list" id= {'p'+product.codigobarra}  >
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