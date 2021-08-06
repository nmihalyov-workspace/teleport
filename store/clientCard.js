import { createSlice } from '@reduxjs/toolkit'

export const clientCard = createSlice({
  name: 'clientCard',
  initialState: {
    data: {}
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = clientCard.actions

export default clientCard.reducer;