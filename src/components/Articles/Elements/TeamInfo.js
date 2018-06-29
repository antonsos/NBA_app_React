import React from 'react';

const TeamInfo = (props) => {
  return (
    <header className='team-header'>
      <div 
        className='team-header__logo'
        style={{
          backgroundImage: `url(/images/teams/${props.team.logo})`
        }}
      ></div>
      <div className='team-header__article'>
        <div className='team-header__location'>{props.team.city} {props.team.name}</div>

        <div className='team-header__game'>
          <strong>
            W:{props.team.stats[0].wins}-L:{props.team.stats[0].defeats}
          </strong>
        </div>
      </div>
    </header>
  )
}


export default TeamInfo;