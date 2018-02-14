export const POST_HAS_ERRORED = 'POST_HAS_ERRORED'
export const POST_IS_LOADING = 'POST_IS_LOADING'
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS'
export const POST_POSTS = 'posts'
export const POST_COMMENTS = 'comments'


export function posthasErrored(hasErrored,datatype) {
    return {
        type: POST_HAS_ERRORED,
        datatype : datatype,
        hasErrored,
    };
}

export function postisLoading(isLoading,datatype) {
    return {
        type: POST_IS_LOADING,
        datatype : datatype,
        isLoading,
    };
}

export function postDataSuccess(data ,datatype){
console.log(data)

    return {
        type: POST_DATA_SUCCESS,
        datatype : datatype,
        data,
    };
}
