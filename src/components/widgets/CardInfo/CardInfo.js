import React from 'react';
import FontAwesome from 'react-fontawesome';

//MOMENT
import moment from 'moment';

const CardInfo = (props) => {

  const teamName = (teams, team) => {
    let data = teams.find(item => {
      return item.teamId === team;
    });

    if(data) {
      return data.name;
    }
  }

  const formatDate = (date) => {
    return moment(date).format(' DD-MM-YYYY')
  }

  return (
    <div className='card-info'>
      <span className='card-info__team'>
        {teamName(props.teams, props.team)}
      </span>
      <span className='card-info__date'>
        <FontAwesome name='clock' />
        {formatDate(props.date)}
      </span>
    </div>
  )
}

export default CardInfo;