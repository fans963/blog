import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button
      *ngIf="isVisible"
      mat-fab
      color="primary"
      class="back-to-top-btn"
      (click)="scrollToTop()"
      [@fadeInOut]
      aria-label="回到顶部"
    >
      <mat-icon>arrow_upward</mat-icon>
    </button>
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
  `],
  animations: []
})
export class BackToTopComponent implements OnInit, OnDestroy {
  isVisible = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isVisible = window.pageYOffset > 300;
    }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isVisible = window.pageYOffset > 300;
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
