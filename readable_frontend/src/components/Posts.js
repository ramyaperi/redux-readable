import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  FETCH_POSTS,FETCH_COMMENTS,POST_COMMENTS,POST_POSTS} from '../actions';
import {Grid,Row,Col,ButtonGroup,Button,Glyphicon} from 'react-bootstrap';
import {fetchData ,postData,putData,deleteData} from '../util/utils.js';

//even a function will do but using component in case of future changes
class Posts extends Component {

  state = {
    parentId : "",
    newComment : "",
    newAuthor : "",
    displayeditpost:"none",
    editTitle:"",
    editPost:"",
  };

  componentWillMount(){
    if(this.props.location.state != undefined){
      this.setState({parentId:this.props.location.state.post.id ,
        editTitle:this.props.location.state.post.title,
        editPost:this.props.location.state.post.body,});
      }
    }

    componentDidMount(){
      console.log(this.state.parentId);
      this.props.fetchData(`http://localhost:3001/posts/${this.state.parentId}`, FETCH_POSTS);
      this.props.fetchData(`http://localhost:3001/posts/${this.state.parentId}/comments`, FETCH_COMMENTS);

    };
    upVote(id){
      //event.preventDefault();
      var data ={
        "option":"upVote"
      }
      this.props.postData(`http://localhost:3001/comments/${id}`, POST_COMMENTS , data);
      this.props.comments.map((comment)=> {
        if(comment.id==id){
          comment.voteScore++;
        }
      });
      this.setState(this.state);

    }
    downVote(id){
      var data ={
        "option":"downVote"
      }
      this.props.postData(`http://localhost:3001/comments/${id}`, POST_COMMENTS , data);
      this.props.comments.map((comment)=> {
        if(comment.id==id){
          comment.voteScore--;
        }
      });
      this.setState(this.state);

    }
    displayeditpost= () =>{
      this.setState({displayeditpost : "block"});
    }

    editPost= () =>{

      var data = {
        "title": this.state.editTitle,
        "body": this.state.editPost
      }
      this.props.putData(`http://localhost:3001/posts/${this.state.parentId}`, POST_POSTS , data);

      this.props.post.title = this.state.editTitle;
      this.props.post.body = this.state.editPost;
      this.setState({displayeditpost : "none"});

    }

    editComment =(id) =>{
      var text = this.props.comments.find(function(comment){return comment.id === id;});
      var newComment = prompt("Edit your comment ..",text.body);
      var data = {
        "body": newComment
      }
      this.props.putData(`http://localhost:3001/comments/${id}`, POST_COMMENTS , data);
      this.props.comments.find(function(comment){ if(comment.id === id)
        {
          comment.body = newComment;
        };})
      this.setState(this.state);
    }
    deleteComment = (id) =>{
      this.props.deleteData(`http://localhost:3001/comments/${id}`, POST_COMMENTS);
      this.props.fetchData(`http://localhost:3001/posts/${this.state.parentId}/comments`, FETCH_COMMENTS);

      this.setState(this.state);
    }
    handleChange = (event) =>{
      console.log([event.target.name]:event.target.value)
      this.setState({[event.target.name]:event.target.value});
    }
    postComment=(event)=>{
      event.preventDefault();
      const data = {
        body:this.state.newComment,
        author:this.state.newAuthor,
        parentId: this.state.parentId,
      }
      this.props.postData(`http://localhost:3001/comments`, POST_COMMENTS , data);
      this.props.fetchData(`http://localhost:3001/posts/${this.state.parentId}/comments`, FETCH_COMMENTS);

      this.setState({
        newComment : "",
        newAuthor : "",});
      }
      render() {
        const { post,comments } = this.props;
        if (this.props.commentsHasErrored) {
          return <p>Sorry! There was an error loading the Comments</p>;
          }

          if (this.props.commentsIsLoading || this.props.comments===undefined ) {
            return <p>Loading…</p>;
            }

            console.log(this.state.editTitle)
            return (

              <div className="posts" >
                <Grid>
                  <Row>
                    <Col md={10}>
                      <h2>
                        {post.title}
                      </h2>
                    </Col>
                    <Col md={2}>
                      <ButtonGroup>
                        <Button  onClick={this.displayeditpost}>
                          <Glyphicon glyph="pencil"/>
                        </Button>
                      
                      </ButtonGroup>
                    </Col>

                  </Row>

                  <Row>
                    <h5>
                      {post.body}
                    </h5>
                  </Row>
                  <div></div>
                  <Row>
                    <Col md={4}>Author : {post.author}</Col>
                    <Col md={4}>Time : {post.timestamp}</Col>
                    <Col md={4}>Votes: {post.voteScore}</Col>
                  </Row>

                  <div style={{display:this.state.displayeditpost}}>
                    <Row>
                      <h5>title</h5>
                      <input id="postTitle" style={{ border:'solid 2px'}} value={this.state.editTitle} name="editTitle" onChange={this.handleChange}></input>
                    </Row>
                    <Row>
                      <h5>post</h5>
                      <textarea id="postBody" rows="4" cols="50" style={{ border:'solid 2px'}} value={this.state.editPost}  name="editPost" onChange={this.handleChange}></textarea>

                      <Button type="submit" value="Submit" onClick={this.editPost} >
                        <Glyphicon glyph="save"/>
                      </Button>
                    </Row>
                  </div>
                  <Row>
                    <h4><u>Comments</u></h4>
                  </Row>
                  <ol>
                    {
                      comments.map((comment) => (
                        <li key={comment.id}>
                          <Row>
                            <Col md={2} ></Col>
                            <Col md={6} >{comment.body}</Col>
                            <Col md={2} >
                              <ButtonGroup>
                                <Button  onClick={()=>this.editComment(comment.id)}>
                                  <Glyphicon glyph="pencil"/>
                                </Button>
                                <Button onClick={()=>this.deleteComment(comment.id)}>
                                  <Glyphicon glyph="trash"  />
                                </Button>
                              </ButtonGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={2}></Col>
                            <Col md={4}> author: {comment.author}</Col>
                            <Col md={2}>Votes: {comment.voteScore}</Col>
                            <Button onClick={()=>this.upVote(comment.id)}>
                              <Glyphicon glyph="thumbs-up"/>
                            </Button>
                            <Button onClick={()=>this.downVote(comment.id)}>
                              <Glyphicon glyph="thumbs-down"  />
                            </Button>
                          </Row>
                        </li>
                      ))}
                    </ol>

                    <div >
                      <Row>
                        <h5>Comment</h5>
                        <textarea id="commentsText" rows="4" cols="50" style={{ border:'solid 2px'}} value={this.state.newComment}  name="newComment" onChange={this.handleChange}></textarea>
                      </Row>
                      <Row>
                        <h5>Author</h5>
                        <input id="commentsAuthor" style={{ border:'solid 2px'}} value={this.state.newAuthor} name="newAuthor" onChange={this.handleChange}></input>

                        <Button type="submit" value="Submit" onClick={this.postComment}>
                          <Glyphicon glyph="save"/>
                        </Button>
                      </Row>
                    </div>



                  </Grid>
                </div>

              )}
            }

            const mapStateToProps = (state) => {
              return {
                post: state.fetchData.posts,
                postsIsLoading : state.fetchData.postsIsLoading,
                postsHasErrored : state.fetchData.postsHasErrored,
                comments : state.fetchData.comments,
                commentsIsLoading : state.fetchData.commentsIsLoading,
                commentsHasErrored : state.fetchData.commentsHasErrored,
                commentsIsPosted : state.postData.commentsIsLoading,

              }
            };

            const mapDispatchToProps = (dispatch) => {
              return {
                fetchData: (url ,datatype) => dispatch(fetchData(url , datatype)),
                postData : (url ,datatype,data) => dispatch(postData(url , datatype,data)),
                putData : (url ,datatype,data) => dispatch(putData(url , datatype,data)),
                deleteData : (url ,datatype) => dispatch(deleteData(url , datatype)),
              };
            };

            export default connect(mapStateToProps, mapDispatchToProps)(Posts);
