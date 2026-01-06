import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-reading-progress',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <mat-progress-bar
      mode="determinate"
      [value]="progress"
      class="reading-progress-bar"
    ></mat-progress-bar>
  `,
  styles: [`
    .reading-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 3px;
    }

    ::ng-deep .reading-progress-bar .mat-mdc-progress-bar-buffer {
      background-color: transparent;
    }
  `]
})
export class ReadingProgressComponent implements OnInit, OnDestroy {
  progress = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.calculateProgress();
  }

  ngOnInit() {
    this.calculateProgress();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  calculateProgress() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.progress = (winScroll / height) * 100;
    }
  }
}
