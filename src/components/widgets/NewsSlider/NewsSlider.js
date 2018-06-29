import React, { Component } from 'react';

//COMPONENTS
import SlidedrTemplates from './SliderTemplates';

//FIREBASE
import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';

class NewsSlider extends Component {

  state = {
    news: []
  }

  componentWillMount() {
    firebaseArticles.limitToFirst(3).once('value')
    .then( snapshot => {
      const news = firebaseLooper(snapshot);

      const asyncFunction = (item, i, cb) => {
        firebase.storage().ref('images')
        .child(item.image).getDownloadURL()
        .then( url => {
          news[i].image = url;

          cb()
        })
      }

      let requests = news.map( (item, i) => {
        return new Promise( resolve => {
          asyncFunction(item, i, resolve)
        })
      })

      Promise.all(requests).then(() => {
        this.setState({
          news
        })
      })

      // news.forEach( (item, i) => {
      //   firebase.storage().ref('images')
      //   .child(item.image).getDownloadURL()
      //   .then( url => {
      //     news[i].image = url;

      //     this.setState({
      //       news
      //     })
      //   })
      // })
    })

    // axios.get(`${URL}articles?_start=${this.props.start}&_end=${this.props.end}`)
    // .then( response => {
    //   this.setState({
    //     news: response.data
    //   })
    // });
  }

  render() {
    return (
      <div>
        <SlidedrTemplates 
          data={this.state.news}
          type={this.props.type}
          settings={this.props.settings}
        />
      </div>
    )
  }
}

export default NewsSlider;