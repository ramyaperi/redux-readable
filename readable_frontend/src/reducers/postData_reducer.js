import {
POST_DATA_SUCCESS,POST_HAS_ERRORED,POST_IS_LOADING
} from '../actions/postData'

const initialstate = {
  //categories : [],
  //posts : [],
  //isLoading: false,
  //hasErrored : false,
}

export function postData(state = initialstate , action){
  const {data ,datatype, isLoading ,  hasErrored} = action
  switch (action.type) {
    case POST_DATA_SUCCESS:
      return  {
      ...state,
      [datatype]: data,
      }
    case POST_IS_LOADING:
      return {
            ...state,
             [datatype+"IsLoading"] :isLoading,
          }
    case POST_HAS_ERRORED:
      return {
      ...state,
       [datatype+"HasErrored"]:hasErrored,
        }
    default :
      return state
  }

}

export default postData;
