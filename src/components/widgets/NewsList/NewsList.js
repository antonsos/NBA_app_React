import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

//CONFIG
import { URL } from '../../../config';

//COMPONENTS
import Button from '../Button/Button';
import CardInfo from '../CardInfo/CardInfo';

class NewsList extends Component {
  constructor(props) {
    super(props);

    this.renderNews = this.renderNews.bind(this);
    this.request = this.request.bind(this);
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

  request(start, end) {

    if(this.state.teams.length < 1) {
      axios.get(`${URL}teams`)
      .then( response => {
        this.setState({
          teams: response.data
        })
      })
    }

    axios.get(`${URL}articles?_start=${start}&_end=${end}`)
    .then( response => {
      this.setState({
        items: [...this.state.items, ...response.data]
      })
    });
  }

  loadeMore() {
    this.setState((prevState) => ({
      end: prevState.end + this.state.amount
    }))

    this.request(this.state.end, this.state.end + this.state.amount);
  }

  renderNews(type) {
    let template = null;

    switch(type) {
      case ('card-home'):
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
                  <CardInfo 
                    teams={this.state.teams}
                    team={item.team}
                    date={item.date}
                  />
                  <h2 className='newsList__title'>{item.title}</h2>
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