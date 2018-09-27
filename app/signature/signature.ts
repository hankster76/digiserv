import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { isAndroid, device } from 'tns-core-modules/platform';
import { Color } from 'tns-core-modules/color';
import { android } from 'tns-core-modules/application';
import { SignatureViewModel } from './signature-view-model';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  var page = <Page>args.object;
  page.bindingContext = new SignatureViewModel(page);

  if (isAndroid && device.sdkVersion >= '21') {
    let window = android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#336699').android);
  }
}
