import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamCP } from '../../interfaces/team-cp';
import { TeamsCPApiService } from '../../services/teams-cp-api.service';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-cp-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-5">
      <div class="bg-white p-5 rounded-3xl w-full max-w-sm">
        <form [formGroup]="form" (ngSubmit)="save()">
          @if (teamCP) {
            <h3 class="text-lg font-semibold">Edit TeamCP</h3>
            <p class="text-neutral-500 text-sm">Update the team details below.</p>
          } @else {
            <h3 class="text-lg font-semibold">Add New TeamCP</h3>
            <p class="text-neutral-500 text-sm">Enter the details for the new TeamsCP below.</p>
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
            <!-- TeamId -->
            <div>
              <label for="teamId" class="block text-sm font-semibold mb-1">TeamId</label>
              <input id="teamId" formControlName="teamId" type="text" placeholder="teamId"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-semibold mb-1">Name</label>
              <input id="name" formControlName="name" type="text" placeholder="name"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Abbreviation -->
            <div>
              <label for="abbreviation" class="block text-sm font-semibold mb-1">Abbreviation</label>
              <input id="abbreviation" formControlName="abbreviation" type="text" placeholder="abbreviation"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Image -->
            <div>
              <label for="image" class="block text-sm font-semibold mb-1">Image</label>
              <input id="image" formControlName="image" type="text" placeholder="image"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- City -->
            <div>
              <label for="city" class="block text-sm font-semibold mb-1">City</label>
              <input id="city" formControlName="city" type="text" placeholder="city"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-semibold mb-1">Location</label>
              <select id="location" formControlName="location"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
                <option [value]="''" disabled>Choose location</option>
                @for (location of locations; track $index) {
                  <option [value]="location">{{ location }}</option>
                }
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/50 text-neutral-600 border rounded-full px-4 py-2 text-sm duration-300">Cancel</button>
            @if (teamCP) {
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
export class TeamCPModalComponent {
  @Input() teamCP: TeamCP | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsCPService = inject(TeamsCPApiService);

  locations: string[] = ["Amazonas", 'Áncash', 'Apurímac', "Arequipa", "Ayacucho", "Cajamarca", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima y Callao", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"];

  form = this.fb.group({
    teamId: ['', Validators.required],
    name: [''],
    abbreviation: [''],
    image: [''],
    city: [''],
    location: [''],
  });
  errorMessage: { status: string, message: string } | null = null;

  Add = faPlus;
  Edit = faPenToSquare;

  ngOnInit() {
    if (this.teamCP) {
      this.form.patchValue(this.teamCP);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = {
        status: 'Error',
        message: 'The "teamId" field is required',
      };
      return;
    }

    const formTeamCP = this.form.value as TeamCP;

    if (this.teamCP?.teamId) {
      this.teamsCPService.updateTeamCP(this.teamCP.teamId, formTeamCP);
      this.close.emit();
    } else {
      this.teamsCPService.createTeamCP(formTeamCP);
      this.close.emit();
    }
  }
}