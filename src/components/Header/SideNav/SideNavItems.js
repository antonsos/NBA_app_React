import React from 'react';
import { Link, withRouter } from 'react-router-dom';

//ICONS
import FontAwesome from 'react-fontawesome';

//FIREBASE
import { firebase } from '../../../firebase';

const SideNavItems = (props) => {

  const items = [
    {
      type: 'side-nav__item',
      icon: 'home',
      text: 'Home',
      link: '/',
      login: ''
    },
    {
      type: 'side-nav__item',
      icon: 'file-alt',
      text: 'News',
      link: '/news',
      login: ''
    },
    {
      type: 'side-nav__item',
      icon: 'play',
      text: 'Videos',
      link: '/videos',
      login: ''
    },
    {
      type: 'side-nav__item',
      icon: 'sign-in-alt',
      text: 'Sign In',
      link: '/sign-in',
      login: false
    },
    {
      type: 'side-nav__item',
      icon: 'columns',
      text: 'Dashboard',
      link: '/dashboard',
      login: true
    },
    {
      type: 'side-nav__item',
      icon: 'sign-out-alt',
      text: 'Sign Out',
      link: '/sign-out',
      login: true
    }
  ]

  const element = (item, i) => {
    return (
      <Link
        key={i}
        className={item.type}
        to={item.link}
      >
        <FontAwesome name={item.icon} />  {item.text}
      </Link>
    )
  }

  const regInfo = (item, i) => {
    let template = null;

    if(props.user === null && !item.login) {
      template = element(item, i);
    }

    if(props.user !== null && item.login) {
      if(item.link === '/sign-out') {
        template = (
          <div
            key={i}
            className={item.type}
            onClick={() => {
              firebase.auth().signOut()
              .then(() => {
                props.history.push('/', null);
              })
            }}
          >
            <FontAwesome name={item.icon} />  {item.text}
          </div>
        )
      } else {
        template = element(item, i);
      }
    }

    return template;
  }

  const showItems = () => {
    return items.map((item, i) => (
      item.login !== '' ?
        regInfo(item, i)
        :
        element(item, i)
    ));
  }

  return (
    <ul className='side-nav__list'>
      {showItems()}
    </ul>
  );
};
export default withRouter(SideNavItems);
