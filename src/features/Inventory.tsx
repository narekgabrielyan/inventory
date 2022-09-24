import {getUId} from "../utils/helpers";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {InventoryCell} from "../components/InventoryCell";

export type InventoryProps = PropsWithChildren<{
    rows: number;
    columns: number
}>;

export type AddInventoryItemProps = {
    boxId: string;
    x: number;
    y: number;
    withDrag: boolean;
}

export const Inventory = () => {
    interface InventoryItem {
        boxId: string;
        itemCols: number;
        itemRows: number;
    }

    const [inventoryState, setInventoryState] = useState<InventoryItem[]>([]);

    useEffect(() => {
        window.addInventory = addItemToInventory;
    })

    const addItemToInventory = ({boxId, x, y, withDrag}: AddInventoryItemProps) => {
        const newItem = {boxId, itemCols: x, itemRows: y};
        // FIXME: try to use setState as supposed
        inventoryState.push(newItem);
        setInventoryState(inventoryState);
        if (!withDrag) {
            console.log("no withDrag")
        }
    }

    return (
        <div className="inventory">
            <h1 className="inventory_header header">Inventory</h1>
            <div className="inventory_content">
                {Array.from({length: 102}).map(() => {
                    const id = `item-${getUId()}`;
                    return <InventoryCell cellId={id} key={id} isFull={false} onAddInventoryItem={addItemToInventory}/>;
                })}
            </div>
        </div>
    )
}

export default Inventory;