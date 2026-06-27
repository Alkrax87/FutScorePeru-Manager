import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDatabase, faPenToSquare, faPlus, faShieldHalved, faTrashCan, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { CupsApiService } from '../../services/cups-api.service';
import { TeamsApiService } from '../../services/teams-api.service';
import { Cup, GroupTeam } from '../../interfaces/cup';
import { Team } from '../../interfaces/team';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CupAddModalComponent } from "../../components/cup-add-modal/cup-add-modal.component";
import { CupUpdateModalComponent } from "../../components/cup-update-modal/cup-update-modal.component";
import { DeleteConfirmationModalComponent } from "../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { CupGroupUpdateModalComponent } from "../../components/cup-group-update-modal/cup-group-update-modal.component";

@Component({
  selector: 'app-cups',
  imports: [FontAwesomeModule, CupAddModalComponent, CupUpdateModalComponent, DeleteConfirmationModalComponent, CupGroupUpdateModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Cups Management</h2>
          <p class="text-neutral-400">Manage and view all cups</p>
        </div>
        <button (click)="onAdd()" class="bg-green-700 hover:bg-green-700/90 text-white font-semibold w-full h-fit sm:w-fit px-6 py-2 rounded-full">
          <fa-icon [icon]="Add"></fa-icon> Add Cup
        </button>
      </div>
      <!-- Content -->
      <div class="grid gap-4">
        @for (cup of cups; track $index) {
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300 p-5">
            <div class="flex flex-col sm:flex-row justify-between gap-4">
              <div class="flex items-center gap-2">
                <div class="bg-nightfall text-white flex justify-center items-center gap-2 rounded-full py-2 pl-2 pr-4 w-fit">
                  <img [src]="cup.image" alt="TEAM-logo" class="bg-white rounded-full w-10 h-10 p-1">
                  <p class="font-semibold text-lg truncate">{{ cup.name }}</p>
                </div>
                <p class="text-neutral-400 text-xs">ID: {{ cup.cupId }}</p>
              </div>
              <p class="bg-crimson text-white rounded-full flex items-center px-3 font-semibold h-10"><fa-icon [icon]="Shield"></fa-icon>&nbsp; {{ cup.teams }} teams</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
              @for (group of cup.groups; track $index) {
                <div class="shadow-md border rounded-3xl p-4 h-fit">
                  <div class="flex justify-between">
                    <p class="text-gold font-semibold">
                      {{ group.name }}
                      <button (click)="onGroupEdit(cup, $index)" class="hover:bg-neutral-100/80 ml-1 text-neutral-600 border rounded-full p-1 text-sm duration-300">
                        <fa-icon [icon]="Edit"></fa-icon>
                      </button>
                    </p>
                    <p class="bg-crimson text-white rounded-full text-sm flex items-center px-2 py-0.5 font-semibold"><fa-icon [icon]="Shield"></fa-icon>&nbsp;{{ group.teams.length }}</p>
                  </div>
                  <div class="border rounded-xl mt-2 overflow-hidden">
                    <table class="w-full">
                      <thead class="bg-night text-white text-xs font-semibold text-center h-5">
                        <tr>
                          <th class="text-start pl-2">Team</th>
                          <th class="min-w-12 max-w-12 w-12">PTS</th>
                          <th class="min-w-12 max-w-12 w-12">Pl</th>
                          <th class="min-w-10 max-w-10 w-10">W</th>
                          <th class="min-w-10 max-w-10 w-10">D</th>
                          <th class="min-w-10 max-w-10 w-10">L</th>
                          <th class="min-w-10 max-w-10 w-10">GF</th>
                          <th class="min-w-10 max-w-10 w-10">GA</th>
                          <th class="min-w-10 max-w-10 w-10 pr-2">GD</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        @if (group.teams.length > 0) {
                          @for (team of sortTeams(group.teams); track $index) {
                            <tr>
                              <td class="pl-2 text-start flex items-center gap-2">
                                <img class="w-6 h-6" [src]="mapTeam(team.teamId)?.image" [alt]="mapTeam(team.teamId)?.alt">
                                {{ mapTeam(team.teamId)?.name }}
                              </td>
                              <td class="font-semibold">{{ team.w * 3 + team.d }}</td>
                              <td>{{ team.w + team.d + team.l }}</td>
                              <td>{{ team.w }}</td>
                              <td>{{ team.d }}</td>
                              <td>{{ team.l }}</td>
                              <td>{{ team.gf }}</td>
                              <td>{{ team.ga }}</td>
                              <td class="pr-2">{{ team.gf - team.ga }}</td>
                            </tr>
                          }
                        } @else {
                          <tr>
                            <td colspan="8" class="text-neutral-400 text-sm text-center">
                              <fa-icon [icon]="Database"></fa-icon> &nbsp;No Team data
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }
            </div>
            <div class="flex justify-end gap-2 mt-2">
              <button (click)="onEdit(cup)" class="hover:bg-neutral-100/80 text-neutral-600 border w-full sm:w-64 rounded-full py-2 text-sm duration-300">
                <fa-icon [icon]="Edit"></fa-icon> Edit
              </button>
              <button (click)="onDelete(cup)" class="bg-red-600 hover:bg-red-600/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                <fa-icon [icon]="Delete"></fa-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>

    @if (isCupModalAddOpen()) {
      <app-cup-add-modal
        (close)="isCupModalAddOpen.set(false)"
      ></app-cup-add-modal>
    }

    @if (isCupGroupModalUpdateOpen()) {
      <app-cup-group-update-modal
        [cup]="selectedCup()!"
        [groupId]="selectedGroup()!"
        (close)="isCupGroupModalUpdateOpen.set(false)"
      ></app-cup-group-update-modal>
    }

    @if (isConfirmOpen()) {
      <app-delete-confirmation-modal
        [message]="{
          section: 'Cup',
          element: 'Cup ' + selectedCup()!.name
        }"
        (confirm)="confirmDelete()"
        (close)="isConfirmOpen.set(false)"
      ></app-delete-confirmation-modal>
    }
  `,
  styles: ``,
})
export class CupsComponent {
  private cupsService = inject(CupsApiService);
  private teamsService = inject(TeamsApiService);
  cups: Cup[] = [];
  teams: Team[] = [];

  isCupModalAddOpen = signal(false);
  isCupModalUpdateOpen = signal(false);
  isCupGroupModalUpdateOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedCup = signal<Cup | null>(null);
  selectedGroup = signal<number | null>(null);

  Add = faPlus;
  Edit = faPenToSquare;
  Delete = faTrashCan;
  Shield = faShieldHalved;
  Trophy = faTrophy;
  Database = faDatabase;

  constructor() {
    this.teamsService.getTeams();
    this.cupsService.getCups();
    combineLatest([this.teamsService.dataTeams$, this.cupsService.dataCups$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, cups]) => {
        this.teams = teams;
        this.cups = cups;
      }
    });
  }

  onAdd() {
    this.selectedCup.set(null);
    this.selectedGroup.set(null);
    this.isCupModalAddOpen.set(true);
  }

  onGroupEdit(cup: Cup, groupId: number) {
    this.selectedCup.set(cup);
    this.selectedGroup.set(groupId);
    this.isCupGroupModalUpdateOpen.set(true);
  }

  mapTeam(teamId: string) {
    return this.teams.find(team => team.teamId === teamId);
  }

  sortTeams(teams: GroupTeam[]) {
    return teams.sort((a, b) => {
      const pointsA = a.w * 3 + a.d;
      const pointsB = b.w * 3 + b.d;
      if (pointsA !== pointsB) {
        return pointsB - pointsA;
      }
      const gdA = a.gf - a.ga;
      const gdB = b.gf - b.ga;
      if (gdA !== gdB) {
        return gdB - gdA;
      }
      const gfA = a.gf;
      const gfB = b.gf;
      if (gfA !== gfB) {
        return gfB - gfA;
      }
      const gaA = a.ga;
      const gaB = b.ga;
      return gaB - gaA;
    });
  }

  onEdit(cup: Cup) {
    this.selectedCup.set(cup);
    this.isCupModalUpdateOpen.set(true);
  }

  onDelete(cup: Cup) {
    this.selectedCup.set(cup);
    this.isConfirmOpen.set(true);
  }

  confirmDelete() {
    if (this.selectedCup()?.cupId) {
      this.cupsService.deleteCup(this.selectedCup()!.cupId);
    }
    this.isConfirmOpen.set(false);
  }
}