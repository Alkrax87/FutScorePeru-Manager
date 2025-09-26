import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamProfile } from '../../interfaces/team-profile';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { Subscription } from 'rxjs';
import { Stadium } from '../../interfaces/stadium';

@Component({
  selector: 'app-team-add-modal',
  imports: [FormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-xl">
        <h3 class="text-lg font-semibold">Add New Team</h3>
        <p class="text-neutral-500 text-sm">Enter the details for the new team below.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <div class="flex gap-5">
            <!-- TeamId -->
            <div class="w-1/3">
              <label for="teamId" class="block text-sm font-semibold mb-1">TeamId</label>
              <input id="teamId" [(ngModel)]="team.teamId" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="TeamId"
              >
            </div>
            <!-- Location -->
            <div class="w-1/3">
              <label for="location" class="block text-sm font-semibold mb-1">Location</label>
              <select id="location" [(ngModel)]="team.location"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
                <option [value]="''" disabled>Choose location</option>
                @for (location of locations; track $index) {
                  <option [value]="location">{{ location }}</option>
                }
              </select>
            </div>
            <!-- Category -->
            <div class="w-1/3">
              <label for="category" class="block text-sm font-semibold mb-1">Category</label>
              <select id="category" [(ngModel)]="team.category"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
                <option value="0" disabled>Choose category</option>
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
              <input id="name" [(ngModel)]="team.name" type="text"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Name"
              >
            </div>
            <!-- Abbreviation -->
            <div class="w-1/3">
              <label for="abbreviation" class="block text-sm font-semibold mb-1">Abbreviation</label>
              <input id="abbreviation" [(ngModel)]="team.abbreviation" type="text"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Abbreviation"
              >
            </div>
          </div>
          <!-- Image -->
          <div class="w-full">
            <label for="image" class="block text-sm font-semibold mb-1">Image</label>
            <input id="image" [(ngModel)]="team.image" type="text"
              class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Image URL"
            >
          </div>
          <!-- Image Thumbnail -->
          <div class="w-full">
            <label for="imageThumbnail" class="block text-sm font-semibold mb-1">ImageThumbnail</label>
            <input id="imageThumbnail" [(ngModel)]="team.imageThumbnail" type="text"
              class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              placeholder="Image Thumbnail URL"
            >
          </div>
          <!-- Groups -->
          <div class="flex gap-5">
            <!-- Group First Phase -->
            <div class="w-1/2">
              <label for="groupFirstPhase" class="block text-sm font-semibold mb-1">Group First Phase</label>
              <select id="groupFirstPhase" [(ngModel)]="team.groupFirstPhase"
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
              <select id="groupSecondPhase" [(ngModel)]="team.groupSecondPhase"
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
                <input id="c1" [(ngModel)]="team.color.c1" type="text"
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Primary Color"
                >
                <input [(ngModel)]="team.color.c1" type="color" class="bg-white w-10 h-10 rounded-xl border-none"/>
              </div>
            </div>
            <!-- C2 -->
            <div class="w-1/2">
              <label for="c2" class="block text-sm font-semibold mb-1">Secondary Color</label>
              <select id="c2" [(ngModel)]="team.color.c2"
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
                <select id="stadium" [(ngModel)]="team.stadium"
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
                <img [src]="stadiums[team.stadium - 1].image" alt="STADIUM-image" class="rounded-lg object-cover">
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Stadium
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamAddModalComponent {
  constructor(private stadiumsService: StadiumsApiService) {}

  @Output() add = new EventEmitter<TeamProfile>();
  @Output() cancel = new EventEmitter<void>();

  private stadiumSubscription: Subscription | null = null;

  team: TeamProfile = {
    teamId: '',
    category: 0,
    groupFirstPhase: '',
    groupSecondPhase: '',
    name: '',
    abbreviation: '',
    image: '',
    imageThumbnail: '',
    alt: '',
    location: '',
    stadium: 1,
    color: {
      c1: '',
      c2: '#ffffff',
    }
  }
  stadiums: Stadium[] = [];
  locations: string[] = ["Amazonas", 'Áncash', 'Apurímac', "Arequipa", "Ayacucho", "Cajamarca", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima y Callao", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"];

  Add = faPlus;
  Cancel = faXmark;

  ngOnInit() {
    this.stadiumSubscription = this.stadiumsService.dataStadiums$.subscribe({
      next: (data) => (this.stadiums = data),
    });
  }

  onAdd() {
    this.team.abbreviation = this.team.abbreviation.toUpperCase();
    this.team.alt = this.team.abbreviation.toUpperCase() + '-logo';
    this.add.emit(this.team);
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.stadiumSubscription?.unsubscribe();
  }
}
