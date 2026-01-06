import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../shared/layouts/base-layout.component';
import { MatCardModule } from '@angular/material/card';

export const routeMeta = {
  title: 'About | My M3 Blog',
  meta: [
    {
      name: 'description',
      content: 'Learn more about this blog',
    },
  ],
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BaseLayoutComponent, MatCardModule],
  template: `
    <app-base-layout>
      <div class="about-page">
        <div class="about-container">
          <mat-card class="about-card">
            <mat-card-header>
              <mat-card-title>
                <h1 class="about-title">关于本博客</h1>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="about-content">
                <section class="about-section">
                  <h2>技术栈</h2>
                  <p>
                    本博客使用以下现代化技术栈构建：
                  </p>
                  <ul>
                    <li><strong>Analog.js</strong> - Angular 元框架，提供 SSR/SSG 支持</li>
                    <li><strong>Angular 20</strong> - 最新的 Angular 特性（Signals、新控制流语法）</li>
                    <li><strong>Material Design 3</strong> - Google 最新的设计系统</li>
                    <li><strong>TypeScript</strong> - 类型安全的 JavaScript 超集</li>
                    <li><strong>Sass</strong> - 强大的 CSS 预处理器</li>
                    <li><strong>Vite</strong> - 快速的构建工具</li>
                  </ul>
                </section>

                <section class="about-section">
                  <h2>特性</h2>
                  <ul>
                    <li>✨ 完整的 Material Design 3 设计系统</li>
                    <li>🎨 亮色/暗色主题切换</li>
                    <li>🎨 自定义颜色主题选择器</li>
                    <li>📱 响应式设计，适配各种设备</li>
                    <li>⚡ 基于 Vite 的超快构建</li>
                    <li>🔍 SEO 优化</li>
                    <li>📊 Material Symbols 图标集成</li>
                  </ul>
                </section>

                <section class="about-section">
                  <h2>关于作者</h2>
                  <p>
                    一名热爱技术的开发者，专注于 Web 前端开发和现代化应用架构。
                  </p>
                </section>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </app-base-layout>
  `,
  styles: [`
    .about-page {
      width: 100%;
      min-height: calc(100vh - 200px);
      padding: 3rem 1rem;
      display: flex;
      justify-content: center;
    }

    .about-container {
      width: 100%;
      max-width: 900px;
    }

    .about-card {
      padding: 2rem;
    }

    .about-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin: 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .about-content {
      margin-top: 2rem;
    }

    .about-section {
      margin-bottom: 2.5rem;
    }

    .about-section:last-child {
      margin-bottom: 0;
    }

    .about-section h2 {
      font-size: 1.75rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: rgb(var(--md-sys-color-primary));
    }

    .about-section p {
      font-size: 1.125rem;
      line-height: 1.7;
      color: rgb(var(--md-sys-color-on-surface));
      margin-bottom: 1rem;
    }

    .about-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .about-section li {
      font-size: 1.125rem;
      line-height: 2;
      color: rgb(var(--md-sys-color-on-surface));
      padding-left: 1.5rem;
      position: relative;
    }

    .about-section li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: rgb(var(--md-sys-color-primary));
      font-weight: bold;
    }

    .about-section strong {
      color: rgb(var(--md-sys-color-primary));
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .about-page {
        padding: 2rem 1rem;
      }

      .about-card {
        padding: 1.5rem;
      }

      .about-title {
        font-size: 2rem;
      }

      .about-section h2 {
        font-size: 1.5rem;
      }

      .about-section p,
      .about-section li {
        font-size: 1rem;
      }
    }
  `],
})
export default class AboutComponent {}
