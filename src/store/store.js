import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import documentReducer from '../components/Document/documentSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    document: documentReducer
  }
});