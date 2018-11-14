import React, { Component } from 'react';

class ProductFunctions extends Component {
    //estado de la forma para NewComponent
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
        //this.PostData(info);
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
    Edit = () => {
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
        this.EditMethod(info, codigo)
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
}
