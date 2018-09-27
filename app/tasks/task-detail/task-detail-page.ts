import { topmost } from "ui/frame";
import { EventData, View } from "ui/core/view";
import { NavigatedData, Page } from "ui/page";
import { TaskDetailViewModel } from "./task-detail-view-model";
import { Task } from "../shared/task-model";
0
// geo-locator
import {LocateAddress} from "nativescript-locate-address";

// phone dialer
import { isAndroid } from "platform";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import * as TNSPhone from 'nativescript-phone';
import * as permissions from "nativescript-permissions";

// email plugin
import * as email from "nativescript-email";
import * as dialogs from 'ui/dialogs';
//import 'rxjs/add/operator/switchMap';

declare var android;

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }
    const page = <Page>args.object;
    page.bindingContext = new TaskDetailViewModel(page.navigationContext);
    //console.log("navigated data" + JSON.stringify(page.bindingContext));
}

export function serviceTap(args: EventData) {
    //const view = <View>args.view;
    //const page = <Page>view.page;
    //const tappedItem = <Task>view.bindingContext;

    console.log("serviceTap");
    alert("You will be taken to the signature screen here to acknowledge that work was completed");

    //page.frame.navigate({
    //    moduleName: "../signature/signature",
    //    context: tappedItem,
    //    animated: true,
    //    transition: {
    //        name: "slide",
    //        duration: 200,
    //        curve: "ease"
    //    }
    //});
}

export function onBackButtonTap(args: EventData) {
    const view = args.object as View;
    const page = view.page as Page;
    page.frame.goBack();
}

// get object, concatenate string for address and call geo-locator on device
export function onTapAddress(args) {
    var page = args.object;
    var task = page.bindingContext._task;
    var addr = task.Address + ", " + task.City + ", " + task.State + ", " + task.Zip;
    //console.log("Address is " + addr);
    let locator = new LocateAddress();
    locator.locate({
      address: addr,
      }).then(() => {
        //console.log("Maps app launched.");
      }, (error) => {
        console.log(error);
    });    
}

// get object, extract phone and call phone dialer for the device
export function call(args) {
    var page = args.object;
    var task = page.bindingContext._task;
    var phnum = task.Phone;
    //console.log("Ready to dial " + phnum);

    if (isAndroid) {
      permissions.requestPermission(android.Manifest.permission.CALL_PHONE, 
        "App Needs This Permission To Make Phone Calls")
        .then(()=>{
          TNSPhone.dial(String(phnum), false);
        })
        .catch(()=>{
        console.log("Permission Denied!");
      });
    } else {
      TNSPhone.dial(String(phnum), false);
    }
}  

// get object, extract email address and initiate email send
export function mailTo(args) {
    var page = args.object;
    var task = page.bindingContext._task;
    var addr = task.Email;
    var msg: string;
    msg = "Hello, this is your DigiServ Technician.  I would like to talk to you about scheduling your appointment";
 
    if(email.available()) {
        email.compose({
            subject: "Message from DigiServ Technician",
            to: [addr],
            body: msg
        }).then(result => {

        }).catch(error => console.error(error));
    }
}


