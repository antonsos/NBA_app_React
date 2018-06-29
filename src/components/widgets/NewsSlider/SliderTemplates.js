import React from 'react';
import { Link } from 'react-router-dom';

//SLICK
import Slick from 'react-slick';

const SlidedrTemplates = (props) => {

  let template = null;

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props.settings
  }

  switch(props.type) {
    case ('featured'):
      template = props.data.map((item, i) => {
        return (
          <div key={i} >
            <div
              className='features-item'
              style={{
                backgroundImage: `url(${item.image})`
              }}
            >
              <p className='features-item__title'>
                <Link
                to={`articles/${item.id}`}
                >
                {item.title}
                </Link>
              </p>
            </div>
          </div>
        )
      })  ;
      break;
    default:
      template = null;
  }

  return (
    <Slick {...settings}>
      {template}
    </Slick>
  )
}

export default SlidedrTemplates;