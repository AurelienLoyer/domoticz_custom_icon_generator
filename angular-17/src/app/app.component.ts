import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Step2Component } from './steps/step-2/step-2.component';

type OnOff = 'on' | 'off';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule, Step2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  public croppedImageOnBlob: Blob | undefined | null = undefined;
  public croppedImageOffBlob: Blob | undefined | null = undefined;
  public isAppLoaded = false;
  public iconName = '';

  public ngAfterViewInit() {
    this.isAppLoaded = true;
  }

  public assignCropperImageBlob(blob: Blob, onOff: OnOff) {
    if (onOff === 'on') {
      this.croppedImageOnBlob = blob;
    }
    else {
      this.croppedImageOffBlob = blob;
    }
  }

  public zip() {

    if (!this.croppedImageOnBlob) {
      return;
    }

    if (!this.croppedImageOffBlob) {
      return;
    }

    var zip = new JSZip();

    zip.file("icons.txt", this.iconName + ";Button " + this.iconName + ";Icon " + this.iconName + " generate via " + window.location.href);

    // var preview = toDataUrl('../img/bouton.png');

    zip.file(this.iconName + "48_On.png", this.croppedImageOnBlob, { base64: true });
    zip.file(this.iconName + "48_Off.png", this.croppedImageOffBlob, { base64: true });
    // zip.file(this.iconName + '.png', preview, { base64: true });

    // vm.loader = true;
    zip.generateAsync({ type: "blob" }).then((content) => {
      // vm.loader = false;
      saveAs(content, "domoticz_custom_icon_" + this.iconName + ".zip");
    });
  }
}
