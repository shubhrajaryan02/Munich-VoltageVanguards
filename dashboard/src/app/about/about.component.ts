import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
 
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('myVideo') private videoRef?: ElementRef;
  @ViewChild('playPauseBtn') private playPauseBtnRef?: ElementRef;
  @ViewChild('stopBtn') private stopBtnRef?: ElementRef;

  private get video(): HTMLVideoElement | undefined {
    return this.videoRef?.nativeElement as HTMLVideoElement;
  }

  private get playPauseBtn(): HTMLButtonElement | undefined {
    return this.playPauseBtnRef?.nativeElement as HTMLButtonElement;
  }

  private get stopBtn(): HTMLButtonElement | undefined {
    return this.stopBtnRef?.nativeElement as HTMLButtonElement;
  }

  constructor() {}

  ngAfterViewInit() {
    // Check if the elements are defined before adding event listeners
    if (this.video && this.playPauseBtn && this.stopBtn) {
      this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      this.stopBtn.addEventListener('click', () => this.stopVideo());
    }
  }

  togglePlayPause() {
    if (this.video && this.video.paused) {
      this.video.play();
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = 'Pause';
      }
    } else {
      if (this.video) {
        this.video.pause();
      }
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = 'Play';
      }
    }
  }

  stopVideo() {
    if (this.video) {
      this.video.pause();
      this.video.currentTime = 0;
    }
    if (this.playPauseBtn) {
      this.playPauseBtn.innerHTML = 'Play';
    }
  }
}
