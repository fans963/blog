import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-count',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="view-count">
      <mat-icon class="view-icon">visibility</mat-icon>
      <span *ngIf="!loading" class="count">{{ views }}</span>
      <mat-spinner *ngIf="loading" diameter="16"></mat-spinner>
    </div>
  `,
  styles: [`
    .view-count {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
    }

    .view-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .count {
      font-weight: 500;
    }

    mat-spinner {
      display: inline-block;
    }
  `]
})
export class ViewCountComponent implements OnInit {
  @Input() slug: string = '';
  views: number = 0;
  loading: boolean = true;

  async ngOnInit() {
    if (this.slug) {
      await this.fetchViewCount();
      await this.incrementViewCount();
    }
  }

  private async fetchViewCount() {
    try {
      const response = await fetch(`/api/views/${this.slug}`);
      if (response.ok) {
        const data = await response.json();
        this.views = data.views || 0;
      }
    } catch (error) {
      console.error('Failed to fetch view count:', error);
    } finally {
      this.loading = false;
    }
  }

  private async incrementViewCount() {
    try {
      const response = await fetch(`/api/views/${this.slug}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        this.views = data.views || this.views;
      }
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  }
}
