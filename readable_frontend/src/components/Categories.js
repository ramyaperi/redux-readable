import React, {Component} from 'react';
import {connect} from 'react-redux'
import {FETCH_POSTS} from '../actions';
import {fetchData} from '../util/utils.js';
import {
  Row,
  Col
} from 'react-bootstrap';
//even a function will do but using component in case of future changes
class Categories extends Component {
  //const Categories = function(props)  {
  state = {};

  componentDidMount() {
    this.props.fetchData(`http://localhost:3001/${this.props.match.params.categorie}/posts`, FETCH_POSTS);
    //this.setState(this.state);
  };

  render() {
    if (this.props.postsHasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.postsIsLoading || this.props.posts === undefined) {
      return <p>Loading…</p>;
    }

    return (
    //const categorie = this.props.location.state.categorie,
    <div className="categories">
      <h2>
        {this.props.location.state.categorie}
      </h2>
      <ol>
        {
          this.props.posts.map((post) => (<li key={post.id}>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
              <Row>
                <Col md={4}> </Col>
                <Col md={4}> Author : {post.author}</Col>
                <Col md={4}> Comments: {post.commentCount} </Col>
              </Row>
          </li>))
        }
      </ol>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {posts: state.fetchData.posts, postsIsLoading: state.fetchData.postsIsLoading, postsHasErrored: state.fetchData.postsHasErrored}
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchData: (url, datatype) => dispatch(fetchData(url, datatype))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
