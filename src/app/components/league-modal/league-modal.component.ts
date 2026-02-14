import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { League } from '../../interfaces/league';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaguesApiService } from '../../services/leagues-api.service';
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TeamCP } from '../../interfaces/team-cp';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-league-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-lg">
        <div class="p-5">
          @if (league) {
            <h3 class="text-white text-xl font-semibold">Edit League</h3>
            <p class="text-neutral-200 text-sm">Update the league details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add New League</h3>
            <p class="text-neutral-200 text-sm">Enter the details for the new league below.</p>
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
              <!-- LeagueId -->
              <div class="w-2/3">
                <label for="leagueId" class="relative">
                  <input id="leagueId" type="text" formControlName="leagueId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">LeagueId</span>
                </label>
              </div>
              <!-- Alt -->
              <div class="w-1/3">
                <label for="alt" class="relative">
                  <input id="alt" type="text" formControlName="alt" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Alt</span>
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
            <!-- Color -->
            <div formGroupName="color" class="flex gap-4">
              <!-- C1 -->
              <div class="w-1/2 flex items-center gap-1">
                <div class="w-full">
                  <label for="c1" class="relative">
                    <input id="c1" type="text" [value]="form!.get('c1')?.value" (input)="onColorInput1($event)" formControlName="c1" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Primary Color</span>
                  </label>
                </div>
                <div class="rounded-full overflow-hidden w-12 h-11 flex items-center justify-center">
                  <input formControlName="c1" type="color" [value]="form!.get('c1')?.value" (input)="onColorInput1($event)" class="h-16 min-w-20 cursor-pointer"/>
                </div>
              </div>
              <!-- C2 -->
              <div class="w-1/2 flex items-center gap-1">
                <div class="w-full">
                  <label for="c2" class="relative">
                    <input id="c2" type="text" [value]="form!.get('c2')?.value" (input)="onColorInput2($event)" formControlName="c2" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                    <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Secondary Color</span>
                  </label>
                </div>
                <div class="rounded-full overflow-hidden w-12 h-11 flex items-center justify-center">
                  <input formControlName="c2" type="color" [value]="form!.get('c2')?.value" (input)="onColorInput2($event)" class="h-16 min-w-20 cursor-pointer"/>
                </div>
              </div>
            </div>
            <!-- Teams -->
            <div formGroupName="teams">
              <label class="font-semibold text-gold">
                Teams
                <button (click)="addTeam()" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1 text-sm duration-300">
                  <fa-icon [icon]="Add"></fa-icon>
                </button>
              </label>
              @if (teams.controls.length > 0) {
                <div class="flex flex-col gap-4 mt-4">
                  @for (team of teams.controls; track $index) {
                    <div class="flex">
                      <div class="w-full">
                        <label [for]="'team-' + $index" class="relative">
                          <select [id]="'team-' + $index" [formControlName]="$index" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-l-full shadow-sm duration-100 outline-none">
                            <option value="" disabled>Choose Team</option>
                            @for (team of teamsCP; track $index) {
                              <option [value]="team.teamId">{{ team.teamId + ' - ' + team.name }}</option>
                            }
                          </select>
                          <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Team</span>
                        </label>
                      </div>
                      <button (click)="removeTeam($index)" type="button" class="bg-red-600 hover:bg-red-600/90 text-white rounded-r-full px-3 text-sm duration-300">
                        <fa-icon [icon]="Delete"></fa-icon>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
              @if (league) {
                <button type="submit" [disabled]="form!.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
                </button>
              } @else {
                <button type="submit" [disabled]="form!.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                  <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Team
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
export class LeagueModalComponent {
  @Input() league: League | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private leaguesService = inject(LeaguesApiService);
  private teamsCPService = inject(TeamsCPApiService);

  locations: string[] = ['Áncash', "Amazonas", 'Apurímac', "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"];
  teamsCP: TeamCP[] = [];

  form: FormGroup | null = null;
  errorMessage: string | null = null;

  Add = faPlus;
  Save = faFloppyDisk;
  Delete = faTrashCan;

  constructor() {
    this.teamsCPService.dataTeamsCP$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.teamsCP = data),
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      leagueId: ['', Validators.required],
      image: ['', Validators.required],
      imageThumbnail: ['', Validators.required],
      alt: ['', Validators.required],
      location: ['', Validators.required],
      color: this.fb.group({
        c1: ['#000000', Validators.required],
        c2: ['#000000', Validators.required],
      }),
      teams: this.fb.array([]),
    });

    if (this.league) {
      this.loadLeague(this.league);
    }
  }

  get teams(): FormArray {
    return this.form?.get('teams') as FormArray;
  }

  addTeam(value: string = "") {
    this.teams.push(this.fb.control(value, Validators.required));
  }

  removeTeam(index: number) {
    this.teams.removeAt(index);
  }

  loadLeague(league: League) {
    this.form?.patchValue({
      leagueId: league.leagueId,
      image: league.image,
      imageThumbnail: league.imageThumbnail,
      alt: league.alt,
      location: league.location,
      color: {
        c1: league.color.c1,
        c2: league.color.c2,
      },
    });

    this.teams.clear();

    league.teams.forEach((team) => this.addTeam(team));
  }

  onColorInput1(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form?.get(['color', 'c1'])?.setValue(value);
  }

  onColorInput2(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form?.get(['color', 'c2'])?.setValue(value);
  }

  save() {
    if (this.form!.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formLeague = this.form!.value as League;

    if (this.league?.leagueId) {
      this.leaguesService.updateLeague(this.league.leagueId!, formLeague);
      this.close.emit();
    } else {
      this.leaguesService.addLeague(formLeague);
      this.close.emit();
    }
  }
}