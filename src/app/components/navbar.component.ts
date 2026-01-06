import { Component, OnInit, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ColorPickerComponent } from './color-picker.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    ThemeToggleComponent,
    ColorPickerComponent
  ],
  template: `
    <mat-toolbar class="navbar-container" color="surface">
      <div class="navbar">
        <!-- Logo -->
        <a href="/" class="navbar-logo">
          <div class="logo-icon">
            <img
              src="https://avatars.githubusercontent.com/u/162014251?s=400&u=927aeed6f6ce20823207ea362303ea3b952c2a65&v=4"
              alt="Avatar"
              class="avatar-img"
            />
          </div>
        </a>

        <!-- Nav Items -->
        <div class="navbar-nav">
          <a
            *ngFor="let item of navItems"
            [href]="item.href"
            class="nav-link"
            [class.nav-link-active]="active() === item.key"
            mat-button
          >
            <span class="material-symbols-outlined nav-icon">{{item.icon}}</span>
            <span class="nav-label">{{item.label}}</span>
          </a>
        </div>

        <!-- Actions -->
        <div class="navbar-actions">
          <a
            href="/blog?focus=true"
            mat-icon-button
            aria-label="搜索文章"
          >
            <span class="material-symbols-outlined">search</span>
          </a>

          @if (mounted()) {
            <app-color-picker />
            <app-theme-toggle />
          }
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar-container {
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 0 1rem;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
    }

    .navbar-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
      text-decoration: none;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .avatar-img {
      width: 40px;
      height: 32px;
      border-radius: 4px;
      object-fit: cover;
    }

    .navbar-nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      margin-left: 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      text-decoration: none;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .nav-link:hover {
      background-color: rgba(var(--mat-app-surface-variant), 0.08);
    }

    .nav-link-active {
      background-color: rgba(var(--mat-app-primary), 0.12);
      color: var(--mat-app-primary);
    }

    .nav-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .nav-label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    @media (max-width: 479px) {
      .nav-label {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  // Using input() signal for reactive input
  active = input<string>('home');
  
  // Using signal for mounted state
  mounted = signal(false);

  navItems = [
    { href: '/blog', label: '首页', icon: 'home', key: 'home' },
    { href: '/about', label: '关于', icon: 'person', key: 'about' },
  ];

  ngOnInit() {
    this.mounted.set(true);
  }
}
