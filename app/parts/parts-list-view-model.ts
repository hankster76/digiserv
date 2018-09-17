import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Push } from "kinvey-nativescript-sdk/push";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../shared/config";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Item } from "./shared/item-model";
import { ItemService } from "./shared/item-service";

export class PartsListViewModel extends Observable { 
    @ObservableProperty() items: ObservableArray<Item> = new ObservableArray<Item>([]);
    @ObservableProperty() isLoading: boolean = false;

    private _itemService: ItemService;

    constructor() {
        super();
        this._itemService = ItemService.getInstance();
    }

    load(): void {
        this.isLoading = true;
        this._itemService.load()
            .then((items: Array<Item>) => {
                this.items = new ObservableArray(items);
                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
    }
}
