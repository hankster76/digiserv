import { ListViewEventData } from "nativescript-ui-listview";
//import { ObservableArray } from "tns-core-modules/data/observable-array";
//import { Observable } from "tns-core-modules/data/observable";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { Push } from "kinvey-nativescript-sdk/push";
import { TasksListViewModel } from "./tasks-view-model";
import { Task } from "./shared/task-model";
import { View } from "ui/core/view";
import { ItemEventData } from "ui/list-view";


export function onNavigatingTo(args: NavigatedData) {
    Push.onNotification((data: any) => {
        alert(data.body);
    });

    const page = <Page>args.object;
    const viewModel = new TasksListViewModel()

    page.bindingContext = viewModel;
    viewModel.load();
    
}

export function onItemTap(args: ItemEventData) {
    const view = <View>args.view;
    const page = <Page>view.page;
    const tappedItem = <Task>view.bindingContext;

    //console.log("onItemTap");

    page.frame.navigate({
        moduleName: "tasks/task-detail/task-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}



