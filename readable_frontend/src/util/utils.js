import { isLoading,hasErrored,fetchDataSuccess,posthasErrored,postisLoading,postDataSuccess} from '../actions';
const uuidv1 = require('uuid/v1');

export function postData(url , datatype, data) {

data['id']=uuidv1();
data['timestamp']=Math.floor(Date.now() / 1000);
    return (dispatch) => {
        dispatch(postisLoading(true,datatype));

        fetch(url,{
        	method: 'POST',
        	headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want',
          }),
          body :JSON.stringify(data),
        }).then((response) => {
          console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postisLoading(false,datatype));
                return response;
            }).then((response) => response.json())
            .then((response) => dispatch(postDataSuccess(response , datatype)))
            .catch(() => dispatch(posthasErrored(true,datatype)));
    };
}

export function fetchData(url , datatype) {
 console.log(url)
    return (dispatch) => {
        dispatch(isLoading(true,datatype));

        fetch(url,{
          headers: { 'Authorization': 'whatever-you-want' }})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isLoading(false,datatype));

                return response;
            })
            .then((response) => response.json())
            .then((fetchedData) => dispatch(fetchDataSuccess(fetchedData , datatype)))
            .catch(() => dispatch(hasErrored(true,datatype)));
    };
}

export function putData(url , datatype, data) {

    return (dispatch) => {
        dispatch(postisLoading(true,datatype));

        fetch(url,{
        	method: 'PUT',
        	headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want',
          }),
          body :JSON.stringify(data),
        }).then((response) => {
          console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postisLoading(false,datatype));
                return response;
            }).then((response) => response.json())
            .then((response) => dispatch(postDataSuccess(response , datatype)))
            .catch(() => dispatch(posthasErrored(true,datatype)));
    };
}

export function deleteData(url , datatype) {

    return (dispatch) => {
        dispatch(postisLoading(true,datatype));

        fetch(url,{
        	method: 'DELETE',
        	headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want',
          }),

        }).then((response) => {
          console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postisLoading(false,datatype));
                return response;
            }).then((response) => response.json())
            .then((response) => dispatch(postDataSuccess(response , datatype)))
            .catch(() => dispatch(posthasErrored(true,datatype)));
    };
}
