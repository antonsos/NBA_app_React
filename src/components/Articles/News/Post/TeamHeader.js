import React from 'react';

//COMPONENTS
import TeamInfo from '../../Elements/TeamInfo';
import PostData from '../../Elements/PostData';

const TeamHeader = (props) => {

  const teamInfo = (team) => {
    return  team ?
      (
        <TeamInfo team={team} />
      )
      :
      null;
  };

  const postData = (date, author) => {
    return <PostData data={{
      date,
      author
    }}
    />
  };

  return (
    <div>
      {teamInfo(props.team)}
      {postData(props.date, props.author)}
    </div>
  )
}

export default TeamHeader;