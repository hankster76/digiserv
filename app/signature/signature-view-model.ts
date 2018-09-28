import { Observable, EventData, PropertyChangeData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { DrawingPad } from 'nativescript-drawingpad';
import { topmost } from "ui/frame";

export class SignatureViewModel extends Observable {
  private _myDrawingPad: DrawingPad;
  
  public penWidth = 2;
  public penColor = '#222';

  constructor(sigPage: Page) {
    super();
    this._myDrawingPad = sigPage.getViewById('drawingPad') as DrawingPad;
  }

  public getMyDrawing() {
    console.log("Signature entered, change statusCode to 3");
    //alert("Signature entered, change statusCode to 3");
    this._myDrawingPad.getDrawing().then(res => {
      console.log(res);
    });
    topmost().goBack();
  }

  public clearMyDrawing() {
    this._myDrawingPad.clearDrawing();
  }

}
