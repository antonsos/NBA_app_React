import React, { Component } from 'react';
import axios from 'axios';

//CONFIG
import { URL } from '../../../../config';

//COMPONENTS
import TeamHeader from './TeamHeader';

class NewsArticles extends Component {

  state = {
    article: [],
    team: []
  }

  componentWillMount() {
    axios.get(`${URL}articles?id=${this.props.match.params.id}`)
    .then( response => {
      console.log(response.data[0])
      let article = response.data[0];

      axios.get(`${URL}teams?id=${article.team}`)
      .then( response => {
        this.setState({
          article,
          team: response.data
        })
      })
    })
  }

  render() {
    return (
      <div style={{
        minHeight: '85vh'
      }}>
        <TeamHeader 
          team={this.state.team[0]}
          date={this.state.article.date}
          author={this.state.article.author}
        />
        <div className='team-body'>
          <h1 className='team-body__title'>{this.state.article.title}</h1>

          <div 
            className='team-body__img'
            style={{
              backgroundImage: `url(/images/articles/${this.state.article.image})`
            }}
          ></div>

          <div className='team-body__text'>
            {this.state.article.body}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsArticles;