import axios from 'axios';
import { 
    GET_SALESPEOPLE, 
    ADD_SALESPEOPLE, 
    DELETE_SALESPEOPLE, 
    EDIT_SALESPEOPLE, 
    LOADING_SALESPEOPLE, 
    ERROR_SALESPEOPLE 
} from '../ActionType';

export const getsalespeople = () => async (dispatch) => {
    dispatch({ type: LOADING_SALESPEOPLE });
    try {
        const response = await axios.get("http://localhost:8000/api/v1/salespeople/list-salespeople", {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: GET_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ERROR_SALESPEOPLE, payload: error.message });
        console.error("Failed to fetch salespeople:", error);
    }
};


export const addsalespeople = (salesperson) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/salespeople/add-salesperson', salesperson);
        dispatch({ type: 'ADD_SALESPEOPLE_SUCCESS', payload: response.data.data });
    } catch (error) {
        dispatch({ type: 'ADD_SALESPEOPLE_FAILURE', payload: error.message });
    }
};


export const editsalespeople = (data) => async (dispatch) => {
    dispatch({ type: LOADING_SALESPEOPLE });
    try {
        const response = await axios.put(`http://localhost:8000/api/v1/salespeople/update-salesperson/${data.snum}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: EDIT_SALESPEOPLE, payload: data });
    } catch (error) {
        dispatch({ type: ERROR_SALESPEOPLE, payload: error.message });
        console.error("Error editing salespeople:", error);
    }
};

export const deletesalespeople = (snum) => async (dispatch) => {
    dispatch({ type: LOADING_SALESPEOPLE });
    try {
        await axios.delete(`http://localhost:8000/api/v1/salespeople/delete-salesperson/${snum}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: DELETE_SALESPEOPLE, payload: snum });
    } catch (error) {
        dispatch({ type: ERROR_SALESPEOPLE, payload: error.message });
        console.error("Error deleting salespeople:", error);
    }
};
