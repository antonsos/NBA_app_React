import React, { Component } from 'react';

//FIREBASE
import { firebase, firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';

//COMPONENTS
import TeamHeader from './TeamHeader';

class NewsArticles extends Component {

  state = {
    article: [],
    team: [],
    imageURL: ''
  }

  componentWillMount() {
    firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
    .then( snapshot => {
      let article = snapshot.val();

      firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
      .then( snapshot => {
        const team = firebaseLooper(snapshot);

        this.setState({
          article,
          team
        })

        this.getImageURL(article.image)
      })
    })

    // axios.get(`${URL}articles?id=${this.props.match.params.id}`)
    // .then( response => {
    //   console.log(response.data[0])
    //   let article = response.data[0];

    //   axios.get(`${URL}teams?id=${article.team}`)
    //   .then( response => {
    //     this.setState({
    //       article,
    //       team: response.data
    //     })
    //   })
    // })
  }

  getImageURL = (filename) => {
    firebase.storage().ref('images')
    .child(filename).getDownloadURL()
    .then( url => {
        this.setState({
            imageURL: url
        })
    })
  }

  render() {
    return (
      <div style={{
        minHeight: '87vh'
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
              backgroundImage: `url(${this.state.imageURL})`
            }}
          ></div>

          <div 
            className='team-body__text'
            dangerouslySetInnerHTML={{
              __html:this.state.article.body
            }}
          >
          </div>
        </div>
      </div>
    )
  }
}

export default NewsArticles;