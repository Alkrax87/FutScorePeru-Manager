import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamProfile } from '../../interfaces/team-profile';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-profile-edit',
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-center z-50 select-none">
      <div class="bg-white p-5 w-full rounded-xl max-w-xl">
        <!-- Card Header -->
        <div class="flex">
          <div class="w-1/2 my-auto">
            <h3 class="text-night text-xl font-semibold"><fa-icon [icon]="Edit"></fa-icon> Edit Team</h3>
            <p class="text-neutral-500 text-sm">Update the team details.</p>
          </div>
          <div class="w-1/2 place-items-end">
            <img [src]="updatedTeam.image" (error)="onImageError($event)" alt="STADIUM-image" class="h-20">
          </div>
        </div>
        <!-- Form -->
        <div class="my-5">
          <div class="flex flex-col gap-2">
            <div class="flex gap-5">
              <!-- TeamId -->
              <div class="w-1/3">
                <label for="teamId" class="block text-sm font-semibold mb-1">TeamId</label>
                <input id="teamId" [(ngModel)]="updatedTeam.teamId" type="text"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="TeamId"
                >
              </div>
              <!-- Location -->
              <div class="w-1/3">
                <label for="location" class="block text-sm font-semibold mb-1">Location</label>
                <select id="location" [(ngModel)]="updatedTeam.location"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                >
                  @for (location of locations; track $index) {
                    <option [value]="location">{{ location }}</option>
                  }
                </select>
              </div>
              <!-- Category -->
              <div class="w-1/3">
                <label for="category" class="block text-sm font-semibold mb-1">Category</label>
                <select id="category" [(ngModel)]="updatedTeam.category"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                >
                  <option value="1">Liga 1</option>
                  <option value="2">Liga 2</option>
                  <option value="3">Liga 3</option>
                </select>
              </div>
            </div>
            <div class="flex gap-5">
              <!-- Name -->
              <div class="w-2/3">
                <label for="name" class="block text-sm font-semibold mb-1">Name</label>
                <input id="name" [(ngModel)]="updatedTeam.name" type="text"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
              </div>
              <!-- Abbreviation -->
              <div class="w-1/3">
                <label for="abbreviation" class="block text-sm font-semibold mb-1">Abbreviation</label>
                <input id="abbreviation" [(ngModel)]="updatedTeam.abbreviation" type="text"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Abbreviation"
                >
              </div>
            </div>
            <!-- Image -->
            <div class="w-full">
              <label for="image" class="block text-sm font-semibold mb-1">Image</label>
              <input id="image" [(ngModel)]="updatedTeam.image" type="text"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Image URL"
              >
            </div>
            <!-- Image Thumbnail -->
            <div class="w-full">
              <label for="imageThumbnail" class="block text-sm font-semibold mb-1">ImageThumbnail</label>
              <input id="imageThumbnail" [(ngModel)]="updatedTeam.imageThumbnail" type="text"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Image Thumbnail URL"
              >
            </div>
            <!-- Groups -->
            <div class="flex gap-5">
              <!-- Group First Phase -->
              <div class="w-1/2">
                <label for="groupFirstPhase" class="block text-sm font-semibold mb-1">Group First Phase</label>
                <select id="groupFirstPhase" [(ngModel)]="updatedTeam.groupFirstPhase"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                >
                  <option value="">None</option>
                  <option disabled>---- Liga 2 ----</option>
                  <option value="a">Grupo A</option>
                  <option value="b">Grupo B</option>
                  <option disabled>---- Liga 3 ----</option>
                  <option value="1">Grupo 1</option>
                  <option value="2">Grupo 2</option>
                  <option value="3">Grupo 3</option>
                  <option value="4">Grupo 4</option>
                </select>
              </div>
              <!-- Group Second Phase -->
              <div class="w-1/2">
                <label for="groupSecondPhase" class="block text-sm font-semibold mb-1">Group Second Phase</label>
                <select id="groupSecondPhase" [(ngModel)]="updatedTeam.groupSecondPhase"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                >
                  <option value="">None</option>
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
              </div>
            </div>
            <!-- Colors -->
            <div class="flex gap-5">
              <!-- C1 -->
              <div class="w-1/2">
                <label for="c1" class="block text-sm font-semibold mb-1">Primary Color</label>
                <div class="flex gap-2">
                  <input id="c1" [(ngModel)]="updatedTeam.color.c1" type="text"
                    class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                    placeholder="Primary Color"
                  >
                  <input [(ngModel)]="updatedTeam.color.c1" type="color" class="bg-white w-10 h-10 rounded-xl border-none"/>
                </div>
              </div>
              <!-- C2 -->
              <div class="w-1/2">
                <label for="c2" class="block text-sm font-semibold mb-1">Secondary Color</label>
                <select id="c2" [(ngModel)]="updatedTeam.color.c2"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                >
                  <option value="" disabled>Choose text color</option>
                  <option value="#ffffff">Light Text</option>
                  <option value="#161513">Dark Text</option>
                </select>
              </div>
            </div>
            <div class="flex gap-5">
              <!-- Stadium -->
              <div class="w-1/2 flex items-center">
                <div class="w-full">
                  <label for="stadium" class="block text-sm font-semibold mb-1">Stadium</label>
                  <select id="stadium" [(ngModel)]="updatedTeam.stadium"
                    class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  >
                    @for (stadium of stadiums; track $index) {
                      <option [value]="stadium.stadiumId">{{ stadium.name }}</option>
                    }
                  </select>
                </div>
              </div>
              <!-- Stadium Preview -->
              <div class="w-1/2">
                <div class="border-gray-300 flex items-center border p-3 rounded-xl">
                  <img [src]="stadiums[updatedTeam.stadium - 1].image" alt="STADIUM-image" class="rounded-lg object-cover">
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-3 mt-6">
            <button class="bg-neutral-100 hover:bg-neutral-200 w-40 py-2 rounded-xl outline-none" (click)="onCancel()">
              <fa-icon [icon]="Cancel"></fa-icon>&nbsp; Cancel
            </button>
            <button class="bg-yellow-400 w-40 text-white py-2 rounded-xl outline-none" (click)="onSave()">
              <fa-icon [icon]="Save"></fa-icon>&nbsp; Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamProfileEditComponent {
  @Input() updatedTeam!: TeamProfile;
  @Input() stadiums!: any;
  @Output() save = new EventEmitter<TeamProfile>();
  @Output() cancel = new EventEmitter<void>();

  locations: string[] = ["Amazonas", 'Áncash', 'Apurímac', "Arequipa", "Ayacucho", "Cajamarca", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima y Callao", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"];
  Edit = faPen;
  Cancel = faXmark;
  Save = faFloppyDisk;

  onImageError(event: any) {
    const img = event.target as HTMLImageElement;
    if (img.src.includes('no-team.webp')) return;
    img.src = 'assets/images/no-team.webp';
  }

  onSave() { this.save.emit(this.updatedTeam) }

  onCancel() { this.cancel.emit() }
}