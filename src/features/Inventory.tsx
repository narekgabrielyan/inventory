import {getUId} from "../utils/helpers";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {InventoryCell} from "../components/InventoryCell";
import {NotificationPopup} from "../components/NotificationPopup";
import {randomSupplies} from "../utils/fakeData";
import {AddInventoryItemProps} from "../utils/types";

export type InventoryProps = PropsWithChildren<{
    rows: number;
    columns: number
}>;

export const Inventory = ({rows, columns}: InventoryProps) => {
    const inventoryContent = React.createRef<HTMLDivElement>();
    const [inventoryState, setInventoryState] = useState<string[]>([]);
    const [errorState, setErrorState] = useState<{ title: string; showPopup: boolean }>({title: '', showPopup: false});


    const createNewInventoryItem = (width: number, height: number, name: string) => {
        const item = document.createElement('div');
        Object.assign(item, {id: getUId(), className:`supply_item icon-${name}`});

        item.style.setProperty('--width', `${width * 100}%`);
        item.style.setProperty('--height', `${height * 100}%`);

        return item;
    }

    const getInventoryItemPosition = (id: number, rows: number, columns: number) => {
        const residual = id % columns;
        const colNumber = residual === 0 ? columns : residual;
        const rowNumber = residual === 0 ? id/columns : (id - residual)/columns + 1;
        return {x: colNumber, y: rowNumber};
    }

    const getIdFromItemPosition = (x: number, y: number, colCount: number) => {
        return `item_${(y - 1) * colCount + x}`;
    }

    const getFullBoxesListOnAddItem = (id: number, x: number, y: number) => {
        const itemPosition = getInventoryItemPosition(id, rows, columns);
        let fullBoxesList = [];
        for(let i = 0; i < x; i++) {
            for(let j = 0; j < y; j++) {
                fullBoxesList.push(getIdFromItemPosition(i + itemPosition.x, j + itemPosition.y, columns));
            }
        }
        return fullBoxesList;
    }

    const validateCustomItemSize = (id: number, x: number, y: number) => {
        const {x: colNumber, y: rowNumber} = getInventoryItemPosition(id, rows, columns);
        return colNumber + x - 1 > columns || rowNumber + y - 1 > rows;
    }

    const validateCustomItemPosition = (id: number, x: number, y: number) => {
        const fullBoxesList = getFullBoxesListOnAddItem(id, x, y);
        return !!fullBoxesList.filter(item => inventoryState.includes(item)).length;
    }

    const disableDropOnFullItems = (itemsList: string[]) => {
        itemsList.forEach(item => {
            document.getElementById(item)!.classList.add('inventory_cell-full');
        })
    }

    const validateNewItem = (id: number, x: number, y: number) => {
        if(validateCustomItemSize(id, x, y) || validateCustomItemPosition(id, x, y)) {
            setErrorState({title: 'The selected boxes are full or out of inventory\'s space', showPopup: true});
            return true
        }
    }

    const appendNewInventoryItem = (id: string, x: number, y: number) => {
        const inventoryBox = document.getElementById(id)!;
        const itemName = randomSupplies[Math.floor(Math.random()*randomSupplies.length)].name;
        inventoryBox.appendChild(createNewInventoryItem(x, y, itemName));
    }

    const updateItemsData = (itemIdList: string[]) => {
        inventoryState.push(...itemIdList);
    }

    const updateInventoryContent = ({boxId, x, y, withDrag}: AddInventoryItemProps) => {
        const numericId = parseInt(boxId.slice(5));
        if (!withDrag) {
            if(validateNewItem(numericId, x, y)) {
                return
            }
            const fullBoxesList = getFullBoxesListOnAddItem(numericId, x, y);
            appendNewInventoryItem(boxId, x, y);
            updateItemsData(fullBoxesList);
        } else {
            updateItemsData([boxId]);
        }
        disableDropOnFullItems(inventoryState);
    }

    useEffect(() => {
        window.addInventory = (boxId: string, x: number, y: number) => updateInventoryContent({boxId, x, y, withDrag: false});
    },[]);

    useEffect(() => {
        const contentEl = inventoryContent.current!;
        contentEl.style.setProperty('--rows', rows.toString());
        contentEl.style.setProperty('--cols', columns.toString());
    }, [rows, columns]);

    return (
        <>
        <div className="inventory">
            <h1 className="inventory_header header">Inventory</h1>
            <div className="inventory_content" ref={inventoryContent}>
                {Array.from(Array(rows * columns).keys()).map((i: number) => {
                    const id = `item_${i + 1}`;
                    return <InventoryCell cellId={id} key={id} isFull={false} onAddInventoryItem={updateInventoryContent}/>;
                })}
            </div>
        </div>
        {errorState.showPopup && <NotificationPopup title={errorState.title} onPopupClose={() => setErrorState({
            title: '',
            showPopup: false
        })}/>}
    </>
    )
}

export default Inventory;