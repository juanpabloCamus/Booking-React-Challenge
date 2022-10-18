import './Confirm.css';
import staff from '../../staff';
import { useState } from 'react';
import { useEffect } from 'react';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import Card from './Card';

function Confirm({booking, setBooking}) {

  const [avaliableStaff, setAvaliableStaff] = useState(staff);
  const [selects, setSelects] = useState([])

  useEffect(() => {
    let current = avaliableStaff;

    current = current.filter(s => s.grade === booking.grade);
    current = current.filter(s => {
      let bookingFirstDay = new Date(booking.date[0]);
      let bookingLastDay = new Date(booking.date[1]);
      let staffFirstDay = new Date(s.daysAvaliable[0]);
      let staffLastDay = new Date(s.daysAvaliable[1]);
      return (bookingFirstDay > staffFirstDay && bookingLastDay < staffLastDay)
    })
    current.map(c => c.daysAvaliable.push(faker.date.between(c.daysAvaliable[0], c.daysAvaliable[1])))

    setAvaliableStaff(current)
  }, [])
  
  const handleSelect = (s) => {
    let selected = selects
    if(!(selected.includes(s))) selected.push(s);
    else selected = selected.filter(a=> a != s);
    setSelects(selected);
  }

  const handleConfirm = () => {
    selects.map(s => 
      console.log(`Date created successfully with ${s.name} at ${s.daysAvaliable[3]}}`)
    )
    setBooking(false)
    setSelects([])
  }

  if (avaliableStaff.length === 0) {
    return (
      <div className="confirm-container">
        <button id='back' onClick={() => {setBooking(false)}}>Go Back</button>
        <h1 id='not-avaliable'>Sorry! We do not have staff available for the selected dates</h1>
      </div>
    )
  }

  return (
    <div className="confirm-container">
      <button id='back' onClick={() => {setBooking(false)}}>Go Back</button>
      {
        avaliableStaff.map(s => (
          <div key={s.name} onClick={()=>handleSelect(s)}>
          <Card
            key={s.name}
            name = {s.name}
            image = {s.image}
            grade = {s.grade}
            date = {s.daysAvaliable}
          />
          </div> 
        ))
      }
      <button onClick={handleConfirm}>Confirm Bookings</button>
    </div>
  );
}

export default Confirm;