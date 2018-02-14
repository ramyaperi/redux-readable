export const HAS_ERRORED = 'HAS_ERRORED'
export const IS_LOADING = 'IS_LOADING'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_CATEGORIES = 'categories'
export const FETCH_POSTS = 'posts'
export const FETCH_COMMENTS = 'comments'

export function hasErrored(hasErrored,datatype) {
    return {
        type: HAS_ERRORED,
        datatype : datatype,
        hasErrored,
    };
}

export function isLoading(isLoading,datatype) {
    return {
        type: IS_LOADING,
        datatype : datatype,
        isLoading,
    };
}

export function fetchDataSuccess(data ,datatype){

    if(datatype  === FETCH_CATEGORIES){
      data = data.categories
    }

    return {
        type: FETCH_DATA_SUCCESS,
        datatype : datatype,
        data,
    };
}
