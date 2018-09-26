import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../shared/config";
import { NavigatedData, Page } from "ui/page";
import { Frame, getFrameById, topmost } from "tns-core-modules/ui/frame";

var user = {
    username: Config.kinveyUsername,
    password: Config.kinveyPassword
}

var page;

export function signIn(username: string, password: string): void {
    console.log("Page Binding Context: " + JSON.stringify(page.bindingContext));
    
        const promise = Kinvey.User.login(page.bindingContext.username, page.bindingContext.password)
        .then(function (result) {
            console.log("Logged in: " + JSON.stringify(result));
            const homeFrame = getFrameById("home");
            console.log("Home Frame: " + homeFrame.parent.id);
            //homeFrame.navigate("app/home/home-page");
            //Page.
            const topmostFrame: Frame = topmost();
            console.log("Topmost frame: " + topmostFrame.id);
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
}

export function logOut(): void {
    const promise = Kinvey.User.logout()
    .then(function (result) {
        console.log("Result: " + JSON.stringify(result));
    })
    .catch(function (error) {
        console.log("Error: " + JSON.stringify(error));
    });
}

export function onNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = user;
}