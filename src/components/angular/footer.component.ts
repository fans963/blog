import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">关于</h3>
          <p class="footer-text">
            一个基于 Astro + Angular + Material Design 构建的现代化博客
          </p>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">链接</h3>
          <nav class="footer-links">
            <a href="/" class="footer-link">首页</a>
            <a href="/blog" class="footer-link">博客</a>
            <a href="/about" class="footer-link">关于</a>
            <a href="/rss.xml" class="footer-link">RSS</a>
          </nav>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">社交</h3>
          <div class="social-links">
            <a
              href="https://github.com/fans963"
              target="_blank"
              rel="noopener noreferrer"
              mat-icon-button
              aria-label="GitHub"
            >
              <span class="material-symbols-outlined">code</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} fans963. All rights reserved.
        </p>
        <p class="tech-stack">
          Built with <span class="material-symbols-filled heart">favorite</span> using Astro + Angular + Material Design
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: rgb(var(--md-sys-color-surface-variant));
      color: rgb(var(--md-sys-color-on-surface-variant));
      padding: 3rem 1rem 1rem;
      margin-top: 4rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .footer-text {
      font-size: 0.875rem;
      line-height: 1.6;
      margin: 0;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer-link {
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-link:hover {
      color: rgb(var(--md-sys-color-primary));
    }

    .social-links {
      display: flex;
      gap: 0.5rem;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 2rem;
      border-top: 1px solid rgba(var(--md-sys-color-outline), 0.2);
      text-align: center;
    }

    .copyright,
    .tech-stack {
      font-size: 0.875rem;
      margin: 0.5rem 0;
    }

    .tech-stack {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
    }

    .heart {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #f44336;
    }

    @media (max-width: 767px) {
      .footer {
        padding: 2rem 1rem 1rem;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    // Update year on init
    this.currentYear = new Date().getFullYear();
  }
}
