import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const CalendarContainer = () => {

  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState('');
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [been, setBeen] = useState(false)
  const [booking, setBooking] = useState({
    grade:'',
    entryTime:'',
    exitTime:'',
    beenBefore: false,
    date:''
  })

  useEffect(() => {
    async function fetchGrades(){
      const { data } = await axios.get('https://static.healthforcego.com/grades.json');
      setGrades(data.grades)
    }
    fetchGrades()
  }, [])

  const handleChange = (e) => {
    if(e.target.name === 'grade') {
      setGrade(e.target.value)
    } else  {
      setBeen(e.target.checked)
    }
  }

  const handleCreateBooking = (e) => {
    e.preventDefault
    const newBooking = {
      grade,
      entryTime: String(entryTime).slice(16),
      exitTime: String(exitTime).slice(16),
      beenBefore: been,
      date: date.map(d => d = String(d).slice(0,15))
    }
    console.log(newBooking);
  }

  return (
    <div className='booking-container'>
      <select name='grade' onChange={handleChange}>
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
      <div>
        <input name='been' onChange={handleChange} type='checkbox'></input>
        <span>Been Before</span>
      </div>
      <Calendar 
        onChange={setDate} 
        value={date}
        allowPartialRange={true}
        minDate={new Date()}
        selectRange={true} 
      />
      <button type='submit' onClick={handleCreateBooking}>Create Booking</button>
  </div>
  );
};

export default CalendarContainer;