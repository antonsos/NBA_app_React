import React, { Component } from 'react';

//FIREBASE
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';

//COMPONENTS
import VideoHeader from './VideoHeader';
import VideoRelated from '../../../widgets/VideosList/VideosRelated/VideoRelated';

class VideosArticles extends Component {

  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  }

  componentWillMount() {

    firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
    .then( snapshot => {
      let article = snapshot.val();

      firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
      .then( snapshot => {
        const team = firebaseLooper(snapshot);

        this.setState({
          article,
          team
        })

        this.getRalated();
      })
    })

    // axios.get(`${URL}videos?id=${this.props.match.params.id}`)
    // .then( response => {
    //   let article = response.data[0];

    //   axios.get(`${URL}teams?id=${article.team}`)
    //   .then( response => {
    //     this.setState({
    //       article,
    //       team: response.data
    //     })

    //     this.getRalated();
    //   })
    // })
  }

  getRalated = () => {

    firebaseTeams.once('value')
    .then( snapshot => {
      let teams = firebaseLooper(snapshot);

      firebaseVideos
      .orderByChild('team')
      .equalTo(this.state.article.team)
      .limitToFirst(3)
      .once('value')
      .then( snapshot => {
        const related = firebaseLooper(snapshot);

        this.setState({
          teams,
          related
        })
      })
    })

    // axios.get(`${URL}teams`)
    // .then( response => {
    //   let teams = response.data;

    //   axios.get(`${URL}videos?q=${this.state.team[0].city}&_limit=3`)
    //   .then( response => {
    //     this.setState({
    //       teams,
    //       related: response.data
    //     })
    //   })
    // })
  }

  render() {
    return (
      <div style={{
        minHeight: '85vh'
      }}>
        <VideoHeader 
          team={this.state.team[0]}
          date={this.state.article.date}
          author={this.state.article.author}
        />
        <div className='team-body team-body--border-top team-body--padding'>
          <h1 
            className='team-body__title team-body__title--border-bottom'
          >{this.state.article.title}</h1>

          <iframe 
            title="videoplayer"
            width="100%"
            height="300px"
            frameBorder="none"
            src={`https://www.youtube.com/embed/${this.state.article.url}`}
          ></iframe>

          <VideoRelated
            videos={this.state.related}
            teams={this.state.teams}
          />
        </div>
      </div>
    )
  }
}

export default VideosArticles;