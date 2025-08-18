import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="bg-night text-white w-full fixed flex justify-center gap-10 p-5 z-40">
      @for (route of routes; track $index) {
        <a [routerLink]="route.route" routerLinkActive="text-crimson" class="hover:text-crimson">
          {{ route.name }}
        </a>
      }
    </div>
  `,
  styles: ``,
})
export class MainNavComponent {
  routes: { route: string; name: string }[] = [
    {
      route: 'divisions',
      name: 'Divisions',
    },
    {
      route: 'teams',
      name: 'Teams',
    },
    {
      route: 'managers',
      name: 'Managers',
    },
    {
      route: 'stadiums',
      name: 'Stadiums',
    },
    {
      route: 'maps',
      name: 'Maps',
    },
  ];
}