import { reservationActions } from "../slices/reservationSlice";

// 예약 내역 불러오기, API GET 요청.
export const fetchGetReservationList = (name) => {
  console.log(name);
  return async (dispatch) => {
    const fetchGetData = async () => {
      const response = await fetch(
        `https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/by-name?name=${name}`,
        {
          method: "GET",
          credentials: "include", // 쿠키를 포함하려면
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("예약 내역 불러오는데 문제 생겼습니다.");
      }

      const data = await response.json();
      return data;
    };

    try {
      const reservationList = await fetchGetData();
      dispatch(reservationActions.getReservations(reservationList));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
};
