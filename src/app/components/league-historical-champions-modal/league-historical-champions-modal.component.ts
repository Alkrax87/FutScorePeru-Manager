import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LeagueDetails } from '../../interfaces/leagueDetails';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaguesDetailsApiService } from '../../services/leagues-details-api.service';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-league-historical-champions-modal',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-4xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Edit Historical Teams</h3>
          <p class="text-neutral-200 text-sm">Update historical teams table.</p>
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
          <div formArrayName="historicalChampions">
            <!-- Historical Champions -->
            <label class="text-gold text-sm font-semibold">
              Teams
              <button (click)="addHistoricalChampion()" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>
              </button>
            </label>
            <div class="flex flex-col gap-4 overflow-y-auto max-h-96 my-4">
              <div class="flex flex-col gap-3">
                @for (league of historicalChampions.controls; track $index) {
                  <div class="flex gap-2" [formGroupName]="$index">
                    <!-- Year -->
                    <div class="w-24">
                      <label [for]="'year' + $index" class="relative">
                        <input [id]="'year' + $index" type="number" min="1900" formControlName="year" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Year</span>
                      </label>
                    </div>
                    <!-- Name -->
                    <div class="w-1/5">
                      <label [for]="'name' + $index" class="relative">
                        <input [id]="'name' + $index" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
                      </label>
                    </div>
                    <!-- Image -->
                    <div class="w-2/5">
                      <label [for]="'image' + $index" class="relative">
                        <input [id]="'image' + $index" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image</span>
                      </label>
                    </div>
                    <!-- Province -->
                    <div class="w-1/5">
                      <label [for]="'province' + $index" class="relative">
                        <input [id]="'province' + $index" type="text" formControlName="province" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Province</span>
                      </label>
                    </div>
                    <!-- Remove Button -->
                    <button (click)="removeHistoricalChampion($index)" type="button" class="bg-red-600 hover:bg-red-600/90 text-white rounded-full w-12 px-2 duration-300">
                      <fa-icon [icon]="Delete"></fa-icon>
                    </button>
                  </div>
                }
              </div>
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
export class LeagueHistoricalChampionsModalComponent {
  @Input() leagueId!: string;
  @Input() details: LeagueDetails | null = null;
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private leaguesDetailsService = inject(LeaguesDetailsApiService);

  form: FormGroup | null = null;
  errorMessage: string | null = null;

  Add = faPlus;
  Delete = faTrashCan;
  Save = faFloppyDisk;

  ngOnInit() {
    this.form = this.fb.group({
      leagueId: ['', Validators.required],
      historicalChampions: this.fb.array([]),
    });

    if (this.details) {
      this.loadDetails(this.details);
    }
  }

  get historicalChampions(): FormArray {
    return this.form?.get('historicalChampions') as FormArray;
  }

  addHistoricalChampion(value: { year: number; name: string; image: string; province: string } = { year: new Date().getFullYear(), name: '', image: '', province: '' }) {
    this.historicalChampions.push(this.fb.group({
      year: [value.year, [Validators.required, Validators.min(1900)]],
      name: [value.name, Validators.required],
      image: value.image,
      province: [value.province, Validators.required],
    }));
  }

  removeHistoricalChampion(index: number) {
    this.historicalChampions.removeAt(index);
  }

  loadDetails(details: LeagueDetails) {
    this.form?.patchValue(details);

    this.historicalChampions.clear();

    details.historicalChampions.forEach(champion => this.addHistoricalChampion(champion));
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