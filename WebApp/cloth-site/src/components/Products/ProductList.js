import React, { Component } from 'react';
import './ProductList.css';
import { Button } from 'react-bootstrap';

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
            {this.state.products['undefined'].map(product => <li key={product.id}>{product.name} {product.size} {product.color} {product.cost} </li>
            )}
          </ul>
          <Button className="ButtonEdit">Edit</Button>
          <Button className="ButtonDelete">Delete</Button>
        </div>
      )
    }
    return ""
  }
}

export default ProductList;