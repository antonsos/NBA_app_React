import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//COMPONENTS
import Home from './components/Home/Home';
import NewsArticles from './components/Articles/News/Post/index';
import VideosArticles from './components/Articles/Videos/Video/index';
import Videos from './components/Videos/Videos';
import News from './components/News/News';
import SignIn from './components/SignIn/SignIn';

//HOC
import Layout from './hoc/Layout/Layout';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/news" exact component={News}/>
        <Route path="/articles/:id" exact component={NewsArticles}/>
        <Route path="/videos/:id" exact component={VideosArticles}/>
        <Route path="/videos" exact component={Videos}/>
        <Route path="/sign-in" exact component={SignIn}/>
        </Switch>
      </Layout>
    )
  }
}


export default Routes;