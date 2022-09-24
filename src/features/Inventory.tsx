import {getUId} from "../utils/helpers";
import React, {PropsWithChildren} from "react";
import {InventoryCell} from "../components/InventoryCell";

export type InventoryProps = PropsWithChildren<{
    rows: number;
    columns: number
}>;

export const Inventory = () => {
    return (
        <div className="inventory">
            <h1 className="inventory_header header">Inventory</h1>
            <div className="inventory_cells">
                {Array.from({length: 10}).map(() => {
                    const id = getUId();
                    return <InventoryCell cellId={id} key={id} isFull={false}/>;
                })}
            </div>
        </div>
    )
}

export default Inventory;