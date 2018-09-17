import { Observable } from "data/observable";
import { Task } from "../shared/task-model";

/* ***********************************************************
* This is the item details view model.
*************************************************************/
export class TaskDetailViewModel extends Observable {
    constructor(private _task: Task) {
        super();
    }

    get task(): Task {
        return this._task;
    }
}
