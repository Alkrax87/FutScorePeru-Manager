import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Stadium } from '../../interfaces/stadium';

@Component({
  selector: 'app-stadium-edit-modal',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-md">
        <h3 class="text-lg font-semibold">Edit Stadium</h3>
        <p class="text-neutral-500 text-sm">Update the stadium details below.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <!-- StadiumId -->
          <div class="w-full">
            <label for="stadiumId" class="block text-sm font-semibold mb-1">StadiumId</label>
            <input id="stadiumId" [(ngModel)]="stadium.stadiumId" type="number" min="0" disabled
              class="border-gray-300 text-neutral-500 text-sm border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="StadiumId"
            >
          </div>
          <!-- Name -->
          <div class="w-full">
            <label for="name" class="block text-sm font-semibold mb-1">Name</label>
            <input id="name" [(ngModel)]="stadium.name" type="text"
              class="border-gray-300 text-neutral-500 text-sm border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Name"
            >
          </div>
          <!-- Capacity -->
          <div class="w-full">
            <label for="capacity" class="block text-sm font-semibold mb-1">Capacity</label>
            <input id="capacity" [(ngModel)]="stadium.capacity" type="number" min="0"
              class="border-gray-300 text-neutral-500 text-sm border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Capacity"
            >
          </div>
          <!-- Location -->
          <div class="w-full">
            <label for="location" class="block text-sm font-semibold mb-1">Location</label>
            <input id="location" [(ngModel)]="stadium.location" type="text"
              class="border-gray-300 text-neutral-500 text-sm border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Location"
            >
          </div>
          <!-- Image Url -->
          <div class="w-full">
            <label for="image" class="block text-sm font-semibold mb-1">Image URL</label>
            <input id="image" [(ngModel)]="stadium.image" type="text"
              class="border-gray-300 text-neutral-500 text-sm border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Image URL"
            >
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onEdit()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Edit"></fa-icon> Update Stadium
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StadiumEditModalComponent {
  @Input() stadium!: Stadium;
  @Output() edit = new EventEmitter<Stadium>();
  @Output() cancel = new EventEmitter<void>();

  Cancel = faXmark;
  Edit = faPenToSquare;

  onEdit() {
    this.edit.emit(this.stadium);
  }

  onCancel() {
    this.cancel.emit()
  }
}
