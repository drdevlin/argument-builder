import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 'uuid',
    session_id: 'uuid'
  },
  reducers: {
    updateIdAndSession: (state, action) => {
      state = action.payload;
    }
  }
});

export const { updateIdAndSession } = userSlice.actions;

export default userSlice.reducer;