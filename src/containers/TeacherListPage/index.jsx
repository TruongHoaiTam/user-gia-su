

import React from 'react';
import Teachers from '../../components/Teachers';
import Filter from '../../components/Filter';
import './style.css';

function HomePage() {
  return (
    <div className="center">
      <Filter></Filter>
      <Teachers></Teachers>
      <Teachers></Teachers>
    </div>
  );
}

export default HomePage;
