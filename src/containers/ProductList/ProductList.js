import React, { Component } from 'react';
import axios from '../../axios';

import ProductListItem from '../../components/ProductListItem/ProductListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
/*
List down 10 products with product name and photos

Data source: API call '/getProducts'

 Test: ProductList.test.js
 1. The Spinner is exist before Fetch.
 2. Show <ProductListItem /> when the Fetch success.
*/
class ProductListing extends Component {
    state = {
        productList: []
    }

    async componentDidMount() {
        await this.loadData();
    }

    loadData = async () => {
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
        };

        axios(config)
            .then(response => {
                const newProductList = response.data.products.slice(0, 10);
                this.setState({ productList: newProductList });
            })
            .catch((err) => {
                let msg = "Can't connect to product server"
                console.log(msg.concat(err));
            });
    }

    productSelectHandler = (productId) => {
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