import { topmost } from "ui/frame";
import { EventData, View } from "ui/core/view";
import { NavigatedData, Page } from "ui/page";
import { TaskDetailViewModel } from "./task-detail-view-model";
import { Task } from "../shared/task-model";
import { TaskService } from "../shared/task-service";
import * as application from "application";
// geo-locator
import {LocateAddress} from "nativescript-locate-address";
import { fromObject } from "tns-core-modules/data/observable";

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

    application.getResources().colorHandler = function(status) {
        if (status === "New") {
            return "red";
        } else if (status === "Acknowledged") {
            return "purple";
        } else {
            return "green";
        }
    }

    const page = <Page>args.object;
    page.bindingContext = new TaskDetailViewModel(page.navigationContext);
    console.log("navigated data" + JSON.stringify(page.bindingContext));
}

export function serviceTap(args: EventData) {
    console.log("serviceTap");
    topmost().navigate("/signature/signature");
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
    var addr = task.address + ", " + task.city + ", " + task.state + ", " + task.zip;
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
    var phnum = task.cellphone;
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
    var addr = task.email;
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


