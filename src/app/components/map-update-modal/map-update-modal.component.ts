import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapElement } from '../../interfaces/map-element';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-map-update-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Change Map Element status</h3>
        <p class="text-neutral-500 text-sm text-justify">Are you sure you want to change <span class="font-semibold">{{ map }}</span> status?</p>
        <div class="flex gap-2 justify-end mt-4">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onUpdate()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Edit"></fa-icon> Update Status
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class MapUpdateModalComponent {
  @Input() map!: string;
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  Edit = faPenToSquare;
  Cancel = faXmark;

  onUpdate() {
    this.update.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
