import React from 'react';

import '../css/cell.css';

const Cell = props => {
  let { player, enemy } = props;
  if (player) {
    return (
      <div className="lion">
        <p>P</p>
      </div>
    );
  }
  if (enemy) {
    return (
      <div className="zebra">
        <p>E</p>
      </div>
    );
  }
  return (
    <div>
      <p />
    </div>
  );
};

export default Cell;
