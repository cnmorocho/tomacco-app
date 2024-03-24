import { Location } from '@/services/weather';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Location = {
  name: 'Buenos Aires',
  latitude: '-34.61315',
  longitude: '-58.37723',
  country_code: 'AR',
  country: 'Argentina',
  admin1: 'Buenos Aires F.D.',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation: (_state, action: { type: string; payload: Location }) => {
      return action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
