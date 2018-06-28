import React, { Component } from 'react';

//COMPONENTS
import SlidedrTemplates from './SliderTemplates';

//FIREBASE
import { firebaseArticles, firebaseLooper } from '../../../firebase';

class NewsSlider extends Component {

  state = {
    news: []
  }

  componentWillMount() {
    firebaseArticles.limitToFirst(3).once('value')
    .then( snapshot => {
      const news = firebaseLooper(snapshot);

      this.setState({
        news
      })
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