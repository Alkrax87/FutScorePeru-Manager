import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaguesDetailsApiService } from '../../services/leagues-details-api.service';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { LeagueDetails } from '../../interfaces/leagueDetails';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-league-details-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-xl">
        <div class="p-5">
          @if (details) {
            <h3 class="text-white text-xl font-semibold">Edit Details</h3>
            <p class="text-neutral-200 text-sm">Update league details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add Details</h3>
            <p class="text-neutral-200 text-sm">Enter the details below.</p>
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
            <!-- Founded -->
            <div>
              <label for="founded" class="relative">
                <input id="founded" type="number" min="1900" formControlName="founded" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Founded</span>
              </label>
            </div>
            <!-- Top Champion -->
            <p class="text-gold text-sm -mb-1 font-semibold">Top Champion</p>
            <div formGroupName="topChampion" class="flex flex-col gap-4">
              <!-- Name -->
              <div>
                <label for="name" class="relative">
                  <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
                </label>
              </div>
              <!-- Image -->
              <div>
                <label for="image" class="relative">
                  <input id="image" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image</span>
                </label>
              </div>
              <div class="flex gap-4">
                <!-- Province -->
                <div class="w-2/3">
                  <label for="province" class="relative">
                    <input id="province" type="text" formControlName="province" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Province</span>
                  </label>
                </div>
                <!-- Titles -->
                <div class="w-1/3">
                  <label for="titles" class="relative">
                    <input id="titles" type="number" min="1" formControlName="titles" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Titles</span>
                  </label>
                </div>
              </div>
            </div>
            <!-- Provincial Leagues -->
            <div formArrayName="provincialLeagues">
              <label class="text-gold text-sm font-semibold">
                Tags
                <button (click)="addProvincialLeague()" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1 text-sm duration-300">
                  <fa-icon [icon]="Add"></fa-icon>
                </button>
              </label>
              @if (provincialLeagues.controls.length > 0) {
                <div class="grid grid-cols-3 gap-2 mt-2">
                  @for (league of provincialLeagues.controls; track $index) {
                    <div class="flex">
                      <div class="w-full">
                        <label [for]="'league' + $index" class="relative">
                          <input [id]="'league' + $index" type="text" [formControlName]="$index" placeholder="League" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-9 text-sm cursor-text pl-5 pr-3 py-2 peer w-full rounded-l-full shadow-sm duration-100 outline-none">
                        </label>
                      </div>
                      <button (click)="removeProvincialLeague($index)" type="button" class="bg-red-600 hover:bg-red-600/90 text-white rounded-r-full px-2 text-sm duration-300">
                        <fa-icon [icon]="Delete"></fa-icon>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
              @if (details) {
                <button type="submit" [disabled]="form!.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
                </button>
              } @else {
                <button type="submit" [disabled]="form!.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Details
                </button>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class LeagueDetailsModalComponent {
  @Input() leagueId!: string;
  @Input() details: LeagueDetails | null = null;
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private leaguesDetailsService = inject(LeaguesDetailsApiService);

  form: FormGroup | null = null;
  errorMessage : string | null = null;

  Add = faPlus;
  Delete = faTrashCan;
  Save = faFloppyDisk;

  ngOnInit() {
    this.form = this.fb.group({
      leagueId: ['', Validators.required],
      founded: [null as number | null, [Validators.required, Validators.min(1900)]],
      topChampion: this.fb.group({
        name: ['', Validators.required],
        image: [''],
        province: ['', Validators.required],
        titles: [null as number | null, [Validators.required, Validators.min(1)]],
      }),
      provincialLeagues: this.fb.array([]),
    });

    if (this.details) {
      this.loadDetails(this.details);
    } else {
      this.form.patchValue({ leagueId: this.leagueId });
    }
  }

  get provincialLeagues(): FormArray {
    return this.form?.get('provincialLeagues') as FormArray;
  }

  addProvincialLeague(value: string = '') {
    this.provincialLeagues.push(this.fb.control(value, Validators.required));
  }

  removeProvincialLeague(index: number) {
    this.provincialLeagues.removeAt(index);
  }

  loadDetails(details: LeagueDetails) {
    this.form?.patchValue(details);

    this.provincialLeagues.clear();

    details.provincialLeagues.forEach(league => this.addProvincialLeague(league));
  }

  save() {
    if (this.form!.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formDetails = this.form!.value as LeagueDetails;

    if (this.details?.leagueId) {
      this.leaguesDetailsService.updateLeagueDetails(formDetails.leagueId, formDetails).subscribe({
        next: () => {
          this.updated.emit();
          this.close.emit();
        }
      });
    } else {
      this.leaguesDetailsService.addLeagueDetails(formDetails).subscribe({
        next: () => {
          this.updated.emit();
          this.close.emit();
        }
      });
    }
  }
}