import { Observable } from "data/observable";

import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Task extends Observable {
    @ObservableProperty() id: string;
    @ObservableProperty() ServiceType: string;
    @ObservableProperty() ServiceDate: string;
    @ObservableProperty() PartNum: string;
    @ObservableProperty() CustNum: string;
    @ObservableProperty() CustName: number;
    @ObservableProperty() Address: number;
    @ObservableProperty() City: string;
    @ObservableProperty() State: string;
    @ObservableProperty() Zip: string;
    @ObservableProperty() Phone: string;
    @ObservableProperty() Email: string;

    private _TechNum: string;

    constructor(options: any) {
        super();

        this._TechNum = options.TechNum;
        
        this.id = options.id;
        this.TechNum = options.TechNum;
        this.ServiceType = options.ServiceType;
        this.ServiceDate = options.ServiceDate;
        this.PartNum = options.PartNum
        this.CustNum = options.CustNum;
        this.CustName = options.CustName;
        this.Address = options.Address;
        this.City = options.City;
        this.State = options.State;
        this.Zip = options.Zip;
        this.Phone = options.Phone;
        this.Email = options.Email;
    }

    get TechNum(): string {
        return this._TechNum;
    }

    set TechNum(value: string) {
        if (this._TechNum === value) {
            return;
        }

        this._TechNum = value;
        this.notifyPropertyChange("TechNum", value);

    }
}
