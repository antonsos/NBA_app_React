import React, { Component } from 'react';

//FIREBASE
import { firebaseVideos, firebaseLooper, firebaseTeams } from '../../../firebase';

//COMPONENTS
import Button from '../Button/Button';
import VideosTemplate from './VideosTemplate/VideosTemplate';

class VideosList extends Component {
  constructor(props) {
    super(props);

    this.loadeMore = this.loadeMore.bind(this)

    this.state = {
      teams: [],
      videos: [],
      start: this.props.start,
      end: this.props.start + this.props.end,
      amount: this.props.end
    }
  }

  request = (start, end) => {
    if(this.state.teams.length < 1) {

      firebaseTeams.once('value')
      .then( snapshot => {
        const teams = firebaseLooper(snapshot);

        this.setState({
          teams
        })
      })

      // axios.get(`${URL}teams`)
      // .then( response => {
      //   this.setState({
      //     teams: response.data
      //   })
      // });
    }

    firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
    .then( snapshot => {
      const videos = firebaseLooper(snapshot);

      this.setState({
        videos: [...this.state.videos, ...videos],
        start,
        end
      })
    })
    .catch( err => {
      console.log(err)
    })

    // axios.get(`${URL}videos?_start=${start}&_end=${end}`)
    // .then( response => {
    //   this.setState({
    //     videos: [...this.state.videos, ...response.data],
    //     start,
    //     end
    //   })
    // });
  }

  componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  renderVideos = () => {
    let template = null;

    switch(this.props.type) {
      case('card-videos'):
        template = <VideosTemplate videos={this.state.videos} teams={this.state.teams} />
        break;
      default:
        template = null;
    }

    return template;
  }

  loadeMore = () => {
    let end = this.state.end + this.state.amount;
    
    this.request(this.state.end + 1, end)
  }

  render() {
    return (
      <div 
        className={
          this.props.video
          ? 
          'videos-list__wrapper videos-list__wrapper--height' 
          : 
          'videos-list__wrapper'
        }
      >
        { 
          this.props.title && 
          <h3 className='videos-list__title'><strong>NBA</strong> Videos</h3> 
        }
        { this.renderVideos() }
        {
          this.props.loadmore ?
          <Button 
            type='loadeMore'
            loadeMore={this.loadeMore}
            name='Loade more videos'
          />
          :
          <Button 
            type='linkTo'
            name='More video'
            linkTo='/videos'
          />
        }
      </div>
    )
  }
}

export default VideosList;