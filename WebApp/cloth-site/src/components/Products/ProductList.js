import React, { Component } from 'react';
import './ProductList.css';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/home/products')
      .then(res => res.json())
      .then(product => this.setState({ product }, () => console.log('products fetched...', product)));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.products.map(product => <li key={product.id}>{product.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default ProductList;