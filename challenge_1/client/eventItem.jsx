import React from 'react';

const Event = (props) => {
  let date = props.event.date;
  date = date[0] === '-' ? `${date.slice(1)} BC` : date;
  date = date.includes('/') ? date.split('/')[0] : date;

  return (
    <div className="dataRecord">
      <p className="dataItem">{date}</p>
      <p className="dataItem">{props.event.description}</p>
    </div>
  )
}

export default Event;