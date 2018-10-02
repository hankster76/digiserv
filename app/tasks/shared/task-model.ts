import { Observable } from "data/observable";
import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Task extends Observable {
    _id: string;
    id: string;
    status: string;
    tech_id: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    date: string;
    cellphone: string;
    email: string;
    custName: string;
    custID: string;
    
    constructor(options: any) {
        super();
        this._id = options._id;
        this.status = options.status;
        this.tech_id = options.tech_id;
        this.address = options.address;
        this.city = options.city;
        this.state = options.state;
        this.zip = options.zip;
        this.date = options.date;
        this.cellphone = options.cellphone;
        this.email = options.email;
        this.custName = options.custName;
        this.custID = options.custID;
    }

    get Tech_Id(): string {
        return this.tech_id;
    }

    set Tech_Id(value: string) {
        if (this.Tech_Id === value) {
            return;
        }

        this.Tech_Id = value;
        this.notifyPropertyChange("Tech_Id", value);

    }
}
