import React, { Component } from 'react';
import axios from '../../axios';

import Spinner from '../../components/UI/Spinner/Spinner';
/*
 Show the product information.(eg: product name, description, photo and dimensions)

 Input: Product ID (String)
 Output: Product details information
 */
class productDetail extends Component {
    state = {
        selectProduct: null
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {

            let postData = { id: this.props.match.params.id }

            axios.post('/getProductDetails', postData)
                .then(response => {
                    this.setState({ selectProduct: response.data.product });
                })
                .catch((err) => {
                    let msg = "Can't connect to product detail"
                    console.log(msg.concat(err));
                });
        }
    }

    backListingHandler = () => {
        this.props.history.push('/');
    }

    render() {
        let product = null;

        if (this.props.match.params.id) {
            product = <Spinner />;
        }
        if (this.state.selectProduct) {

            let dimensionsData = this.state.selectProduct.dimensions
            let dimension = Object.keys(dimensionsData).map(key =>
                <li><span className='text-capitalize'>{key}</span> : {dimensionsData[key]}</li>
            )

            product = (
                <div className="row">
                    <div className="col-12 col-md-5">
                        <img className='card-img-top' src={this.state.selectProduct.photos[0].url} alt='' />
                    </div>
                    <div className="col-12 col-md-7">
                        <h3>{this.state.selectProduct.name}</h3>
                        <p>{this.state.selectProduct.description}</p>
                        <ul className="list-unstyled">
                            {dimension}
                        </ul>
                        <div className="Edit">
                            <button onClick={this.backListingHandler} className="btn btn-info">back to list</button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                {product}
            </div>
        )
    }
}
export default productDetail;