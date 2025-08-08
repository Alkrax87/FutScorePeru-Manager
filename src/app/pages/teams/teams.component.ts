import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TeamsApiService } from '../../services/teams-api.service';
import { StadiumsApiService } from '../../services/stadiums-api-service.service';
import { TeamProfile } from '../../interfaces/team-profile';
import { TeamAddModalComponent } from '../../components/team-add-modal/team-add-modal.component';

@Component({
  selector: 'app-teams',
  imports: [FontAwesomeModule, RouterLink, TeamAddModalComponent],
  template: `
    <div class="px-5 xl:px-32 py-5 sm:py-10 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Team Management</h2>
          <p class="text-neutral-500">Manage and view all teams</p>
        </div>
        <div class="flex items-center">
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white w-full sm:w-fit px-4 py-2 rounded-xl">
            <fa-icon [icon]="Add"></fa-icon> Add Team
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (team of teams; track $index) {
          <div [routerLink]="['/team',team.category, team.teamId]" class="border border-neutral-200 hover:bg-neutral-50 duration-300 group rounded-lg overflow-hidden shadow-md cursor-pointer">
            <div [style.backgroundColor]="team.color.c1" class="h-3"></div>
            <div class="px-4 py-4">
              <div class="flex">
                <div class="w-full">
                  <p class="text-neutral-400 text-xs">TeamID: {{ team.teamId }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <img [src]="team.image" [alt]="team.alt" class="w-12 h-12">
                    <div class="truncate">
                      <p class="font-semibold text-sm truncate min-w-32">{{ team.name }}</p>
                      <p class="text-neutral-500 text-xs"><fa-icon [icon]="Location"></fa-icon> {{ team.location }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center text-neutral-500 text-sm">
                  <fa-icon class="py-2 px-3 group-hover:bg-crimson group-hover:text-white rounded-full duration-300" [icon]="Redirect"></fa-icon>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddTeamModal) {
      <app-team-add-modal
        (add)="addTeam($event)"
        (cancel)="showAddTeamModal = !showAddTeamModal"
      ></app-team-add-modal>
    }
  `,
  styles: ``,
})
export class TeamsComponent {
  constructor(private teamsService: TeamsApiService, private stadiumsService: StadiumsApiService) {}

  private teamsSubscription: Subscription | null = null;
  teams: TeamProfile[] = [];

  Add = faPlus;
  Redirect = faArrowUpRightFromSquare;
  Location = faLocationDot;

  showAddTeamModal = false;

  ngOnInit() {
    this.teamsService.getTeams();
    this.stadiumsService.getStadiums();
    this.teamsSubscription = this.teamsService.dataTeams$.subscribe({
      next: (data) => (this.teams = data),
    });
  }

  onAdd() {
    this.showAddTeamModal = !this.showAddTeamModal;
  }

  addTeam(team: TeamProfile) {
    this.teamsService.addTeam(team).subscribe({
      next: () => {
        this.teamsService.getTeams();
        this.showAddTeamModal = !this.showAddTeamModal;
      },
      error: (err) => (console.error("Failed to add new team: ", err))
    });
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
  }
}