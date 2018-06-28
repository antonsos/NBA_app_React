import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

//FIREBASE
import { firebaseArticles, firebaseLooper, firebaseTeams } from '../../../firebase';

//COMPONENTS
import Button from '../Button/Button';
import CardInfo from '../CardInfo/CardInfo';

class NewsList extends Component {
  constructor(props) {
    super(props);

    this.loadeMore = this.loadeMore.bind(this);

    this.state ={
      teams: [],
      items: [],
      start: this.props.start,
      end: this.props.start + this.props.end,
      amount: this.props.end
    }
  }

  componentWillMount() {
    this.request(this.state.start, this.state.end);
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
      // })
    }

    firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
    .then( snapshot => {
      const items = firebaseLooper(snapshot);

      this.setState({
        items: [...this.state.items, ...items],
        start,
        end
      })
    })
    .catch( err => {
      console.log(err)
    })

    // axios.get(`${URL}articles?_start=${start}&_end=${end}`)
    // .then( response => {
    //   this.setState({
    //     items: [...this.state.items, ...response.data],
    //     start,
    //     end
    //   })
    // });
  }

  loadeMore = () => {
    let end = this.state.end + this.state.amount

    this.request(this.state.end + 1, end);
  }

  renderNews = (type) => {
    let template = null;

    switch(type) {
      case ('card-news'):
        template = this.state.items.map((item, i) => {
          return (
            <CSSTransition
              classNames={{
                enter: 'transition__wraper',
                enterActive: 'transition__wraper-active'
              }}
              key={i}
              timeout={300}
            >
              <li className='newsList__item' >
                <Link
                  className='newsList__link'
                  to={`articles/${item.id}`}
                >
                  { 
                    this.props.img && (
                      <div
                        className='news-list__image'
                        style={{
                          backgroundImage: `url(/images/articles/${item.image})`
                        }}
                      >
                      </div>
                    )
                  }
                  <div className={this.props.img && 'news-list__desc--width'}>
                    <CardInfo 
                      teams={this.state.teams}
                      team={item.team}
                      date={item.date}
                    />
                    <h2 className='newsList__title'>{item.title}</h2>
                  </div>
                </Link>
              </li>
            </CSSTransition>
          )
        })  ;
        break;
      default:
        template = null;
    }

    return template;
  }

  render() {
    return (
      <div>
        <TransitionGroup
          component='ul'
          className='transition__list'
        >
          {this.renderNews(this.props.type)}
        </TransitionGroup>
        <Button
          type='loadeMore'
          loadeMore={this.loadeMore}
          name='Loade more'
        />
      </div>
    )
  }
}

export default NewsList;