import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
// import Menu from './components/MenuComponent';
import Main from './components/MainComponent';
// import { DISHES } from './shared/dishes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
