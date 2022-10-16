import './Confirm.css';
import staff from '../../staff';
import { useState } from 'react';
import { useEffect } from 'react';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

function Card({name, image, grade, date}) {

  const [select, setSelected] = useState(false);

  return (
    <div onClick={() => setSelected(select ? false : true)} className='card-container' id={select ? 'select' : null}>
      <img alt='profilePic' src={image}></img>
      <div className='card-date-container'>
        <h4>{String(date[3]).slice(0,15)}</h4>
        <span><b>{name}</b> is avaliable</span>
        <span>{grade}</span>
      </div>
      <span>{String(date[3]).slice(16,21)} - {String(date[1]).slice(16,21)}</span>
    </div>
  )
}

function Confirm({booking}) {

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
    console.log(current);
    setAvaliableStaff(current)
  }, [])
  
  const handleSelect = (s) => {
    setSelects(selects.concat(s))
  }

  const handleConfirm = () => {
    selects.map(s => 
      console.log(`Date created with ${s.name} at ${s.daysAvaliable[3]}}`)
    )
  }

  return (
    <div className="confirm-container">
      <h3>Bookings to be confirmed</h3>
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