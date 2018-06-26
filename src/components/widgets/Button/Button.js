import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {

  let template = null;

  switch(props.type) {
    case('loadeMore'):
      template = (
        <button
          className={`button ${props.type}`}
          onClick={props.loadeMore}
        >
          {props.name}
        </button>
      );
      break;
    case('linkTo'):
      template = (
        <Link
          to={props.linkTo}
          className={`button ${props.type}`}
        >
          { props.name }
        </Link>
      );
      break;
    default:
      template= null;
  }

  return template;
}

export default Button;