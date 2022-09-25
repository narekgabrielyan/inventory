import React from 'react';
import Supplies from "./features/Supplies";
import './assets/styles/all.scss';
import Inventory from "./features/Inventory";
import {suppliesA, suppliesB} from "./utils/fakeData";

function App() {
    return (
        <div className="root">
            <Supplies supplies={suppliesA}/>
            <Inventory rows={6} columns={17}/>
            <Supplies supplies={suppliesB}/>
        </div>
    );
}

export default App;
