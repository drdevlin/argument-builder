import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchFullDocument from '../../services/fetchFullDocument.js';
import updateStore from '../../services/updateStore.js';
import saveEntryToDb from '../../services/saveEntryToDb.js';

export const loadDocument = createAsyncThunk('document/loadDocument', async ({ user, title }) => {
  try {
    return fetchFullDocument(user, title);
  } catch (err) {
    return Promise.reject(err.message ? err.message : 'Something went wrong.');
  }
});

export const saveEntry = createAsyncThunk('document/saveEntry', async (args) => {
  try {
    const { user, type, entry, documentId } = args;
    if (args.hasOwnProperty('supportingClaimId')) {
      return saveEntryToDb(user, type, entry, documentId, args.supportingClaimId);
    } else {
      return saveEntryToDb(user, type, entry, documentId);
    }
  } catch (err) {
    return Promise.reject(err.message ? err.message : 'Something went wrong.');
  }
})

export const documentSlice = createSlice({
  name: 'document',
  initialState: {
    id: '',
    title: '',
    thesis: {
      id: '',
      thesis: ''
    },
    supportingClaims: [
      {
        id: '',
        claim: '',
        position: 0,
        clarifyingSentences: [{
          id: '',
          sentence: '',
          word: ''
        }],
        examples: [{
          id: '',
          example: '',
          word: ''
        }],
        linkingSentence: {
          id: '',
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
    },
    [saveEntry.pending]: (state, action) => {
      state.fetchStatus = 'loading';
    },
    [saveEntry.fulfilled]: (state, action) => {
      const update = updateStore(action.payload);
      update(state, action);
      state.fetchStatus = 'succeeded';
    },
    [saveEntry.rejected]: (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.error.message;
    }
  },
});

export default documentSlice.reducer;

export const selectDocumentTitle = state => state.document.title;
export const selectDocumentId = state => state.document.id;
export const selectThesis = state => state.document.thesis;
export const selectSupportingClaims = state => state.document.supportingClaims;