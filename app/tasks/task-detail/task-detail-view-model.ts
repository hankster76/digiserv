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
        this._taskService = TaskService.getInstance();
    }

    
    get task(): Task {
        return this._task;
    }
    public acknowledgeJob() {
        alert("Job is acknowledged.  Request necessary parts now");
        this._task.status = "2";
        
        // code here to update status code from 0 to 1
        this._taskService.update(this._task);
    }
}

