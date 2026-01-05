import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-icon matPrefix>search</mat-icon>
      <input
        matInput
        [placeholder]="placeholder"
        [(ngModel)]="searchValue"
        (ngModelChange)="onSearchChange($event)"
        type="search"
      />
    </mat-form-field>
  `,
  styles: [`
    .search-field {
      width: 100%;
    }

    mat-icon {
      color: rgba(var(--md-sys-color-on-surface-variant), 0.7);
    }
  `]
})
export class SearchFieldComponent {
  @Input() placeholder: string = '搜索...';
  @Input() value: string = '';
  
  searchValue: string = '';

  ngOnInit() {
    this.searchValue = this.value;
  }

  onSearchChange(value: string) {
    // Emit search change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('search-change', { detail: value }));
    }
  }
}
