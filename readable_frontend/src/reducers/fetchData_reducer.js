import {
  FETCH_DATA_SUCCESS,HAS_ERRORED,IS_LOADING
} from '../actions/fetchData'

const initialstate = {
  categories : [],
  posts : [],
  //isLoading: false,
  //hasErrored : false,
}

export function fetchData(state = initialstate , action){
  const {data ,datatype, isLoading ,  hasErrored} = action
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return  {
      ...state,
      [datatype]: data,
      }
    case IS_LOADING:
      return {
            ...state,
             [datatype+"IsLoading"] :isLoading,
          }
    case HAS_ERRORED:
      return {
      ...state,
       [datatype+"HasErrored"]:hasErrored,
        }
    default :
      return state
  }

}

export default fetchData;
