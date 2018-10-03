import { Observable } from "data/observable";
import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Task extends Observable {
    @ObservableProperty() id: string;
    @ObservableProperty() status: string;
    @ObservableProperty() tech_id: string;
    @ObservableProperty() address: string;
    @ObservableProperty() city: string;
    @ObservableProperty() state: string;
    @ObservableProperty() zip: string;
    @ObservableProperty() date: string;
    @ObservableProperty() cellphone: string;
    @ObservableProperty() email: string;
    @ObservableProperty() custName: string;
    @ObservableProperty() custID: string;
    
    constructor(options: any) {
        super();
        this.id = options._id;
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
}
