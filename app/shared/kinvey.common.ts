import { Kinvey } from "kinvey-nativescript-sdk";

import { Config } from "./config";

/* ***********************************************************
* The {N} Kinvey plugin initialization is explained in the plugin readme here:
* http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
* In this template, Kinvey is set up with a custom existing project, so that
* You can build and run this template without creating your own Kinvey project.
*************************************************************/
console.log("appKey is " + Config.kinveyAppKey);
console.log("appSecret is " + Config.kinveyAppSecret);
console.log("user id is " + Config.kinveyUsername);
console.log("password is " + Config.kinveyPassword);

Kinvey.init({
    appKey: Config.kinveyAppKey,
    appSecret: Config.kinveyAppSecret
});
  
// ping Kinvey - this is optional but will message that you are connected when debugging
Kinvey.ping()  
    .then(function(response) {
        console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
    })
    .catch(function(error) {
        console.log('Kinvey Ping Failed. Response: ' + JSON.stringify(error));
    });
  