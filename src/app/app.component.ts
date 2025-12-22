import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgClass } from '@angular/common';
import { faMapLocation, faNetworkWired, faRing, faShieldHalved, faTags, faUserTie, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { TopbarComponent } from "./components/topbar/topbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgClass, FooterComponent, TopbarComponent],
  template: `
    <div class="flex h-dvh">
      <app-sidebar [routesElements]="routes" (sidebarOpen)="seeStatus($event)"></app-sidebar>
      <div class="bg-light w-full duration-300 flex flex-col min-h-dvh h-fit" [ngClass]="{ 'pl-52': sidebarOpen, 'pl-14': !sidebarOpen }">
        <div class="sticky top-0">
          <app-topbar></app-topbar>
        </div>
        <div class="flex-1">
          <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: ``,
})
export class AppComponent {
  sidebarOpen: boolean = true;
  routes = [
    {
      sectionName: 'Setups',
      routes: [
        { route: 'divisions', name: 'Divisions', icon: faTags },
        { route: 'fixtures', name: 'Fixtures', icon: faWindowRestore },
        { route: 'brackets', name: 'Brackets', icon: faNetworkWired },
      ],
    },
    {
      sectionName: 'Management (L1 L2 L3)',
      routes: [
        { route: 'teams', name: 'Teams', icon: faShieldHalved },
        { route: 'managers', name: 'Managers', icon: faUserTie },
        { route: 'stadiums', name: 'Stadiums', icon: faRing },
        { route: 'maps', name: 'Maps', icon: faMapLocation },
      ],
    },
    {
      sectionName: 'Management Copa Perú',
      routes: [
        { route: 'teamsCP', name: 'Teams', icon: faShieldHalved },
      ],
    }
  ]

  seeStatus(status: boolean) { this.sidebarOpen = status }
}