import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamProfile } from '../../interfaces/team-profile';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { Stadium } from '../../interfaces/stadium';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamsApiService } from '../../services/teams-api.service';

@Component({
  selector: 'app-team-add-modal',
  imports: [FormsModule, FontAwesomeModule, ReactiveFormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-2xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Add New Team</h3>
          <p class="text-neutral-200 text-sm">Enter the details for the new team below.</p>
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
        </div>
        <form [formGroup]="form" (ngSubmit)="onAdd()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <div class="flex gap-4">
              <!-- TeamId -->
              <div>
                <label for="teamId" class="relative">
                  <input id="teamId" type="text" formControlName="teamId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">TeamId</span>
                </label>
              </div>
              <!-- Location -->
              <div>
                <label for="location" class="relative">
                  <select id="location" formControlName="location" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <option value="" disabled>Choose Location</option>
                    @for (region of locations; track $index) {
                      <option [value]="region">{{ region }}</option>
                    }
                  </select>
                  <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Location</span>
                </label>
              </div>
              <!-- Category -->
              <div>
                <label for="category" class="relative">
                  <select id="category" formControlName="category" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <option value="0" disabled>Choose category</option>
                    <option value="1">Liga 1</option>
                    <option value="2">Liga 2</option>
                    <option value="3">Liga 3</option>
                  </select>
                  <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Category</span>
                </label>
              </div>
            </div>
            <div class="flex gap-4">
              <!-- Name -->
              <div class="w-2/3">
                <label for="name" class="relative">
                  <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
                </label>
              </div>
              <!-- Abbreviation -->
              <div class="w-1/3">
                <label for="abbreviation" class="relative">
                  <input id="abbreviation" type="text" formControlName="abbreviation" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Abbreviation</span>
                </label>
              </div>
            </div>
            <!-- Image -->
            <div>
              <label for="image" class="relative">
                <input id="image" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image</span>
              </label>
            </div>
            <!-- Image Thumbnail -->
            <div>
              <label for="imageThumbnail" class="relative">
                <input id="imageThumbnail" type="text" formControlName="imageThumbnail" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image Thumbnail</span>
              </label>
            </div>
            <div class="flex gap-4">
              <!-- Group First Phase -->
              <div class="w-1/2">
                <label for="groupFirstPhase" class="relative">
                  <select id="groupFirstPhase" formControlName="groupFirstPhase" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <option value="" selected>None</option>
                    <option disabled>---- Liga 2 ----</option>
                    <option value="a">Grupo A</option>
                    <option value="b">Grupo B</option>
                    <option disabled>---- Liga 3 ----</option>
                    <option value="1">Grupo 1</option>
                    <option value="2">Grupo 2</option>
                    <option value="3">Grupo 3</option>
                    <option value="4">Grupo 4</option>
                  </select>
                  <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Group First Phase</span>
                </label>
              </div>
              <!-- Group Second Phase -->
              <div class="w-1/2">
                <label for="groupSecondPhase" class="relative">
                  <select id="groupSecondPhase" formControlName="groupSecondPhase" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <option value="" selected>None</option>
                    <option disabled>---- Liga 2 ----</option>
                    <option value="p1">Grupo Ascenso 1</option>
                    <option value="p2">Grupo Ascenso 2</option>
                    <option value="r">Grupo Descenso</option>
                    <option disabled>---- Liga 3 ----</option>
                    <option value="f1">Grupo Final 1</option>
                    <option value="f2">Grupo Final 2</option>
                    <option value="f3">Grupo Final 3</option>
                    <option value="f4">Grupo Final 4</option>
                  </select>
                  <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Group Second Phase</span>
                </label>
              </div>
            </div>
            <!-- Colors -->
            <div formGroupName="color" class="flex gap-4">
              <!-- C1-->
              <div class="w-1/2 flex items-center gap-1">
                <div class="w-full">
                  <label for="c1" class="relative">
                    <input id="c1" type="text" [value]="form.get('c1')?.value" (input)="onColorInput($event)" formControlName="c1" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Primary Color</span>
                  </label>
                </div>
                <div class="rounded-full overflow-hidden w-12 h-11 flex items-center justify-center">
                  <input formControlName="c1" type="color" [value]="form.get('c1')?.value" (input)="onColorInput($event)" class="h-16 min-w-20 cursor-pointer"/>
                </div>
              </div>
              <!-- C2 -->
              <div class="w-1/2">
                <label for="c2" class="relative">
                  <select id="c2" formControlName="c2" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <option value="#ffffff" selected>Light Text</option>
                    <option value="#161513">Dark Text</option>
                  </select>
                  <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Secondary Color</span>
                </label>
              </div>
            </div>
            <!-- Stadium -->
            <div>
              <label for="stadium" class="relative">
                <select id="stadium" formControlName="stadium" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="0" disabled>Choose Stadium</option>
                  @for (stadium of stadiums; track $index) {
                    <option [value]="stadium.stadiumId">{{ stadium.name }}</option>
                  }
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Stadium</span>
              </label>
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
              <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Team
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamAddModalComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamService = inject(TeamsApiService);
  private stadiumService = inject(StadiumsApiService);

  locations: string[] = ["Amazonas", 'Áncash', 'Apurímac', "Arequipa", "Ayacucho", "Cajamarca", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima y Callao", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"];
  stadiums: Stadium[] = [];

  form = this.fb.group({
    teamId: ['', Validators.required],
    category: [0, Validators.required],
    groupFirstPhase: [''],
    groupSecondPhase: [''],
    name: ['', Validators.required],
    abbreviation: ['', Validators.required],
    image: ['', Validators.required],
    imageThumbnail: ['', Validators.required],
    location: ['', Validators.required],
    stadium: [0, Validators.required],
    color: this.fb.group({
      c1: ['#161513', [Validators.required]],
      c2: ['#ffffff', [Validators.required]],
    }),
  });
  errorMessage: string | null = null;

  Add = faPlus;

  constructor() {
    this.stadiumService.dataStadiums$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.stadiums = data)
    });
  }

  onColorInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.get(['color', 'c1'])?.setValue(value);
  }

  onAdd() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formTeam = this.form.value as TeamProfile;
    formTeam.alt = formTeam.abbreviation + '-logo';

    this.teamService.addTeam(formTeam);
    this.close.emit();
  }
}
