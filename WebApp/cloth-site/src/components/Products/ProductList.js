import React, { Component } from 'react';
import './ProductList.css';
import { Button, Table } from 'react-bootstrap';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newForm: false,
      products: {},
      saved: {},
      buttonnew: true,
      codigo: 0
    };
  }

  NewButtontoggler() {
    this.setState({
      newForm: !this.setState.newForm,
      buttonnew: false,
      codigo: ''
    })
  }

  //hide new product form
  Hide() {
    this.setState({
      newForm: false
    })
    window.location.reload();
  }

  componentDidMount() {
    try {
      fetch('/home/products', {
        method: "GET",
        mode: "same-origin",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': "application/json"
        }
      })
        .then(res => res.json())
        .then(products => this.setState({ products }, () => console.log('products fetched...', products)));
    } catch (error) {
      console.log('Error loading information')
    }
  }

  componentDidUpdate() {
    let form = this.state.newForm
    if (form === true) {
      this.refs.Name.value = this.state.saved.name
      this.refs.Size.value = this.state.saved.size
      this.refs.Color.value = this.state.saved.color
      this.refs.Cost.value = this.state.saved.cost
      this.refs.Status.value = this.state.saved.status
    }
  }

  Reload() {
    window.location.reload();
  }

  Edit = (product) => {
    let name = product.name
    let cost = product.cost
    let size = product.size
    let color = product.color
    let status = product.status
    let codigobarra = product.codigobarra
    let id = product._id

    let info = {
      name: name,
      size: size,
      color: color,
      cost: cost,
      status: status,
      codigobarra: codigobarra,
      id: id
    };
    //save the data
    this.setState({ saved: info })
    console.log(JSON.stringify(info))
    this.NewButtontoggler() //show the form
  }

  SaveData = () => {
    let name = this.refs.Name.value
    let size = this.refs.Size.value
    let color = this.refs.Color.value
    let cost = this.refs.Cost.value
    let status = this.refs.Status.value

    let info = {
      name: name,
      size: size,
      color: color,
      cost: cost,
      status: status,
    };

    //send the data
    this.EditMethod(info, this.state.saved.id)
  }

  EditMethod(data, id) {
    fetch('home/' + id + '/update', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('products edited...', products)));
  }

  DeleteMethod(product) {
    let id = product._id
    fetch('/home/' + id + '/delete', {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    })
      .then(products => this.setState({ products }, () => console.log('products deleted...', products)))
  }

  render() {
    this.products = JSON.stringify(this.state.products)
    if (!(this.products === null) && this.products !== '[]' && this.products !== '{}') {
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
                  <tbody key={'t' + product.codigobarra}>
                    <tr id={'p' + product.codigobarra}>
                      <td>{product.name}</td>
                      <td>{product.size}</td>
                      <td>{product.color}</td>
                      <td>{product.cost}</td>
                      <td>{product.status}</td>
                      <td>{product.codigobarra}</td>
                      <td style={{ display: "flex" }}>
                        <Button style={{ marginRight: "2rem" }} className="ButtonEdit" onClick={() => this.Edit(product)}>Edit</Button>
                        <Button className="ButtonDelete" onClick={() => this.DeleteMethod(product)}>Delete</Button>
                      </td>
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
                      <label htmlFor="name-input" className="col-2 col-form-label">Name</label>
                      <div className="col-10">
                        <input className="form-control" type="text" name="Name" ref="Name" id="Name"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="size-input" className="col-2 col-form-label">Size</label>
                      <div className="col-10">
                        <input className="form-control" type="text" name="Size" ref="Size"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="color-input" className="col-2 col-form-label">Color</label>
                      <div className="col-10">
                        <input className="form-control" type="text" name="Color" ref="Color"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="cost-input" className="col-2 col-form-label">Cost</label>
                      <div className="col-10">
                        <input className="form-control" type="Number" name="Size" ref="Cost"></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="status-input" className="col-2 col-form-label">Status</label>
                      <div className="col-10">
                        <input className="form-control" type="Number" name="Status" ref="Status"></input>
                      </div>
                    </div>
                  </div>
                  <Button className="ButtonEdit" onClick={() => this.SaveData()}>Save</Button>
                  <Button className="ButtonDelete" onClick={() => this.Hide()}>Cancel</Button>
                </form>
                : null
            }
          </div>
        </div >
      )
    } else {
      return (<div style={{ marginLeft: "2.5rem" }}><h3>No products in the DB or no connection to the DB...</h3></div>)
    }
  }
}
export default ProductList;