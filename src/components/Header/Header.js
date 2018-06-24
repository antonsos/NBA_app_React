import React from 'react';
import { Link } from 'react-router-dom';

//COMPONENTS
import SideNav from './SideNav/SideNav'

//ICONS
import FontAwesome from 'react-fontawesome';

const Header = (props) => {

  const navBar = () => (
    <div className='nav-bar'>
      <FontAwesome 
        name='bars'
        onClick={props.onOpenNav}
      />
    </div>
  );
  
  const logo = () => (
    <Link to='/' className='header-main__logo'>
      <img src="images/nba_logo.png" alt="logo"/>
    </Link>
  );

  return (
    <header className='header-main'>
      <div className='header-main__opt'>
        <SideNav {...props} />
        {navBar()}
        {logo()}
      </div>
    </header>
  )};

export default Header;
