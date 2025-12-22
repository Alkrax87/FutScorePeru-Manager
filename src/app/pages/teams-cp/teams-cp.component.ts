import { Component, inject, signal } from '@angular/core';
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamCPModalComponent } from '../../components/team-cp-modal/team-cp-modal.component';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';
import { TeamCP } from '../../interfaces/team-cp';

@Component({
  selector: 'app-teams-cp',
  imports: [FontAwesomeModule, TeamCPModalComponent, DeleteConfirmationModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Copa Perú Teams Management</h2>
          <p class="text-neutral-400">Manage and view all Copa Perú teams</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Team
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (team of dataTeamsCP; track $index) {
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300">
            <div class="p-4">
              <div class="w-full">
                <div class="flex items-center gap-2">
                  <img [src]="team.image ? team.image : 'assets/images/no-team.webp'" alt="TeamCP-logo" class="w-14 h-14">
                  <div class="truncate">
                    <p class="text-neutral-400 text-xs">ID: {{ team.teamId }}</p>
                    <p class="font-semibold text-sm truncate">{{ team.name ? team.name + ' (' + team.abbreviation + ')' : 'Por Definir' }}</p>
                    <p class="text-neutral-500 text-xs truncate">
                      <fa-icon [icon]="Location"></fa-icon> {{ team.city }} @if (team.location) {<span>({{ team.location }})</span>}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mt-2">
                <button (click)="onEdit(team)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(team)" class="bg-red-600 text-white hover:bg-red-600/80 rounded-full px-4 py-2 text-sm duration-300">
                  <fa-icon [icon]="Delete"></fa-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isTeamCPModalOpen()) {
      <app-team-cp-modal
        [teamCP]="selectedTeamCP()"
        (close)="isTeamCPModalOpen.set(false)"
      ></app-team-cp-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'TeamCP',
          element: selectedTeamCP()?.name ? selectedTeamCP()!.name :  'Por Definir',
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class TeamsCPComponent {
  private teamsCPService = inject(TeamsCPApiService);
  dataTeamsCP: TeamCP[] = [];

  isTeamCPModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedTeamCP = signal<TeamCP | null>(null);

  Location = faLocationDot;
  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.teamsCPService.getTeamsCP();
    this.teamsCPService.dataTeamsCP$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.dataTeamsCP = data),
    });
  }

  onAdd() {
    this.selectedTeamCP.set(null);
    this.isTeamCPModalOpen.set(true);
  }

  onEdit(teamCP: TeamCP) {
    this.selectedTeamCP.set(teamCP);
    this.isTeamCPModalOpen.set(true);
  }

  onDelete(teamCP: TeamCP) {
    this.selectedTeamCP.set(teamCP);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedTeamCP()?.teamId) {
      this.teamsCPService.deleteTeamCP(this.selectedTeamCP()!.teamId!);
    }
    this.isConfirmOpen.set(false);
  }
}