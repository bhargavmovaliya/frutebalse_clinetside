import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, EDIT_SALESPEOPLE, GET_SALESPEOPLE, } from "../ActionType";

const initialState = {
    isLoading: false,
    salespeole: [],
    error: null
}

export const salespeoleReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_SALESPEOPLE:
            return {
                ...state,
                isloading: false,
                salespeole: action.payload,
                
            }

        case ADD_SALESPEOPLE:
            return {
                
                isLoading: false,
                salespeole: state.salespeole.concat(action.payload.data),
                error: null
            }

        case DELETE_SALESPEOPLE:
            return {
                isLoading: false,
                salespeole: state.salespeole.filter((v) => v.snum !== action.payload),
                error: null
            }

        case EDIT_SALESPEOPLE:
            return {
                isLoading: false,
                salespeole: state.salespeole.map((v) => {
                    if (v.snum === action.payload.snum) {
                        return action.payload
                    } else {
                        return v
                    }
                 }),
                error: null
            }

        default:
            return state
    }
}