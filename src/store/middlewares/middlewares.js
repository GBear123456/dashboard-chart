import TestService from "~/services/test";
import {FILTER, FILTER_SUCCESS, FILTER_FAIL} from "../actions/test.actions"

const filter = store => next => action => {
    let dispatch = store.dispatch;
    console.log("middle dispatch", action);
    if(action.type === FILTER)
    {
        dispatch({type: FILTER_SUCCESS, payload: action.queryData})
        // console.log("API FILTER =>", action.queryData)
        // TestService.filter(action.queryData)
        // .then(result => {
        //     dispatch({type: FILTER_SUCCESS, payload: result})
        // })
        // .catch( err => {
        //     dispatch({type: FILTER_FAIL, payload: err})
        // })
    }

    return next(action)
}

export default filter;