import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PerformanceData } from '../../interfaces/performance-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performance-update-modal',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Update Performance Data</h3>
        <p class="text-neutral-500 text-sm">Update performance statistics.</p>
        <div class="flex flex-col gap-4 my-4">
          <!-- Match Results -->
          <div class="flex gap-4">
            <!-- Win -->
            <div class="w-1/3">
              <label for="win" class="block text-sm font-semibold mb-1">Win (W)</label>
              <input id="win" [(ngModel)]="editedPerformance.w" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Win"
              >
            </div>
            <!-- Draw -->
            <div class="w-1/3">
              <label for="draw" class="block text-sm font-semibold mb-1">Draw (D)</label>
              <input id="draw" [(ngModel)]="editedPerformance.d" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Draw"
              >
            </div>
            <!-- Loose -->
            <div class="w-1/3">
              <label for="loose" class="block text-sm font-semibold mb-1">Loose (L)</label>
              <input id="loose" [(ngModel)]="editedPerformance.l" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Loose"
              >
            </div>
          </div>
          <!-- Goals -->
          <div class="flex gap-4">
            <!-- Goals For -->
            <div class="w-1/2">
              <label for="gf" class="block text-sm font-semibold mb-1">Goals For (GF)</label>
              <input id="gf" [(ngModel)]="editedPerformance.gf" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Goals For"
              >
            </div>
            <!-- Goals Against -->
            <div class="w-1/2">
              <label for="ga" class="block text-sm font-semibold mb-1">Goals Against (GA)</label>
              <input id="ga" [(ngModel)]="editedPerformance.ga" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Goals Against"
              >
            </div>
          </div>
          <!-- Points Adjustments -->
          <div class="flex gap-4">
            <!-- Sanction Points -->
            <div class="w-1/2">
              <label for="sanction" class="block text-sm font-semibold mb-1">Sanction Points</label>
              <input id="sanction" [(ngModel)]="editedPerformance.sanction" type="number" min="0" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Sanction Points"
              >
            </div>
            <!-- Addition Points -->
            @if (editedPerformance.addition != null) {
              <div class="w-1/2">
                <label for="addition" class="block text-sm font-semibold mb-1">Addition Points</label>
                <input id="addition" [(ngModel)]="editedPerformance.addition" type="number" min="0" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Addition Points"
                >
              </div>
            }
          </div>
          <!-- Summary -->
          <div class="bg-neutral-50 flex justify-evenly border rounded-xl px-4 py-2">
            <div class="text-center">
              <p class="text-neutral-500 text-xs font-semibold">Total Points</p>
              <p class="text-xl font-bold">{{ editedPerformance.w * 3 + editedPerformance.d - editedPerformance.sanction + (editedPerformance.addition ?? 0) }}</p>
            </div>
            <div class="text-center">
              <p class="text-neutral-500 text-xs font-semibold">Games Played</p>
              <p class="text-xl font-bold">{{ editedPerformance.w + editedPerformance.d + editedPerformance.l }}</p>
            </div>
            <div class="text-center">
              <p class="text-neutral-500 text-xs font-semibold">Goal Difference</p>
              <p class="text-xl font-bold">{{ (editedPerformance.gf - editedPerformance.ga) > 0 ? '+' + (editedPerformance.gf - editedPerformance.ga) : editedPerformance.gf - editedPerformance.ga }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onUpdate()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Edit"></fa-icon> Update Performance
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class PerformanceUpdateModalComponent {
  @Input() performance!: PerformanceData;
  @Output() update = new EventEmitter<PerformanceData>();
  @Output() cancel = new EventEmitter<void>();

  editedPerformance!: PerformanceData;
  Edit = faPenToSquare;
  Cancel = faXmark;

  ngOnInit() {
    this.editedPerformance = {
      w: this.performance.w,
      d: this.performance.d,
      l: this.performance.l,
      gf: this.performance.gf,
      ga: this.performance.ga,
      sanction: this.performance.sanction,
      addition: this.performance.addition,
    };
  }

  onUpdate() {
    if (!this.editedPerformance.addition) {
      delete this.editedPerformance.addition;
    }
    this.update.emit(this.editedPerformance);
  }

  onCancel() {
    this.cancel.emit();
  }
}