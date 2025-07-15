import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Stadium } from '../../interfaces/stadium';

@Component({
  selector: 'app-stadium-delete-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Are you sure?</h3>
        <p class="text-neutral-500 text-justify text-sm mt-2 mb-4">
          This action cannot be undone. This will permanently delete <span class="text-black font-semibold">{{ stadium.name }}</span>.
        </p>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onDelete()" class="bg-red-500 hover:bg-red-600 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Delete"></fa-icon> Delete Stadium
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StadiumDeleteModalComponent {
  @Input() stadium!: Stadium;
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  Cancel = faXmark;
  Delete = faTrashCan;

  onDelete() {
    this.delete.emit()
  }

  onCancel() {
    this.cancel.emit()
  }
}
