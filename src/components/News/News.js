import React from 'react';

//COMPONENTS
import NewsSlider from '../widgets/NewsSlider/NewsSlider';
import NewsList from '../widgets/NewsList/NewsList';


export default () => {
  return (
    <div>
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
        img={true}
        start={3}
        end={3}
      />
    </div>
  )
}
