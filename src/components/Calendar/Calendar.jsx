import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const CalendarContainer = () => {

  const [grades, setGrades] = useState([]);
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchGrades(){
      const { data } = await axios.get('https://static.healthforcego.com/grades.json');
      setGrades(data.grades)
    }
    fetchGrades()
  }, [])
  
  return (
    <div className='booking-container'>
      <select>
        {
          grades?.map(g => (
            <option key={g}>{g}</option>
          ))
        }
      </select>
      <div className='time-container'>
        <DatePicker
          key={'entry'}
          selected={entryTime}
          onChange={(date) => setEntryTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <DatePicker
          key={'exit'}
          selected={exitTime}
          onChange={(date) => setExitTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          />
      </div>
      <Calendar 
        onChange={setDate} 
        value={date}
        allowPartialRange={true}
        minDate={new Date()}
        selectRange={true} 
      />
      <button>Create Booking</button>
  </div>
  );
};

export default CalendarContainer;