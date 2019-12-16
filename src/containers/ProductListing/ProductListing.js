import React, { Component } from 'react';
import axios from '../../axios';

import ProductListItem from '../../components/ProductListItem/ProductListItem';
import Spinner from '../../components/UI/Spinner/Spinner';

class ProductListing extends Component {
    state = {
        productList: []
    }

    async componentDidMount() {
        await this.loadData();
    }

    loadData = async () => {

        let config1 = {
            baseURL: 'https://jsonplaceholder.typicode.com/',
            url: '/todos/1',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                // 'pearl-session-id': 'b342663c-ea57-4eb8-8ee4-a7a9c603dc57',
                // 'Access-Control-Allow-Origin': '*',
            },
            params: {},
            data: {},
            auth: {},
        };

        axios(config1)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                let msg = "Can't connect to product server"
                // alert(msg);
                // this.productSelectHandler();
                console.log(err);
            });


        let config = {
            url: '/getProducts',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'pearl-session-id': 'b342663c-ea57-4eb8-8ee4-a7a9c603dc57',
                'Access-Control-Allow-Origin': '*',
            },
            params: {},
            data: {},
            auth: {},
        };

        axios(config)
            .then(response => {
                const ProductList = response.data.products.slice(0, 10);

                const updatedProductList = ProductList.map(product => {
                    return {
                        ...product,
                    }
                });
                this.setState({ productList: updatedProductList });
            })
            .catch((err) => {
                let msg = "Can't connect to product server"
                // alert(msg);
                // this.productSelectHandler();
                console.log(err);
            });
    }

    productSelectHandler = (productId) => {
        console.log("hello", productId)
        this.props.history.push('/detail/' + productId);
    }

    render() {
        let list = <Spinner />;
        // eslint-disable-next-line
        if (this.state.productList.length > 0) {
            list = this.state.productList.map(item => {
                return (
                    < ProductListItem
                        key={item.uuid}
                        title={item.name}
                        url={item.photos[0].url}
                        click={() => this.productSelectHandler(item.uuid)}
                    />
                )
            });
        };

        return (
            <div className='col-12'>
                <div className='card-columns'>
                    {list}
                </div>
            </div>
        )
    }
}

export default ProductListing;