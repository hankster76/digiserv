import { topmost } from "ui/frame";
import { EventData, View } from "ui/core/view";
import { NavigatedData, Page } from "ui/page";
import { PartDetailViewModel } from "./part-detail-view-model";
import { Item } from "../shared/item-model";

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }
    const page = <Page>args.object;
    page.bindingContext = new PartDetailViewModel(page.navigationContext);
}

export function onBackButtonTap(args: EventData) {
    const view = args.object as View;
    const page = view.page as Page;
    page.frame.goBack();
}

export function onRequestTap() {
    alert("Item has been Requested.  If out of stock you will be notified when it becomes available.");
}

