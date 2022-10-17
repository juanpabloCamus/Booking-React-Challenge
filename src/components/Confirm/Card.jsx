import './Confirm.css';
import { useState } from 'react';

function Card({name, image, grade, date}) {

  const [select, setSelected] = useState(false);

  return (
    <div onClick={() => setSelected(select ? false : true)} className='card-container' id={select ? 'select' : null}>
      <img alt='profilePic' src={image}></img>
      <div className='card-date-container'>
        <h4>{String(date[3]).slice(0,15)}</h4>
        <span><b>{name}</b> is avaliable</span>
      </div>
      <span>{String(date[3]).slice(16,21)} - {String(date[1]).slice(16,21)}</span>
    </div>
  )
}

export default Card;