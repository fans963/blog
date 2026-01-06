import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface Category {
  key: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  template: `
    <mat-chip-set class="category-filter">
      <mat-chip
        *ngFor="let category of allCategories"
        [class.selected]="selectedKey === category.key"
        (click)="selectCategory(category.key)"
        [attr.aria-label]="category.label"
      >
        <mat-icon *ngIf="category.icon" matChipAvatar>{{ category.icon }}</mat-icon>
        {{ category.label }}
      </mat-chip>
    </mat-chip-set>
  `,
  styles: [`
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 0.5rem 0;
    }

    mat-chip {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    mat-chip:hover {
      background-color: rgba(var(--md-sys-color-surface-variant), 0.8);
    }

    mat-chip.selected {
      background-color: rgb(var(--md-sys-color-primary-container));
      border-color: rgb(var(--md-sys-color-primary));
      color: rgb(var(--md-sys-color-on-primary-container));
    }

    mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
  `]
})
export class CategoryFilterComponent {
  @Input() categories: Category[] = [];
  @Input() selectedKey: string = 'all';
  @Output() selectionChange = new EventEmitter<string>();

  get allCategories(): Category[] {
    return [
      { key: 'all', label: '全部', icon: 'apps' },
      ...this.categories
    ];
  }

  selectCategory(key: string) {
    this.selectedKey = key;
    this.selectionChange.emit(key);
  }
}
