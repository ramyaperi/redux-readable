import React, {Component} from 'react';
import '../util/App.css';
import {Route, withRouter,Switch} from 'react-router-dom';
import Categories from './Categories.js';
import Posts from './Posts'
import Homepage from './Homepage.js';
import NewPosts from './NewPost.js';
import NotFound from './NotFound';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';

class App extends Component {


  toHomepage() {
    window.location.href = "/";
  }

  render() {
    return (<div className="App">
      <Row>
        <Col md={2}>
          <Button onClick={this.toHomepage}>
            <Glyphicon glyph="home"/>
          </Button>
        </Col>
      </Row>
      <Switch>
      <Route exact path='/' render={() => (<Homepage/>)}/>
      <Route exact path='/newPost' component={NewPosts}/>
      <Route exact path='/notfound' component={NotFound} />
      <Route exact  path='/:categorie' component={Categories}/>
      <Route exact  path='/:category/:postID' component={Posts}/>
      <Route component={NotFound} />
      </Switch>
    </div>);
  }
}
export default withRouter(App);
