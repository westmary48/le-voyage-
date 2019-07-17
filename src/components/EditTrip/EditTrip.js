import React from 'react';

import './EditTrip.scss';

class EditTrip extends React.Component {
  render() {
    const editId = this.props.match.params.id;
    return (
      <div className="EditTrip">
        <h1>Edit Trip</h1>
        <h2>The editId is {editId}</h2>
      </div>
    );
  }
}

export default EditTrip;
