import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import './Products.css';
import ProductList from './ProductList';
import ProductFunctions from './ProductFunctions';

class Products extends Component {
    state = {
        newForm: false,
    }
    //show new product form
    NewButtontoggler() {
        this.setState({
            newForm: !this.setState.newForm
        })
    }
    //hide new product form
    Hide() {
        this.setState({
            newForm: false
        })

    }
    Create = (event) => {
        event.preventDefault();
        let codigo = this.refs.Codigo.value
        let name = this.refs.Name.value
        let cost = this.refs.Cost.value
        let size = this.refs.Size.value
        let color = this.refs.Color.value

        let info = {
            codigo: codigo,
            name: name,
            cost: cost,
            size: size,
            color: color
        };
        console.log(JSON.stringify(info))
        this.refs.NewProductForm.reset()
        this.PostData(info);
    };

    PostData(data) {
        fetch('/home/create', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(products => this.setState({ products }, () => console.log('products posted...', products)))
    }
    
    render() {
        return (
            <div>
                <Table className="table">
                    <thead>
                        <tr className="header">
                            <th>Name</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <ProductList />
                </Table>
                {
                    //show new product form
                    this.state.newForm ?
                        <form ref="NewProductForm" method="POST" action="/home/create">
                            <div className="NewComponent">
                                <div className="form-group row">
                                    <label for="name-input" className="col-2 col-form-label">Name</label>
                                    <div class="col-10">
                                        <input className="form-control" type="text" name="Name" ref="Name"></input>
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
                                        <input className="form-control" type="text" name="Size" ref="Cost"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="status-input" className="col-2 col-form-label">Status</label>
                                    <div class="col-10">
                                        <input className="form-control" type="text" name="Status" ref="Status"></input>
                                    </div>
                                </div>
                            </div>
                            <Button className="ButtonEdit" onClick={this.create()}>Save</Button>
                            <Button className="ButtonDelete" onClick={() => this.Hide()}>Cancel</Button>
                        </form>
                        : null
                }
                <Button className="ButtonNew" onClick={() => this.NewButtontoggler()}>New</Button>
            </div>
        )
    }
}
export default Products