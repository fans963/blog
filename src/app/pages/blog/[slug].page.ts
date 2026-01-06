import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BaseLayoutComponent } from '../../shared/layouts/base-layout.component';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    BaseLayoutComponent
  ],
  template: \`
    <app-base-layout>
      <div class="blog-detail">
        @if (post()) {
          <article class="article">
            <header class="article-header">
              <h1 class="article-title">{{ post()!.title }}</h1>
              <p class="article-description">{{ post()!.description }}</p>
              <div class="article-meta">
                <span class="meta-item">
                  <span class="material-symbols-outlined">person</span>
                  {{ post()!.author }}
                </span>
                <span class="meta-item">
                  <span class="material-symbols-outlined">calendar_today</span>
                  {{ post()!.date }}
                </span>
                <span class="meta-item">
                  <span class="material-symbols-outlined">schedule</span>
                  {{ post()!.readingTime }}
                </span>
              </div>
              <div class="article-tags">
                @for (tag of post()!.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            </header>
            <mat-divider></mat-divider>
            <div class="article-content" [innerHTML]="post()!.content"></div>
            <mat-divider></mat-divider>
            <footer class="article-footer">
              <p class="footer-text">如果您觉得这篇文章有帮助，欢迎分享给更多人！</p>
            </footer>
          </article>
        } @else if (loading()) {
          <div class="loading"><p>加载中...</p></div>
        } @else {
          <div class="not-found">
            <span class="material-symbols-outlined">search_off</span>
            <h2>文章未找到</h2>
            <p>抱歉，您访问的文章不存在或已被删除。</p>
            <a mat-raised-button color="primary" routerLink="/blog">返回博客列表</a>
          </div>
        }
      </div>
    </app-base-layout>
  \`,
  styles: [\`
    .blog-detail { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .article { background: rgb(var(--md-sys-color-surface)); border-radius: 8px; overflow: hidden; }
    .article-header { padding: 3rem 2rem 2rem; }
    .article-title { font-size: 2.5rem; font-weight: 600; line-height: 1.2; margin: 0 0 1rem 0; }
    .article-description { font-size: 1.25rem; color: rgb(var(--md-sys-color-on-surface-variant)); line-height: 1.6; margin: 0 0 2rem 0; }
    .article-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; }
    .meta-item { display: inline-flex; align-items: center; gap: 0.5rem; color: rgb(var(--md-sys-color-on-surface-variant)); font-size: 0.875rem; }
    .article-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag { padding: 0.375rem 1rem; background: rgb(var(--md-sys-color-secondary-container)); color: rgb(var(--md-sys-color-on-secondary-container)); border-radius: 1rem; font-size: 0.875rem; }
    .article-content { padding: 2rem; color: rgb(var(--md-sys-color-on-surface)); line-height: 1.8; font-size: 1.0625rem; }
    .article-content h2 { font-size: 1.75rem; font-weight: 600; margin: 2rem 0 1rem; }
    .article-content h3 { font-size: 1.375rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
    .article-content p { margin: 0 0 1rem 0; }
    .article-footer { padding: 2rem; text-align: center; }
    .loading, .not-found { text-align: center; padding: 4rem 2rem; }
  \`]
})
export default class BlogDetailPageComponent implements OnInit {
  post = signal<BlogPost | null>(null);
  loading = signal(true);
  private mockPosts: Record<string, BlogPost> = {
    'm3-blog-introduction': {
      slug: 'm3-blog-introduction', title: 'Material Design 3 博客介绍',
      description: '介绍使用 Material Design 3 和 Angular 构建的现代博客系统',
      date: '2024-01-15', author: 'Fans963', category: 'Angular',
      tags: ['Material Design', 'Angular', 'UI/UX'], readingTime: '5 分钟',
      content: '<h2>欢迎来到我的博客</h2><p>这是一个使用 Angular 20 和 Material Design 3 构建的现代化博客系统。</p>'
    }
  };
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      setTimeout(() => { this.post.set(this.mockPosts[slug] || null); this.loading.set(false); }, 500);
    });
  }
}
