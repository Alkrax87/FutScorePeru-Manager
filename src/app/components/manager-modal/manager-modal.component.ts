import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Manager } from '../../interfaces/manager';
import { ManagersApiService } from '../../services/managers-api.service';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamsApiService } from '../../services/teams-api.service';
import { TeamProfile } from '../../interfaces/team-profile';

@Component({
  selector: 'app-manager-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-5">
      <div class="bg-white p-5 rounded-3xl w-full max-w-sm">
        <form [formGroup]="form" (ngSubmit)="save()">
          @if (manager) {
            <h3 class="text-xl font-semibold">Edit Manager</h3>
            <p class="text-neutral-500 text-sm">Update the manager details below.</p>
          } @else {
            <h3 class="text-xl font-semibold">Add New Manager</h3>
            <p class="text-neutral-500 text-sm">Enter the details for the new manager below.</p>
          }
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
          <div class="flex flex-col gap-2 my-4">
            <!-- ManagerId -->
            <div>
              <label for="managerId" class="block text-sm font-semibold mb-1">ManagerId</label>
              <input id="managerId" formControlName="managerId" type="number" placeholder="ManagerId" min="1"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-semibold mb-1">Category</label>
              <select id="category" formControlName="category" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
                <option value="0" disabled>Choose category</option>
                <option value="1">Liga 1</option>
                <option value="2">Liga 2</option>
              </select>
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-semibold mb-1">Name</label>
              <input id="name" formControlName="name" type="text" placeholder="Name"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Cod -->
            <div>
              <label for="cod" class="block text-sm font-semibold mb-1">Nationality</label>
              <select id="cod" formControlName="cod" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
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
            </div>
            <!-- Photo -->
            <div>
              <label for="photo" class="block text-sm font-semibold mb-1">Photo</label>
              <input id="photo" formControlName="photo" type="text" placeholder="Photo"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- TeamId -->
            <div>
              <label for="teamId" class="block text-sm font-semibold mb-1">Team</label>
              <select id="teamId" formControlName="teamId" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
                <option value="" disabled>Choose Team</option>
                @for (team of teams; track $index) {
                  @if (team.category === 1 || team.category === 2) {
                    <option [value]="team.teamId">{{ team.name }}</option>
                  }
                }
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/50 text-neutral-600 border rounded-full px-4 py-2 text-sm duration-300">Cancel</button>
            @if (manager) {
              <button type="submit" class="bg-yellow-500 hover:bg-yellow-500/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                <fa-icon [icon]="Edit"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-4 py-2 text-sm duration-300">
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
  Edit = faPenToSquare;

  ngOnInit() {
    this.teamsService.dataTeams$.subscribe({
      next: (data) => (this.teams = data)
    });

    if (this.manager) {
      this.form.patchValue(this.manager);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid. Please check and try again.';
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