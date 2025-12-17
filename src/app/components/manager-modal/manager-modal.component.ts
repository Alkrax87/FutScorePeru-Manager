import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Manager } from '../../interfaces/manager';
import { ManagersApiService } from '../../services/managers-api.service';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamsApiService } from '../../services/teams-api.service';
import { TeamProfile } from '../../interfaces/team-profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manager-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          @if (manager) {
            <h3 class="text-white text-xl font-semibold">Edit Manager</h3>
            <p class="text-neutral-200 text-sm">Update the manager details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add New Manager</h3>
            <p class="text-neutral-200 text-sm">Enter the details for the new manager below.</p>
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
            <!-- ManagerId -->
            <div>
              <label for="managerId" class="relative">
                <input id="managerId" type="number" min="1" formControlName="managerId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">ManagerId</span>
              </label>
            </div>
            <!-- Category -->
            <div>
              <label for="category" class="relative">
                <select id="category" formControlName="category" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="0" disabled>Choose category</option>
                  <option value="1">Liga 1</option>
                  <option value="2">Liga 2</option>
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Category</span>
              </label>
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="relative">
                <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
              </label>
            </div>
            <!-- Cod -->
            <div>
              <label for="cod" class="relative">
                <select id="cod" formControlName="cod" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="" disabled>Choose Nationality</option>
                  <option value="ar">Argentina</option>
                  <option value="bo">Bolivia</option>
                  <option value="br">Brasil</option>
                  <option value="ch">Chile</option>
                  <option value="co">Colombia</option>
                  <option value="ec">Ecuador</option>
                  <option value="mx">México</option>
                  <option value="pe">Perú</option>
                  <option value="py">Paraguay</option>
                  <option value="uy">Uruguay</option>
                  <option value="ve">Venezuela</option>
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Nationality</span>
              </label>
            </div>
            <!-- Photo -->
            <div>
              <label for="photo" class="relative">
                <input id="photo" type="text" formControlName="photo" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Photo</span>
              </label>
            </div>
            <!-- TeamId -->
            <div>
              <label for="teamId" class="relative">
                <select id="teamId" formControlName="teamId" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="" disabled>Choose Team</option>
                  @for (team of teams; track $index) {
                    @if (team.category === 1 || team.category === 2) {
                      <option [value]="team.teamId">{{ 'L' + team.category + ' - ' + team.name }}</option>
                    }
                  }
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Team</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @if (manager) {
              <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Team
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class ManagerModalComponent {
  @Input() manager: Manager | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private managersService = inject(ManagersApiService);
  private teamsService = inject(TeamsApiService);

  teams: TeamProfile[] = [];

  form = this.fb.group({
    managerId: [0, [Validators.min(1), Validators.required]],
    category: [0, [Validators.min(1), Validators.required]],
    name: ['', Validators.required],
    cod: ['', Validators.required],
    photo: [''],
    teamId: ['', Validators.required],
  });
  errorMessage: string | null = null;

  Add = faPlus;
  Save = faFloppyDisk;

  constructor() {
    this.teamsService.dataTeams$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.teams = data)
    });
  }

  ngOnInit () {
    if (this.manager) {
      this.form.patchValue(this.manager);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formManager = this.form.value as Manager;

    if (this.manager?.managerId) {
      this.managersService.updateManager(this.manager.managerId, formManager);
      this.close.emit();
    } else {
      this.managersService.addManager(formManager);
      this.close.emit();
    }
  }
}