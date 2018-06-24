import React from 'react';
import { Link } from 'react-router-dom';

//ICONS
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {

  const items = [
    {
      type: 'side-nav__item',
      icon: 'home',
      text: 'Home',
      link: '/'
    },
    {
      type: 'side-nav__item',
      icon: 'file-alt',
      text: 'News',
      link: '/news'
    },
    {
      type: 'side-nav__item',
      icon: 'play',
      text: 'Videos',
      link: '/videos'
    },
    {
      type: 'side-nav__item',
      icon: 'sign-in-alt',
      text: 'Sign In',
      link: '/sign-in'
    },
    {
      type: 'side-nav__item',
      icon: 'sign-out-alt',
      text: 'Sign Out',
      link: '/sign-out'
    }
  ]

  const showItems = () => {
    return items.map((item, i) => (
      <Link
        key={i}
        className={item.type}
        to={item.link}
      >
        <FontAwesome name={item.icon} />  {item.text}
      </Link>
    ));
  }

  return (
    <ul className='side-nav__list'>
      {showItems()}
    </ul>
  );
};
export default SideNavItems;
