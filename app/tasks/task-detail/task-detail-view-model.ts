import { Observable } from "data/observable";
import { Task } from "../shared/task-model";
import { SyncEntity } from "kinvey-nativescript-sdk";
import { ItemEventData } from "ui/list-view";
import { TaskService } from "../shared/task-service";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { View } from "ui/core/view";

/* ***********************************************************
* This is the item details view model.
*************************************************************/
export class TaskDetailViewModel extends Observable {
    
    private _taskService: TaskService;
        
    constructor(private _task: Task) {
        super();
    }

    get task(): Task {
        return this._task;
    }
    public acknowledgeJob(args: NavigatedData) {
        //console.log("task is " + JSON.stringify(this._task));
        alert("Job is acknowledged.  Request necessary parts now");
        this._task.status = "2";
        //console.log("task is " + JSON.stringify(this._task));
        
        // code here to update status code from 1 to 2
        this._taskService = TaskService.getInstance();
        this._taskService.update(this._task);

        topmost().navigate("/tasks/tasks-page");
    }
}

