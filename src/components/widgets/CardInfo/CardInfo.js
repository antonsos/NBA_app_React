import React from 'react';
import FontAwesome from 'react-fontawesome';

const CardInfo = (props) => {

  const teamName = (teams, team) => {
    let data = teams.find(item => {
      return item.id === team;
    });

    if(data) {
      return data.name;
    }
  }

  return (
    <div className='card-info'>
      <span className='card-info__team'>
        {teamName(props.teams, props.team)}
      </span>
      <span className='card-info__date'>
        <FontAwesome name='clock' />
        {props.date}
      </span>
    </div>
  )
}

export default CardInfo;