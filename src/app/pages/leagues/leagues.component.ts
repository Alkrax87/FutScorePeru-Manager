import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { LeaguesApiService } from '../../services/leagues-api.service';
import { League } from '../../interfaces/league';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeagueModalComponent } from "../../components/league-modal/league-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { TeamCP } from '../../interfaces/team-cp';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-leagues',
  imports: [FontAwesomeModule, LeagueModalComponent, DeleteConfirmationModalComponent],
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
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300 flex flex-col gap-2 p-5">
            <img [src]="league.image" [alt]="'Flag-' + $index" class="rounded-lg">
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
            <div class="flex gap-2 mt-2">
              <button (click)="onEdit(league)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                <fa-icon [icon]="Edit"></fa-icon> Edit
              </button>
              <button (click)="onDelete(league)" class="bg-red-600 hover:bg-red-600/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                <fa-icon [icon]="Delete"></fa-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isLeagueModalOpen()) {
      <app-league-modal
        [league]="selectedLeague()"
        (close)="isLeagueModalOpen.set(false)"
      ></app-league-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'League',
          element: selectedLeague()!.location
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class LeaguesComponent {
  private leaguesService = inject(LeaguesApiService);
  private teamsCPService = inject(TeamsCPApiService);
  leagues: League[] = [];
  teamsCP: TeamCP[] = [];

  isLeagueModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedLeague = signal<League | null>(null);

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

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
    this.selectedLeague.set(null);
    this.isLeagueModalOpen.set(true);
  }

  onEdit(league: League) {
    this.selectedLeague.set(league);
    this.isLeagueModalOpen.set(true);
  }

  onDelete(league: League) {
    this.selectedLeague.set(league);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedLeague()?.leagueId) {
      this.leaguesService.deleteLeague(this.selectedLeague()!.leagueId!);
    }
    this.isConfirmOpen.set(false);
  }
}