import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    session_id: ''
  },
  reducers: {
    updateIdAndSession: (state, { payload: { id, session_id }}) => {
      state.id = id;
      state.session_id = session_id;
    }
  }
});

export const { updateIdAndSession } = userSlice.actions;

export default userSlice.reducer;