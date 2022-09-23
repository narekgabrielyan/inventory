import type {PropsWithChildren} from "react";

export type SupplyItemProps = PropsWithChildren<{
    itemId: string
}>;

export const SupplyItem = ({ itemId }: SupplyItemProps) => {
    return (
        <div id={itemId} className="supply_item"/>
    )
}