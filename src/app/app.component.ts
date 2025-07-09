import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavComponent],
  template: `
    <app-main-nav></app-main-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class AppComponent {}