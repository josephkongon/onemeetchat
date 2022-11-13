import { createSlice } from '@reduxjs/toolkit';

const initialStart = {
  name: '',
  gender: '',
};
// @ts-ignore */
const UserSlice = createSlice({
  name: 'user',
  initialState: initialStart,
  reducers: {
    setUserData: (start, { payload }) => {
      if (payload.userId) start.name = payload.userId;
      if (payload.userEmail) start.gender = payload.email;
    },
  },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
