import React from 'react';
import SuppliesWrapper from "./features/SuppliesWrapper";
import './assets/styles/all.scss';

function App() {
  return (
    <div className="root">
      <SuppliesWrapper itemsCount={5}/>
    </div>
  );
}

export default App;
