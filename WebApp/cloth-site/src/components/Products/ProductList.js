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
    console.log(this.products)
    let nombre
    let newjson 
    if (!(this.products === null) && this.products != '[]') {
      newjson = JSON.parse(this.products)//
      let mihtml
      /*for (let index = 0; index < newjson['undefined'].length; index++) {
        nombre = newjson['undefined'][index]['name'].toString()
        mihtml = mihtml + (
          <div>
            <ul>
            <li key={index.toString()}>{nombre}</li>
            <li key={index.toString()}>{newjson['undefined'][index]['color'].toString()}</li>
            <li key={index.toString()}>{newjson['undefined'][index]['cost'].toString()}</li>
            <li key={index.toString()}>{newjson['undefined'][index]['size'].toString()}</li>
            </ul>
          </div>
        ) 

      }*/
      debugger
      return (
        <div>
        <ul>
          {this.state.products['undefined'].map(product => <li key={product.id}>{product.name} {product.size} {product.color} {product.cost} </li>
          )}
        </ul>
      </div>
      )
    }
    //newjson['undefined'][0]['name']
    
    debugger
    return (
      <div>
            <li key="1">{`{nombre}`}</li>
            <li key="1">{`{nombre}`}</li>
            <li key="1">{`{nombre}`}</li>
            <li key="1">{`{nombre}`}</li>
            <li key="1">{`{nombre}`}</li>
          </div>
    )
    return ""
  }
}

export default ProductList;