export const FILTER = "FILTER";
export const FILTER_SUCCESS = "FILTER_SUCCESS";
export const FILTER_FAIL = "FILTER_FAIL";

export function filter(data) {
    console.log("****",  data)
    return {type: FILTER, queryData: data};
}