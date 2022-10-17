import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const CalendarContainer = ({setBooking}) => {

  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState();
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [been, setBeen] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: ''
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
    } else {
      setBeen(e.target.checked)
    }
  }

  const handleCreateBooking = (e) => {
    e.preventDefault

    if(grade === undefined) return setError({error: true, message:'Please select a grade'});
    if(!(Array.isArray(date))) return setError({error: true, message:'Please select a range of dates'});
    
    setError({error: false, message:''});

    const newBooking = {
      grade,
      entryTime: String(entryTime).slice(16),
      exitTime: String(exitTime).slice(16),
      beenBefore: been,
      date: date.map(d => d = String(d).slice(0,15))
    }

    setBooking(newBooking)
  }

  return (
    <div className='booking-container'>
      <select className='grade-select' name='grade' onChange={handleChange}>
        <option selected disabled>---</option>
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
      <div className='calendar-container'>
        <Calendar 
          onChange={setDate} 
          value={date}
          allowPartialRange={true}
          minDate={new Date()}
          selectRange={true} 
        />
      </div>
      <button className='submit' type='submit' onClick={handleCreateBooking}>Create Booking</button>
      {
        error.error ? <span id='error-msg'>{error.message}</span> : null
      }
  </div>
  );
};

export default CalendarContainer;