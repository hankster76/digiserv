import { Observable } from "data/observable";

import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Item extends Observable {
    @ObservableProperty() id: string;
    @ObservableProperty() ItemName: string;
    @ObservableProperty() Manufacturer: string;
    @ObservableProperty() ManufacturerSKU: string;
    @ObservableProperty() VendorSKU: string;
    @ObservableProperty() Price: number;
    @ObservableProperty() OnHand: number;
    @ObservableProperty() Category1: string;
    @ObservableProperty() Category2: string;
    @ObservableProperty() Detail1: string;
    @ObservableProperty() Detail2: string;
    @ObservableProperty() Detail3: string;
    @ObservableProperty() Weight: number;
    @ObservableProperty() Minqty: number;
    @ObservableProperty() isModelValid: boolean;    

    private _ItemNum: string;
    private _ImageURL: string;

    constructor(options: any) {
        super();

        this._ItemNum = options.ItemNum;
        this._ImageURL = options.ImageURL;
        //console.log("url is : " + options.ImageURL);
        
        this.id = options.id;
        //console.log("id is : " + options.id);
        this.ItemName = options.ItemName;
        this.Manufacturer = options.Manufacturer;
        this.ManufacturerSKU = options.ManufacturerSKU;
        this.VendorSKU = options.VendorSKU;
        this.Price = Number(options.Price);
        this.Minqty = Number(options.Minqty);
        this.Category1 = options.Category1;
        this.Category2 = options.Category2;
        this.Detail1 = options.Detail1;
        this.Detail2 = options.Detail2;
        this.Detail3 = options.Detail3;
        this.Weight = Number(options.Weight);
        this.OnHand = Number(options.OnHand);
        this.updateDependentProperties();
    }

    get ItemNum(): string {
        return this._ItemNum;
    }

    set ItemNum(value: string) {
        if (this._ItemNum === value) {
            return;
        }

        this._ItemNum = value;
        this.notifyPropertyChange("ItemNum", value);

        this.updateDependentProperties();
    }

    get ImageURL(): string {
        return this._ImageURL;
    }

    set ImageURL(value: string) {
        if (this._ImageURL === value) {
            return;
        }

        this._ImageURL = value;
        this.notifyPropertyChange("ImageURL", value);

        this.updateDependentProperties();
    }

    private updateDependentProperties(): void {
        this.isModelValid = !!this._ItemNum && !!this._ImageURL;
    }
}
