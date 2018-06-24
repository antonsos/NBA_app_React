import React from 'react';

//COMPONENTS
import NewsSlider from '../widgets/NewsSlider/NewsSlider';
import NewsList from '../widgets/NewsList/NewsList'

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
      className='newsList'
      type='card-home'
      loadmore={true}
      start={3}
      end={3}
    />
  </main>
);

export default Home;
