import { Component, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    @if (isVisible()) {
      <button
        mat-fab
        color="primary"
        class="back-to-top-btn"
        (click)="scrollToTop()"
        aria-label="回到顶部"
      >
        <span class="material-symbols-outlined">arrow_upward</span>
      </button>
    }
  `,
  styles: [`
    .back-to-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 100;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }

    .back-to-top-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 767px) {
      .back-to-top-btn {
        bottom: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
      }
    }
  `]
})
export class BackToTopComponent implements OnDestroy {
  // Using signal for reactive visibility state
  isVisible = signal(false);

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isVisible.set(window.pageYOffset > 300);
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
