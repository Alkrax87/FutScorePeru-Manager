import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Division } from '../../interfaces/division';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-division-delete-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-xl">
        <h3 class="text-lg font-semibold">Delete Division</h3>
        <p class="mb-6 text-neutral-500">
          Are you sure you want to delete <span class="text-black font-bold">{{ deletedDivision.name }}</span>? This action cannot be undone and will remove all associated data.
        </p>
        <div class="flex justify-center gap-4">
          <button class="bg-neutral-100 hover:bg-neutral-200 w-32 py-2 rounded-xl outline-none" (click)="onCancel()">
            <fa-icon [icon]="Cancel"></fa-icon>&nbsp; Cancel
          </button>
          <button class="bg-red-600 hover:bg-red-500 w-32 text-white py-2 rounded-xl outline-none" (click)="onDelete()">
            <fa-icon [icon]="Delete"></fa-icon>&nbsp; Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionDeleteModalComponent {
  @Input() deletedDivision!: Division;
  @Output() delete = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  Cancel = faXmark;
  Delete = faTrashCan;

  onDelete() { this.delete.emit() }

  onCancel() { this.cancel.emit() }
}