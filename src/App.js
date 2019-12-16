import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './containers/Layout';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
