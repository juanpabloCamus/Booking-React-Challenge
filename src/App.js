import './App.css';
import { useState } from 'react';
import CalendarContainer from './components/Calendar/Calendar';
import Confirm from './components/Confirm/Confirm';

function App() {

  const [booking, setBooking] = useState(false)
  
  return (
    <div className="App">
    {
      !booking 
      ?
      <>
        <header>
          <h2>Make a Booking</h2>
        </header>
        <CalendarContainer
          setBooking = {setBooking}
        />
      </>
      :
      <>
        <header>
            <h2>Accept Bookings</h2>
        </header>
        <Confirm
          booking = {booking}
          setBooking = {setBooking}
        />
      </>
    }
    </div>
  );
}

export default App;
