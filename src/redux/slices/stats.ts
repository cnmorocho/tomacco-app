import { createSlice } from "@reduxjs/toolkit";

type ActionType = {
  type: string;
  payload: number;
}
type StateType = Array<number>;

const initialState: StateType = [];


export const statsSlice = createSlice({
  name: 'stats',
  initialState: initialState,
  reducers: {
    addTimestamp: (state: StateType, action: ActionType) => {
      return [...state, action.payload];
    }
  }
});

export const { addTimestamp } = statsSlice.actions;
export default statsSlice.reducer;
