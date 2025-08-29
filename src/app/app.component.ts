import { Component } from '@angular/core';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavComponent, FooterComponent],
  template: `
    <app-main-nav></app-main-nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: ``,
})
export class AppComponent {}