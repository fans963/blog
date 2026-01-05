import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface Post {
  slug: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-eyebrow">Material Design 3</div>
          <h1 class="hero-title">
            欢迎来到 <span class="highlight">My Blog</span>
          </h1>
          <p class="hero-subtitle">
            探索前沿技术 · 分享设计理念 · 构建优雅架构
          </p>

          <div class="hero-actions">
            <a mat-flat-button color="primary" href="/blog" class="hero-button">
              <span class="material-symbols-outlined">explore</span>
              浏览文章
            </a>
            <a mat-stroked-button color="primary" href="/about" class="hero-button">
              <span class="material-symbols-outlined">info</span>
              关于本站
            </a>
          </div>
        </div>

        @if (latestPost()) {
          <div class="hero-visual">
            <mat-card class="hero-card" [attr.href]="'/blog/' + latestPost()!.slug">
              <mat-card-content>
                <div class="hero-card-layout">
                  <div class="hero-card-icon">
                    <span class="material-symbols-outlined">edit</span>
                  </div>
                  <div class="hero-card-text">
                    <span class="hero-card-category">最新文章</span>
                    <h3>{{ latestPost()!.title }}</h3>
                    <p class="hero-card-desc">{{ latestPost()!.description }}</p>
                  </div>
                  <div class="hero-card-arrow">
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding: 4rem 0;
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-eyebrow {
      color: rgb(var(--md-sys-color-primary));
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .highlight {
      color: rgb(var(--md-sys-color-primary));
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .hero-button .material-symbols-outlined {
      font-size: 20px;
    }

    .hero-card {
      cursor: pointer;
      transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
    }

    .hero-card:hover {
      transform: translateY(-4px);
    }

    .hero-card-layout {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .hero-card-icon {
      background: rgb(var(--md-sys-color-primary-container));
      color: rgb(var(--md-sys-color-on-primary-container));
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .hero-card-text {
      flex: 1;
    }

    .hero-card-category {
      font-size: 0.75rem;
      font-weight: 600;
      color: rgb(var(--md-sys-color-primary));
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .hero-card-text h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0.5rem 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .hero-card-desc {
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      margin: 0;
    }

    .hero-card-arrow {
      color: rgb(var(--md-sys-color-primary));
    }

    @media (max-width: 1023px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 767px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class HeroSectionComponent {
  latestPost = input<Post | null>(null);
}
