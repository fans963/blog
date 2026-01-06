import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/angular/navbar.component';
import { FooterComponent } from '../../../components/angular/footer.component';
import { BackToTopComponent } from '../../../components/angular/back-to-top.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BackToTopComponent],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-back-to-top></app-back-to-top>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      width: 100%;
    }
  `],
})
export class BaseLayoutComponent {}
