import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: 'Guest' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
