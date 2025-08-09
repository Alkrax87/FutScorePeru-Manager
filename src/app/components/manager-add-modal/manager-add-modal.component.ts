import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Manager } from '../../interfaces/manager';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { TeamProfile } from '../../interfaces/team-profile';
import { TeamsApiService } from '../../services/teams-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-add-modal',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Add New Manager</h3>
        <p class="text-neutral-500 text-sm">Enter the details for the new manager below.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <div class="flex gap-5">
            <!-- ManagerId -->
            <div class="w-1/3">
              <label for="managerId" class="block text-sm font-semibold mb-1">ManagerId</label>
              <input id="managerId" [(ngModel)]="manager.managerId" type="number" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="ManagerId"
              >
            </div>
            <!-- Category -->
            <div class="w-2/3">
              <label for="category" class="block text-sm font-semibold mb-1">Category</label>
              <select id="category" [(ngModel)]="manager.category" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
                <option value="0" disabled>Choose category</option>
                <option value="1">Liga 1</option>
                <option value="2">Liga 2</option>
              </select>
            </div>
          </div>
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold mb-1">Name</label>
            <input id="name" [(ngModel)]="manager.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Name"
              >
          </div>
          <div class="flex gap-5">
            <!-- TeamId -->
            <div class="w-1/2">
              <label for="team" class="block text-sm font-semibold mb-1">Team</label>
              <select id="team" [(ngModel)]="manager.teamId" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
                <option value="" disabled>Choose Team</option>
                @for (team of teams; track $index) {
                  @if (team.category === 1 || team.category === 2) {
                    <option [value]="team.teamId">{{ team.name }}</option>
                  }
                }
              </select>
            </div>
            <!-- Nationality -->
            <div class="w-1/2">
              <label for="cod" class="block text-sm font-semibold mb-1">Nationality</label>
              <select id="cod" [(ngModel)]="manager.cod" class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition">
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
          </div>
          <div>
            <label for="photo" class="block text-sm font-semibold mb-1">Photo</label>
            <input id="photo" [(ngModel)]="manager.photo" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Photo"
              >
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Manager
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ManagerAddModalComponent {
  constructor(private teamsService: TeamsApiService) {}

  @Output() add = new EventEmitter<Manager>();
  @Output() cancel = new EventEmitter<void>();

  teamsSubscription: Subscription | null = null;
  teams!: TeamProfile[];
  manager: Manager = {
    managerId: 0,
    category: 0,
    teamId: '',
    name: '',
    cod: '',
    photo: '',
  }

  Add = faPlus;
  Cancel = faXmark;

  ngOnInit() {
    this.teamsSubscription = this.teamsService.dataTeams$.subscribe({
      next: (data) => (this.teams = data)
    });
  }

  onAdd() {
    if (!this.manager.name) {
      this.manager.name = 'Por Definir';
    }
    this.add.emit(this.manager);
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
  }
}