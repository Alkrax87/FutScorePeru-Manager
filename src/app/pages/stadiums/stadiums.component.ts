import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faTrashCan, faUsers } from '@fortawesome/free-solid-svg-icons';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { Stadium } from '../../interfaces/stadium';
import { Subscription } from 'rxjs';
import { StadiumModalComponent } from "../../components/stadium-modal/stadium-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";

@Component({
  selector: 'app-stadiums',
  imports: [FontAwesomeModule, StadiumModalComponent, DeleteConfirmationModalComponent],
  template: `
    <div class="px-5 xl:px-32 pt-24 pb-8 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Stadium Management</h2>
          <p class="text-neutral-500">Manage and view all stadiums</p>
        </div>
        <div class="flex items-center">
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white w-full sm:w-fit px-4 py-2 rounded-xl">
            <fa-icon [icon]="Add"></fa-icon> Add Stadium
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (stadium of stadiums; track $index) {
          <div class="border border-neutral-200 rounded-xl overflow-hidden shadow-md">
            <div class="relative shadow-md">
              <div class="bg-white text-neutral-700 rounded-full text-xs shadow-md font-semibold px-3 absolute left-1.5 top-2">
                StadiumId: {{ stadium.stadiumId }}
              </div>
              <img [src]="stadium.image" alt="STADIUM-image" class="w-full h-40 object-cover">
            </div>
            <div class="p-3">
              <p class="font-semibold mb-1">{{ stadium.name }}</p>
              <div class="text-neutral-500 text-sm flex gap-2">
                <div class="w-4 text-center"><fa-icon [icon]="People"></fa-icon></div>
                <p>{{ stadium.capacity }} capacity</p>
              </div>
              <div class="text-neutral-500 text-sm flex gap-2">
                <div class="w-4 text-center"><fa-icon [icon]="Location"></fa-icon></div>
                <p>{{ stadium.location }}</p>
              </div>
              <div class="flex gap-2 mt-2">
                <button (click)="onEdit(stadium)" class="hover:bg-neutral-50 border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(stadium)" class="bg-red-500 hover:bg-red-600 text-white border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Delete"></fa-icon> Delete
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
  private StadiumSubscription: Subscription | null = null;

  isStadiumModalOpen = signal(false);
  isConfirmOpen = signal(false);

  selectedStadium = signal<Stadium | null>(null);

  People = faUsers;
  Location = faLocationDot;
  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  ngOnInit() {
    this.stadiumsService.getStadiums();
    this.StadiumSubscription = this.stadiumsService.dataStadiums$.subscribe({
      next: (data) => (this.stadiums = data),
    });
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

  ngOnDestroy() {
    this.StadiumSubscription?.unsubscribe();
  }
}