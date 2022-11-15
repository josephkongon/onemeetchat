import { createSlice } from '@reduxjs/toolkit';

const initialStart = {
  name: '',
  gender: '',
  country: {
    code: '',
    name: '',
  },
};
// @ts-ignore */
const UserSlice = createSlice({
  name: 'user',
  initialState: initialStart,
  reducers: {
    setUserData: (start, { payload }) => {
      console.log('payload', payload);
      if (payload.userId) start.name = payload.userId;
      if (payload.userEmail) start.gender = payload.email;
      if (payload.country) start.country = payload.country;
    },
  },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
