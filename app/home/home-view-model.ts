import { Observable } from "data/observable";
import { Config } from "../shared/config";
import { Kinvey } from "kinvey-nativescript-sdk";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Frame, getFrameById, topmost } from "tns-core-modules/ui/frame";
import { User } from "./user-model";

export class HomeViewModel extends Observable {

    @ObservableProperty() user: User;
    @ObservableProperty() isSignedIn: boolean;
    constructor() {
        super();
        this.user = new User(Config.kinveyUsername, Config.kinveyPassword);
        if (!!Kinvey.User.getActiveUser()) {
            this.isSignedIn = true;
        } else {
            this.isSignedIn = false;
        }
    }

    signOut(): void {
        const promise = Kinvey.User.logout()
        .then((data: any) => {
            //this.user.username = "";
            //this.user.password = "";
            this.isSignedIn = false;
        });
    }

    signIn(): void {
        Kinvey.User.login(this.user.username, this.user.password)
            .then((result: any) => {
                console.log("Logged in as: " + result.data.username);
                this.isSignedIn = true;
                //const topmostFrame: Frame = topmost();
                //topmost().navigate("tasks/tasks-page");
                //topmost().goBack;
            })
            .catch((error) => {
                console.log("Error: " + JSON.stringify(error));
            });
    }

}
