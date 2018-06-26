import React from 'react';

//COMPONENTS
import VideosTemplate from '../VideosTemplate/VideosTemplate'

const VideoRelated = (props) => {
  return (
    <div className='video-related-wrapper'>
      <VideosTemplate videos={props.videos} teams={props.teams}/>
    </div>
  )
}

export default VideoRelated;