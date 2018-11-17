import React, { Component } from 'react';
import './ProductList.css';
import { Button, Table } from 'react-bootstrap';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newForm: false,
      products: []
    };
  }

  NewButtontoggler() {
    this.setState({
      newForm: !this.setState.newForm
    })
    debugger
  }

  componentDidMount() {
    fetch('/home/products')
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products fetched...', products)));
  }

  Reload() {
    window.location.reload();
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
    this.EditMethod(info, codigobarra)
  }

  EditMethod(data, codigobarra) {
    this.NewButtontoggler()
    fetch('home/:' + codigobarra + '/update', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products edited...', products)));
  }
  DeleteMethod(codigobarra) {
    fetch('/home/:' + codigobarra + '/delete', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(products => this.setState({ products }, () => console.log('products deleted...', products)))
  }

  render() {
    this.products = JSON.stringify(this.state.products)
    if (!(this.products === null) && this.products != '[]' && this.products != '{}') {
      return (
        <div className="items-list">
          <ul>
            <Table striped bordered condensed hover>
              <thead>
                <tr className="header">
                  <th >Name</th>
                  <th >Size</th>
                  <th >Color</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Codigo Barra</th>
                </tr>
              </thead>
              {
                this.state.products['undefined'].map(product =>
                  // <div style={{ display: "flex", textAlign: "center" }}>
                  <tbody>
                    <tr id={'p' + product.codigobarra}>
                      <td>{product.name}</td>
                      <td>{product.size}</td>
                      <td>{product.color}</td>
                      <td>{product.cost}</td>
                      <td>{product.status}</td>
                      <td>{product.codigobarra}</td>
                      <div style={{ display: "flex" }}>
                        <Button style={{ marginRight: "2rem" }} className="ButtonEdit" onClick={() => this.Edit(product)}>Edit</Button>
                        <Button className="ButtonDelete" onClick={() => this.DeleteMethod(product.codigobarra)}>Delete</Button>
                      </div>
                    </tr>
                  </tbody>
                )}
            </Table>
          </ul>
          <div id="FormEdit">
            {
              //show new product form
              this.state.newForm ?
                <form ref="NewProductForm" method="POST" action="/home/create">
                  <div className="NewComponent">
                    <div className="form-group row">
                      <label for="name-input" className="col-2 col-form-label">Name</label>
                      <div class="col-10">
                        <input className="form-control" type="text" name="Name" ref="Name" id="Name"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="size-input" className="col-2 col-form-label">Size</label>
                      <div class="col-10">
                        <input className="form-control" type="text" name="Size" ref="Size"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="color-input" className="col-2 col-form-label">Color</label>
                      <div class="col-10">
                        <input className="form-control" type="text" name="Color" ref="Color"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="cost-input" className="col-2 col-form-label">Cost</label>
                      <div class="col-10">
                        <input className="form-control" type="Number" name="Size" ref="Cost"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="status-input" className="col-2 col-form-label">Status</label>
                      <div class="col-10">
                        <input className="form-control" type="Number" name="Status" ref="Status"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="status-input" className="col-2 col-form-label">Codigo Barra</label>
                      <div class="col-10">
                        <input className="form-control" type="Number" name="codigobarra" ref="Codigobarra"></input>
                      </div>
                    </div>
                  </div>
                </form>
                : null
            }
          </div>
        </div >
      )
    } else {
    }
    return ""
  }
}
export default ProductList;