import {SupplyItem} from "../components/SupplyItem";

import type {PropsWithChildren} from "react";
import {getUId} from "../utils/helpers";

export type SuppliesWrapperProps = PropsWithChildren<{
    itemsCount: number
}>;

export const SuppliesWrapper = ({itemsCount}: SuppliesWrapperProps) => {
    return (
        <div className="supplies_list_wrapper">
            <h1 className="supplies_list_header">Feel free to take one of the available supplies</h1>
            <div className="supplies_list_items">
                {Array.from({length: itemsCount}).map(() => {
                    const id = getUId();
                    return <SupplyItem itemId={id} key={id}/>;
                })}
            </div>
        </div>
    )
}

export default SuppliesWrapper;