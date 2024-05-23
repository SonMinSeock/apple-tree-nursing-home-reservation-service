import { useState } from "react";
import Calender from "./components/calender/templates/Calender";
import Timetable from "./components/timetable/templates/Timetable";

function App() {
  const [selectDate, setSelectDate] = useState();

  return (
    <main>
      <Calender setSelectDate={setSelectDate} selectDate={selectDate} />
      {selectDate && <Timetable />}
    </main>
  );
}

export default App;
