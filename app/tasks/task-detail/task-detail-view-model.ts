import { Observable } from "data/observable";
import { Task } from "../shared/task-model";
import { SyncEntity } from "kinvey-nativescript-sdk";
import { ItemEventData } from "ui/list-view";
import { TaskService } from "../shared/task-service";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { View } from "ui/core/view";
import { ObservableProperty } from "../../shared/observable-property-decorator";


/* ***********************************************************
* This is the item details view model.
*************************************************************/
export class TaskDetailViewModel extends Observable {
    
    private _taskService: TaskService;
    //private _task: Task;
    @ObservableProperty() statusColor: string;
    @ObservableProperty() statusText: string;
        
    constructor(private _task: Task) {
        super();

        if (this._task.status === "1") {
            this.statusColor = "red";
        } else if (this._task.status === "2") {
            this.statusColor = "purple";
        } else {
            this.statusColor =  "green";
        }

        if (this._task.status === "1") {
            this.statusText = "New";
        } else if (this._task.status === "2") {
            this.statusText = "Acknowledged";
        } else {
            this.statusText = "Complete";
        }

        this._taskService = TaskService.getInstance();
    }

    
    get task(): Task {
        console.log("Getting task");
        return this._task;
    }

    public acknowledgeJob() {
        alert("Job is acknowledged.  Request necessary parts now");
        this._task.status = "2";
        this.statusColor = "purple";
        this.statusText = "Acknowledged";
        
        // code here to update status code from 0 to 1
        this._taskService.update(this._task);
    }
}

