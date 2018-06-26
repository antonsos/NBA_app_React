import React from 'react';

//COMPONENT
import VideosList from '../widgets/VideosList/VideosList';

const Videos = () => (
  <VideosList
    className='videos-list'
    type='card-videos'
    title={true}
    loadmore={true}
    video={true}
    start={0}
    end={3}
  />
)

export default Videos