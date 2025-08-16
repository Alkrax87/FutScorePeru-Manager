import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Division } from '../../interfaces/division';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-division-add-modal',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-xl">
        <h3 class="text-lg font-semibold">Add Division</h3>
        <p class="text-neutral-500 text-sm">Create a new tournament division with phases and brackets.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <div class="flex gap-5">
            <!-- DivisionId -->
            <div class="w-1/5">
              <label for="divisionId" class="block text-sm font-semibold mb-1">DivisionId</label>
              <input id="divisionId" [(ngModel)]="division.divisionId" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Division"
              >
            </div>
            <!-- Name -->
            <div class="w-3/5">
              <label for="name" class="block text-sm font-semibold mb-1">Name</label>
              <input id="name" [(ngModel)]="division.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Name"
              >
            </div>
            <!-- Sup -->
            <div class="w-1/5">
              <label for="sup" class="block text-sm font-semibold mb-1">Sup</label>
              <input id="sup" [(ngModel)]="division.sup" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Sup"
              >
            </div>
          </div>
          <div class="flex gap-5">
            <!-- Season -->
            <div class="w-1/5">
              <label for="season" class="block text-sm font-semibold mb-1">Season</label>
              <input id="season" [(ngModel)]="division.season" type="number" min="2000" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Season"
              >
            </div>
            <!-- Teams -->
            <div class="w-1/5">
              <label for="teams" class="block text-sm font-semibold mb-1">Teams</label>
              <input id="teams" [(ngModel)]="division.teams" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Teams"
              >
            </div>
            <!-- Image -->
            <div class="w-3/5">
              <label for="image" class="block text-sm font-semibold mb-1">Image</label>
              <input id="image" [(ngModel)]="division.image" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Image"
              >
            </div>
          </div>
          <!-- Phases -->
          <!-- First Phase -->
          <p class="text-sm font-semibold">First Phase</p>
          <div class="flex gap-5">
            <!-- Name -->
            <div class="w-7/12">
              <input id="firstPhaseName" [(ngModel)]="division.firstPhase.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Phase Name"
              >
            </div>
            <!-- In Game -->
            <div class="w-3/12">
              <input id="firstInGame" [(ngModel)]="division.firstPhase.inGame" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="In Game"
              >
            </div>
            <!-- Status -->
            <div class="w-2/12 flex flex-col items-center justify-center">
              <div class="flex items-center h-9">
                <label for="toggleFirstPhase" class="flex items-center cursor-pointer">
                  <!-- toggle -->
                  <div class="relative">
                    <input id="toggleFirstPhase" [(ngModel)]="division.firstPhase.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <!-- Second Phase -->
          <p class="text-sm font-semibold">Second Phase</p>
          <div class="flex gap-5">
            <!-- Name -->
            <div class="w-7/12">
              <input id="secondPhaseName" [(ngModel)]="division.secondPhase.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Phase Name"
              >
            </div>
            <!-- In Game -->
            <div class="w-3/12">
              <input id="secondInGame" [(ngModel)]="division.secondPhase.inGame" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="In Game"
              >
            </div>
            <!-- Status -->
            <div class="w-2/12 flex flex-col items-center justify-center">
              <div class="flex items-center h-9">
                <label for="toggleSecondPhase" class="flex items-center cursor-pointer">
                  <!-- toggle -->
                  <div class="relative">
                    <input id="toggleSecondPhase" [(ngModel)]="division.secondPhase.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <!-- Third Phase -->
          <p class="text-sm font-semibold">Third Phase</p>
          <div class="flex gap-5">
            <!-- Name -->
            <div class="w-7/12">
              <input id="thirdPhaseName" [(ngModel)]="division.thirdPhase.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Phase Name"
              >
            </div>
            <!-- Status -->
            <div class="w-3/12 items-center justify-center">
              <div class="flex items-center h-9">
                <label for="toggleThirdPhase" class="flex items-center cursor-pointer">
                  <!-- toggle -->
                  <div class="relative">
                    <input id="toggleThirdPhase" [(ngModel)]="division.thirdPhase.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            <div class="w-2/12"></div>
          </div>
          <!-- Brackets -->
          <p class="font-semibold">Brackets</p>
          <div class="grid grid-cols-2 gap-4">
            @if (division.brackets.bracket32) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="32" class="text-sm font-semibold">32</label>
                <input id="32" [(ngModel)]="division.brackets.bracket32.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle32" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle32" [(ngModel)]="division.brackets.bracket32.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracket16) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="16" class="text-sm font-semibold">16</label>
                <input id="16" [(ngModel)]="division.brackets.bracket16.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle16" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle16" [(ngModel)]="division.brackets.bracket16.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracket8) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="8" class="text-sm font-semibold">8</label>
                <input id="8" [(ngModel)]="division.brackets.bracket8.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle8" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle8" [(ngModel)]="division.brackets.bracket8.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracket4) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="4" class="text-sm font-semibold">4</label>
                <input id="4" [(ngModel)]="division.brackets.bracket4.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle4" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle4" [(ngModel)]="division.brackets.bracket4.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracket2) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="2" class="text-sm font-semibold">2</label>
                <input id="2" [(ngModel)]="division.brackets.bracket2.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle2" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle2" [(ngModel)]="division.brackets.bracket2.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracket1) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="1" class="text-sm font-semibold">1</label>
                <input id="1" [(ngModel)]="division.brackets.bracket1.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggle1" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggle1" [(ngModel)]="division.brackets.bracket1.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
            @if (division.brackets.bracketExtra) {
              <div class="grid-cols-1 flex gap-2 items-center">
                <label for="extra" class="text-sm font-semibold">Extra</label>
                <input id="extra" [(ngModel)]="division.brackets.bracketExtra.name" type="text" required
                  class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                  placeholder="Name"
                >
                <label for="toggleExtra" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input id="toggleExtra" [(ngModel)]="division.brackets.bracketExtra.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            }
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Division
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    input:checked ~ .dot {
      transform: translateX(100%);
    }
    input:checked ~ .line {
      background-color: #161513;
    }
    input:checked ~ .dot {
      transform: translateX(100%);
    }
    input:checked ~ .line {
      background-color: #161513;
    }
  `,
})
export class DivisionAddModalComponent {
  @Output() add = new EventEmitter<Division>();
  @Output() cancel = new EventEmitter<void>();

  division: Division = {
    divisionId: 1,
    sup: '',
    name: '',
    image: '',
    season: 2000,
    teams: 1,
    firstPhase: {
      name: '',
      inGame: 1,
      status: false,
    },
    secondPhase: {
      name: '',
      inGame: 1,
      status: false,
    },
    thirdPhase: {
      name: '',
      status: false,
    },
    brackets: {
      bracket32: {
        name: '',
        status: false,
      },
      bracket16: {
        name: '',
        status: false,
      },
      bracket8: {
        name: '',
        status: false,
      },
      bracket4: {
        name: '',
        status: false,
      },
      bracket2: {
        name: '',
        status: false,
      },
      bracket1: {
        name: '',
        status: false,
      },
      bracketExtra: {
        name: '',
        status: false,
      }
    }
  };
  Add = faPlus;
  Cancel = faXmark;

  onAdd() {
    if (!this.division.brackets.bracket32?.name) {
      delete this.division.brackets.bracket32;
    }
    if (!this.division.brackets.bracket16?.name) {
      delete this.division.brackets.bracket16;
    }
    if (!this.division.brackets.bracket8?.name) {
      delete this.division.brackets.bracket8;
    }
    if (!this.division.brackets.bracket4?.name) {
      delete this.division.brackets.bracket4;
    }
    if (!this.division.brackets.bracket2?.name) {
      delete this.division.brackets.bracket2;
    }
    if (!this.division.brackets.bracket1?.name) {
      delete this.division.brackets.bracket1;
    }
    if (!this.division.brackets.bracketExtra?.name) {
      delete this.division.brackets.bracketExtra;
    }

    this.add.emit(this.division);
  }

  onCancel() {
    this.cancel.emit();
  }
}