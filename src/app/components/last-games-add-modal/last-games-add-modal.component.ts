import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LastGamesGenerator } from '../../interfaces/last-games-generator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-last-games-add-modal',
  imports: [FormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Add Team Last Games</h3>
        <p class="text-neutral-500 text-sm">Enter the size of each phase for the team last games generator below.</p>
        <!-- Phases -->
        <div class="flex flex-col gap-3 py-4">
          <div class="flex gap-5">
            <div class="w-1/2">
              <label for="size1" class="block text-sm font-semibold mb-1">{{ phases[0].toUpperCase() }}</label>
              <input id="size1" [(ngModel)]="lastGamesItem.phases[0].size" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="TeamId"
              >
            </div>
            <div class="w-1/2">
              <label for="size2" class="block text-sm font-semibold mb-1">{{ phases[1].toUpperCase() }}</label>
              <input id="size2" [(ngModel)]="lastGamesItem.phases[1].size" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="TeamId"
              >
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Last Games
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LastGamesAddModalComponent {
  @Input() teamId!: string;
  @Input() category!: number;
  @Input() phases!: string[];
  @Output() add = new EventEmitter<LastGamesGenerator>();
  @Output() cancel = new EventEmitter<void>();

  lastGamesItem!: LastGamesGenerator;

  ngOnInit() {
    this.lastGamesItem = {
      teamId: this.teamId,
      category: this.category,
      phases: [
        { name: this.phases[0], size: 1 },
        { name: this.phases[1], size: 1 }
      ]
    }
  }

  Add = faPlus;
  Cancel = faXmark;

  onAdd() {
    this.add.emit(this.lastGamesItem);
  }

  onCancel() {
    this.cancel.emit();
  }
}