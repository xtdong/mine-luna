import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProductList from './ProductList/ProductList';
import ProductDetail from './ProductDetail/ProductDetail';

class Layout extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <header className='p-5'>
                    <div className='h2 text-center'>MINE</div>
                </header>
                <div className='mt-5'>
                    <Switch>
                        <Route path='/' exact component={ProductList} />
                        <Route path={'/detail/:id'} onUpdate={() => window.scrollTo(0, 0)} component={ProductDetail} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Layout;