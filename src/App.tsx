import React from 'react';
import Supplies from "./features/Supplies";
import './assets/styles/all.scss';
import Inventory from "./features/Inventory";

function App() {
    return (
        <div className="root">
            <Supplies/>
            <Inventory rows={3} columns={4}/>
        </div>
    );
}

export default App;
