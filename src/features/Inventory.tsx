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

export const Inventory = ({rows, columns}: InventoryProps) => {
    interface InventoryItem {
        boxId: string;
        itemCols: number;
        itemRows: number;
    }

    const inventoryContent = React.createRef<HTMLDivElement>();

    const [inventoryState, setInventoryState] = useState<InventoryItem[]>([]);

    const createNewInventoryItem = (width: number, height: number) => {
        const item = document.createElement('div');

        Object.assign(item, {id: getUId(), className: 'supply_item supply_item-custom', innerText: 'Random item'});

        item.style.setProperty('--width', `${width * 100}%`);
        item.style.setProperty('--height', `${height * 100}%`);

        return item;
    }

    const validateCustomItem = (id: number, x: number, y: number) => {
        return id + x > columns || id + y > rows;
    }

    const addItemToInventory = ({boxId, x, y, withDrag}: AddInventoryItemProps) => {
        if (!withDrag) {
            if(validateCustomItem(parseInt(boxId.slice(5)), x, y)) {
                alert('Not valid input');
                return
            }
            const inventoryBox = document.getElementById(boxId)!;
            inventoryBox.appendChild(createNewInventoryItem(x, y));
        }
        const itemData = {boxId, itemCols: x, itemRows: y};
        inventoryState.push(itemData);

        // FIXME: try to use setState as supposed
        setInventoryState(inventoryState);
    }

    useEffect(() => {
        window.addInventory = (boxId: string, x: number, y: number) => addItemToInventory({boxId, x, y, withDrag: false});
    },[]);

    useEffect(() => {
        const contentEl = inventoryContent.current!;
        contentEl.style.setProperty('--rows', rows.toString());
        contentEl.style.setProperty('--cols', columns.toString());
    })

    return (
        <div className="inventory">
            <h1 className="inventory_header header">Inventory</h1>
            <div className="inventory_content" ref={inventoryContent}>
                {Array.from(Array(rows * columns).keys()).map((i: number) => {
                    const id = `item_${i + 1}`;
                    return <InventoryCell cellId={id} key={id} isFull={false} onAddInventoryItem={addItemToInventory}/>;
                })}
            </div>
        </div>
    )
}

export default Inventory;