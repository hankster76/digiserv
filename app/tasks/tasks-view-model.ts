import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Push } from "kinvey-nativescript-sdk/push";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../shared/config";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Task } from "./shared/task-model";
import { TaskService } from "./shared/task-service";
import { ListViewEventData }from "nativescript-ui-listview";

export class TasksListViewModel extends Observable { 
    @ObservableProperty() items: ObservableArray<Task> = new ObservableArray<Task>([]);
    @ObservableProperty() isLoading: boolean = false;

    private _taskService: TaskService;

    constructor() {
        super();
        this._taskService = TaskService.getInstance();
    }

    load(): void {
        console.log("ViewModel Load");
        this.isLoading = true;
        this._taskService.load()
            .then((items: Array<Task>) => {
                this.items = new ObservableArray(items);
                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
    }
    
    public onPullToRefreshInitiated(args: ListViewEventData) {
        this.isLoading = true;
        this._taskService.load()
            .then((items: Array<Task>) => {
                this.items = new ObservableArray(items);
                this.isLoading = false;
                const listView = args.object;
                listView.notifyPullToRefreshFinished();
            })
            .catch((err) => {
                this.isLoading = false;
                console.log("Err: " + err);
            })
    }
}
