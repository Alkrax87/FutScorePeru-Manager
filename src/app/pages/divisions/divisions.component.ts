import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPause, faPenToSquare, faPlay, faPlus, faShieldHalved, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Division } from '../../interfaces/division';
import { DivisionsApiService } from '../../services/divisions-api.service';
import { DivisionAddModalComponent } from "../../components/division-add-modal/division-add-modal.component";
import { DivisionUpdateModalComponent } from "../../components/division-update-modal/division-update-modal.component";
import { DivisionDeleteModalComponent } from "../../components/division-delete-modal/division-delete-modal.component";

@Component({
  selector: 'app-divisions',
  imports: [FontAwesomeModule, DivisionAddModalComponent, DivisionUpdateModalComponent, DivisionDeleteModalComponent],
  template: `
    <div class="px-5 xl:px-32 py-5 sm:py-10 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Division Management</h2>
          <p class="text-neutral-500">Manage and view all divisions</p>
        </div>
        <div class="flex items-center">
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white w-full sm:w-fit px-4 py-2 rounded-xl">
            <fa-icon [icon]="Add"></fa-icon> Add Division
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (division of divisions; track $index) {
          <div class="border border-neutral-200 rounded-xl overflow-hidden shadow-md">
            <div class="bg-night relative flex justify-center p-4">
              <div class="flex flex-col items-center">
                @if (division.image) {
                  <div class="bg-white rounded-full overflow-hidden p-2">
                    <img [src]="division.image" alt="DIVISION-image" class="w-20 h-20 object-cover rounded-lg">
                  </div>
                } @else {
                  <div class="rounded-full overflow-hidden p-2">
                    <img src="assets/images/no-division.webp" alt="DIVISION-image" class="w-20 h-20 object-cover rounded-lg">
                  </div>
                }
                <p class="text-white font-bold text-2xl text-center">{{ division.name }}</p>
                <p class="text-neutral-400 text-lg text-center">Season {{ division.season }}</p>
              </div>
              <div class="bg-white font-semibold absolute left-2 top-2 px-2 rounded-full text-xs">
                ID {{ division.divisionId }}
              </div>
            </div>
            <div class="p-4">
              <!-- Teams -->
              <div class="flex text-neutral-600 justify-between">
                <div><fa-icon [icon]="Shield"></fa-icon> Teams</div>
                <p class="font-semibold">{{ division.teams }}</p>
              </div>
              <!-- Phases -->
              <div class="flex flex-col gap-2 mt-4">
                <!-- First Phase -->
                <div class="flex text-sm text-neutral-600 justify-between">
                  <p class="font-semibold">{{ division.firstPhase.name }}</p>
                  <div class="font-semibold flex gap-2">
                    <p>{{ division.firstPhase.inGame }}</p>
                    @if (division.firstPhase.status) {
                      <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                    } @else {
                      <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                    }
                  </div>
                </div>
                <!-- Second Phase -->
                <div class="flex text-sm text-neutral-600 justify-between">
                  <p class="font-semibold">{{ division.secondPhase.name }}</p>
                  <div class="font-semibold flex gap-2">
                    <p>{{ division.secondPhase.inGame }}</p>
                    @if (division.secondPhase.status) {
                      <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                    } @else {
                      <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                    }
                  </div>
                </div>
                <!-- Third Phase -->
                <div class="flex text-sm text-neutral-600 justify-between">
                  <p class="font-semibold">{{ division.thirdPhase.name }}</p>
                  <div class="font-semibold flex gap-2">
                    @if (division.thirdPhase.status) {
                      <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                    } @else {
                      <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                    }
                  </div>
                </div>
              </div>
              <div class="bg-neutral-200 rounded-full mt-3 h-0.5 w-full"></div>
              <!-- Brackets -->
               @if (division.brackets) {
                 <p class="text-xs text-neutral-500 my-2">Brackets</p>
                 <div class="grid gap-x-4 gap-y-1 grid-cols-2 text-xs text-neutral-500">
                   @if (division.brackets.bracket32) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket32.name }}</p>
                       @if (division.brackets.bracket32.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracket16) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket16.name }}</p>
                       @if (division.brackets.bracket16.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracket8) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket8.name }}</p>
                       @if (division.brackets.bracket8.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracket4) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket4.name }}</p>
                       @if (division.brackets.bracket4.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracket2) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket2.name }}</p>
                       @if (division.brackets.bracket2.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracket1) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracket1.name }}</p>
                       @if (division.brackets.bracket1.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                   @if (division.brackets.bracketExtra) {
                     <div class="grid-cols-1 flex justify-between">
                       <p class="truncate">{{ division.brackets.bracketExtra.name }}</p>
                       @if (division.brackets.bracketExtra.status) {
                         <fa-icon class="text-green-500" [icon]="Play"></fa-icon>
                       } @else {
                         <fa-icon class="text-neutral-400" [icon]="Pause"></fa-icon>
                       }
                     </div>
                   }
                 </div>
               }
              <div class="flex gap-2 mt-5">
                <button (click)="onEdit(division)" class="hover:bg-neutral-50 border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(division)" class="bg-red-500 hover:bg-red-600 text-white border border-neutral-200 w-full rounded-lg py-2 font-semibold text-sm">
                  <fa-icon [icon]="Delete"></fa-icon> Delete
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (showAddDivisionModal) {
      <app-division-add-modal
        (add)="addDivision($event)"
        (cancel)="showAddDivisionModal = false"
      ></app-division-add-modal>
    }

    @if (showEditDivisionModal) {
      <app-division-update-modal
        [editedDivision]="editedDivision"
        (update)="updateDivision($event)"
        (cancel)="showEditDivisionModal = false"
      ></app-division-update-modal>
    }

    @if (showDeleteDivisionModal) {
      <app-division-delete-modal
        [deletedDivision]="deletedDivision"
        (delete)="deleteDivision()"
        (cancel)="showDeleteDivisionModal = false"
      ></app-division-delete-modal>
    }
  `,
  styles: ``,
})
export class DivisionsComponent {
  constructor(private divisionsService: DivisionsApiService) {}

  private DivisionSubscription: Subscription | null = null;
  divisions: Division[] = [];

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;
  Shield = faShieldHalved;
  Play = faPlay;
  Pause = faPause;

  editedDivision!: Division;
  deletedDivision!: Division;

  showAddDivisionModal = false;
  showEditDivisionModal = false;
  showDeleteDivisionModal = false;

  ngOnInit() {
    this.divisionsService.getDivisions();
    this.DivisionSubscription = this.divisionsService.dataDivisions$.subscribe({
      next: (data) => (this.divisions = data),
    });
  }

  onAdd() {
    this.showAddDivisionModal = !this.showAddDivisionModal;
  }

  onEdit(division: Division) {
    this.editedDivision = {
      ...division,
      firstPhase: {...division.firstPhase},
      secondPhase: {...division.secondPhase},
      thirdPhase: {...division.thirdPhase},
      brackets: {
        bracket32: division.brackets.bracket32 ? {...division.brackets.bracket32} : undefined,
        bracket16: division.brackets.bracket16 ? {...division.brackets.bracket16} : undefined,
        bracket8: division.brackets.bracket8 ? {...division.brackets.bracket8} : undefined,
        bracket4: division.brackets.bracket4 ? {...division.brackets.bracket4} : undefined,
        bracket2: division.brackets.bracket2 ? {...division.brackets.bracket2} : undefined,
        bracket1: division.brackets.bracket1 ? {...division.brackets.bracket1} : undefined,
        bracketExtra: division.brackets.bracketExtra ? {...division.brackets.bracketExtra} : undefined,
      },
    };
    this.showEditDivisionModal = true;
  }

  onDelete(division: Division) {
    this.deletedDivision = division;
    this.showDeleteDivisionModal = true;
  }

  addDivision(division: Division) {
    this.divisionsService.addDivision(division);
    this.showAddDivisionModal = false;
  }

  updateDivision(division: Division) {
    this.divisionsService.updateDivision(division);
    this.showEditDivisionModal = false;
  }

  deleteDivision() {
    this.divisionsService.deleteDivision(this.deletedDivision.divisionId);
    this.showDeleteDivisionModal = false;
  }

  ngOnDestroy() {
    this.DivisionSubscription?.unsubscribe();
  }
}