import type {PropsWithChildren} from "react";
import cn from "classnames";
import React, {useState} from "react";

export type InventoryCellProps = PropsWithChildren<{
    cellId: string;
    isFull: boolean;
}>;

export const InventoryCell = ({ cellId, isFull }: InventoryCellProps) => {
    const [isHighLighted, setIsHighLighted] = useState(false);

    const cellCn = cn({
        inventory_cell: true,
        'inventory_cell-highlighted': isHighLighted,
        'inventory_cell-full': isFull,
    });

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('inventory_cell-highlighting');
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHighLighted(true);
        return false;
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHighLighted(false);
        return false;
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation(); // stops the browser from redirecting.
        setIsHighLighted(false);
        const id = e.dataTransfer.getData('text');
        const sourceEl = document.getElementById(id)!;
        e.currentTarget.appendChild(sourceEl);
    }

    return (
        <div id={cellId} className={cellCn} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}/>
    )
}