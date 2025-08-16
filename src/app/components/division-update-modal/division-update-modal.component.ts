import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Division } from '../../interfaces/division';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-division-update-modal',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-xl">
        <h3 class="text-lg font-semibold">Edit Division</h3>
        <p class="text-neutral-500 text-sm">Update the division information.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <div class="flex gap-5">
            <!-- DivisionId -->
            <div class="w-1/5">
              <label for="divisionId" class="block text-sm font-semibold mb-1">DivisionId</label>
              <input id="divisionId" [(ngModel)]="editedDivision.divisionId" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Division"
              >
            </div>
            <!-- Name -->
            <div class="w-3/5">
              <label for="name" class="block text-sm font-semibold mb-1">Name</label>
              <input id="name" [(ngModel)]="editedDivision.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Name"
              >
            </div>
            <!-- Sup -->
            <div class="w-1/5">
              <label for="sup" class="block text-sm font-semibold mb-1">Sup</label>
              <input id="sup" [(ngModel)]="editedDivision.sup" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Sup"
              >
            </div>
          </div>
          <div class="flex gap-5">
            <!-- Season -->
            <div class="w-1/5">
              <label for="season" class="block text-sm font-semibold mb-1">Season</label>
              <input id="season" [(ngModel)]="editedDivision.season" type="number" min="2000" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Season"
              >
            </div>
            <!-- Teams -->
            <div class="w-1/5">
              <label for="teams" class="block text-sm font-semibold mb-1">Teams</label>
              <input id="teams" [(ngModel)]="editedDivision.teams" type="number" min="1" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Teams"
              >
            </div>
            <!-- Image -->
            <div class="w-3/5">
              <label for="image" class="block text-sm font-semibold mb-1">Image</label>
              <input id="image" [(ngModel)]="editedDivision.image" type="text" required
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
              <input id="firstPhaseName" [(ngModel)]="editedDivision.firstPhase.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Phase Name"
              >
            </div>
            <!-- In Game -->
            <div class="w-3/12">
              <input id="firstInGame" [(ngModel)]="editedDivision.firstPhase.inGame" type="number" min="1" required
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
                    <input id="toggleFirstPhase" [(ngModel)]="editedDivision.firstPhase.status" type="checkbox" class="sr-only">
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
              <input id="secondPhaseName" [(ngModel)]="editedDivision.secondPhase.name" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Phase Name"
              >
            </div>
            <!-- In Game -->
            <div class="w-3/12">
              <input id="secondInGame" [(ngModel)]="editedDivision.secondPhase.inGame" type="number" min="1" required
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
                    <input id="toggleSecondPhase" [(ngModel)]="editedDivision.secondPhase.status" type="checkbox" class="sr-only">
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
              <input id="thirdPhaseName" [(ngModel)]="editedDivision.thirdPhase.name" type="text" required
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
                    <input id="toggleThirdPhase" [(ngModel)]="editedDivision.thirdPhase.status" type="checkbox" class="sr-only">
                    <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
            <div class="w-2/12"></div>
          </div>
          <!-- Brackets -->
           @if (editedDivision.brackets) {
             <p class="font-semibold">Brackets</p>
             <div class="grid grid-cols-2 gap-4">
               @if (editedDivision.brackets.bracket32) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="32" class="text-sm font-semibold">32</label>
                   <input id="32" [(ngModel)]="editedDivision.brackets.bracket32.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle32" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle32" [(ngModel)]="editedDivision.brackets.bracket32.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracket16) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="16" class="text-sm font-semibold">16</label>
                   <input id="16" [(ngModel)]="editedDivision.brackets.bracket16.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle16" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle16" [(ngModel)]="editedDivision.brackets.bracket16.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracket8) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="8" class="text-sm font-semibold">8</label>
                   <input id="8" [(ngModel)]="editedDivision.brackets.bracket8.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle8" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle8" [(ngModel)]="editedDivision.brackets.bracket8.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracket4) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="4" class="text-sm font-semibold">4</label>
                   <input id="4" [(ngModel)]="editedDivision.brackets.bracket4.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle4" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle4" [(ngModel)]="editedDivision.brackets.bracket4.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracket2) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="2" class="text-sm font-semibold">2</label>
                   <input id="2" [(ngModel)]="editedDivision.brackets.bracket2.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle2" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle2" [(ngModel)]="editedDivision.brackets.bracket2.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracket1) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="1" class="text-sm font-semibold">1</label>
                   <input id="1" [(ngModel)]="editedDivision.brackets.bracket1.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggle1" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggle1" [(ngModel)]="editedDivision.brackets.bracket1.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
               @if (editedDivision.brackets.bracketExtra) {
                 <div class="grid-cols-1 flex gap-2 items-center">
                   <label for="extra" class="text-sm font-semibold">Extra</label>
                   <input id="extra" [(ngModel)]="editedDivision.brackets.bracketExtra.name" type="text" required
                     class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                     placeholder="Name"
                   >
                   <label for="toggleExtra" class="flex items-center cursor-pointer">
                     <div class="relative">
                       <input id="toggleExtra" [(ngModel)]="editedDivision.brackets.bracketExtra.status" type="checkbox" class="sr-only">
                       <div class="line block bg-neutral-200 w-14 h-8 rounded-full transition"></div>
                       <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                     </div>
                   </label>
                 </div>
               }
             </div>
           }
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onEdit()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Edit"></fa-icon> Update Division
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
export class DivisionUpdateModalComponent {
  @Input() editedDivision!: Division;
  @Output() update = new EventEmitter<Division>();
  @Output() cancel = new EventEmitter<void>();

  Edit = faPenToSquare;
  Cancel = faXmark;

  onEdit() {
    this.update.emit(this.editedDivision);
  }

  onCancel() {
    this.cancel.emit();
  }
}