import React from 'react';
import Event from './eventItem.jsx';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.data.map(event => {
          return <Event event={ event } />
        })}
      </div>
    )
  }
}

export default EventList;