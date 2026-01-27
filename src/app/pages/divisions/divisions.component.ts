import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPause, faPenToSquare, faPlay, faPlus, faShieldHalved, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Division } from '../../interfaces/division';
import { DivisionsApiService } from '../../services/divisions-api.service';
import { DivisionModalComponent } from "../../components/division-modal/division-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-divisions',
  imports: [FontAwesomeModule, DivisionModalComponent, DeleteConfirmationModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Division Management</h2>
          <p class="text-neutral-400">Manage and view all divisions</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Division
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        @for (division of divisions; track $index) {
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300 h-fit">
            <div class="relative overflow-hidden h-48 shadow-md rounded-t-3xl">
              <div class="bg-white bg-opacity-90 text-neutral-700 flex gap-1.5 z-10 rounded-full text-xs shadow-md font-semibold px-2 py-0.5 absolute right-3 top-3">
                <p>{{ division.category }}<sup>{{ division.sup }}</sup> División</p>
              </div>
              <div class="absolute w-full top-2">
                <div class="flex flex-col items-center gap-1">
                  @if (division.image) {
                    <div class="bg-white rounded-full overflow-hidden p-2">
                      <img [src]="division.image" alt="DIVISION-image" class="w-20 h-20 object-cover rounded-lg">
                    </div>
                  } @else {
                    <div class="rounded-full overflow-hidden p-2">
                      <img src="assets/images/no-division.webp" alt="DIVISION-image" class="w-20 h-20 object-cover rounded-lg">
                    </div>
                  }
                  <p class="text-white font-bold text-2xl text-center">{{ division.name }}</p>
                  <p class="bg-crimson text-white px-4 py-1 rounded-full font-semibold">
                    <fa-icon [icon]="Shield"></fa-icon> {{ division.teams }} Teams
                  </p>
                </div>
              </div>
              <img src="./assets/images/pages/Banner-main.webp" class="object-cover w-full h-full" alt="Banner" />
            </div>
            <div class="w-full p-4 flex flex-col gap-4">
              <div>
                <!-- Description -->
                <p class="text-gold font-semibold">Description:</p>
                <p class="text-justify texs mb-2">{{ division.description }}</p>
                <!-- Goal -->
                <p class="text-gold font-semibold">Goal:</p>
                <p class="text-justify texs mb-2">{{ division.goal }}</p>
                <!-- Tags -->
                <p class="text-gold font-semibold">Tags:</p>
                <div class="flex flex-wrap gap-2">
                  @for (tag of division.tags; track $index) {
                    <p class="text-crimson px-4 text-sm rounded-full border-2 border-crimson text-nowrap">{{ tag }}</p>
                  }
                </div>
              </div>
              <!-- Phases -->
              @if (division.phase1?.name || division.phase2?.name || division.phase3?.name) {
                <div>
                  <p class="text-gold font-semibold mb-2">Phases</p>
                  <div class="flex flex-col gap-2">
                    <!-- First Phase -->
                    @if (division.phase1) {
                      <div class="flex text-sm text-neutral-600 justify-between">
                        <p class="font-semibold">{{ division.phase1.name }}</p>
                        <div class="font-semibold flex gap-1">
                          <p>{{ division.phase1.inGame }}</p>
                          <div class="text-center w-4">
                            @if (division.phase1.status) {
                              <fa-icon class="text-green-600" [icon]="Play"></fa-icon>
                            } @else {
                              <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                            }
                          </div>
                        </div>
                      </div>
                    }
                    <!-- Second Phase -->
                    @if (division.phase2) {
                      <div class="flex text-sm text-neutral-600 justify-between">
                        <p class="font-semibold">{{ division.phase2.name }}</p>
                        <div class="font-semibold flex gap-1">
                          <p>{{ division.phase2.inGame }}</p>
                          <div class="text-center w-4">
                            @if (division.phase2.status) {
                              <fa-icon class="text-green-600" [icon]="Play"></fa-icon>
                            } @else {
                              <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                            }
                          </div>
                        </div>
                      </div>
                    }
                    <!-- Third Phase -->
                    @if (division.phase3) {
                      <div class="flex text-sm text-neutral-600 justify-between">
                        <p class="font-semibold">{{ division.phase3.name }}</p>
                        <div class="font-semibold flex gap-1">
                          <div class="text-center w-4">
                            @if (division.phase3.status) {
                              <fa-icon class="text-green-600" [icon]="Play"></fa-icon>
                            } @else {
                              <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
              <div class="flex gap-2 mt-2">
                <button (click)="onEdit(division)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(division)" class="bg-red-600 hover:bg-red-600/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                  <fa-icon [icon]="Delete"></fa-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isDivisionModalOpen()) {
      <app-division-modal
        [division]="selectedDivision()"
        (close)="isDivisionModalOpen.set(false)"
      ></app-division-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'Division',
          element: selectedDivision()!.name
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class DivisionsComponent {
  private divisionsService = inject(DivisionsApiService);
  divisions: Division[] = [];

  isDivisionModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedDivision = signal<Division | null>(null);

  Shield = faShieldHalved;
  Play = faPlay;
  Pause = faPause;
  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.divisionsService.getDivisions();
    this.divisionsService.dataDivisions$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.divisions = data),
    });
  }

  onAdd() {
    this.selectedDivision.set(null);
    this.isDivisionModalOpen.set(true);
  }

  onEdit(division: Division) {
    this.selectedDivision.set(division);
    this.isDivisionModalOpen.set(true);
  }

  onDelete(division: Division) {
    this.selectedDivision.set(division);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedDivision()?.category) {
      this.divisionsService.deleteDivision(this.selectedDivision()!.category!);
    }
    this.isConfirmOpen.set(false);
  }
}