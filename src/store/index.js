import reservationSlice from "./slices/reservationSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    reservation: reservationSlice.reducer,
  },
});

export default store;
