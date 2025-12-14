import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-map-update-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3 sm:px-5">
      <div class="bg-white p-5 rounded-3xl w-full max-w-sm">
        <h3 class="text-xl  font-semibold">Change Region status</h3>
        <p class="text-neutral-800 text-sm text-justify mt-2 mb-4">
          Are you sure you want to change <span class="font-semibold">{{ mapItem.region }}</span> status?
        </p>
        <div class="flex justify-end gap-2">
          <button (click)="onCancel()" class="hover:bg-neutral-100/50 text-neutral-600 border rounded-full px-4 py-2 text-sm duration-300">Cancel</button>
          @if (mapItem.status) {
            <button (click)="onUpdate()" class="bg-red-600 hover:hover:bg-opacity-85 text-white rounded-full px-4 py-2 text-sm duration-300">
              <fa-icon [icon]="Edit"></fa-icon>&nbsp; Disable
            </button>
          } @else {
            <button (click)="onUpdate()" class="bg-green-600 hover:hover:bg-opacity-85 text-white rounded-full px-4 py-2 text-sm duration-300">
              <fa-icon [icon]="Edit"></fa-icon>&nbsp; Enable
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MapUpdateModalComponent {
  @Input() mapItem!: { region: string, status: boolean };
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  Edit = faPenToSquare;

  onUpdate() {
    this.update.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}