import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CalendarContainer = () => {

  const [value, onChange] = useState(new Date());
  const [grades, setGrades] = useState([])

  useEffect(() => {
    async function fetchGrades(){
      const { data } = await axios.get('https://static.healthforcego.com/grades.json');
      setGrades(data.grades)
    }
    fetchGrades()
  }, [])
  
  return (
    <>
      <select>
        {
          grades?.map(g => (
            <option key={g}>{g}</option>
          ))
        }
      </select>
      <Calendar onChange={onChange} value={value} />
    </>
  );
};

export default CalendarContainer;