import React from 'react';

//COMPONENTS
import NewsSlider from '../widgets/NewsSlider/NewsSlider';
import NewsList from '../widgets/NewsList/NewsList';
import VideosList from '../widgets/VideosList/VideosList';

const Home = () => (
  <main className='home-main'>
    <NewsSlider
      type='featured'
      start={0}
      end={3}
      settings={{
        dots: false
      }}
    />
    <NewsList 
      className='news-list'
      type='card-news'
      loadmore={true}
      start={3}
      end={3}
    />

    <VideosList
      className='videos-list'
      type='card-videos'
      title={true}
      loadmore={true}
      start={0}
      end={3}
    />
  </main>
);

export default Home;
