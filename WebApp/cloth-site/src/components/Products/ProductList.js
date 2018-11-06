import React, { Component } from 'react';
import './ProductList.css';

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
    debugger
    return (
      <div>
        <li key="1">{this.products.name}</li>
      </div>
    )
  }
}

export default ProductList;