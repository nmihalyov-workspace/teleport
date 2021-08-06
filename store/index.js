import { configureStore } from '@reduxjs/toolkit';
import clientCardReducer from './clientCard';
import editUserReducer from './editUser';
import errorMessageReducer from './errorMessage';
import bankReducer from './bank';

export default configureStore({
  reducer: {
    clientCard: clientCardReducer,
    editUser: editUserReducer,
    errorMessage: errorMessageReducer,
    bank: bankReducer
  }
})