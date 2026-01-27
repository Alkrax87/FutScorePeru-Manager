import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Division } from '../../interfaces/division';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DivisionsApiService } from '../../services/divisions-api.service';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
        <form [formGroup]="form!" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <div class="flex gap-4">
              <!-- Category -->
              <div class="w-1/4">
                <label for="category" class="relative">
                  <input id="category" type="number" min="1" formControlName="category" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Category</span>
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
            <!-- Description -->
            <div>
              <label for="description" class="relative">
                <textarea id="description" formControlName="description" placeholder=" " rows="3" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson cursor-text px-5 py-3 peer w-full rounded-2xl shadow-sm duration-100 outline-none resize-none"></textarea>
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text absolute start-3 -top-[68px] px-2 text-xs font-semibold transition-transform -translate-y-[22px] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]">Descripción</span>
              </label>
            </div>
            <!-- Goal -->
            <div>
              <label for="goal" class="relative">
                <input id="goal" type="text" formControlName="goal" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Goal</span>
              </label>
            </div>
            <!-- Tags -->
            <div formArrayName="tags">
              <label class="text-gold text-sm font-semibold">
                Phases
                <button (click)="addTag()" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1 text-sm duration-300">
                  <fa-icon [icon]="Add"></fa-icon>
                </button>
              </label>
              @if (tags.controls.length > 0) {
                <div class="grid grid-cols-3 gap-2 mt-2">
                  @for (tag of tags.controls; track $index) {
                    <div class="flex">
                      <div class="w-full">
                        <label [for]="'tag' + $index" class="relative">
                          <input [id]="'tag' + $index" type="text" [formControlName]="$index" placeholder="Tag" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-10 text-sm cursor-text pl-5 pr-3 py-2 peer w-full rounded-l-full shadow-sm duration-100 outline-none">
                        </label>
                      </div>
                      <button (click)="removeTag($index)" type="button" class="bg-red-600 hover:bg-red-600/90 text-white rounded-r-full px-3 text-sm duration-300">
                        <fa-icon [icon]="Delete"></fa-icon>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
            <!-- Phases -->
            <p class="text-gold text-sm -mb-1 font-semibold">Phases</p>
            <!-- First Phase -->
            <div formGroupName="phase1" class="flex gap-4">
              <!-- Name -->
              <div class="w-2/4">
                <label for="phase1" class="relative">
                  <input id="phase1" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 1</span>
                </label>
              </div>
              <!-- InGame -->
              <div class="w-1/4">
                <label for="firstPhaseInGame" class="relative">
                  <input id="firstPhaseInGame" type="number" min="1" formControlName="inGame" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">InGame</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-fit relative">
                <label class="cursor-pointer relative flex items-center justify-between h-12 w-full rounded-full border bg-white px-5">
                  <input type="checkbox" formControlName="status" class="peer sr-only">
                  <span class="text-neutral-400 text-xs font-semibold mr-2">Status</span>
                  <div class="relative h-6 w-11 rounded-full bg-neutral-200 transition-colors after:absolute after:top-0.5 after:start-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-crimson peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
            <!-- Second Phase -->
            <div formGroupName="phase2" class="flex gap-4">
              <!-- Name -->
              <div class="w-2/4">
                <label for="phase2" class="relative">
                  <input id="phase2" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 2</span>
                </label>
              </div>
              <!-- InGame -->
              <div class="w-1/4">
                <label for="secondPhaseInGame" class="relative">
                  <input id="secondPhaseInGame" type="number" min="1" formControlName="inGame" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">InGame</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-fit relative">
                <label class="cursor-pointer relative flex items-center justify-between h-12 w-full rounded-full border bg-white px-5">
                  <input type="checkbox" formControlName="status" class="peer sr-only">
                  <span class="text-neutral-400 text-xs font-semibold mr-2">Status</span>
                  <div class="relative h-6 w-11 rounded-full bg-neutral-200 transition-colors after:absolute after:top-0.5 after:start-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-crimson peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
            <!-- Third Phase -->
            <div formGroupName="phase3" class="flex gap-4">
              <!-- Name -->
              <div class="w-2/4">
                <label for="phase3" class="relative">
                  <input id="phase3" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 3</span>
                </label>
              </div>
              <!-- Status -->
              <div class="w-fit relative">
                <label class="cursor-pointer relative flex items-center justify-between h-12 w-full rounded-full border bg-white px-5">
                  <input type="checkbox" formControlName="status" class="peer sr-only">
                  <span class="text-neutral-400 text-xs font-semibold mr-2">Status</span>
                  <div class="relative h-6 w-11 rounded-full bg-neutral-200 transition-colors after:absolute after:top-0.5 after:start-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-crimson peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div class="w-1/4"></div>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @if (division) {
              <button type="submit" [disabled]="form!.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" [disabled]="form!.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Division
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionModalComponent {
  @Input() division: Division | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private divisionsService = inject(DivisionsApiService);

  form: FormGroup | null = null;
  errorMessage : string | null = null;

  Add = faPlus;
  Delete = faTrashCan;
  Save = faFloppyDisk;

  ngOnInit() {
    this.form = this.fb.group({
      category: [null as number | null, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      sup: ['', Validators.required],
      image: ['', Validators.required],
      season: [null as number | null, [Validators.required, Validators.min(2000)]],
      teams: [null as number | null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      goal: ['', Validators.required],
      tags: this.fb.array([]),
      phase1: this.fb.group({
        name: [''],
        inGame: [null as number | null],
        status: [false]
      }),
      phase2: this.fb.group({
        name: [''],
        inGame: [null as number | null],
        status: [false]
      }),
      phase3: this.fb.group({
        name: [''],
        status: [false]
      }),
    });

    if (this.division) {
      this.loadDivision(this.division);
    }
  }

  get tags(): FormArray {
    return this.form?.get('tags') as FormArray;
  }

  addTag(value: string = '') {
    this.tags.push(this.fb.control(value, Validators.required));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  loadDivision(division: Division) {
    this.form?.patchValue(division);

    this.tags.clear();

    division.tags.forEach(tag => this.addTag(tag));
  }

  save() {
    if (this.form!.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formDivision = this.form!.value as Division;

    if (!formDivision.phase1?.name) {
      delete formDivision.phase1;
    }

    if (!formDivision.phase2?.name) {
      delete formDivision.phase2;
    }

    if (!formDivision.phase3?.name) {
      delete formDivision.phase3;
    }

    if (this.division?.category) {
      this.divisionsService.updateDivision(this.division.category, formDivision);
      this.close.emit();
    } else {
      this.divisionsService.addDivision(formDivision);
      this.close.emit();
    }
  }
}