import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LastGamesApiService } from '../../services/last-games-api.service';

@Component({
  selector: 'app-last-games-option-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Confirm Match Result</h3>
        </div>
        <div class="bg-white px-5 pb-5 pt-2">
          <p class="text-sm">Are you sure you want to add <span class="font-semibold">{{ optionValue }}</span> to the match history?</p>
          <div class="flex justify-end gap-2 mt-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @switch (options.option) {
              @case ('w') {
                <button (click)="save()" class="bg-green-600 hover:bg-green-600/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Win"></fa-icon> Add Win
                </button>
              }
              @case ('d') {
                <button (click)="save()" class="bg-neutral-400 hover:bg-neutral-400/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Draw"></fa-icon> Add Draw
                </button>
              }
              @case ('l') {
                <button (click)="save()" class="bg-red-600 hover:bg-red-600/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Loose"></fa-icon> Add Loose
                </button>
              }
              @case ('r') {
                <button (click)="save()" class="bg-neutral-700 hover:bg-neutral-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Default"></fa-icon> Add Default
                </button>
              }
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LastGamesOptionModalComponent {
  @Input() options!: { teamId: string; phase: number, option: string };
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private lastgamesService = inject(LastGamesApiService);

  optionValue!: string;

  Win = faCircleCheck;
  Draw = faCircleMinus;
  Loose = faCircleXmark;
  Default = faCircle;

  ngOnInit() {
    switch (this.options.option) {
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

  save() {
    this.lastgamesService.updateTeamLastGames(this.options.teamId, this.options.phase, this.options.option).subscribe({
      next: () => {
        this.updated.emit();
        this.close.emit();
      },
    });
  }
}