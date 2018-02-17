import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {FETCH_CATEGORIES} from '../actions';
import {Link} from 'react-router-dom';
import {fetchData} from '../util/utils.js';
import {connect} from 'react-redux';

 class  CategorieList extends Component {

    

   componentDidMount(){
     this.props.fetchData("http://localhost:3001/categories", FETCH_CATEGORIES);
   }

   render(){

     if (this.props.categoriesHasErrored) {
       return <p>Sorry! There was an error loading the items</p>;
     }

     if (this.props.categoriesIsLoading) {
       return <p>Loading…</p>;
     }

     return(
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
     )
   }
 }
 const mapStateToProps = (state) => {
   return {
     categories: state.fetchData.categories,
     categoriesIsLoading: state.fetchData.categoriesIsLoading,
     categoriesHasErrored: state.fetchData.categoriesHasErrored,
   }
 };

 const mapDispatchToProps = (dispatch) => {
   return {

     fetchData: (url, datatype) => dispatch(fetchData(url, datatype)),
     };
 };

 export default connect(mapStateToProps, mapDispatchToProps)(CategorieList);
