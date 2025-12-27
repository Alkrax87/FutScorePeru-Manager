import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamPageComponent } from './pages/shared/team-page/team-page.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { StadiumsComponent } from './pages/stadiums/stadiums.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MapsComponent } from './pages/maps/maps.component';
import { DivisionsComponent } from './pages/divisions/divisions.component';
import { TeamsCPComponent } from './pages/teams-cp/teams-cp.component';
import { FixturesComponent } from './pages/fixtures/fixtures.component';
import { BracketsComponent } from './pages/brackets/brackets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'divisions',
    component: DivisionsComponent,
  },
  {
    path: 'fixtures',
    component: FixturesComponent,
  },
  {
    path: 'brackets',
    component: BracketsComponent,
  },
  {
    path: 'stadiums',
    component: StadiumsComponent,
  },
  {
    path: 'maps',
    component: MapsComponent,
  },
  {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'team/:category/:teamId',
    component: TeamPageComponent
  },
  {
    path: 'managers',
    component: ManagersComponent,
  },
  {
    path: 'teamsCP',
    component: TeamsCPComponent,
  },
];