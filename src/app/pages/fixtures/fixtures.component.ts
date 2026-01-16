import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Fixture } from '../../interfaces/fixture';
import { FixtureAddModalComponent } from "../../components/fixture-add-modal/fixture-add-modal.component";
import { FixturesApiService } from '../../services/fixtures-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { FixtureUpdateModalComponent } from "../../components/fixture-update-modal/fixture-update-modal.component";
import { TeamsApiService } from '../../services/teams-api.service';
import { Team } from '../../interfaces/team';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-fixtures',
  imports: [FontAwesomeModule, FixtureAddModalComponent, DeleteConfirmationModalComponent, FixtureUpdateModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Fixture Management</h2>
          <p class="text-neutral-400">Manage and view all fixture</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Fixture
        </button>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (fixture of fixtures; track $index) {
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300">
            <div class="p-4">
              <div class="flex flex-col gap-4">
                <div class="bg-crimson w-fit mx-auto px-6 py-1 rounded-full">
                  <p class="text-white font-bold text-xl">LIGA {{ fixture.category }}</p>
                </div>
                <div class="flex gap-4 text-center">
                  <!-- Phase1 -->
                  <div class="w-1/2 shadow-md border rounded-3xl p-4">
                    <p class="text-gold text-sm font-semibold">Phase 1</p>
                    <p class="-mt-1"><b>{{ fixture.phase1.length }}</b> matchdays</p>
                  </div>
                  <!-- Phase2 -->
                  <div class="w-1/2 shadow-md border rounded-3xl p-4">
                    <p class="text-gold text-sm font-semibold">Phase 2</p>
                    <p class="-mt-1"><b>{{ fixture.phase2.length }}</b> matchdays</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mt-4">
                <button (click)="onEdit(fixture)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full rounded-full py-2 text-sm duration-300">
                  <fa-icon [icon]="Edit"></fa-icon> Edit
                </button>
                <button (click)="onDelete(fixture)" class="bg-red-600 text-white hover:bg-red-600/80 rounded-full px-4 py-2 text-sm duration-300">
                  <fa-icon [icon]="Delete"></fa-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isFixtureModalAddOpen()) {
      <app-fixture-add-modal
        (close)="isFixtureModalAddOpen.set(false)"
      ></app-fixture-add-modal>
    }

    @if (isFixtureModalUpdateOpen()) {
      <app-fixture-update-modal
        [fixture]="selectedFixture()!"
        [teams]="teams"
        (close)="isFixtureModalUpdateOpen.set(false)"
      ></app-fixture-update-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'Fixture',
          element: 'Liga ' + selectedFixture()!.category + ' fixture'
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class FixturesComponent {
  private fixturesService = inject(FixturesApiService);
  private teamsService = inject(TeamsApiService);
  fixtures: Fixture[] = [];
  teams: Team[] = [];

  isFixtureModalAddOpen = signal(false);
  isFixtureModalUpdateOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedFixture = signal<Fixture | null>(null);

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.teamsService.getTeams();
    this.fixturesService.getFixtures();
    combineLatest([this.teamsService.dataTeams$, this.fixturesService.dataFixtures$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, fixtures]) => {
        this.teams = teams;
        this.fixtures = fixtures;
      }
    });
  }

  onAdd() {
    this.selectedFixture.set(null);
    this.isFixtureModalAddOpen.set(true);
  }

  onEdit(fixture: Fixture) {
    this.selectedFixture.set(fixture);
    this.isFixtureModalUpdateOpen.set(true);
  }

  onDelete(fixture: Fixture) {
    this.selectedFixture.set(fixture);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedFixture()?.category) {
      this.fixturesService.deleteFixture(this.selectedFixture()!.category);
    }
    this.isConfirmOpen.set(false);
  }
}
