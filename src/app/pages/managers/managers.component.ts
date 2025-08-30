import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagersApiService } from '../../services/managers-api.service';
import { TeamsApiService } from '../../services/teams-api.service';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Manager } from '../../interfaces/manager';
import { combineLatest } from 'rxjs';
import { TeamProfile } from '../../interfaces/team-profile';
import { ManagerAddModalComponent } from "../../components/manager-add-modal/manager-add-modal.component";
import { ManagerUpdateModalComponent } from "../../components/manager-update-modal/manager-update-modal.component";
import { ManagerDeleteModalComponent } from "../../components/manager-delete-modal/manager-delete-modal.component";

interface managerView extends Manager {
  teamLogo: string;
}

@Component({
  selector: 'app-managers',
  imports: [FontAwesomeModule, ManagerAddModalComponent, ManagerUpdateModalComponent, ManagerDeleteModalComponent],
  template: `
    <div class="px-5 xl:px-32 pt-24 pb-8 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Managers Management</h2>
          <p class="text-neutral-500">Manage and view all managers</p>
        </div>
        <div class="flex items-center">
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white w-full sm:w-fit px-4 py-2 rounded-xl">
            <fa-icon [icon]="Add"></fa-icon> Add Manager
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (manager of managersViews; track $index) {
          <div class="border border-neutral-200 rounded-xl overflow-hidden shadow-md">
            <div class="bg-night relative flex justify-center p-4">
              @if (manager.photo) {
                <img [src]="manager.photo" alt="MANAGER-image" class="w-32 h-32 object-cover rounded-lg">
              } @else {
                <img src="assets/images/no-manager.webp" alt="MANAGER-image" class="w-32 h-32 object-cover rounded-lg">
              }
              <div class="bg-white font-semibold absolute left-2 top-2 px-2 rounded-full text-xs">
                ID {{ manager.managerId }}
              </div>
              <img [src]="manager.teamLogo" alt="TEAM-logo" class="absolute w-10 top-2 right-2">
            </div>
            <div class="p-2">
              <div class="flex justify-center gap-2">
                <p class="text-center font-semibold">{{ manager.name }}</p>
                @if (manager.cod) {
                  <img src="assets/svg/{{ manager.cod }}.svg" alt="FLAG" class="w-5">
                } @else {
                  <img src="assets/svg/no-flag.svg" alt="FLAG" class="w-5">
                }
              </div>
              <div class="flex gap-2 mt-2">
                <button (click)="onEdit(manager)" class="hover:bg-neutral-50 border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(manager)" class="bg-red-500 hover:bg-red-600 text-white border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Delete"></fa-icon> Delete
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddManagerModal) {
      <app-manager-add-modal
        (add)="addManager($event)"
        (cancel)="showAddManagerModal = false"
      ></app-manager-add-modal>
    }

    @if (showEditManagerModal) {
      <app-manager-update-modal
        [editedManager]="editedManager"
        (edit)="updateManager($event)"
        (cancel)="showEditManagerModal = false"
      ></app-manager-update-modal>
    }

    @if (showDeleteManagerModal) {
      <app-manager-delete-modal
        [deletedManager]="deletedManager"
        (delete)="deleteManager()"
        (cancel)="showDeleteManagerModal = false"
      ></app-manager-delete-modal>
    }
  `,
  styles: ``,
})
export class ManagersComponent {
  constructor(
    private managersService: ManagersApiService,
    private teamsService: TeamsApiService,
  ) {}

  managers: Manager[] = [];
  teams: TeamProfile[] = [];
  managersViews: managerView[] = [];

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  editedManager!: Manager;
  deletedManager!: Manager;

  showAddManagerModal = false;
  showEditManagerModal = false;
  showDeleteManagerModal = false;

  ngOnInit() {
    this.teamsService.getTeams();
    this.managersService.getManagers();
    this.teamsService.dataTeams$.subscribe({
      next: (data) => {
        this.teams = data;
      }
    });
    this.managersService.dataManagers$.subscribe({
      next: (data) => {
        this.managersViews = data.map(manager => ({
          ...manager,
          teamLogo: this.getTeamLogo(manager.teamId),
        }));
      }
    });
  }

  loadManagers() {
    this.managersService.getManagers();
  }

  getTeamLogo(teamId: string) {
    const team = this.teams.find((team) => team.teamId === teamId);
    return team ? team.image : 'assets/images/no-team.webp';
  }

  onAdd() {
    this.showAddManagerModal = !this.showAddManagerModal;
  }

  onEdit(manager: Manager) {
    this.editedManager = {...manager};
    this.showEditManagerModal = !this.showEditManagerModal;
  }

  onDelete(manager: Manager) {
    this.deletedManager = manager;
    this.showDeleteManagerModal = !this.showDeleteManagerModal;
  }

  addManager(manager: Manager) {
    this.managersService.addManager(manager).subscribe({
      next: () => {
        this.managersService.getManagers();
        this.showAddManagerModal = false;
      },
      error: (err) => (console.error(err.message)
      )
    });
  }

  updateManager(manager: Manager) {
    this.managersService.updateManager(manager.managerId, manager).subscribe({
      next: () => {
        this.managersService.getManagers();
        this.showEditManagerModal = false;
      }
    });
  }

  deleteManager() {
    this.managersService.deleteManager(this.deletedManager.managerId).subscribe({
      next: () => {
        this.managersService.getManagers();
        this.showDeleteManagerModal = false;
      }
    });
  }
}