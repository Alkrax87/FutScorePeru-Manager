import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { TeamsMatchResultsApiService } from '../../services/teams-match-results-api.service';

@Component({
  selector: 'app-team-match-results-update-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Set Match Result</h3>
          <p class="text-neutral-200 text-sm">Select round and set match score.</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex gap-4 my-4">
            <!-- Round -->
            <div class="w-1/2">
              <label for="index" class="relative">
                <select id="index" formControlName="index" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="" disabled>Choose Round</option>
                  @for (round of size; track $index) {
                    <option [value]="$index">Round {{ $index + 1 }}</option>
                  }
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Rounds</span>
              </label>
            </div>
            <!-- Score -->
            <div class="w-1/2">
              <label for="score" class="relative">
                <input id="score" type="number" min="0" formControlName="score" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Score</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
              <fa-icon [icon]="Edit"></fa-icon>&nbsp; Update Match Result
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamMatchResultsUpdateModalComponent {
  @Input() resultsReference!: { teamId: string; phase: number; size: number };
  @Output() updated = new EventEmitter<{ index: number; score: number }>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsMatchResultsService = inject(TeamsMatchResultsApiService);

  form = this.fb.group({
    index: [null as number | null],
    score: [null as number | null],
  });
  errorMessage: string | null = null;

  size: any[] = [];

  Edit = faPenToSquare;

  ngOnInit() {
    this.size = Array.from({ length: this.resultsReference.size }, (_, i) => i);
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    this.teamsMatchResultsService.updateTeamMatchResults(this.resultsReference.teamId, this.resultsReference.phase, this.form.value.index!, this.form.value.score!).subscribe({
      next: () => {
        this.updated.emit();
        this.close.emit();
      }
    });
  }
}