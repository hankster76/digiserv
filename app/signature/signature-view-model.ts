import { Observable, EventData, PropertyChangeData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { DrawingPad } from 'nativescript-drawingpad';
import { topmost } from "ui/frame";
import { TaskDetailViewModel } from "../tasks/task-detail/task-detail-view-model";
import { Task } from "../tasks/shared/task-model";

export class SignatureViewModel extends Observable {
  private _myDrawingPad: DrawingPad;
  private _taskViewModel: TaskDetailViewModel;
  
  public penWidth = 2;
  public penColor = '#222';

  constructor(sigPage: Page, taskViewModel: TaskDetailViewModel) {
    super();
    console.log("Task detail view model is: " + JSON.stringify(taskViewModel.task));
    this._taskViewModel = taskViewModel;
    this._myDrawingPad = sigPage.getViewById('drawingPad') as DrawingPad;
  }

  public getMyDrawing() {
    console.log("Signature entered, change statusCode to 3");
    //alert("Signature entered, change statusCode to 3");
    this._taskViewModel.task.status = "3";
    this._taskViewModel.statusText = "Complete";
    this._taskViewModel.statusColor = "green";
    this._myDrawingPad.getDrawing().then(res => {
      console.log(res);
      //console.log("Changed task view model is: " + JSON.stringify(this._taskViewModel));
    });

    this._taskViewModel.taskService.update(this._taskViewModel.task);
    topmost().goBack();
  }

  public clearMyDrawing() {
    this._myDrawingPad.clearDrawing();
  }

}
