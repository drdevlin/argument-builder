import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import documentReducer from '../components/Document/documentSlice'
import wordsReducer from '../components/Words/wordsSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    document: documentReducer,
    words: wordsReducer
  }
});