import {
    RECEIVE_TAGS } from "../constants/ActionTypes";


const initialState = {
    tags: []
};

const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TAGS:
            return { ...state,
                tags: action.tags };
        default:
            return state;
    }
};
export default tagReducer;