import React, { Component } from 'react';
import axios from 'axios';

//CONFIG
import { URL } from '../../../../config';

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
    axios.get(`${URL}videos?id=${this.props.match.params.id}`)
    .then( response => {
      let article = response.data[0];

      axios.get(`${URL}teams?id=${article.team}`)
      .then( response => {
        this.setState({
          article,
          team: response.data
        })

        this.getRalated();
      })
    })
  }

  getRalated() {
    axios.get(`${URL}teams`)
    .then( response => {
      let teams = response.data;

      axios.get(`${URL}videos?q=${this.state.team[0].city}&_limit=3`)
      .then( response => {
        this.setState({
          teams,
          related: response.data
        })
      })
    })
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