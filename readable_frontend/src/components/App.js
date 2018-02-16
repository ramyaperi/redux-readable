import React, {Component} from 'react';
import '../util/App.css';
import {Route, withRouter} from 'react-router-dom';
import Categories from './Categories.js';
import Posts from './Posts'
import Homepage from './Homepage.js';
import NewPosts from './NewPost.js';
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
      <Route exact path='/' render={() => (<Homepage/>)}/>
      <Route exact path='/newPost' component={NewPosts}/>
      <Route exact  path='/:categorie' component={Categories}/>
      <Route exact  path='/:category/:postID' component={Posts}/>

    </div>);
  }
}
export default withRouter(App);
