export {};

declare global {
    interface Window {
        addInventory: (boxId, x, y) => void;
    }
}

export interface SuppliesList {
    supplies: Supply[];
}

export interface Supply {
    id: string;
    name: string;
}