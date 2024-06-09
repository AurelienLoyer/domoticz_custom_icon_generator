import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type OnOff = 'on' | 'off';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ImageCropperComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public imageOnChangedEvent: Event | null = null;
  public imageOffChangedEvent: Event | null = null;
  public croppedImageOn: SafeUrl = '';
  public croppedImageOnBlob: Blob | undefined | null = undefined;
  public croppedImageOff: SafeUrl = '';
  public croppedImageOffBlob: Blob | undefined | null = undefined;
  public iconName = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  public fileChangeEvent(event: Event, onOff: OnOff): void {
    if (onOff === 'on') {
      this.imageOnChangedEvent = event;
    }
    else {
      this.imageOffChangedEvent = event;
    }
  }

  public imageCropped(event: ImageCroppedEvent, onOff: OnOff) {
    if (!event.objectUrl) {
      console.log(event);

      return;
    }

    if (onOff === 'on') {
      this.croppedImageOn = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
      this.croppedImageOnBlob = event.blob;
    }
    else {
      this.croppedImageOff = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
      this.croppedImageOffBlob = event.blob;
    }
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
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
