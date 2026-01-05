import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button
      mat-icon-button
      (click)="toggleTheme()"
      [attr.aria-label]="'切换主题'"
      class="theme-toggle-btn"
    >
      <mat-icon class="theme-icon">
        {{ isDark ? 'light_mode' : 'dark_mode' }}
      </mat-icon>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      transition: transform 0.2s;
    }

    .theme-toggle-btn:hover {
      transform: scale(1.1);
    }

    .theme-icon {
      transition: transform 0.2s;
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDark = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      document.documentElement.classList.toggle('dark', this.isDark);

      // Notify Giscus about theme change (delayed to ensure iframe is loaded)
      this.notifyGiscus();
      setTimeout(() => this.notifyGiscus(), 500);
      setTimeout(() => this.notifyGiscus(), 1500);
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  toggleTheme() {
    if (typeof window === 'undefined') return;
    
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    
    // Notify Giscus about theme change
    this.notifyGiscus();
    
    // Dispatch theme changed event
    this.dispatchThemeChanged();
  }

  private sendGiscusMessage(message: object) {
    if (typeof window === 'undefined') return;
    
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
  }

  private notifyGiscus() {
    const theme = this.isDark ? 'dark' : 'light';
    this.sendGiscusMessage({
      setConfig: { theme }
    });
  }

  private dispatchThemeChanged() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('md3-theme-changed'));
    }
  }
}
