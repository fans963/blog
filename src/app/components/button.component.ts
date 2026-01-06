import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <a
      *ngIf="href"
      [href]="href"
      [attr.target]="target"
      [attr.rel]="target === '_blank' ? 'noopener noreferrer' : null"
      [attr.aria-label]="ariaLabel"
      [class]="getButtonClass()"
      mat-button
    >
      <mat-icon *ngIf="icon && iconPosition === 'start'">{{ icon }}</mat-icon>
      <ng-content></ng-content>
      <mat-icon *ngIf="icon && iconPosition === 'end'">{{ icon }}</mat-icon>
    </a>

    <button
      *ngIf="!href"
      [type]="type"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [class]="getButtonClass()"
      (click)="onClick.emit($event)"
      mat-button
    >
      <mat-icon *ngIf="icon && iconPosition === 'start'">{{ icon }}</mat-icon>
      <ng-content></ng-content>
      <mat-icon *ngIf="icon && iconPosition === 'end'">{{ icon }}</mat-icon>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .mat-mdc-button {
      min-height: 40px;
      border-radius: 20px;
      font-weight: 500;
    }

    .button-primary {
      background-color: rgb(var(--md-sys-color-primary));
      color: rgb(var(--md-sys-color-on-primary));
    }

    .button-secondary {
      background-color: rgb(var(--md-sys-color-secondary));
      color: rgb(var(--md-sys-color-on-secondary));
    }

    .button-outlined {
      border: 1px solid rgb(var(--md-sys-color-outline));
      color: rgb(var(--md-sys-color-primary));
    }

    .button-text {
      color: rgb(var(--md-sys-color-primary));
    }

    mat-icon {
      margin: 0 4px;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'filled' | 'outlined' | 'text' = 'filled';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() href?: string;
  @Input() target?: string;
  @Input() icon?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Output() onClick = new EventEmitter<Event>();

  getButtonClass(): string {
    const classes = [];
    
    if (this.variant === 'filled') {
      classes.push(`button-${this.color}`);
    } else if (this.variant === 'outlined') {
      classes.push('button-outlined');
    } else {
      classes.push('button-text');
    }

    return classes.join(' ');
  }
}
