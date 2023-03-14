import { SelectedFoodAttribute } from "./selectedFoodAttribute";
import { Flavor } from "./flavor";

export interface Food {
    _id: string;
    name: string;
    imageUrls: string[];
    flavors: Flavor[];
    selectedFlavor: string | undefined;
    qty: number;
    note?: string;
    remaining: number;
}
