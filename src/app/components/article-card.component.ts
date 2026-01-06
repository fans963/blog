import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  template: `
    <mat-card class="article-card" [class.featured]="featured">
      <a [href]="'/blog/' + slug" class="card-link">
        <img
          *ngIf="image"
          mat-card-image
          [src]="image"
          [alt]="title"
          class="card-image"
        />
        
        <mat-card-header>
          <mat-card-title>{{ title }}</mat-card-title>
          <mat-card-subtitle>
            <span class="date">{{ formattedDate }}</span>
            <span class="separator">•</span>
            <span class="category">{{ category }}</span>
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p class="description">{{ description }}</p>
          
          <mat-chip-set *ngIf="tags && tags.length > 0" class="tags">
            <mat-chip *ngFor="let tag of tags">{{ tag }}</mat-chip>
          </mat-chip-set>
        </mat-card-content>
      </a>
    </mat-card>
  `,
  styles: [`
    .article-card {
      height: 100%;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }

    .article-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .article-card.featured {
      border: 2px solid rgb(var(--md-sys-color-primary));
    }

    .card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .card-image {
      height: 200px;
      object-fit: cover;
    }

    mat-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: rgb(var(--md-sys-color-on-surface));
    }

    mat-card-subtitle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      margin-bottom: 0.75rem;
    }

    .separator {
      opacity: 0.5;
    }

    .description {
      color: rgb(var(--md-sys-color-on-surface-variant));
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .tags {
      margin-top: 1rem;
    }

    mat-chip {
      font-size: 0.75rem;
    }

    @media (max-width: 767px) {
      .card-image {
        height: 150px;
      }

      mat-card-title {
        font-size: 1.1rem;
      }
    }
  `]
})
export class ArticleCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date!: Date;
  @Input() category: string = '';
  @Input() tags: string[] = [];
  @Input() image?: string;
  @Input() slug: string = '';
  @Input() featured: boolean = false;

  formattedDate: string = '';

  ngOnInit() {
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
