import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../shared/layouts/base-layout.component';
import { HeroSectionComponent } from '../../components/angular/hero-section.component';
import { CategoriesSectionComponent } from '../../components/angular/categories-section.component';
import { StatsSectionComponent } from '../../components/angular/stats-section.component';

export const routeMeta = {
  title: 'Home | My M3 Blog',
  meta: [
    {
      name: 'description',
      content: 'A modern blog built with Analog.js, Angular 20, and Material Design 3',
    },
  ],
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BaseLayoutComponent,
    HeroSectionComponent,
    CategoriesSectionComponent,
    StatsSectionComponent,
  ],
  template: `
    <app-base-layout>
      <div class="home-page">
        <app-hero-section></app-hero-section>
        <app-stats-section></app-stats-section>
        <app-categories-section></app-categories-section>
      </div>
    </app-base-layout>
  `,
  styles: [`
    .home-page {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4rem;
      padding: 2rem 0;
    }
  `],
})
export default class HomeComponent {}
