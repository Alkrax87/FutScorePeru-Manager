import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faFilter, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamsApiService } from '../../services/teams-api.service';
import { Team } from '../../interfaces/team';
import { TeamModalComponent } from '../../components/team-modal/team-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-teams',
  imports: [RouterLink, TeamModalComponent, NgClass, FaIconComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Team Management</h2>
          <p class="text-neutral-400">Manage and view all teams</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Team
        </button>
      </div>
      <!-- Filter -->
      <div class="flex flex-col sm:flex-row gap-4 py-4">
        <div class="flex items-center justify-center sm:justify-start gap-2 text-neutral-500">
          <fa-icon [icon]="Filter"></fa-icon> Filters
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          @for (item of filters; track $index) {
            <button type="button" (click)="filterTeams(item.id)"
              class="hover:bg-crimson hover:text-white font-semibold shadow-md hover:shadow-xl rounded-full w-full sm:w-32 py-1 cursor-pointer"
              [ngClass]="selectedFilter === item.id ? 'bg-crimson text-white duration-300' : 'bg-white text-gray-600 duration-300'"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (team of filteredTeams; track $index) {
          <div class="bg-white rounded-[40px] flex flex-col shadow-xl p-2 border">
            <div  class="bg-night rounded-[32px] flex justify-center items-center py-4 shadow-lg">
              <div [style.border-color]="team.color.c1" class="bg-white p-2 rounded-full border-[4px] border-solid">
                <img [src]="team.image" [alt]="team.alt" class="w-12 h-12">
              </div>
            </div>
            <div class="p-4 flex justify-between gap-2">
              <div class="truncate">
                <p class="font-semibold truncate">{{ team.name }}</p>
                <p class="text-neutral-400 text-xs"><fa-icon [icon]="Location"></fa-icon> {{ team.location }}</p>
              </div>
              <button type="button" [routerLink]="['/team',team.category, team.teamId]" class="bg-crimson hover:bg-crimson/90 text-white px-4 py-2 flex items-center justify-center rounded-full text-sm font-semibold duration-300">
                Go <fa-icon [icon]="Redirect"></fa-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddTeamModal()) {
      <app-team-modal (close)="showAddTeamModal.set(false)"></app-team-modal>
    }
  `,
  styles: ``,
})
export class TeamsComponent {
  private teamsService = inject(TeamsApiService);
  teams: Team[] = [];
  filteredTeams: Team[] = [];

  showAddTeamModal = signal(false);

  filters = [
    { id: 0, label: 'All' },
    { id: 1, label: 'Liga 1' },
    { id: 2, label: 'Liga 2' },
    { id: 3, label: 'Liga 3' },
  ];
  selectedFilter = 0;

  Add = faPlus;
  Filter = faFilter;
  Redirect = faChevronRight;
  Location = faLocationDot;

  constructor() {
    this.teamsService.getTeams();
    this.teamsService.dataTeams$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => {
        this.teams = data;
        this.filteredTeams = data;
      },
    });
  }

  filterTeams(category: number) {
    this.selectedFilter = category;
    if (category === 0) {
      this.filteredTeams = this.teams;
      return;
    }
    this.filteredTeams = this.teams.filter((team) => team.category === category);
  }

  onAdd() {
    this.showAddTeamModal.set(true);
  }
}