import React, {Component} from 'react';
import {FETCH_CATEGORIES, FETCH_POSTS, POST_POSTS} from '../actions';
import {connect} from 'react-redux'
import {
  Grid,
  Row,
  Col,
  ButtonGroup,
  Button,
  Glyphicon
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {fetchData, postData,putData, deleteData} from '../util/utils.js';

//even a function will do but using component in case of future changes
class Homepage extends Component {

  state = {
    sortKey: "voteScore",
    sortKind: "desc",
    posts: this.props.posts,
    refresh: "",
    displayeditpost: "none",
    editTitle: "",
    editPost: ""
  };


  componentDidMount() {
    this.props.fetchData("http://localhost:3001/categories", FETCH_CATEGORIES);
    this.props.fetchData("http://localhost:3001/posts", FETCH_POSTS);
  };

  compareValues = (key, order = 'asc') => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase()
        : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase()
        : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc')
        ? (comparison * -1)
        : comparison);
    };
  }

  deletePost = (id) => {
    this.props.deleteData(`http://localhost:3001/posts/${id}`, POST_POSTS);
    this.props.fetchData("http://localhost:3001/posts", FETCH_POSTS);
    this.setState(this.state);
  }
  displayeditpost = (id) => {
    this.props.posts.map((post) => {
      if(post.id === id){
        this.setState({
          editTitle:post.title,
          editPost:post.body,
          displayeditpost: "block"});
      }
    })

  }

  editPost = (id) => {

    var data = {
      "title": this.state.editTitle,
      "body": this.state.editPost
    }
    this.props.putData(`http://localhost:3001/posts/${id}`, POST_POSTS, data);

    //this.props.post.title = this.state.editTitle;
    //this.props.post.body = this.state.editPost;
    this.props.posts.map((post) => {
      if(post.id === id){
        post.title = this.state.editTitle;
        post.body = this.state.editPost;
      }
    });
    this.setState({displayeditpost: "none"});

  }

  upVote(id) {
    //event.preventDefault();
    var data = {
      "option": "upVote"
    }
    this.props.postData(`http://localhost:3001/posts/${id}`, POST_POSTS, data);
    this.props.posts.map((post) => {
      if (post.id === id) {
        post.voteScore++;
      }
    });
    this.setState(this.state);

  }
  downVote(id) {
    var data = {
      "option": "downVote"
    }
    this.props.postData(`http://localhost:3001/posts/${id}`, POST_POSTS, data);
    this.props.posts.map((post) => {
      if (post.id === id) {
        post.voteScore--;
      }
    });
    this.setState(this.state);

  }
  sortPosts = (event) => {
    var [sortKey, sortKind] = event.target.value.split(',');
    var posts = this.props.posts,
      posts = posts.sort(this.compareValues(sortKey, sortKind));

    console.log(sortKey, sortKind, posts);
    this.setState({sortKey, sortKind, posts});

  }
  handleChange = (event) => {
    //console.log([event.target.name] : event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {
    //  console.log(this.state.posts)
    if (this.props.categoriesHasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.categoriesIsLoading) {
      return <p>Loading…</p>;
    }

    return (
    //console.log(this.props.categories),

    <div className="homepage">
      <Grid>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Link to={{pathname:`/newPost`, state:{categories: this.props.categories} }}>New Post</Link>
          </Col>
          <Col md={4}>
            <select onChange={this.sortPosts} value={this.state.sortKey}>
              <option value="voteScore,asc">voteScore Ascending</option>
              <option value="voteScore,desc">voteScore Descending</option>
              <option value="timestamp,asc">Time Ascending</option>
              <option value="timestamp,desc">Time Descending</option>
            </select>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={2} className="categories col-3">
            <h2>
              <u>Categories</u>
            </h2>
            <ol>
              {
                this.props.categories.map((categorie) => (<li key={categorie.path}>
                  <Link to={{
                      pathname: `/${categorie.name}`,
                      state: {
                        categorie: categorie.name
                      }
                    }}>
                    <h3>{categorie.name}
                    </h3>
                  </Link>
                </li>))
              }
            </ol>
          </Col>
          <Col className="posts">
            <h2>
              <u>Posts</u>
            </h2>
            <ol>
              {
                this.props.posts.map((post) => (<li key={post.id}>
                  <Row>
                    <Col md={8}>
                      <Link to={{
                          pathname: `/${post.category}/${post.id}`,
                          state: {
                            post: post
                          }
                        }}>
                        <h3>{post.title}</h3>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <ButtonGroup>
                        <Button onClick={() => this.displayeditpost(post.id)}>
                          <Glyphicon glyph="pencil"/>
                        </Button>
                        <Button onClick={() => this.deletePost(post.id)}>
                          <Glyphicon glyph="trash"/>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <div>{post.body}</div>
                  <Row>
                    <Col md={4}> </Col>
                    <Col md={4}> Author : {post.author}</Col>
                    <Col md={4}> Comments: {post.commentCount} </Col>
                  </Row>
                  <div>votes: {post.voteScore}</div>
                    <div style={{
                        display: this.state.displayeditpost
                      }}>
                      <Row>
                        <h5>title</h5>
                        <input id="postTitle" style={{
                            border: 'solid 2px'
                          }} value={this.state.editTitle} name="editTitle" onChange={this.handleChange}></input>
                      </Row>
                      <Row>
                        <h5>post</h5>
                        <textarea id="postBody" rows="4" cols="50" style={{
                            border: 'solid 2px'
                          }} value={this.state.editPost} name="editPost" onChange={this.handleChange}></textarea>

                        <Button type="submit" value="Submit" onClick={()=>this.editPost(post.id)}>
                          <Glyphicon glyph="save"/>
                        </Button>
                      </Row>
                    </div>
                  <Button onClick={() => this.upVote(post.id)}>
                    <Glyphicon glyph="thumbs-up"/>
                  </Button>
                  <Button onClick={() => this.downVote(post.id)}>
                    <Glyphicon glyph="thumbs-down"/>
                  </Button>

                </li>))
              }
            </ol>

          </Col>
        </Row>
      </Grid>
    </div>);
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.fetchData.categories,
    categoriesIsLoading: state.fetchData.categoriesIsLoading,
    categoriesHasErrored: state.fetchData.categoriesHasErrored,
    posts: state.fetchData.posts,
    postsIsLoading: state.fetchData.postsIsLoading,
    postsHasErrored: state.fetchData.postsHasErrored
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchData: (url, datatype) => dispatch(fetchData(url, datatype)),
    //fetchposts: (url) => dispatch(fetchData(url))
    postData: (url, datatype, data) => dispatch(postData(url, datatype, data)),
    deleteData: (url, datatype) => dispatch(deleteData(url, datatype)),
    putData: (url, datatype, data) => dispatch(putData(url, datatype, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
