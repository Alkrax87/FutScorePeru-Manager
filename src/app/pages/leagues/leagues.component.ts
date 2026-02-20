import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LeaguesApiService } from '../../services/leagues-api.service';
import { League } from '../../interfaces/league';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeagueModalComponent } from "../../components/league-modal/league-modal.component";
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { TeamCP } from '../../interfaces/team-cp';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leagues',
  imports: [FontAwesomeModule, LeagueModalComponent, RouterLink],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Leagues Management</h2>
          <p class="text-neutral-400">Manage and view all leagues</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add League
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        @for (league of leagues; track $index) {
          <div [routerLink]="['/league',league.leagueId]" class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300 flex flex-col gap-2 p-5 cursor-pointer">
            <img [src]="league.image" [alt]="league.alt" class="rounded-lg">
            <div>
              <div class="flex justify-between">
                <p class="bg-crimson text-white font-semibold text-xs px-3 py-0.5 rounded-full w-fit">{{ league.leagueId }}</p>
                <div class="flex gap-1">
                  <div [style.background]="league.color.c1" class="w-5 h-5 rounded-full"></div>
                  <div [style.background]="league.color.c2" class="w-5 h-5 rounded-full"></div>
                </div>
              </div>
              <p class="font-bold text-2xl">{{ league.location }} <span class="text-neutral-500 font-normal text-xs">({{ league.alt.split('-', 1) }})</span></p>
            </div>
            <p class="text-gold font-semibold text-sm">Teams</p>
            <div class="flex flex-col -mt-1 gap-2">
              @for (team of league.teams; track $index) {
                <div class="bg-white border flex items-center gap-2 shadow-sm rounded-3xl px-3 py-2">
                  <img [src]="getTeam(team)?.image ? getTeam(team)?.image : './assets/images/no-team.webp'" alt="" class="w-7 h-7">
                  <p class="truncate text-sm">{{ getTeam(team)?.name }}</p>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddLeagueModal()) {
      <app-league-modal (close)="showAddLeagueModal.set(false)"></app-league-modal>
    }
  `,
  styles: ``,
})
export class LeaguesComponent {
  private leaguesService = inject(LeaguesApiService);
  private teamsCPService = inject(TeamsCPApiService);
  leagues: League[] = [];
  teamsCP: TeamCP[] = [];

  showAddLeagueModal = signal(false);

  Add = faPlus;

  constructor() {
    this.leaguesService.getLeagues();
    this.teamsCPService.getTeamsCP();
    combineLatest([this.leaguesService.dataLeagues$, this.teamsCPService.dataTeamsCP$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([leagues, teams]) => {
        this.leagues = leagues;
        this.teamsCP = teams;
      },
    });
  }

  getTeam(teamId: string) {
    return this.teamsCP.find((team) => team.teamId === teamId);
  }

  onAdd() {
    this.showAddLeagueModal.set(true);
  }
}