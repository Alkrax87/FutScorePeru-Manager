import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamsApiService } from '../../services/teams-api.service';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { TeamProfile } from '../../interfaces/team-profile';
import { TeamAddModalComponent } from '../../components/team-add-modal/team-add-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teams',
  imports: [FontAwesomeModule, RouterLink, TeamAddModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 pt-24 pb-8 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Team Management</h2>
          <p class="text-neutral-400">Manage and view all teams</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Stadium
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (team of teams; track $index) {
          <div [routerLink]="['/team',team.category, team.teamId]" class=" bg-white group rounded-3xl overflow-hidden shadow-md hover:shadow-xl duration-300 cursor-pointer">
            <div [style.backgroundColor]="team.color.c1" class="h-3"></div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex">
                <div class="w-full">
                  <p class="text-neutral-400 text-xs">ID: {{ team.teamId }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <img [src]="team.image" [alt]="team.alt" class="w-12 h-12">
                    <div class="truncate">
                      <p class="font-semibold text-sm truncate min-w-32">{{ team.name }}</p>
                      <p class="text-neutral-500 text-xs"><fa-icon [icon]="Location"></fa-icon> {{ team.location }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center text-neutral-500 text-sm">
                  <fa-icon class="py-2 px-3.5 group-hover:bg-crimson group-hover:text-white rounded-full duration-300" [icon]="Redirect"></fa-icon>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddTeamModal()) {
      <app-team-add-modal (cancel)="showAddTeamModal.set(false)"></app-team-add-modal>
    }
  `,
  styles: ``,
})
export class TeamsComponent {
  private teamsService = inject(TeamsApiService);
  private stadiumsService = inject(StadiumsApiService);
  teams: TeamProfile[] = [];

  showAddTeamModal = signal(false);

  Add = faPlus;
  Redirect = faChevronRight;
  Location = faLocationDot;


  constructor() {
    this.teamsService.getTeams();
    this.stadiumsService.getStadiums();
    this.teamsService.dataTeams$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.teams = data),
    });
  }

  onAdd() {
    this.showAddTeamModal.set(true);
  }
}