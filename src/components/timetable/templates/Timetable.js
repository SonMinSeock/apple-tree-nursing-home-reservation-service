// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";
// import TimeRow from "../molecules/TimeRow";

// const Container = styled.div`
//   display: flex;
//   padding: 20px;
// `;

// function Timetable({ reservation, selectedTime, setSelectTime, type, selectDate }) {
//   const [visitTimeTable, setVisitTimeTable] = useState([
//     { id: uuidv4(), timeFormat: "오전", clientTime: "10:30", backendTime: "11:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오전", clientTime: "11:00", backendTime: "11:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "02:00", backendTime: "14:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "03:00", backendTime: "15:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "04:00", backendTime: "16:00", isSelect: false },
//   ]);
//   const [outingTimeTable, setOutingTimeTable] = useState([
//     { id: uuidv4(), timeFormat: "오전", clientTime: "10:30", backendTime: "11:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오전", clientTime: "11:00", backendTime: "11:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "02:00", backendTime: "14:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "02:30", backendTime: "14:30", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "03:00", backendTime: "15:00", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "03:30", backendTime: "15:30", isSelect: false },
//     { id: uuidv4(), timeFormat: "오후", clientTime: "04:00", backendTime: "16:00", isSelect: false },
//   ]);

//   console.log(selectDate);

//   /*
//   const [availableTimes, setAvaiableTimes] = useState([]);

//   const fetchGetReservationTimes = async () => {
//     const res = await (
//       await fetch("https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/available-times", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           date: selectDate,
//           type: reservation.type,
//         }),
//       })
//     ).json();

//     setAvaiableTimes(
//       res.map((timeObj) => {
//         const obj = { id: uuidv4(), isSelect: false };
//         if (Number(timeObj.time.split(":")[0]) < 12) {
//           obj.timeFormat = "오전";
//           obj.clientTime = `${timeObj.time.split(":")[0]}:${timeObj.time.split(":")[1]}`;
//           obj.backendTime = obj.clientTime;
//         } else {
//           obj.timeFormat = "오후";
//           if (timeObj.time.split(":")[0] === "14") {
//             obj.clientTime = `02:00`;
//             obj.backendTime = `14:00`;
//           } else if (timeObj.time.split(":")[0] === "14" && timeObj.time.split(":")[1] === "30") {
//             obj.clientTime = `02:30`;
//             obj.backendTime = `14:30`;
//           } else if (timeObj.time.split(":")[0] === "15") {
//             obj.clientTime = `03:00`;
//             obj.backendTime = `15:00`;
//           } else if (timeObj.time.split(":")[0] === "15" && timeObj.time.split(":")[1] === "30") {
//             obj.clientTime = `03:30`;
//             obj.backendTime = `15:30`;
//           } else if (timeObj.time.split(":")[0] === "16") {
//             obj.clientTime = `04:00`;
//             obj.backendTime = `16:00`;
//           } else if (timeObj.time.split(":")[0] === "16" && timeObj.time.split(":")[1] === "30") {
//             obj.clientTime = `04:30`;
//             obj.backendTime = `16:30`;
//           }
//         }
//         return obj;
//       })
//     );
//   };

//   */
//   // useEffect(async () => {
//   //   console.log("해당 날짜 면회 또는 외출 가능한지 알려주는 API 호출...");
//   //   await fetchGetReservationTimes();
//   // }, []);

//   const handleTimeClick = (clickedId) => {
//     const tableToSet = type === "VISIT" ? setVisitTimeTable : setOutingTimeTable;
//     const tableToCheck = type === "VISIT" ? visitTimeTable : outingTimeTable;

//     //const tableToSet = setAvaiableTimes;
//     tableToSet((prevTable) =>
//       prevTable.map((timeObj) =>
//         timeObj.id === clickedId ? { ...timeObj, isSelect: !timeObj.isSelect } : { ...timeObj, isSelect: false }
//       )
//     );

//     const selectedTimeObj = tableToCheck.find((timeObj) => timeObj.id === clickedId);
//     if (!selectedTime || selectedTime.id !== clickedId) {
//       setSelectTime(selectedTimeObj);
//     } else {
//       setSelectTime(null);
//     }
//   };

//   return (
//     <Container>
//       {type === "VISIT" ? (
//         <TimeRow timeTable={visitTimeTable} onTimeClick={handleTimeClick} />
//       ) : (
//         <TimeRow timeTable={outingTimeTable} onTimeClick={handleTimeClick} />
//       )}
//     </Container>
//   );
// }

// export default Timetable;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TimeRow from "../molecules/TimeRow";

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

function Timetable({ reservation, selectedTime, setSelectTime, type, selectDate }) {
  const [availableTimes, setAvailableTimes] = useState([]);

  const fetchGetReservationTimes = async () => {
    try {
      const response = await fetch(
        "https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/available-times",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectDate,
            type: reservation.type,
          }),
        }
      );

      const res = await response.json();

      setAvailableTimes(
        res.map((timeObj) => {
          const obj = { id: uuidv4(), isSelect: false };
          const [hours, minutes] = timeObj.time.split(":").map(Number);

          if (hours < 12) {
            obj.timeFormat = "오전";
            obj.clientTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
            obj.backendTime = obj.clientTime;
          } else {
            obj.timeFormat = "오후";
            if (hours === 14 && minutes === 0) {
              obj.clientTime = `02:00`;
              obj.backendTime = `14:00`;
            } else if (hours === 14 && minutes === 30) {
              obj.clientTime = `02:30`;
              obj.backendTime = `14:30`;
            } else if (hours === 15 && minutes === 0) {
              obj.clientTime = `03:00`;
              obj.backendTime = `15:00`;
            } else if (hours === 15 && minutes === 30) {
              obj.clientTime = `03:30`;
              obj.backendTime = `15:30`;
            } else if (hours === 16 && minutes === 0) {
              obj.clientTime = `04:00`;
              obj.backendTime = `16:00`;
            } else if (hours === 16 && minutes === 30) {
              obj.clientTime = `04:30`;
              obj.backendTime = `16:30`;
            }
          }
          return obj;
        })
      );
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  useEffect(() => {
    const fetchTimes = async () => {
      console.log("해당 날짜 면회 또는 외출 가능한지 알려주는 API 호출...");
      await fetchGetReservationTimes();
    };
    fetchTimes();
  }, [selectDate]);

  const handleTimeClick = (clickedId) => {
    setAvailableTimes((prevTimes) =>
      prevTimes.map((timeObj) =>
        timeObj.id === clickedId ? { ...timeObj, isSelect: !timeObj.isSelect } : { ...timeObj, isSelect: false }
      )
    );

    const selectedTimeObj = availableTimes.find((timeObj) => timeObj.id === clickedId);
    if (!selectedTime || selectedTime.id !== clickedId) {
      setSelectTime(selectedTimeObj);
    } else {
      setSelectTime(null);
    }
  };

  return (
    <Container>
      <TimeRow timeTable={availableTimes} onTimeClick={handleTimeClick} />
    </Container>
  );
}

export default Timetable;
