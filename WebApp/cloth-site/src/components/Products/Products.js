import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Products.css';
import ProductList from './ProductList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Products extends Component {
    state = {
        newForm: false,
        buttonnew: true
    }
    //show new product form
    NewButtontoggler() {
        this.setState({
            newForm: !this.setState.newForm,
            buttonnew: false
        })
    }
    //hide new product form
    Hide() {
        this.setState({
            newForm: false
        })
        window.location.reload();
    }
    Create = () => {
        let name = this.refs.Name.value
        let size = this.refs.Size.value
        let color = this.refs.Color.value
        let cost = this.refs.Cost.value
        let codigobarra = this.refs.Codigobarra.value

        let info = {
            name: name,
            size: size,
            color: color,
            cost: cost,
            codigobarra: codigobarra
        };
        this.refs.NewProductForm.reset()
        this.Hide();
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
            .then(products => this.setState({ products }, () => console.log('products posted...', products)))
    }

    render() {
        return (
            <div id="ProductMain">
                <ErrorBoundary>
                    <ProductList />
                </ErrorBoundary>
                {
                    //show new product form
                    this.state.newForm ?
                        <form ref="NewProductForm" method="POST" action="/home/create" style={{ marginTop: "50px" }}>
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
                            <Button className="ButtonEdit" onClick={() => this.Create()}>Save</Button>
                            <Button className="ButtonDelete" onClick={() => this.Hide()}>Cancel</Button>
                        </form>
                        : null
                }
                {
                    this.state.buttonnew ?
                        <Button style={{ marginTop: "50px" }} className="ButtonNew" ref="ButtonNew" onClick={() => this.NewButtontoggler()}>New</Button>
                        : null
                }
            </div>
        )
    }
}
export default Products