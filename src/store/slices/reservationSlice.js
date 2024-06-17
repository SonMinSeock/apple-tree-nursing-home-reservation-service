import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  getList: {
    name: "",
    list: [],
  },
  outing: {},
  visiting: {},
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    getReservations(state, action) {
      state.getList.list = action.payload;
    },
    setName(state, action) {
      state.getList.name = action.payload;
    },
    resetList(state) {
      // 예약 내역에서 뒤로가기 하면 이름 작성페이지 이므로 불러왔던 내역들을 리셋한다.
      state.getList.list = [];
    },
    reset(state) {
      state.getList.name = "";
      state.getList.list = [];
    },
  },
});

export const reservationActions = reservationSlice.actions;

export default reservationSlice;
