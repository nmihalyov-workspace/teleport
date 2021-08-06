import { createSlice } from '@reduxjs/toolkit'

export const bank = createSlice({
  name: 'bank',
  initialState: {
    data: {}
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = bank.actions

export default bank.reducer;