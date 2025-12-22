import { Component, inject, signal } from '@angular/core';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faTrashCan, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StadiumModalComponent } from "../../components/stadium-modal/stadium-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { Stadium } from '../../interfaces/stadium';

@Component({
  selector: 'app-stadiums',
  imports: [FontAwesomeModule, StadiumModalComponent, DeleteConfirmationModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Stadium Management</h2>
          <p class="text-neutral-400">Manage and view all stadiums</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Stadium
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (stadium of stadiums; track $index) {
          <div class="bg-white group rounded-3xl overflow-hidden shadow-md hover:shadow-xl duration-300">
            <div class="relative shadow-md overflow-hidden">
              <div class="bg-white bg-opacity-90 text-neutral-700 flex gap-1.5 z-10 rounded-full text-xs shadow-md font-semibold px-2 py-0.5 absolute right-3 top-3">
                <fa-icon style="font-size: 10px;" [icon]="People"></fa-icon>
                <p>{{ formatNumber(stadium.capacity!) }}</p>
              </div>
              <img [src]="stadium.image" alt="STADIUM-image" class="group-hover:scale-105 duration-300 w-full h-40 md:h-48 object-cover">
            </div>
            <div class="p-4">
              <p class="text-neutral-400 text-xs">ID: {{ stadium.stadiumId }}</p>
              <p class="font-semibold truncate">{{ stadium.name }}</p>
              <div class="text-neutral-500 text-xs truncate">
                <fa-icon [icon]="Location"></fa-icon> {{ stadium.location }}
              </div>
              <div class="flex gap-2 mt-2">
                <button (click)="onEdit(stadium)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(stadium)" class="bg-red-600 hover:bg-red-600/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                  <fa-icon [icon]="Delete"></fa-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isStadiumModalOpen()) {
      <app-stadium-modal
        [stadium]="selectedStadium()"
        (close)="isStadiumModalOpen.set(false)"
      ></app-stadium-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'Stadium',
          element: selectedStadium()!.name
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class StadiumsComponent {
  private stadiumsService = inject(StadiumsApiService);
  stadiums: Stadium[] = [];

  isStadiumModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedStadium = signal<Stadium | null>(null);

  People = faUserGroup;
  Location = faLocationDot;
  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.stadiumsService.getStadiums();
    this.stadiumsService.dataStadiums$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.stadiums = data),
    });
  }

  formatNumber(num: number) {
    return new Intl.NumberFormat("en-US").format(num);
  }

  onAdd() {
    this.selectedStadium.set(null);
    this.isStadiumModalOpen.set(true);
  }

  onEdit(stadium: Stadium) {
    this.selectedStadium.set(stadium);
    this.isStadiumModalOpen.set(true);
  }

  onDelete(stadium: Stadium) {
    this.selectedStadium.set(stadium);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedStadium()?.stadiumId) {
      this.stadiumsService.deleteStadium(this.selectedStadium()!.stadiumId!);
    }
    this.isConfirmOpen.set(false);
  }
}