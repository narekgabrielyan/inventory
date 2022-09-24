import React from 'react';
import Supplies from "./features/Supplies";
import './assets/styles/all.scss';
import Inventory from "./features/Inventory";

function App() {
    return (
        <div className="root">
            <Supplies/>
            <Inventory/>
        </div>
    );
}

export default App;
