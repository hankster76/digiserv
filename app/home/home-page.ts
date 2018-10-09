import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../shared/config";
import { NavigatedData, Page } from "ui/page";
import { HomeViewModel } from "./home-view-model";
import { Frame, getFrameById, topmost } from "tns-core-modules/ui/frame";
import { Push } from "kinvey-nativescript-sdk/push";


var page;

export function signIn(username: string, password: string): void {
    //console.log("page is " + JSON.stringify(page));
    const promise = logOut().then (function(data) {
        Kinvey.User.login(page.bindingContext.username, page.bindingContext.password)
        .then(function (result: any) {
            console.log("Logged in as: " + result.data.username);

            console.log("past push registration");
            const topmostFrame: Frame = topmost();
            topmost().goBack;
            //topmost().navigate("tasks/tasks-page");
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
    })
}

export function logOut(): Promise<any> {
    console.log("log out");
    return Kinvey.User.logout();
}

export function onNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
}
