import { FILTER_FAIL, FILTER_SUCCESS } from "../actions/test.actions";

const initialState = {
    err: null,
    data: null
}

const testReducer = (state = initialState, action) => {
    let queryData = action.queryData;
    console.log("REDUCER =>", action)
    switch(action.type)
    {
        case FILTER_SUCCESS:
            let data = action.payload;
            return {
                ...state,
                data: data
            }
        case FILTER_FAIL:
            let err = action.payload;
            return {
                ...state,
                err: err,
            }
        default:
            return state;
    }
}

export default testReducer;