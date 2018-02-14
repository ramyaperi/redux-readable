import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FETCH_POSTS} from '../actions';
import {fetchData } from '../util/utils.js';


//even a function will do but using component in case of future changes
class Categories extends Component {
 //const Categories = function(props)  {

 componentDidMount(){
        this.props.fetchData(`http://localhost:3001/${this.props.location.state.categorie}/posts`, FETCH_POSTS);
     };

     render() {
    return (
      //const categorie = this.props.location.state.categorie,

    <div className="categories" >
      <h2>
        {this.props.location.state.categorie}
      </h2>
      <ol>
        {
          this.props.posts.map((post) => (
          <li key={post.id}>
              <h3>{post.title}</h3>
               <div>{post.body}</div>
          </li>
      ))}
      </ol>
    </div>

    )}
  }

  const mapStateToProps = (state) => {
      return {

          posts: state.posts,
          postsIsLoading : state.postsIsLoading,
          postsHasErrored : state.postsHasErrored,
        }
    };

  const mapDispatchToProps = (dispatch) => {
        return {

            fetchData: (url ,datatype) => dispatch(fetchData(url , datatype)),
        };
    };

  export default connect(mapStateToProps, mapDispatchToProps)(Categories);
