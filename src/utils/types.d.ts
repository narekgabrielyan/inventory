import {AddInventoryItemProps} from "../features/Inventory";

export {};

declare global {
    interface Window {
        addInventory: ({boxId, x, y, withDrag}: AddInventoryItemProps) => void;
    }
}