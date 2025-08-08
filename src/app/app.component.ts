import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavComponent],
  template: `
    <app-main-nav></app-main-nav>
    <div class="pt-16">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class AppComponent {}