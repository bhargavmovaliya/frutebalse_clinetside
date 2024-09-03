import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: '',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert', // The slice name
  initialState,
  reducers: {
    setAlert: (state, action) => {
      console.log('FDfdsfdsf', action.payload);

      state.color = action.payload.color;
      state.message = action.payload.message;
    },
    resetAlert: (state,action) => {
      state.color = '';
      state.message = '';
    },
  },
});

export const { setAlert, resetAlert } = alertSlice.actions;
export default alertSlice.reducer;
