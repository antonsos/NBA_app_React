import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//ROUTES
import Routes from './Routes';

//FIREBASE
import { firebase } from './firebase'

//STYLES
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const App = (props) => (
  <BrowserRouter>
    <Routes {...props}/>
  </BrowserRouter>
)

firebase.auth().onAuthStateChanged( user => {
  ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})
