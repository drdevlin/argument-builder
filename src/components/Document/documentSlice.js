import { createSlice } from '@reduxjs/toolkit';

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
    id: 'uuid',
    title: ''
  },
  reducers: {
    updateIdAndTitle: (state, { payload: { id, title }}) => {
      state.id = id;
      state.title = title;
    }
  }
});

export const { updateIdAndTitle } = documentSlice.actions;

export default documentSlice.reducer;