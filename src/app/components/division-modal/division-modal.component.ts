import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Division } from '../../interfaces/division';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DivisionsApiService } from '../../services/divisions-api.service';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-division-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-xl">
        <div class="p-5">
          @if (division) {
            <h3 class="text-white text-xl font-semibold">Edit Division</h3>
            <p class="text-neutral-200 text-sm">Update the division details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add New Division</h3>
            <p class="text-neutral-200 text-sm">Enter the details for the new division below.</p>
          }
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <div class="flex gap-4">
              <!-- DivisionId -->
              <div class="w-1/4">
                <label for="divisionId" class="relative">
                  <input id="divisionId" type="number" min="1" formControlName="divisionId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">DivisionId</span>
                </label>
              </div>
              <!-- name -->
              <div class="w-2/4">
                <label for="name" class="relative">
                  <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
                </label>
              </div>
              <!-- Sup -->
              <div class="w-1/4">
                <label for="sup" class="relative">
                  <input id="sup" type="text" formControlName="sup" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Sup</span>
                </label>
              </div>
            </div>
            <div class="flex gap-4">
              <!-- Image -->
              <div class="w-3/5">
                <label for="image" class="relative">
                  <input id="image" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image</span>
                </label>
              </div>
              <!-- Teams -->
              <div class="w-1/5">
                <label for="teams" class="relative">
                  <input id="teams" type="number" min="1" formControlName="teams" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Teams</span>
                </label>
              </div>
              <!-- Season -->
              <div class="w-1/5">
                <label for="season" class="relative">
                  <input id="season" type="number" min="2000" formControlName="season" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Season</span>
                </label>
              </div>
            </div>
            <!-- Phases -->
            <p class="text-gold text-sm -mb-1 font-semibold">Phases</p>
            <!-- First Phase -->
            <div formGroupName="firstPhase" class="flex gap-4">
              <!-- Name -->
              <div class="w-3/5">
                <label for="firstPhaseName" class="relative">
                  <input id="firstPhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">First Phase Name</span>
                </label>
              </div>
              <!-- InGame -->
              <div class="w-1/5">
                <label for="firstPhaseInGame" class="relative">
                  <input id="firstPhaseInGame" type="number" min="1" formControlName="inGame" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">InGame</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-1/5 flex items-center justify-center">
                <label for="firstPhaseStatus" class="cursor-pointer">
                  <div class="relative">
                    <input id="firstPhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            <!-- Second Phase -->
            <div formGroupName="secondPhase" class="flex gap-4">
              <!-- Name -->
              <div class="w-3/5">
                <label for="secondPhaseName" class="relative">
                  <input id="secondPhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Second Phase Name</span>
                </label>
              </div>
              <!-- InGame -->
              <div class="w-1/5">
                <label for="secondPhaseInGame" class="relative">
                  <input id="secondPhaseInGame" type="number" min="1" formControlName="inGame" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">InGame</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-1/5 flex items-center justify-center">
                <label for="secondPhaseStatus" class="cursor-pointer">
                  <div class="relative">
                    <input id="secondPhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            <!-- Third Phase -->
            <div formGroupName="thirdPhase" class="flex gap-4">
              <!-- Name -->
              <div class="w-3/5">
                <label for="thirdPhaseName" class="relative">
                  <input id="thirdPhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Third Phase Name</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-1/5 flex items-center justify-center">
                <label for="thirdPhaseStatus" class="cursor-pointer">
                  <div class="relative">
                    <input id="thirdPhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
              <div class="w-1/5"></div>
            </div>
            <!-- Brackets -->
            <p class="text-gold text-sm -mb-1 font-semibold">Brackets</p>
            <div formGroupName="brackets" class="grid grid-cols-2 gap-x-6 gap-y-2">
              <!-- Bracket 32 -->
              <div formGroupName="bracket32" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B32PhaseName" class="relative">
                    <input id="B32PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">32 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B32PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B32PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket 16 -->
              <div formGroupName="bracket16" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B16PhaseName" class="relative">
                    <input id="B16PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">16 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B16PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B16PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket 8 -->
              <div formGroupName="bracket8" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B8PhaseName" class="relative">
                    <input id="B8PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">8 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B8PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B8PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket 4 -->
              <div formGroupName="bracket4" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B4PhaseName" class="relative">
                    <input id="B4PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">4 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B4PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B4PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket 2 -->
              <div formGroupName="bracket2" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B2PhaseName" class="relative">
                    <input id="B2PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">2 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B2PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B2PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket 1 -->
              <div formGroupName="bracket1" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="B1PhaseName" class="relative">
                    <input id="B1PhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">1 Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="B1PhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="B1PhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
              <!-- Bracket Extra -->
              <div formGroupName="bracketExtra" class="flex gap-2">
                <!-- Name -->
                <div class="w-4/5">
                  <label for="BExtraPhaseName" class="relative">
                    <input id="BExtraPhaseName" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Extra Phase Name</span>
                  </label>
                </div>
                <!-- Status -->
                <div class="w-1/5 flex items-center justify-center">
                  <label for="BExtraPhaseStatus" class="cursor-pointer">
                    <div class="relative">
                      <input id="BExtraPhaseStatus" formControlName="status" type="checkbox" class="sr-only">
                      <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @if (division) {
              <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Division
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    input:checked ~ .dot {
      transform: translateX(100%);
    }
    input:checked ~ .line {
      background-color: #dc143c;
    }
    input:checked ~ .dot {
      transform: translateX(100%);
    }
    input:checked ~ .line {
      background-color: #dc143c;
    }
  `,
})
export class DivisionModalComponent {
  @Input() division: Division | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private divisionsService = inject(DivisionsApiService);

  form = this.fb.group({
    divisionId: [null as number | null, [Validators.required, Validators.min(1)]],
    name: ['', Validators.required],
    sup: ['', Validators.required],
    image: ['', Validators.required],
    season: [null as number | null, [Validators.required, Validators.min(2000)]],
    teams: [null as number | null, [Validators.required, Validators.min(1)]],
    firstPhase: this.fb.group({
      name: ['', [Validators.required]],
      inGame: [null as number | null, [Validators.required, Validators.min(1)]],
      status: [false]
    }),
    secondPhase: this.fb.group({
      name: ['', [Validators.required]],
      inGame: [null as number | null, [Validators.required, Validators.min(1)]],
      status: [false]
    }),
    thirdPhase: this.fb.group({
      name: ['', Validators.required],
      status: [false]
    }),
    brackets: this.fb.group({
      bracket32: this.fb.group({ name: [''], status: [false] }),
      bracket16: this.fb.group({ name: [''], status: [false] }),
      bracket8: this.fb.group({ name: [''], status: [false] }),
      bracket4: this.fb.group({ name: [''], status: [false] }),
      bracket2: this.fb.group({ name: [''], status: [false] }),
      bracket1: this.fb.group({ name: [''], status: [false] }),
      bracketExtra: this.fb.group({ name: [''], status: [false] })
    }),
  });
  errorMessage : string | null = null;

  Add = faPlus;
  Save = faFloppyDisk;

  ngOnInit() {
    if (this.division) {
      this.form.patchValue(this.division);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formDivision = this.form.value as Division;

    if (formDivision.brackets.bracket32?.name) {
      delete formDivision.brackets.bracket32;
    }
    if (formDivision.brackets.bracket16?.name) {
      delete formDivision.brackets.bracket16;
    }
    if (formDivision.brackets.bracket8?.name) {
      delete formDivision.brackets.bracket8;
    }
    if (formDivision.brackets.bracket4?.name) {
      delete formDivision.brackets.bracket4;
    }
    if (formDivision.brackets.bracket2?.name) {
      delete formDivision.brackets.bracket2;
    }
    if (formDivision.brackets.bracket1?.name) {
      delete formDivision.brackets.bracket1;
    }
    if (formDivision.brackets.bracketExtra?.name) {
      delete formDivision.brackets.bracketExtra;
    }

    if (this.division?.divisionId) {
      this.divisionsService.updateDivision(this.division.divisionId, formDivision);
      this.close.emit();
    } else {
      this.divisionsService.addDivision(formDivision);
      this.close.emit();
    }
  }
}