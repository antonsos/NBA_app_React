import React from 'react';
import SideNav from 'react-simple-sidenav';

//COMPONENTS
import SideNavItems from './SideNavItems'

const SideNavigation = (props) => {
  return (
    <div>
      <SideNav 
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          maxWidth: '240px',
          backgroundColor: '#20222b'
        }}
      >
        <SideNavItems className='side-nav' />
      </SideNav>
    </div>
  )
}

export default SideNavigation;