import { combineReducers } from 'redux'

import {fetchData} from './fetchData_reducer'
import {postData} from './postData_reducer'


export default combineReducers({
  fetchData,
  postData,
  //comments,
})

//export default fetchData;
