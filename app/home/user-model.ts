import { Observable } from "data/observable";

import { ObservableProperty } from "../shared/observable-property-decorator";

export class User extends Observable {
    @ObservableProperty() username: string;
    @ObservableProperty() password: string;

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
}
