import type {PropsWithChildren} from "react";
import React, {useState} from "react";
import cn from "classnames";

export type SupplyItemProps = PropsWithChildren<{
    itemId: string;
    name: string
}>;

export const SupplyItem = ({itemId, name}: SupplyItemProps) => {
    const [isDragged, setIsDragged] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        e.dataTransfer.setData('text', el.id);
        e.dataTransfer.effectAllowed = 'move';
        setIsDragged(true);
    }

    const handleDragEnd = () => {
        setIsDragged(false);
    }

    const supplyItemCn = cn({
        supply_item: true,
        ['supply_item-dragged']: isDragged,
        [`icon-${name}`]: !!name
    })

    return (
        <div id={itemId} className={supplyItemCn} onDragStart={handleDragStart} onDragEnd={handleDragEnd}
             title={name.toUpperCase()} draggable>
        </div>
    )
}