import React from 'react';

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
    default:
      template= null;
  }

  return template;
}

export default Button;