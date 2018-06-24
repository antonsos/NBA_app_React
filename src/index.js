import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//ROUTES
import Routes from './Routes';

//STYLES
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const App = () => (
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>
)


ReactDOM.render(<App />, document.getElementById('root'));
