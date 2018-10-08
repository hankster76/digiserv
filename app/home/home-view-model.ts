import { Observable } from "data/observable";
import { Config } from "../shared/config";
import { Kinvey } from "kinvey-nativescript-sdk";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Frame, getFrameById, topmost } from "tns-core-modules/ui/frame";
import { User } from "./user-model";
import { Push } from "kinvey-nativescript-sdk/push";

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

        // register for push notifications from Kinvey
        Push.register({
            android: {
            senderID: '390861799348'
            },
            ios: {
            alert: true,
            badge: true,
            sound: true
            }
        })
        .then((deviceToken: string) => {
            //alert("Device registered.  Access token: " + deviceToken);
            console.log("Device registered for push.  Access token: " + deviceToken);
        })
        .catch((error: Error) => {
            alert("Error: " + error);
            console.log("Error: " + error);
        });
    
        // this will throw up a push notification in an alert box whenever one is received from Kinvey
        Push.onNotification((data: any) => {
            alert(data.body);
        });
    }

    signOut(): void {
        // log out
        const promise = Kinvey.User.logout()
        .then((data: any) => {
            console.log("Signed Out");
            this.isSignedIn = false;
        });
    }

    signIn(): void {
        Kinvey.User.login(this.user.username, this.user.password)
            .then((result: any) => {
                console.log("Logged in as: " + result.data.username);
                this.isSignedIn = true;
            })
            .catch((error) => {
                console.log("Error: " + JSON.stringify(error));
            });
    }

}
