import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faImages, faInfoCircle, faLocationDot, faPalette, faPenToSquare, faPlus, faRing, faTrashCan, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { combineLatest } from 'rxjs';
import { TeamsApiService } from '../../../services/teams-api.service';
import { StadiumsApiService } from '../../../services/stadiums-api.service';
import { Team } from '../../../interfaces/team';
import { Stadium } from '../../../interfaces/stadium';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteConfirmationModalComponent } from "../../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { TeamModalComponent } from "../../../components/team-modal/team-modal.component";
import { LastGamesAddModalComponent } from "../../../components/last-games-add-modal/last-games-add-modal.component";
import { LastGamesApiService } from '../../../services/last-games-api.service';
import { TeamLastGames } from '../../../interfaces/team-last-games';
import { LastGamesOptionModalComponent } from "../../../components/last-games-option-modal/last-games-option-modal.component";

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, DeleteConfirmationModalComponent, TeamModalComponent, LastGamesAddModalComponent, LastGamesOptionModalComponent],
  templateUrl: './team-page.component.html',
  styles: ``,
})

export class TeamPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsApiService);
  private stadiumsService = inject(StadiumsApiService);
  private lastGamesService = inject(LastGamesApiService);

  stadiums!: Stadium[];
  category!: number;
  teamId!: string;
  team: Team | null = null;

  // Team
  isTeamModalOpen = signal(false);
  isConfirmOpen = signal(false);
  isResourcesModalOpen = signal(false);
  selectedTeam = signal<Team | null>(null);
  stadium = signal<Stadium | null>(null);

  // LastGames
  lastGames = signal<TeamLastGames | undefined>(undefined);
  isLastGamesAddOpen = signal(false);
  isLastGamesOptionModalOpen = signal(false);
  isLastGamesConfirmOpen = signal(false);
  lastGamesOption = signal<{ teamId: string, phase: number, option: string } | null>(null);

  // Icons
  Location = faLocationDot;
  Details = faInfoCircle;
  Color = faPalette;
  Resources = faImages;
  Stadium = faRing;
  People = faUsers;
  Edit = faPenToSquare;
  Delete = faTrashCan;
  X = faXmark;
  Add = faPlus;
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Loose = faCircleXmark;
  Default = faCircle;

  constructor() {
    this.stadiumsService.getStadiums();
    combineLatest([this.stadiumsService.dataStadiums$, this.route.params]).pipe(takeUntilDestroyed()).subscribe({
      next: ([stadiums, params]) => {
        this.stadiums = stadiums;
        this.category = Number(params['category']);
        this.teamId = params['teamId'];
      }
    });
  }

  ngOnInit() {
    this.teamsService.getTeamsByTeamId(this.teamId).subscribe({
      next: (data) => {
        this.team = data;
        this.selectedTeam.set(data);
        this.findStadium(data.stadium);
        this.loadLastGamesData()
      },
      error: (err) => {
        console.error('Failed to load team data:', err.error.error);
        this.router.navigate(['teams']);
      }
    });
  }

  findStadium(stadiumId: number) {
    this.stadium.set(this.stadiums.find((stadium) => stadium.stadiumId === stadiumId) || null);
  }

  updateTeamData(team: Team) {
    this.team = team;
    this.selectedTeam.set(team);
    this.findStadium(Number(team.stadium));
    this.isTeamModalOpen.set(false);
  }

  confirmDelete() {
    this.teamsService.deleteTeam(this.selectedTeam()!.teamId!);
    this.isConfirmOpen.set(false);
    this.router.navigate(['teams']);
  }

  // =============================================
  // ==================LastGames==================
  // =============================================
  loadLastGamesData() {
    this.lastGamesService.getTeamLastGames(this.teamId).subscribe({
      next: (data) => this.lastGames.set(data),
      error: (err) => this.lastGames.set(undefined),
    });
  }

  setLastGamesOptions(phase: number, option: string) {
    this.lastGamesOption.set({ teamId: this.teamId, phase, option });
    this.isLastGamesOptionModalOpen.set(true);
  }

  confirmDeleteLastGames(teamId: string) {
    this.lastGamesService.deleteTeamLastGames(teamId).subscribe({
      next: () => {
        this.loadLastGamesData();
        this.isLastGamesConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }
}