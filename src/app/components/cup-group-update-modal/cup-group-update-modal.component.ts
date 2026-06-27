import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cup, GroupTeam } from '../../interfaces/cup';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faDatabase, faFloppyDisk, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CupsApiService } from '../../services/cups-api.service';
import { TeamsApiService } from '../../services/teams-api.service';
import { Team } from '../../interfaces/team';

@Component({
  selector: 'app-cup-group-update-modal',
  imports: [ReactiveFormsModule, FaIconComponent],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-4xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Update Group {{ groupId + 1 }}</h3>
          <p class="text-neutral-200 text-sm">Enter the details for new cup below.</p>
        </div>
        <form [formGroup]="groupForm" (ngSubmit)="save()" class="bg-white px-5 py-5">
          <button type="button" (click)="addTeam()" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-6 py-2 text-sm duration-300">
            <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Team
          </button>
          @if (teamsArray.length > 0) {
            <div formArrayName="teamsArray" class="flex flex-col gap-3 my-5 border px-2 py-3 rounded-3xl">
              @for (teamForm of teamsArray.controls; track $index) {
                <div [formGroupName]="$index" class="flex gap-2">
                  <!-- TeamId -->
                  <div class="w-full">
                    <label [for]="'teamId' + $index" class="relative">
                      <select [id]="'teamId' + $index" formControlName="teamId" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                        <option value="" disabled>Choose Team</option>
                        @for (team of teams; track team.teamId) {
                          @if (team.category === 1 || team.category === 2) {
                            <option [value]="team.teamId">{{ 'L' + team.category + ' - ' + team.name }}</option>
                          }
                        }
                      </select>
                      <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Team</span>
                    </label>
                  </div>
                  <!-- Win -->
                  <div class="min-w-20 w-20">
                    <label [for]="'win' + $index" class="relative">
                      <input [id]="'win' + $index" formControlName="w" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">W</span>
                    </label>
                  </div>
                  <!-- Draw -->
                  <div class="min-w-20 w-20">
                    <label [for]="'draw' + $index" class="relative">
                      <input [id]="'draw' + $index" formControlName="d" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">D</span>
                    </label>
                  </div>
                  <!-- Lose -->
                  <div class="min-w-20 w-20">
                    <label [for]="'lose' + $index" class="relative">
                      <input [id]="'lose' + $index" formControlName="l" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">L</span>
                    </label>
                  </div>
                  <!-- GF -->
                  <div class="min-w-20 w-20">
                    <label [for]="'gf' + $index" class="relative">
                      <input [id]="'gf' + $index" formControlName="gf" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">GF</span>
                    </label>
                  </div>
                  <!-- GA -->
                  <div class="min-w-20 w-20">
                    <label [for]="'ga' + $index" class="relative">
                      <input [id]="'ga' + $index" formControlName="ga" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">GA</span>
                    </label>
                  </div>
                  <!-- Sanction -->
                  <div class="min-w-24 w-24">
                    <label [for]="'sanction' + $index" class="relative">
                      <input [id]="'sanction' + $index" formControlName="sanction" type="number" min="0" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                      <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Sanction</span>
                    </label>
                  </div>
                  <!-- Delete -->
                  <button (click)="removeTeam($index)" type="button" class="bg-red-600 text-white hover:bg-red-600/80 w-fit rounded-full px-4 py-2 duration-300">
                    <fa-icon [icon]="Delete"></fa-icon>
                  </button>
                </div>
              }
            </div>
          } @else {
            <div class="text-neutral-400 text-sm my-5 flex items-center justify-center border px-2 h-[72px] rounded-3xl">
              <fa-icon [icon]="Database"></fa-icon> &nbsp;No Team data
            </div>
          }
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            <button type="submit" [disabled]="groupForm!.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
              <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class CupGroupUpdateModalComponent {
  @Input() cup!: Cup;
  @Input() groupId: number = 0;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsApiService);
  private cupsService = inject(CupsApiService);

  teams: Team[] = [];
  groupForm!: FormGroup;

  Add = faPlus;
  Save = faFloppyDisk;
  Delete = faTrashCan;
  Database = faDatabase;

  constructor() {
    this.teamsService.dataTeams$.subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error('Unable to load teams: ', err),
    });
  }

  ngOnInit() {
    this.groupForm = this.fb.group({
      teamsArray: this.fb.array([])
    });

    const currentTeams = this.cup.groups[this.groupId].teams || [];
    currentTeams.forEach(team => {
      this.teamsArray.push(this.createTeamFormGroup(team));
    });
  }

  get teamsArray(): FormArray {
    return this.groupForm.get('teamsArray') as FormArray;
  }

  private createTeamFormGroup(team?: GroupTeam): FormGroup {
    return this.fb.group({
      teamId: [team?.teamId || '', Validators.required],
      w: [team?.w ?? 0, [Validators.required, Validators.min(0)]],
      d: [team?.d ?? 0, [Validators.required, Validators.min(0)]],
      l: [team?.l ?? 0, [Validators.required, Validators.min(0)]],
      gf: [team?.gf ?? 0, [Validators.required, Validators.min(0)]],
      ga: [team?.ga ?? 0, [Validators.required, Validators.min(0)]],
      sanction: [team?.sanction ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  addTeam() {
    this.teamsArray.push(this.createTeamFormGroup());
  }

  removeTeam(index: number) {
    this.teamsArray.removeAt(index);
  }

  save() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }

    const updatedCup: Cup = JSON.parse(JSON.stringify(this.cup));

    updatedCup.groups[this.groupId].teams = this.groupForm.value.teamsArray;

    if (updatedCup.cupId) {
      this.cupsService.updateCup(updatedCup.cupId, updatedCup);
    }

    this.close.emit();
  }
}