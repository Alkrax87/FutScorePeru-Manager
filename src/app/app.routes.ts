import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamPageComponent } from './pages/shared/team-page/team-page.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { StadiumsComponent } from './pages/stadiums/stadiums.component';
import { TeamsComponent } from './pages/teams/teams.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'team/:category/:teamId',
    component: TeamPageComponent
  },
  {
    path: 'teams',
    component: TeamsComponent,
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