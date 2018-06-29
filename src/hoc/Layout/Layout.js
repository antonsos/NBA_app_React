import React, { Component } from 'react';

//COMPONENTS
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.toggleSideNav = this.toggleSideNav.bind(this);

    this.state = {
      showNav: false
    }
  }

  toggleSideNav(action) {
    this.setState(() => ({showNav: action}))
  }

  render() {
    return (
      <div className='layout'>
        <Header 
          user={this.props.user}
          showNav={this.state.showNav} 
          onOpenNav={() => this.toggleSideNav(true)}
          onHideNav={() => this.toggleSideNav(false)}
        />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout;