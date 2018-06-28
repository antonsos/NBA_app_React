import React from 'react';
import { Link } from 'react-router-dom';

//COMPONENTS
import CardInfo from '../../CardInfo/CardInfo';

const VideosTemplate = (props) => {
  return props.videos.map( (video, i) => {
    return (
      <Link
        className='link'
        to={`/videos/${video.id}`}  
        key={i}
      >
        <div className='videos-template__wrapper'>
          <div
            className='videos-template__image'
            style={{
              backgroundImage: `url(/images/videos/${video.image})`
            }}
          >
            <div  className='videos-template__image-play'></div>
          </div>
          <div className='videos-template__desc'>
            <CardInfo 
              teams={props.teams}
              team={video.team}
              date={video.date}
            />
            <h2 className='videos-template__title'>{video.title}</h2>
          </div>
        </div>
      </Link>
    )
  });
}

export default VideosTemplate;