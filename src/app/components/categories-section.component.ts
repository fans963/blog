import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

interface Category {
  name: string;
  count: number;
}

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  template: `
    <section class="categories-section">
      <h2 class="section-title">文章分类</h2>
      <div class="categories-grid">
        @for (category of categories(); track category.name) {
          <mat-card class="category-card" [attr.href]="'/blog?category=' + category.name">
            <mat-card-content>
              <div class="category-layout">
                <div class="category-icon">
                  <span class="material-symbols-outlined">category</span>
                </div>
                <div class="category-info">
                  <h3 class="category-name">{{ category.name }}</h3>
                  <p class="category-count">{{ category.count }} 篇文章</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .categories-section {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      cursor: pointer;
      transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
    }

    .category-card:hover {
      transform: translateY(-2px);
    }

    .category-layout {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .category-icon {
      background: rgb(var(--md-sys-color-primary-container));
      color: rgb(var(--md-sys-color-on-primary-container));
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .category-icon .material-symbols-outlined {
      font-size: 24px;
    }

    .category-info {
      flex: 1;
    }

    .category-name {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .category-count {
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      margin: 0;
    }

    @media (max-width: 1023px) {
      .categories-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
  `]
})
export class CategoriesSectionComponent {
  categories = input<Category[]>([]);
}
