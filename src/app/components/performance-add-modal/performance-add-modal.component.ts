import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-performance-add-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Add New Performance</h3>
        <p class="text-neutral-500 text-sm">Are you sure you want to create team performance?</p>
        <div class="flex gap-2 justify-end mt-4">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Performance
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class PerformanceAddModalComponent {
  @Output() add = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  Add = faPlus;
  Cancel = faXmark;

  onAdd() {
    this.add.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}