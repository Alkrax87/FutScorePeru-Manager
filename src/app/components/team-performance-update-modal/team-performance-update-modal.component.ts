import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsPerformanceApiService } from '../../services/teams-performance-api.service';
import { TeamPerformance } from '../../interfaces/teamPerformance';

@Component({
  selector: 'app-team-performance-update-modal',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Update Performance</h3>
          <p class="text-neutral-200 text-sm">Update performance statistics.</p>
        </div>
        @if (errorMessage) {
          <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
            <p>
              <span class="font-semibold">Error:</span> {{ errorMessage }}
            </p>
            <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
          </div>
        }
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <!-- TeamId -->
            @if (options.phase === 1) {
              <!-- Phase 1 -->
              <p class="text-gold text-sm -mb-1 font-semibold">Phase 1</p>
              <div formGroupName="phase1" class="flex flex-col gap-4">
                <!-- Match Results -->
                <div class="flex gap-4">
                  <!-- Win -->
                  <div class="w-1/3">
                    <div>
                      <label for="w" class="relative">
                        <input id="w" type="number" min="0" formControlName="w" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Win (W)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Draw -->
                  <div class="w-1/3">
                    <div>
                      <label for="d" class="relative">
                        <input id="d" type="number" min="0" formControlName="d" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Draw (D)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Loose -->
                  <div class="w-1/3">
                    <div>
                      <label for="l" class="relative">
                        <input id="l" type="number" min="0" formControlName="l" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Loose (L)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- Goals -->
                <div class="flex gap-4">
                  <!-- Goals For -->
                  <div class="w-1/2">
                    <div>
                      <label for="gf" class="relative">
                        <input id="gf" type="number" min="0" formControlName="gf" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Goals For (GF)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Goals Against -->
                  <div class="w-1/2">
                    <div>
                      <label for="ga" class="relative">
                        <input id="ga" type="number" min="0" formControlName="ga" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Goals Against (GA)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- Points Adjustments -->
                <div class="flex gap-4">
                  <!-- Sanction Points-->
                  <div class="w-1/2">
                    <div>
                      <label for="sanction" class="relative">
                        <input id="sanction" type="number" min="0" formControlName="sanction" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Sanction Points</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            }
            @if (options.phase === 2) {
              <!-- Phase 2 -->
               <p class="text-gold text-sm -mb-1 font-semibold">Phase 2</p>
              <div formGroupName="phase2" class="flex flex-col gap-4">
                <!-- Match Results -->
                <div class="flex gap-4">
                  <!-- Win -->
                  <div class="w-1/3">
                    <div>
                      <label for="w" class="relative">
                        <input id="w" type="number" min="0" formControlName="w" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Win (W)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Draw -->
                  <div class="w-1/3">
                    <div>
                      <label for="d" class="relative">
                        <input id="d" type="number" min="0" formControlName="d" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Draw (D)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Loose -->
                  <div class="w-1/3">
                    <div>
                      <label for="l" class="relative">
                        <input id="l" type="number" min="0" formControlName="l" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Loose (L)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- Goals -->
                <div class="flex gap-4">
                  <!-- Goals For -->
                  <div class="w-1/2">
                    <div>
                      <label for="gf" class="relative">
                        <input id="gf" type="number" min="0" formControlName="gf" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Goals For (GF)</span>
                      </label>
                    </div>
                  </div>
                  <!-- Goals Against -->
                  <div class="w-1/2">
                    <div>
                      <label for="ga" class="relative">
                        <input id="ga" type="number" min="0" formControlName="ga" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Goals Against (GA)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- Points Adjustments -->
                <div class="flex gap-4">
                  <!-- Sanction Points-->
                  <div class="w-1/2">
                    <div>
                      <label for="sanction" class="relative">
                        <input id="sanction" type="number" min="0" formControlName="sanction" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Sanction Points</span>
                      </label>
                    </div>
                  </div>
                  <!-- Addition Points -->
                  <div class="w-1/2">
                    <div>
                      <label for="addition" class="relative">
                        <input id="addition" type="number" min="0" formControlName="addition" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Addition Points</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
              <fa-icon [icon]="Edit"></fa-icon>&nbsp; Update Performance
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamPerformanceUpdateModalComponent {
  @Input() options!: {phase: number, performance: TeamPerformance};
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsPerformanceService = inject(TeamsPerformanceApiService);

  form = this.fb.group({
    teamId: ['', Validators.required],
    phase1: this.fb.group({
      w: [null as number | null, Validators.required],
      d: [null as number | null, Validators.required],
      l: [null as number | null, Validators.required],
      gf: [null as number | null, Validators.required],
      ga: [null as number | null, Validators.required],
      sanction: [null as number | null, Validators.required],
    }),
    phase2: this.fb.group({
      w: [null as number | null, Validators.required],
      d: [null as number | null, Validators.required],
      l: [null as number | null, Validators.required],
      gf: [null as number | null, Validators.required],
      ga: [null as number | null, Validators.required],
      sanction: [null as number | null, Validators.required],
      addition: [null as number | null, Validators.required],
    }),
  });
  errorMessage: string | null = null;

  Edit = faPenToSquare;
  Cancel = faXmark;

  ngOnInit() {
    if (this.options.performance) {
      this.form.patchValue(this.options.performance);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formPerformance = this.form.value as TeamPerformance;

    this.teamsPerformanceService.updateTeamPerformance(formPerformance.teamId, formPerformance).subscribe({
      next: () => {
        this.updated.emit();
        this.close.emit();
      },
    });
  }
}