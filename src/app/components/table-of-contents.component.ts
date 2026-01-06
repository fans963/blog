import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-table-of-contents',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  template: `
    <nav class="toc-container" *ngIf="headings && headings.length > 0">
      <h3 class="toc-title">
        <mat-icon>format_list_bulleted</mat-icon>
        目录
      </h3>
      <mat-nav-list class="toc-list">
        <a
          *ngFor="let heading of headings"
          mat-list-item
          [href]="'#' + heading.id"
          [class]="'toc-link level-' + heading.level"
          [class.active]="activeId === heading.id"
          (click)="scrollToHeading(heading.id, $event)"
        >
          {{ heading.text }}
        </a>
      </mat-nav-list>
    </nav>
  `,
  styles: [`
    .toc-container {
      position: sticky;
      top: 100px;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      padding: 1rem;
      background-color: rgb(var(--md-sys-color-surface-variant));
      border-radius: 12px;
    }

    .toc-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: rgb(var(--md-sys-color-on-surface));
    }

    .toc-title mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .toc-list {
      padding: 0;
    }

    .toc-link {
      font-size: 0.875rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
      text-decoration: none;
      padding: 0.375rem 0.5rem;
      border-left: 2px solid transparent;
      transition: all 0.2s;
      display: block;
    }

    .toc-link:hover {
      background-color: rgba(var(--md-sys-color-primary), 0.08);
      border-left-color: rgb(var(--md-sys-color-primary));
    }

    .toc-link.active {
      color: rgb(var(--md-sys-color-primary));
      background-color: rgba(var(--md-sys-color-primary), 0.12);
      border-left-color: rgb(var(--md-sys-color-primary));
      font-weight: 600;
    }

    .toc-link.level-2 {
      padding-left: 1rem;
    }

    .toc-link.level-3 {
      padding-left: 2rem;
    }

    @media (max-width: 1023px) {
      .toc-container {
        position: static;
        max-height: none;
        margin-bottom: 2rem;
      }
    }
  `]
})
export class TableOfContentsComponent implements OnInit {
  @Input() headings: TocHeading[] = [];
  activeId: string = '';

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.observeHeadings();
    }
  }

  scrollToHeading(id: string, event: Event) {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.activeId = id;
      }
    }
  }

  private observeHeadings() {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeId = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    this.headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });
  }
}
