import React from 'react';

const PostData = (props) => {
  return (
    <div className='post-data'>
      <div className='post-data__date'>
        Date: <span>{props.data.date}</span>
      </div>
      <div className='post-data__author'>
        Author: <span>{props.data.author}</span>
      </div>
    </div>
  )
}


export default PostData;