import { createSlice } from '@reduxjs/toolkit'

export const editUser = createSlice({
  name: 'editUser',
  initialState: {
    data: {}
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = editUser.actions

export default editUser.reducer;