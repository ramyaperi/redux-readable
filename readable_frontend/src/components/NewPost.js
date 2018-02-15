import React, { Component } from 'react';
import {Row,Button,Glyphicon} from 'react-bootstrap';
import { POST_POSTS,FETCH_CATEGORIES} from '../actions';
import { connect } from 'react-redux';
import {fetchData,postData } from '../util/utils.js';


class NewPosts extends Component {


    state = {
      newPostTitle:"",
      newPostbody:"",
      newAuthor:"",
      categorie:""
    }
    componentDidMount(){
           this.props.fetchData("http://localhost:3001/categories", FETCH_CATEGORIES);
        };
    handleChange = (event) =>{
      this.setState({[event.target.name]:event.target.value});
    }
    postPost=(event)=>{
      event.preventDefault();
      const data = {
        title:this.state.newPostTitle,
        body:this.state.newPostbody,
        author:this.state.newAuthor,
        category:this.state.categorie
      }
      this.props.postData(`http://localhost:3001/posts`, POST_POSTS , data);
      //<Redirect to="/"/>
      window.location.href = "/";
    }
render() {
    return(
      <form onSubmit={this.postPost}>
          <Row>
        <h3>New Post</h3>
        <h5>Title</h5>
      <textarea id="posttitle" style={{ border:'solid 2px'}} rows="1" cols="50" value={this.state.newPostTitle}  name="newPostTitle" onChange={this.handleChange}></textarea>
        <h5>Body</h5>
      <textarea id="postText" style={{ border:'solid 2px'}} rows="4" cols="50" value={this.state.newPostbody}  name="newPostbody" onChange={this.handleChange}></textarea>
        </Row>
          <Row>
            <h5>Author</h5>
      <input id="postAuthor" style={{ border:'solid 2px'}}  value={this.state.newAuthor} name="newAuthor" onChange={this.handleChange}></input>
      <h5>Categorie</h5>
      <select style={{ border:'solid 2px'}} onChange={this.handleChange} >
      {this.props.categories.map((categorie) => (
        <option name="categorie" key={categorie.name} value={categorie.name}>{categorie.name}</option>
      ))}
      </select>
    <Button type="submit" value="Submit" >
       <Glyphicon glyph="save"/>
       </Button>
       </Row>
       </form>
    )

  }

}

const mapStateToProps = (state) => {
    return {
      categories: state.fetchData.categories,      }
  };

  const mapDispatchToProps = (dispatch) => {
        return {
            fetchData: (url ,datatype) => dispatch(fetchData(url , datatype)),
            postData : (url ,datatype,data) => dispatch(postData(url , datatype,data))
        };
    };
export default connect(mapStateToProps, mapDispatchToProps)(NewPosts);
