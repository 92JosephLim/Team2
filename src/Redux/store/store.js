import { configureStore } from '@reduxjs/toolkit';

const reducer = {
  signup: SignupSlice,
};

const store = configureStore({
  reducer,
})

export default store;