import React from 'react';

//MOMENT
import moment from 'moment';

const PostData = (props) => {

  const formatDate = (date) => {
    return moment(date).format(' DD-MM-YYYY')
  }

  return (
    <div className='post-data'>
      <div className='post-data__date'>
        Date: <span>{formatDate(props.data.date)}</span>
      </div>
      <div className='post-data__author'>
        Author: <span>{props.data.author}</span>
      </div>
    </div>
  )
}


export default PostData;