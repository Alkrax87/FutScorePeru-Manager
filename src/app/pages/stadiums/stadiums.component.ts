import { Component } from '@angular/core';
import { StadiumsApiService } from '../../services/stadiums-api-service.service';
import { Subscription } from 'rxjs';
import { Stadium } from '../../interfaces/stadium';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faTrashCan, faUsers } from '@fortawesome/free-solid-svg-icons';
import { StadiumAddModalComponent } from "../../components/stadium-add-modal/stadium-add-modal.component";
import { StadiumEditModalComponent } from "../../components/stadium-edit-modal/stadium-edit-modal.component";
import { StadiumDeleteModalComponent } from "../../components/stadium-delete-modal/stadium-delete-modal.component";

@Component({
  selector: 'app-stadiums',
  imports: [FontAwesomeModule, StadiumAddModalComponent, StadiumEditModalComponent, StadiumDeleteModalComponent],
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

    @if (showAddStadiumModal) {
      <app-stadium-add-modal
        (add)="addStadium($event)"
        (cancel)="showAddStadiumModal = !showAddStadiumModal"
      ></app-stadium-add-modal>
    }

    @if (showEditStadiumModal) {
      <app-stadium-edit-modal
        [stadium]="editedStadium"
        (edit)="editStadium($event)"
        (cancel)="showEditStadiumModal = !showEditStadiumModal"
      ></app-stadium-edit-modal>
    }

    @if (showDeleteStadiumModal) {
      <app-stadium-delete-modal
        [stadium]="deletedStadium"
        (delete)="deleteStadium()"
        (cancel)="showDeleteStadiumModal = !showDeleteStadiumModal"
      ></app-stadium-delete-modal>
    }

  `,
  styles: ``,
})
export class StadiumsComponent {
  constructor(private stadiumsService: StadiumsApiService) {}

  private StadiumSubscription: Subscription | null = null;
  stadiums: Stadium[] = [];

  People = faUsers;
  Location = faLocationDot;
  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  editedStadium!: Stadium;
  deletedStadium!: Stadium;

  showAddStadiumModal = false;
  showEditStadiumModal = false;
  showDeleteStadiumModal = false;

  ngOnInit() {
    this.stadiumsService.getStadiums();
    this.StadiumSubscription = this.stadiumsService.dataStadiums$.subscribe({
      next: (data) => (this.stadiums = data),
    });
  }

  onAdd() {
    this.showAddStadiumModal = !this.showAddStadiumModal;
  }

  onEdit(stadium: Stadium) {
    this.editedStadium = {...stadium};
    this.showEditStadiumModal = !this.showEditStadiumModal;
  }

  onDelete(stadium: Stadium) {
    this.deletedStadium = stadium;
    this.showDeleteStadiumModal = !this.showDeleteStadiumModal;
  }

  addStadium(stadium: Stadium) {
    this.stadiumsService.addStadium(stadium);
    this.showAddStadiumModal = !this.showAddStadiumModal;
  }

  editStadium(stadium: Stadium) {
    this.stadiumsService.updateStadium(stadium)
    this.showEditStadiumModal = !this.showEditStadiumModal;
  }

  deleteStadium() {
    this.stadiumsService.deleteStadium(this.deletedStadium.stadiumId as number);
    this.showDeleteStadiumModal = !this.showDeleteStadiumModal;
  }

  ngOnDestroy() {
    this.StadiumSubscription?.unsubscribe();
  }
}