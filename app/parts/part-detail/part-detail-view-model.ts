import { Observable } from "data/observable";
import { Item } from "../shared/item-model";

/* ***********************************************************
* This is the item details view model.
*************************************************************/
export class PartDetailViewModel extends Observable {
    constructor(private _item: Item) {
        super();
    }

    get item(): Item {
        return this._item;
    }
}
