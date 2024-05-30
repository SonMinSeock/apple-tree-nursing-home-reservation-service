import React from "react";
import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { useState } from "react";
import { CalendarBox, Layout } from "./Calender.style";
import Header from "../molecules/Header";
import WeekLayout from "../molecules/WeekLayout";
import Daylayout from "../molecules/Daylayout";
import DayBox from "../atoms/DayBox";
import Day from "../molecules/Day";
import Week from "../atoms/Week";

function Calender({ setSelectDate, selectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달 (2024-05-20)
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (2024-05-01)
  const monthEnd = endOfMonth(monthStart); // 현재 달의 마지막 날짜 (2024-05-31)
  const startDate = startOfWeek(monthStart); // 현재 달의 첫 주 시작 날짜 (2024-04-30)
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 주 마지막 날짜
  const week = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 데이터
  // week 배열을 순회하면서 요일을 하나씩 출력
  const weeks = week.map((item, index) => {
    return <Week key={index}>{item}</Week>;
  });

  /*
  // 어드민에서 주 단위로 예약 내역데이터 보내줄때 참고 할 코드. 오늘 날짜 기준으로 이번주 월, 일요일 날짜 받는다.
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // 주 시작일을 월요일로 설정합니다.
  const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // 주 시작일을 월요일로 설정합니다.

  const formattedStartOfWeekDate = format(startOfWeekDate, "yyyy-MM-dd");
  const formattedEndOfWeekDate = format(endOfWeekDate, "yyyy-MM-dd");

  console.log("이번 주의 월요일:", formattedStartOfWeekDate);
  console.log("이번 주의 일요일:", formattedEndOfWeekDate);
 */

  /*
  // 오늘날짜 기준으로 30일 후의 날짜로 보내주도록 한다.
  const dateAfter30Days = addDays(currentDate, 30); // 30일 후의 날짜를 계산합니다.

  const formattedDateAfter30Days = format(dateAfter30Days, "yyyy-MM-dd"); // 날짜를 'yyyy-MM-dd' 형식으로 포맷합니다.

  console.log("오늘 날짜 기준으로 30일 후의 날짜:", formattedDateAfter30Days);
  */

  const day = []; // 한 달의 전체 데이터
  let startDay = startDate; // 현재 달의 첫 주 시작 날짜
  let days = []; // 한 주의 전체 데이터
  let formattedDay = ""; // 배열 삽입용 하루 날짜의 데이터
  let formattedDate = "";

  // while문은 현재 달의 첫 주 시작 날짜부터 하루씩 더해가다가 현재 달의 마지막 주 마지막 날짜보다
  // 커지면 한 달의 날짜가 끝난 것이므로 종료됩니다.
  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      // 한 주는 7일이므로 7번의 반복문 실행
      formattedDay = format(startDay, "d"); // 날짜의 데이터는 숫자로 format됩니다.
      formattedDate = format(startDay, "yyyy-MM-dd");
      days.push(
        // 한 주의 배열에 하루씩 날짜 삽입합니다.
        <Day
          key={format(startDay, "yyyy-MM-dd")}
          currentDate={currentDate}
          startDay={startDay}
          formattedDate={formattedDate}
          formattedDay={formattedDay}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
      );
      startDay = addDays(startDay, 1); // 하루를 삽입하고 날짜를 하루 더해줍니다.
    }
    // for문이 종료되면 7일의 날짜가 한 주의 데이터에 모두 삽입된 것
    // 한 주의 데이터를 한 달의 전체 데이터에 삽입해줍니다.
    day.push(<DayBox key={format(startDay, "yyyy-MM-dd")} days={days} />);

    // 다음 주의 데이터를 삽입하기 위해 한 주의 데이터를 초기화 시켜줍니다.
    days = [];
  }
  return (
    <Layout>
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarBox>
        <CalendarBox>
          <WeekLayout weeks={weeks} />
          <Daylayout day={day} />
        </CalendarBox>
      </CalendarBox>
    </Layout>
  );
}

export default Calender;
