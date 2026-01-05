import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="shareMenu"
      aria-label="分享文章"
    >
      <mat-icon>share</mat-icon>
    </button>

    <mat-menu #shareMenu="matMenu">
      <button mat-menu-item (click)="shareToTwitter()">
        <mat-icon>{{  'X' }}</mat-icon>
        <span>分享到 Twitter</span>
      </button>
      <button mat-menu-item (click)="shareToLinkedIn()">
        <mat-icon>work</mat-icon>
        <span>分享到 LinkedIn</span>
      </button>
      <button mat-menu-item (click)="copyLink()">
        <mat-icon>link</mat-icon>
        <span>复制链接</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ShareButtonComponent {
  @Input() title: string = '';
  @Input() url: string = '';

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && !this.url) {
      this.url = window.location.href;
    }
  }

  shareToTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.title)}&url=${encodeURIComponent(this.url)}`;
    if (typeof window !== 'undefined') {
      window.open(twitterUrl, '_blank', 'width=600,height=400');
    }
  }

  shareToLinkedIn() {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.url)}`;
    if (typeof window !== 'undefined') {
      window.open(linkedInUrl, '_blank', 'width=600,height=400');
    }
  }

  async copyLink() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.url);
        this.snackBar.open('链接已复制到剪贴板', '关闭', {
          duration: 2000,
        });
      } catch (err) {
        this.snackBar.open('复制失败，请手动复制', '关闭', {
          duration: 2000,
        });
      }
    }
  }
}
