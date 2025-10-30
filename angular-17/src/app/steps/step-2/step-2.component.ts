import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

type OnOff = 'on' | 'off';

@Component({
    selector: 'app-step-2',
    standalone: true,
    imports: [NgIf, ImageCropperComponent],
    templateUrl: './step-2.component.html',
    styleUrl: './step-2.component.scss'
})
export class Step2Component {

    public imageOnChangedEvent: Event | null = null;
    public imageOffChangedEvent: Event | null = null;
    public croppedImageOn: SafeUrl = '';
    public croppedImageOff: SafeUrl = '';

    @Output() public assignCropperImageOnBlob: EventEmitter<Blob> = new EventEmitter();
    @Output() public assignCropperImageOffBlob: EventEmitter<Blob> = new EventEmitter();

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

        if (onOff === 'on' && event.blob) {
            this.croppedImageOn = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
            this.assignCropperImageOnBlob.emit(event.blob);
        }
        else if (onOff === 'off' && event.blob) {
            this.croppedImageOff = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
            this.assignCropperImageOffBlob.emit(event.blob);
        } else {
            console.log(event);
        }
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
}
