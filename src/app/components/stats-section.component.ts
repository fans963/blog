import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface Stat {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="stats-section">
      <div class="stats-grid">
        @for (stat of stats(); track stat.label) {
          <mat-card class="stat-card">
            <mat-card-content>
              <span class="material-symbols-outlined stat-icon">{{ stat.icon }}</span>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      text-align: center;
    }

    .stat-card mat-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
    }

    .stat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: rgb(var(--md-sys-color-primary));
      margin-bottom: 1rem;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: rgb(var(--md-sys-color-on-surface));
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: rgb(var(--md-sys-color-on-surface-variant));
    }

    @media (max-width: 767px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StatsSectionComponent {
  stats = input<Stat[]>([]);
}
