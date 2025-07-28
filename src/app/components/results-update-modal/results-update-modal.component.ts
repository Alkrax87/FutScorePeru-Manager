import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-results-update-modal',
  imports: [FormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Update Results Data</h3>
        <p class="text-neutral-500 text-sm">Update resuls statistics.</p>
        <div class="flex gap-4 my-4">
          <div class="w-1/2">
            <label for="index" class="block text-sm font-semibold mb-1">Category</label>
            <select id="index" [(ngModel)]="resultUpdateData.index"
              class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
            >
              <option value="" disabled>Choose Round</option>
              @for (round of results; track $index) {
                <option [value]="$index">Round {{ $index + 1 }}</option>
              }
            </select>
          </div>
          <div class="w-1/2">
            <label for="score" class="block text-sm font-semibold mb-1">Score</label>
            <input id="score" [(ngModel)]="resultUpdateData.score" type="number" min="0" required
              class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Score"
            >
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onUpdate()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Edit"></fa-icon> Update Results
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ResultsUpdateModalComponent {
  @Input() results!: Number[];
  @Output() update = new EventEmitter<{ index: number; score: number }>();
  @Output() cancel = new EventEmitter<void>();

  resultUpdateData = {
    index: 0,
    score: 0,
  };
  Edit = faPenToSquare;
  Cancel = faXmark;

  onUpdate() {
    this.update.emit(this.resultUpdateData);
  }

  onCancel() {
    this.cancel.emit();
  }
}