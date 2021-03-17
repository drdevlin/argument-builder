import { createSlice } from '@reduxjs/toolkit';

export const wordsSlice = createSlice({
  name: 'words',
  initialState: {},
  reducers: {
    addAnalyzedWord(state, action) {
      const { claimId, wordQuality, index, arrayLength } = action.payload;
      if (!state.hasOwnProperty(claimId)) state[claimId] = new Array(arrayLength);
      state[claimId][index] = wordQuality;
    }
  },
});

export const { addAnalyzedWord } = wordsSlice.actions

export default wordsSlice.reducer;