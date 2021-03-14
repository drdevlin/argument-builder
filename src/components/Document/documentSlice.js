import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchFullDocument from '../../services/fetchFullDocument.js';

export const loadDocument = createAsyncThunk('document/loadDocument', async ({ user, title }) => {
  try {
    return fetchFullDocument(user, title);
  } catch (err) {
    return Promise.reject(err.message ? err.message : 'Something went wrong.');
  }
});

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
    id: 'uuid',
    title: '',
    thesis: {
      id: 'uuid',
      thesis: ''
    },
    supportingClaims: [
      {
        id: 'uuid',
        claim: '',
        position: 0,
        clarifyingSentences: [{
          id: 'uuid',
          sentence: ''
        }],
        examples: [{
          id: 'uuid',
          example: ''
        }],
        linkingSentence: {
          id: 'uuid',
          sentence: ''
        }
      }
    ],
    fetchStatus: 'idle',
    fetchError: null
  },
  reducers: {},
  extraReducers: {
    [loadDocument.pending]: (state, action) => {
      state.fetchStatus = 'loading';
    },
    [loadDocument.fulfilled]: (state, action) => {
      const { id, title, thesis, supportingClaims } = action.payload;
      state.id = id;
      state.title = title;
      state.thesis = thesis;
      state.supportingClaims = supportingClaims;
      state.fetchStatus = 'succeeded';
    },
    [loadDocument.rejected]: (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    }
  },
});

export default documentSlice.reducer;

export const selectDocumentTitle = state => state.document.title;
export const selectThesis = state => state.document.thesis;