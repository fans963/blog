import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { BaseLayoutComponent } from '../shared/layouts/base-layout.component';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    BaseLayoutComponent
  ],
  template: `
    <app-base-layout>
      <div class="blog-page">
        <div class="blog-header">
          <h1 class="blog-title">博客文章</h1>
          <p class="blog-subtitle">分享技术见解和开发经验</p>
        </div>

        <div class="blog-filters">
          <mat-form-field class="search-field" appearance="outline">
            <mat-label>搜索文章</mat-label>
            <input matInput placeholder="输入关键词搜索..." [(ngModel)]="searchQuery">
            <span class="material-symbols-outlined" matIconPrefix>search</span>
          </mat-form-field>

          <div class="category-chips">
            @for (category of categories(); track category) {
              <mat-chip-option
                [selected]="selectedCategory() === category"
                (click)="filterByCategory(category)">
                {{ category }}
              </mat-chip-option>
            }
          </div>
        </div>

        <div class="blog-grid">
          @for (post of filteredPosts(); track post.slug) {
            <mat-card class="blog-card" [routerLink]="['/blog', post.slug]">
              <mat-card-header>
                <mat-card-title>{{ post.title }}</mat-card-title>
                <mat-card-subtitle>
                  <span class="post-date">{{ post.date }}</span>
                  <span class="post-reading-time">
                    <span class="material-symbols-outlined">schedule</span>
                    {{ post.readingTime }}
                  </span>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="post-description">{{ post.description }}</p>
                <div class="post-tags">
                  @for (tag of post.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>

        @if (filteredPosts().length === 0) {
          <div class="no-results">
            <span class="material-symbols-outlined">search_off</span>
            <p>未找到匹配的文章</p>
          </div>
        }
      </div>
    </app-base-layout>
  `,
  styles: [`
    .blog-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .blog-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .blog-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .blog-subtitle {
      font-size: 1.125rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      margin: 0;
    }

    .blog-filters {
      margin-bottom: 2rem;
    }

    .search-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    .category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .blog-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .post-date,
    .post-reading-time {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      margin-right: 1rem;
      font-size: 0.875rem;
    }

    .post-description {
      color: rgb(var(--md-sys-color-on-surface-variant));
      line-height: 1.6;
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .tag {
      padding: 0.25rem 0.75rem;
      background: rgb(var(--md-sys-color-secondary-container));
      color: rgb(var(--md-sys-color-on-secondary-container));
      border-radius: 1rem;
      font-size: 0.875rem;
    }

    .no-results {
      text-align: center;
      padding: 3rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
    }

    .no-results .material-symbols-outlined {
      font-size: 4rem;
      opacity: 0.5;
    }
  `]
})
export default class BlogPageComponent {
  searchQuery = signal('');
  selectedCategory = signal('全部');
  
  categories = signal(['全部', 'Angular', 'React', 'TypeScript', '架构', '前端']);
  
  // Temporary mock data - will be replaced with @analogjs/content
  posts = signal<BlogPost[]>([
    {
      slug: 'm3-blog-introduction',
      title: 'Material Design 3 博客介绍',
      description: '介绍使用 Material Design 3 和 Angular 构建的现代博客系统',
      date: '2024-01-15',
      category: 'Angular',
      tags: ['Material Design', 'Angular', 'UI/UX'],
      readingTime: '5 分钟'
    },
    {
      slug: 'microfrontend-architecture',
      title: '微前端架构设计与实践',
      description: '探讨现代微前端架构的设计模式和最佳实践',
      date: '2024-01-10',
      category: '架构',
      tags: ['微前端', '架构', 'Module Federation'],
      readingTime: '8 分钟'
    },
    {
      slug: 'react-19-features',
      title: 'React 19 新特性解析',
      description: '深入了解 React 19 带来的新功能和改进',
      date: '2024-01-05',
      category: 'React',
      tags: ['React', 'JavaScript', '新特性'],
      readingTime: '6 分钟'
    },
    {
      slug: 'tailwind-v4-highlights',
      title: 'Tailwind CSS v4 亮点功能',
      description: '探索 Tailwind CSS v4 的新特性和改进',
      date: '2023-12-28',
      category: '前端',
      tags: ['Tailwind CSS', 'CSS', '样式'],
      readingTime: '4 分钟'
    },
    {
      slug: 'typescript-best-practices',
      title: 'TypeScript 最佳实践',
      description: 'TypeScript 开发中的最佳实践和设计模式',
      date: '2023-12-20',
      category: 'TypeScript',
      tags: ['TypeScript', '最佳实践', '类型系统'],
      readingTime: '7 分钟'
    }
  ]);

  filteredPosts = signal<BlogPost[]>(this.posts());

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
    this.updateFilteredPosts();
  }

  private updateFilteredPosts() {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    
    this.filteredPosts.set(
      this.posts().filter(post => {
        const matchesQuery = query === '' || 
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query));
        
        const matchesCategory = category === '全部' || post.category === category;
        
        return matchesQuery && matchesCategory;
      })
    );
  }
}
