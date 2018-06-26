import React from 'react';

//COMPONENTS
import TeamInfo from '../../Elements/TeamInfo';

const VideoHeader = (props) => {

  const teamInfo = (team) => {
    return  team ?
      (
        <TeamInfo team={team} />
      )
      :
      null;
  };

  return (
    <div>
      {teamInfo(props.team)}
    </div>
  )
}

export default VideoHeader;