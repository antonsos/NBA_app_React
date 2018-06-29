import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

//COMPONENTS
import Home from './components/Home/Home';
import NewsArticles from './components/Articles/News/Post/index';
import VideosArticles from './components/Articles/Videos/Video/index';
import Videos from './components/Videos/Videos';
import News from './components/News/News';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRouts from './components/AuthRouts/PrivateRouts';
import PublicRouts from './components/AuthRouts/PublicRouts';

//HOC
import Layout from './hoc/Layout/Layout';

class Routes extends Component {
  render() {
    return (
      <Layout user={this.props.user}>
        <Switch>
          <PublicRouts {...this.props} restricted={false} path="/" exact component={Home}/>
          <PublicRouts {...this.props} restricted={false} path="/news" exact component={News}/>
          <PublicRouts {...this.props} restricted={false} path="/articles/:id" exact component={NewsArticles}/>
          <PublicRouts {...this.props} restricted={false} path="/videos/:id" exact component={VideosArticles}/>
          <PublicRouts {...this.props} restricted={false} path="/videos" exact component={Videos}/>
          <PublicRouts {...this.props} restricted={true} path="/sign-in" exact component={SignIn}/>
          <PrivateRouts {...this.props} path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </Layout>
    )
  }
}


export default Routes;