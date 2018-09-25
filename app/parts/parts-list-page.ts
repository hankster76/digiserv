import { ListViewEventData } from "nativescript-ui-listview";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { Push } from "kinvey-nativescript-sdk/push";
import { PartsListViewModel } from "./parts-list-view-model";
import { Item } from "./shared/item-model";
import { View } from "ui/core/view";
import { ItemEventData } from "ui/list-view";

import * as utils from "utils/utils";

declare var UIColor: any;


export function onNavigatingTo(args: NavigatedData) {
    Push.onNotification((data: any) => {
        alert(data.body);
    });

    const page = <Page>args.object;
    const viewModel = new PartsListViewModel()

    page.bindingContext = viewModel;
    viewModel.load();
}

export function onItemTap(args: ItemEventData) {
    const view = <View>args.view;
    const page = <Page>view.page;
    const tappedItem = <Item>view.bindingContext;

    //console.log("onItemTap");

    page.frame.navigate({
        moduleName: "parts/part-detail/part-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

export function makeBackgroundTransparent(args: ListViewEventData) {
    let cell = args.ios;    

    if (cell) {
        cell.backgroundView.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
    }
}
