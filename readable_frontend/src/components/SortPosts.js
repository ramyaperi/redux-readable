import React, {Component} from 'react';

 class  Sort extends Component {

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

  sortPosts = (event) => {
   var [sortKey, sortKind] = event.target.value.split(',');
   var posts = this.props.posts,
     posts = posts.sort(this.compareValues(sortKey, sortKind));

   //console.log(sortKey, sortKind, posts);

     this.props.setSortedPosts({
       sortKey:sortKey, sortKind:sortKind, posts:posts});
  }

render(){
   return (

     <select onChange={this.sortPosts} >
       <option value="voteScore,asc">voteScore Ascending</option>
       <option value="voteScore,desc">voteScore Descending</option>
       <option value="timestamp,asc">Time Ascending</option>
       <option value="timestamp,desc">Time Descending</option>
     </select>
   )
 }
 }

 export default Sort;
