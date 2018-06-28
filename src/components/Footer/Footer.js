import React from 'react';
import { Link } from 'react-router-dom';

//CONFIG
import { CURRENT_YEAR } from '../../config'

const Footer = () => (
    <footer className='footer-main'>
      <Link to='/' className='footer-main__logo'>
        <img src="/images/nba_logo.png" alt="logo"/>
      </Link>
      <p className='footer-main__rights'>
        @NBA {CURRENT_YEAR} All rights reserved.
      </p>
    </footer>
)

export default Footer;