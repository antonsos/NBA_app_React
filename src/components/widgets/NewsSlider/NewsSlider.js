import React, { Component } from 'react';
import axios from 'axios';

//COMPONENTS
import SlidedrTemplates from './SliderTemplates';

//CONFIG
import { URL } from '../../../config';

class NewsSlider extends Component {

  state = {
    news: []
  }

  componentWillMount() {
    axios.get(`${URL}articles?_start=${this.props.start}&_end=${this.props.end}`)
    .then( response => {
      this.setState({
        news: response.data
      })
    });
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