import { createSlice } from '@reduxjs/toolkit';

const initialStart = {
  name: '',
  gender: '',
  country: {
    code: '',
    name: '',
  },
  micOn: true,
  cameraOn: true,
};
// @ts-ignore */
const UserSlice = createSlice({
  name: 'user',
  initialState: initialStart,
  reducers: {
    setUserData: (start, { payload }) => {
      console.log('payload', payload);
      if (payload.name) start.name = payload.userId;
      if (payload.gender) start.gender = payload.email;
      if (payload.country) start.country = payload.country;
      if (payload.cameraOn) start.cameraOn = payload.cameraOn;
      if (payload.micOn) start.micOn = payload.micOn;
    },
  },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
