import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fixture, Matchday, Match } from '../../interfaces/fixture';
import { Team } from '../../interfaces/team';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FixturesApiService } from '../../services/fixtures-api.service';

@Component({
  selector: 'app-fixture-update-modal',
  imports: [ReactiveFormsModule, NgClass, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-5xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Edit Fixture</h3>
          <p class="text-neutral-200 text-sm">Update the fixture details below.</p>
        </div>
        <div class="bg-white p-5">
          <!-- Phases -->
          <div class="flex justify-center gap-4">
            <button (click)="activePhase = 'phase1'" type="button" [ngClass]="{ 'bg-crimson text-white': activePhase === 'phase1', 'bg-neutral-50': activePhase !== 'phase1' }" class="hover:bg-crimson hover:text-white duration-300 shadow-md font-semibold rounded-full w-1/4 py-2">Phase 1</button>
            <button (click)="activePhase = 'phase2'" type="button" [ngClass]="{ 'bg-crimson text-white': activePhase === 'phase2', 'bg-neutral-50': activePhase !== 'phase2' }" class="hover:bg-crimson hover:text-white duration-300 shadow-md font-semibold rounded-full w-1/4 py-2">Phase 2</button>
          </div>
					<form [formGroup]="form!" (ngSubmit)="save()">
						<!-- Phases -->
						<div class="my-4">
							<!-- Phase 1 -->
							@if (activePhase === 'phase1') {
								<div formArrayName="phase1">
									<!-- Selector -->
									<div class="flex justify-center gap-2">
										@for (matchday of phase1.controls; track $index) {
											<button (click)="activeMatchDayPhase1 = $index" type="button" [ngClass]="{ 'bg-crimson text-white': activeMatchDayPhase1 === $index, 'bg-neutral-50': activeMatchDayPhase1 !== $index }" class="hover:bg-crimson hover:text-white duration-300 py-1 min-w-8 shadow-md font-semibold rounded-full outline-none">{{ matchday.value.round }}</button>
										}
									</div>
									<!-- MatchDay -->
									@for (matchday of phase1.controls; track $index) {
										<div [formGroupName]="$index">
											@if (activeMatchDayPhase1 === $index) {
												<div class="flex items-center mb-2">
													<h3 class="text-lg font-semibold min-w-20">Round {{ matchday.value.round }}</h3>
													<button (click)="addMatch(phase1, $index)" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1"><fa-icon [icon]="Add"></fa-icon></button>
												</div>
												<!-- Matches -->
												<div formArrayName="matches" class="flex flex-col gap-3">
													@for (match of matches(phase1, $index).controls; track $index) {
														<!-- Match -->
														<div class="w-full flex gap-4" [formGroupName]="$index">
															<!-- Index -->
															<div class="text-neutral-400 text-xs flex items-center justify-center -mr-3 font-semibold min-w-3">
																<span>{{ $index + 1 }}</span>
															</div>
															<!-- Home -->
															<div class="w-full">
																<label [for]="'home' + $index" class="relative">
																	<select [id]="'home' + $index" formControlName="home" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																		<option value="" disabled>Choose Team</option>
																		@for (team of filteredTeams; track $index) {
																			<option [value]="team.teamId">{{ team.name }}</option>
																		}
																	</select>
																	<span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Home</span>
																</label>
															</div>
															<!-- Away -->
															<div class="w-full">
																<label [for]="'away' + $index" class="relative">
																	<select [id]="'away' + $index" formControlName="away" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																		<option value="" disabled>Choose Team</option>
																		@for (team of filteredTeams; track $index) {
																			<option [value]="team.teamId">{{ team.name }}</option>
																		}
																	</select>
																	<span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Away</span>
																</label>
															</div>
															<!-- Date -->
															<div class="w-fit">
																<label [for]="'date' + $index" class="relative">
																	<input [id]="'date' + $index" formControlName="date" type="datetime-local" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																	<span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Date</span>
																</label>
															</div>
															<!-- Postponed -->
															<div class="flex items-center w-fit">
																<label class="relative flex items-center p-1 rounded-full cursor-pointer">
																	<input type="checkbox" [id]="'postponed' + $index" class="peer absolute h-0 w-0 opacity-0" formControlName="postponed">
																	<span class="w-7 h-7 border-2 border-neutral-300 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out peer-checked:bg-crimson peer-checked:border-crimson peer-focus-visible:ring-2 peer-focus-visible:ring-crimson/40">
																		<svg class="w-4 h-4 text-white opacity-0 transition-opacity duration-200 ease-in-out peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
																			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
																		</svg>
																	</span>
																</label>
																<label [for]="'postponed' + $index" class="ml-1 text-neutral-700 select-none font-medium cursor-pointer">Postponed</label>
															</div>
															<!-- Delete -->
															<button (click)="removeMatch(phase1, matchday.value.round - 1, $index)" type="button" class="bg-red-600 text-white hover:bg-red-600/80 w-fit rounded-full px-4 py-2 duration-300">
																<fa-icon [icon]="Delete"></fa-icon>
															</button>
														</div>
													}
												</div>
											}
										</div>
									}
								</div>
							}
							<!-- Phase 2 -->
							@if (activePhase === 'phase2') {
								<div formArrayName="phase2">
									<!-- Selector -->
									<div class="flex justify-center gap-2">
										@for (matchday of phase2.controls; track $index) {
											<button (click)="activeMatchDayPhase2 = $index" type="button" [ngClass]="{ 'bg-crimson text-white': activeMatchDayPhase2 === $index, 'bg-neutral-50': activeMatchDayPhase2 !== $index }" class="hover:bg-crimson hover:text-white duration-300 py-1 min-w-8 shadow-md font-semibold rounded-full outline-none">{{ matchday.value.round }}</button>
										}
									</div>
									<!-- MatchDay -->
									@for (matchday of phase2.controls; track $index) {
										<div [formGroupName]="$index">
											@if (activeMatchDayPhase2 === $index) {
												<div class="flex items-center mb-2">
													<h3 class="text-lg font-semibold min-w-20">Round {{ matchday.value.round }}</h3>
													<button (click)="addMatch(phase2, $index)" type="button" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-2 py-1"><fa-icon [icon]="Add"></fa-icon></button>
												</div>
												<!-- Matches -->
												<div formArrayName="matches" class="flex flex-col gap-3">
													@for (match of matches(phase2, $index).controls; track $index) {
														<!-- Match -->
														<div class="w-full flex gap-4" [formGroupName]="$index">
															<!-- Index -->
															<div class="text-neutral-400 text-xs flex items-center justify-center -mr-3 font-semibold min-w-3">
																<span>{{ $index + 1 }}</span>
															</div>
															<!-- Home -->
															<div class="w-full">
																<label [for]="'home' + $index" class="relative">
																	<select [id]="'home' + $index" formControlName="home" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																		<option value="" disabled>Choose Team</option>
																		@for (team of filteredTeams; track $index) {
																			<option [value]="team.teamId">{{ team.name }}</option>
																		}
																	</select>
																	<span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Home</span>
																</label>
															</div>
															<!-- Away -->
															<div class="w-full">
																<label [for]="'away' + $index" class="relative">
																	<select [id]="'away' + $index" formControlName="away" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																		<option value="" disabled>Choose Team</option>
																		@for (team of filteredTeams; track $index) {
																			<option [value]="team.teamId">{{ team.name }}</option>
																		}
																	</select>
																	<span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Away</span>
																</label>
															</div>
															<!-- Date -->
															<div class="w-fit">
																<label [for]="'date' + $index" class="relative">
																	<input [id]="'date' + $index" formControlName="date" type="datetime-local" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
																	<span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Date</span>
																</label>
															</div>
															<!-- Postponed -->
															<div class="flex items-center w-fit">
																<label class="relative flex items-center p-1 rounded-full cursor-pointer">
																	<input type="checkbox" [id]="'postponed' + $index" class="peer absolute h-0 w-0 opacity-0" formControlName="postponed">
																	<span class="w-7 h-7 border-2 border-neutral-300 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out peer-checked:bg-crimson peer-checked:border-crimson peer-focus-visible:ring-2 peer-focus-visible:ring-crimson/40">
																		<svg class="w-4 h-4 text-white opacity-0 transition-opacity duration-200 ease-in-out peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
																			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
																		</svg>
																	</span>
																</label>
																<label [for]="'postponed' + $index" class="ml-1 text-neutral-700 select-none font-medium cursor-pointer">Postponed</label>
															</div>
															<!-- Delete -->
															<button (click)="removeMatch(phase2, matchday.value.round - 1, $index)" type="button" class="bg-red-600 text-white hover:bg-red-600/80 w-fit rounded-full px-4 py-2 duration-300">
																<fa-icon [icon]="Delete"></fa-icon>
															</button>
														</div>
													}
												</div>
											}
										</div>
									}
								</div>
							}
						</div>
						<div class="flex justify-end gap-2">
							<button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
							<button type="submit" [disabled]="form!.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
						</div>
					</form>
        </div>
			</div>
    </div>
  `,
  styles: ``,
})
export class FixtureUpdateModalComponent {
  @Input() fixture!: Fixture;
	@Input() teams!: Team[];
  @Output() close = new EventEmitter<void>();

	private fb = inject(FormBuilder);
	private fixturesService = inject(FixturesApiService);

	filteredTeams: Team[] = [];

  form: FormGroup | null = null;
	errorMessage: string | null = null;
  activePhase: 'phase1' | 'phase2' = 'phase1';
  activeMatchDayPhase1: number = 0;
  activeMatchDayPhase2: number = 0;

	Add = faPlus;
	Save = faFloppyDisk;
	Delete = faTrashCan;

  ngOnInit() {
		this.filteredTeams = this.teams.filter(team => team.category === this.fixture.category);
    this.form = this.fb.group({
      category: [this.fixture.category, Validators.required],
      phase1: this.buildMatchDays(this.fixture.phase1),
      phase2: this.buildMatchDays(this.fixture.phase2),
    });
  }

	// ======== Format Date =========
	private formatForInput(dateStr: Date | string): string {
		if (!dateStr) return '';

		const date = new Date(dateStr);

		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

  // ========== Builders ==========
  private buildMatchDays(matchdays: Matchday[]): FormArray {
    return this.fb.array(
      matchdays.map(day =>
        this.fb.group({
          round: [day.round],
          matches: this.buildMatches(day.matches),
        })
      )
    );
  }
  private buildMatches(matches: Match[]): FormArray {
    return this.fb.array(
      matches.map(m =>
        this.fb.group({
          home: [m.home, Validators.required],
          away: [m.away, Validators.required],
          postponed: [m.postponed ?? false],
          date: [this.formatForInput(m.date!)]
        })
      )
    );
  }

  // ========== Getters ==========
  get phase1(): FormArray {
    return this.form!.get('phase1') as FormArray;
  }
  get phase2(): FormArray {
    return this.form!.get('phase2') as FormArray;
  }
  matches(phase: FormArray, i: number): FormArray {
    return phase.at(i).get('matches') as FormArray;
  }

  // ========== DOM Actions ==========
  addMatch(phase: FormArray, matchDayIndex: number): void {
    this.matches(phase, matchDayIndex).push(
      this.fb.group({
        home: ['', Validators.required],
        away: ['', Validators.required],
        postponed: [false],
        date: [null],
      })
    );
  }
  removeMatch(phase: FormArray, matchDayIndex: number, matchIndex: number): void {
    this.matches(phase, matchDayIndex).removeAt(matchIndex);
  }

  save(): void {
    if (this.form!.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

		const formFixture = this.form?.value as Fixture;
		console.log(formFixture.phase1[0].matches[0].date);

    this.fixturesService.updateFixture(this.fixture.category, formFixture);
    this.close.emit();
  }
}