import { createSlice } from '@reduxjs/toolkit'

export const errorMessage = createSlice({
  name: 'errorMessage',
  initialState: {
    data: ''
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = errorMessage.actions

export default errorMessage.reducer;