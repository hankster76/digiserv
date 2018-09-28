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
    
        const promise = Kinvey.User.login(page.bindingContext.username, page.bindingContext.password)
        .then(function (result: any) {
            console.log("Logged in as: " + result.data.username);
            const topmostFrame: Frame = topmost();
            topmost().navigate("home/home-page");
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
}

export function logOut(): void {
    const promise = Kinvey.User.logout()
    .then(function (result: any) {
        console.log("Logged out as: " + result.data.username);
    })
    .catch(function (error) {
        console.log("Error: " + JSON.stringify(error));
    });
}

export function onNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = user;
}