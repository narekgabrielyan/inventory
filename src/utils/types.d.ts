export {};

declare global {
    interface Window {
        addInventory: (boxId, x, y) => void;
    }
}