import React, {Component} from 'react';
import '../util/App.css';
import {Route, withRouter} from 'react-router-dom';
import Categories from './Categories.js';
import Posts from './Posts'
import Homepage from './Homepage.js';
import NewPost from './NewPost.js';
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
      <Route exact="exact" path='/' render={() => (<Homepage/>)}/>

      <Route path='/byCategories/:categorie' component={Categories}/>
      <Route path='/byPost/:postID' component={Posts}/>
      <Route path='/newPost' render={() => (<NewPost/>)}/>
    </div>);
  }
}
export default withRouter(App);
