import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  template: `
    <div class="bg-night text-white h-16 w-full fixed flex justify-between px-2 xl:px-16 py-2 z-40 shadow-md">
      <div routerLink="/" class="flex items-center">
        <div class="flex items-center gap-2 cursor-pointer">
          <img src="https://placehold.co/40x40" alt="Main-Logo" />
          <h1 class="text-2xl font-bold">FutScorePerú</h1>
        </div>
      </div>
      <div class="flex items-center gap-2">
        @for (route of routes; track $index) {
        <a [routerLink]="route.route" routerLinkActive="bg-white text-night"
          class="hover:bg-white hover:text-night px-4 py-1 rounded-full font-semibold text-sm duration-500"
        >
          {{ route.name }}
        </a>
        }
        <div class="bg-gold rounded-full h-1/2 w-0.5 mx-1"></div>
        <div class="flex items-center justify-center rounded-full hover:bg-crimson p-1 min-w-8 min-h-8 ml-0 duration-500 cursor-pointer">
          <fa-icon [icon]="Settings"></fa-icon>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MainNavComponent {
  Settings = faGear;
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
      route: 'teamsCP',
      name: 'TeamsCP',
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