import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { TeamCP } from '../../interfaces/team-cp';
import { Subscription } from 'rxjs';
import { TeamCPModalComponent } from "../../components/team-cp-modal/team-cp-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";

@Component({
  selector: 'app-teams-cp',
  imports: [FontAwesomeModule, TeamCPModalComponent, DeleteConfirmationModalComponent],
  template: `
    <div class="px-5 xl:px-32 py-5 sm:py-10 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Teams CP Management</h2>
          <p class="text-neutral-500">Manage and view all Copa Perú teams.</p>
        </div>
        <div class="flex items-center">
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white w-full sm:w-fit px-4 py-2 rounded-xl">
            <fa-icon [icon]="Add"></fa-icon> Add Team
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (team of dataTeamsCP; track $index) {
          <div class="border border-neutral-200 hover:bg-neutral-50 duration-300 group rounded-lg shadow-md">
            <div class="p-4">
              <div class="flex">
                <div class="w-full">
                  <p class="text-neutral-400 text-xs">TeamID: {{ team.teamId }}</p>
                  <div class="flex items-center gap-2">
                    <img [src]="team.image ? team.image : 'assets/images/no-team.webp'" alt="TeamCP-logo" class="w-12 h-12">
                    <div class="truncate">
                      <p class="font-semibold text-sm truncate min-w-32">{{ team.name ? team.name : 'Por Definir' }}</p>
                      <p class="text-neutral-500 text-xs"><fa-icon [icon]="Location"></fa-icon> {{ team.city }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-3 text-neutral-500 text-sm">
                  <fa-icon (click)="onEdit(team)" class="hover:text-yellow-500 cursor-pointer duration-300" [icon]="Edit"></fa-icon>
                  <fa-icon (click)="onDelete(team)" class="hover:text-red-600 cursor-pointer duration-300" [icon]="Delete"></fa-icon>
                </div>
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
  private teamsCPSubscription: Subscription | null = null;

  isTeamCPModalOpen = signal(false);
  isConfirmOpen = signal(false);

  selectedTeamCP = signal<TeamCP | null>(null);

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;
  Location = faLocationDot;

  ngOnInit() {
    this.teamsCPService.getTeamsCP();
    this.teamsCPSubscription = this.teamsCPService.dataTeamsCP$.subscribe({
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

  ngOnDestroy() {
    this.teamsCPSubscription?.unsubscribe();
  }
}