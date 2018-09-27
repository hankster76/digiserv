import { Observable, EventData, PropertyChangeData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { Color } from 'tns-core-modules/color';
import { Switch } from 'tns-core-modules/ui/switch';
import { Slider } from 'tns-core-modules/ui/slider';
import { DrawingPad } from 'nativescript-drawingpad';

export class SignatureViewModel extends Observable {
  private _myDrawingPad: DrawingPad;
  private _widthSlider: Slider;
  private _penInput: any;
  
  public penWidth = 2;
  public penColor = '#222';

  constructor(mainPage: Page) {
    super();
    this._myDrawingPad = mainPage.getViewById('drawingPad') as DrawingPad;
    
  }

  public getMyDrawing() {
    this._myDrawingPad.getDrawing().then(res => {
      console.log(res);
    });
  }

  public getMyDrawingSvg() {
    this._myDrawingPad.getDrawingSvg().then(res => {
      console.log(res);
    });
  }

  public clearMyDrawing() {
    this._myDrawingPad.clearDrawing();
  }

  public changePenColor() {
    this.set('penColor', '#ff4801');
  }

  
}
