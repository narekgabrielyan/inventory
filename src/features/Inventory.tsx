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
    const inventoryContent = React.createRef<HTMLDivElement>();

    const [inventoryState, setInventoryState] = useState<string[]>([]);


    const createNewInventoryItem = (width: number, height: number) => {
        const item = document.createElement('div');

        Object.assign(item, {id: getUId(), className: 'supply_item supply_item-custom', innerText: 'Random item'});

        item.style.setProperty('--width', `${width * 100}%`);
        item.style.setProperty('--height', `${height * 100}%`);

        return item;
    }

    const getInventoryItemPosition = (id: number) => {
        const residual = id % columns;
        const colNumber = residual === 0 ? 4 : residual;
        const rowNumber = residual === 0 ? id/columns : (id - residual) / columns + 1;
        return {x: colNumber, y: rowNumber};
    }

    const getIdFromItemPosition = (x: number, y: number) => {
        return `item_${(y - 1) * 4 + x}`;
    }

    const getFullBoxesListOnAddItem = (id: number, x: number, y: number) => {
        const itemPosition = getInventoryItemPosition(id);
        let fullBoxesList = [];
        for(let i = 0; i < x; i++) {
            for(let j = 0; j < y; j++) {
                fullBoxesList.push(getIdFromItemPosition(i + itemPosition.x, j + itemPosition.y));
            }
        }
        return fullBoxesList;
    }

    const validateCustomItemSize = (id: number, x: number, y: number) => {
        const {x: colNumber, y: rowNumber} = getInventoryItemPosition(id);
        return colNumber + x - 1 > columns || rowNumber + y - 1 > rows;
    }

    const validateCustomItemPosition = (fullBoxesList: string[]) => {
        return !!fullBoxesList.filter(item => inventoryState.includes(item)).length;
    }

    const disableDropOnFullItems = (itemsList: string[]) => {
        itemsList.forEach(item => {
            document.getElementById(item)!.classList.add('inventory_cell-full');
        })
    }

    const addItemToInventory = ({boxId, x, y, withDrag}: AddInventoryItemProps) => {
        const numericId = parseInt(boxId.slice(5));
        if (!withDrag) {
            if(validateCustomItemSize(numericId, x, y)) {
                alert('Not valid input');
                return
            }

            const fullBoxesList = getFullBoxesListOnAddItem(numericId, x, y);
            if(validateCustomItemPosition(fullBoxesList)) {
                alert('Not enough space');
                return
            }
            const inventoryBox = document.getElementById(boxId)!;
            inventoryBox.appendChild(createNewInventoryItem(x, y));
            inventoryState.push(...fullBoxesList);
        } else {
            inventoryState.push(boxId);
        }

        // FIXME: try to use setState as supposed
        setInventoryState(inventoryState);
        disableDropOnFullItems(inventoryState);
    }

    useEffect(() => {
        window.addInventory = (boxId: string, x: number, y: number) => addItemToInventory({boxId, x, y, withDrag: false});
    },[]);

    useEffect(() => {
        const contentEl = inventoryContent.current!;
        contentEl.style.setProperty('--rows', rows.toString());
        contentEl.style.setProperty('--cols', columns.toString());
    }, [rows, columns]);

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