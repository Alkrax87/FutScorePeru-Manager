import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ManagersApiService } from '../../services/managers-api.service';
import { TeamsApiService } from '../../services/teams-api.service';
import { faFilter, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Manager } from '../../interfaces/manager';
import { combineLatest } from 'rxjs';
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { ManagerModalComponent } from "../../components/manager-modal/manager-modal.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

interface managerView extends Manager {
  teamLogo: string;
}

@Component({
  selector: 'app-managers',
  imports: [DeleteConfirmationModalComponent, ManagerModalComponent, NgClass, FaIconComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Managers Management</h2>
          <p class="text-neutral-400">Manage and view all managers</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Manager
        </button>
      </div>
      <!-- Filter -->
      <div class="flex flex-col sm:flex-row gap-4 py-4">
        <div class="flex items-center justify-center sm:justify-start gap-2 text-neutral-500">
          <fa-icon [icon]="Filter"></fa-icon> Filters
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          @for (item of filters; track $index) {
            <button type="button" (click)="filterManagers(item.id)"
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
        @for (manager of filteredManagers; track $index) {
          <div class="bg-white rounded-[40px] flex flex-col shadow-xl p-2 border">
            <div  class="bg-night rounded-[32px] flex flex-col items-center gap-2 py-4 shadow-lg">
              <div class="relative bg-white p-1 rounded-full">
                @if (manager.photo) {
                  <img [src]="manager.photo" [alt]="'Manager-image-' + $index" class="w-20 h-20 object-cover rounded-full">
                } @else {
                  <img src="assets/images/no-manager.webp" [alt]="'MANAGER-' + $index" class="w-20 h-20 object-cover rounded-full">
                }
                <div class="absolute bottom-0 right-0 bg-white flex justify-center items-center gap-2 rounded-full p-1">
                  <img [src]="manager.teamLogo" alt="TEAM-logo" class="w-6 h-6">
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4 p-4">
              <div class="flex justify-center gap-1">
                <img [src]="'assets/svg/'+ manager.cod +'.svg'" [alt]="'FLAG-' + $index" class="w-6 h-6">
                <p class="font-semibold truncate">{{ manager.name }}</p>
              </div>
              <div class="flex gap-2">
                <button (click)="onEdit(manager)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(manager)" class="bg-red-600 text-white hover:bg-red-600/90 rounded-full px-4 py-2 text-sm duration-300">
                  <fa-icon [icon]="Delete"></fa-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isManagerModalOpen()) {
      <app-manager-modal
        [manager]="selectedManager()"
        (close)="isManagerModalOpen.set(false);"
      ></app-manager-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'Manager',
          element: selectedManager()!.name
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class ManagersComponent {
  private teamsService = inject(TeamsApiService);
  private managersService = inject(ManagersApiService);
  managersViews: managerView[] = [];
  filteredManagers: managerView[] = [];

  isManagerModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedManager = signal<Manager | null>(null);

  filters = [
    { id: 0, label: 'All' },
    { id: 1, label: 'Liga 1' },
    { id: 2, label: 'Liga 2' },
  ];
  selectedFilter = 0;

  Add = faPlus;
  Filter = faFilter;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.teamsService.getTeams();
    this.managersService.getManagers();
    combineLatest([
      this.teamsService.dataTeams$,
      this.managersService.dataManagers$
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, managers]) => {
        this.managersViews = managers.map(manager => {
          const team = teams.find(t => t.teamId === manager.teamId);
          return {
            ...manager,
            teamLogo: team?.image ?? '',
          };
        });
        this.filteredManagers = managers.map(manager => {
          const team = teams.find(t => t.teamId === manager.teamId);
          return {
            ...manager,
            teamLogo: team?.image ?? '',
          };
        });
      }
    });
  }

  filterManagers(category: number) {
    this.selectedFilter = category;
    if (category === 0) {
      this.filteredManagers = this.managersViews;
      return;
    }
    this.filteredManagers = this.managersViews.filter((manager) => manager.category === category);
  }

  onAdd() {
    this.selectedManager.set(null);
    this.isManagerModalOpen.set(true);
  }

  onEdit(manager: Manager) {
    this.selectedManager.set(manager);
    this.isManagerModalOpen.set(true);
  }

  onDelete(manager: Manager) {
    this.selectedManager.set(manager);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedManager()?.managerId) {
      this.managersService.deleteManager(this.selectedManager()!.managerId!);
    }
    this.isConfirmOpen.set(false);
  }
}