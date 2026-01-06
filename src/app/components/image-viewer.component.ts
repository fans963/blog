import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="image-dialog-container">
      <div class="dialog-header">
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <img [src]="data.src" [alt]="data.alt" class="dialog-image" />
    </div>
  `,
  styles: [`
    .image-dialog-container {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }

    .dialog-header {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 0 0 0 8px;
    }

    .dialog-header button {
      color: white;
    }

    .dialog-image {
      width: 100%;
      height: auto;
      display: block;
    }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { src: string; alt: string }) {}
}

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-viewer-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .image-viewer-wrapper :ng-deep img {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .image-viewer-wrapper :ng-deep img:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `]
})
export class ImageViewerComponent {
  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      // Add click handlers to all images
      const images = document.querySelectorAll('.image-viewer-wrapper img');
      images.forEach((img) => {
        img.addEventListener('click', (e) => {
          const target = e.target as HTMLImageElement;
          this.openImageDialog(target.src, target.alt);
        });
      });
    }
  }

  openImageDialog(src: string, alt: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { src, alt },
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'image-dialog'
    });
  }
}
