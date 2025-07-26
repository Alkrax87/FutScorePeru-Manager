import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-last-games-option-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Confirm Match Result</h3>
        <p class="text-neutral-500 text-sm text-justify">Are you sure you want to add a <span class="font-semibold">{{ optionValue }}</span> to the match history?</p>
        <div class="flex gap-2 justify-end mt-4">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          @switch (option) {
            @case ('w') {
              <button (click)="onAdd()" class="bg-green-600 hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
                <fa-icon [icon]="Win"></fa-icon> Add Win
              </button>
            }
            @case ('d') {
              <button (click)="onAdd()" class="bg-neutral-400 hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
                <fa-icon [icon]="Draw"></fa-icon> Add Draw
              </button>
            }
            @case ('l') {
              <button (click)="onAdd()" class="bg-red-600 hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
                <fa-icon [icon]="Loose"></fa-icon> Add Loose
              </button>
            }
            @case ('r') {
              <button (click)="onAdd()" class="bg-neutral-700 hover:bg-opacity-90 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
                <fa-icon [icon]="Default"></fa-icon> Add Default
              </button>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LastGamesOptionModalComponent {
  @Input() option!: string;
  @Output() add = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  optionValue!: string;

  Win = faCircleCheck;
  Draw = faCircleMinus;
  Loose = faCircleXmark;
  Default = faCircle;
  Cancel = faXmark;

  ngOnInit() {
    switch (this.option) {
      case 'w':
        this.optionValue = 'Win'
        break;
      case 'd':
        this.optionValue = 'Draw'
        break;
      case 'l':
        this.optionValue = 'Loose'
        break;
      case 'r':
        this.optionValue = 'Default'
        break;
      default:
        break;
    }
  }

  onAdd() {
    this.add.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
