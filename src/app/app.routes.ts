import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Liga1Component } from './pages/liga1/liga1.component';
import { Liga2Component } from './pages/liga2/liga2.component';
import { Liga3Component } from './pages/liga3/liga3.component';
import { TeamPageComponent } from './pages/shared/team-page/team-page.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { StadiumsComponent } from './pages/stadiums/stadiums.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'liga-1',
    component: Liga1Component,
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamsListComponent },
      { path: 'team/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'liga-2',
    component: Liga2Component,
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamsListComponent },
      { path: 'team/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'liga-3',
    component: Liga3Component,
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamsListComponent },
      { path: 'team/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'managers',
    component: ManagersComponent,
  },
  {
    path: 'stadiums',
    component: StadiumsComponent,
  },
];