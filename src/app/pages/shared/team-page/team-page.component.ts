import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faFlag, faGlobe, faImages, faInfoCircle, faLocationDot, faPalette, faPenToSquare, faPlus, faRing, faShareNodes, faTrashCan, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { combineLatest } from 'rxjs';
import { TeamsApiService } from '../../../services/teams-api.service';
import { StadiumsApiService } from '../../../services/stadiums-api.service';
import { Team } from '../../../interfaces/team';
import { Stadium } from '../../../interfaces/stadium';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteConfirmationModalComponent } from "../../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { TeamModalComponent } from "../../../components/team-modal/team-modal.component";
import { TeamForm } from '../../../interfaces/teamForm';
import { TeamFormAddModalComponent } from "../../../components/team-form-add-modal/team-form-add-modal.component";
import { TeamsFormApiService } from '../../../services/teams-form-api.service';
import { TeamFormOptionModalComponent } from "../../../components/team-form-option-modal/team-form-option-modal.component";
import { TeamPerformance } from '../../../interfaces/teamPerformance';
import { TeamPerformanceAddModalComponent } from "../../../components/team-performance-add-modal/team-performance-add-modal.component";
import { TeamsPerformanceApiService } from '../../../services/teams-performance-api.service';
import { TeamPerformanceUpdateModalComponent } from "../../../components/team-performance-update-modal/team-performance-update-modal.component";
import { TeamInformation } from '../../../interfaces/team-information';
import { InformationApiService } from '../../../services/information-api.service';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { InformationModalComponent } from "../../../components/information-modal/information-modal.component";
import { ResultsApiService } from '../../../services/results-api.service';
import { TeamResults } from '../../../interfaces/team-results';
import { ResultsAddModalComponent } from "../../../components/results-add-modal/results-add-modal.component";
import { ResultsUpdateModalComponent } from "../../../components/results-update-modal/results-update-modal.component";

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, DeleteConfirmationModalComponent, TeamModalComponent, TeamFormAddModalComponent, TeamFormOptionModalComponent, TeamPerformanceAddModalComponent, TeamPerformanceUpdateModalComponent, InformationModalComponent, ResultsAddModalComponent, ResultsUpdateModalComponent],
  templateUrl: './team-page.component.html',
  styles: ``,
})

export class TeamPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsApiService);
  private stadiumsService = inject(StadiumsApiService);
  private teamsFormService = inject(TeamsFormApiService);
  private resultsService = inject(ResultsApiService);
  private teamsPerformanceService = inject(TeamsPerformanceApiService);
  private informationService = inject(InformationApiService);

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
  lastGames = signal<TeamForm | undefined>(undefined);
  isLastGamesAddOpen = signal(false);
  isLastGamesOptionModalOpen = signal(false);
  isLastGamesConfirmOpen = signal(false);
  lastGamesOption = signal<{ teamId: string, phase: number, option: string } | null>(null);

  // Results
  results = signal<TeamResults | undefined>(undefined);
  isResultsAddOpen = signal(false);
  isResultsSetModalOpen = signal(false);
  isResultsConfirmOpen = signal(false);
  resultsOptions = signal<{ teamId: string, phase: number, size: number } | null>(null);

  // Performance
  performance = signal<TeamPerformance | undefined>(undefined);
  isPerformanceAddOpen = signal(false);
  isPerformanceUpdateModal = signal(false);
  isPerformanceConfirmOpen = signal(false);
  performanceOptions = signal<{ phase: number, performance: TeamPerformance } | null>(null);

  // Information
  information = signal<TeamInformation | undefined>(undefined);
  isInformationModalOpen = signal(false);
  isInformationConfirmOpen = signal(false);

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
  Flag = faFlag;
  Web = faGlobe;
  Share = faShareNodes;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;

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
        this.loadLastGamesData();
        this.loadResultsData();
        this.loadPerformaceData();
        this.loadInformationData();
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
    this.teamsFormService.getTeamForm(this.teamId).subscribe({
      next: (data) => this.lastGames.set(data),
      error: (err) => this.lastGames.set(undefined),
    });
  }

  setLastGamesOptions(phase: number, option: string) {
    this.lastGamesOption.set({ teamId: this.teamId, phase, option });
    this.isLastGamesOptionModalOpen.set(true);
  }

  confirmDeleteLastGames(teamId: string) {
    this.teamsFormService.deleteTeamForm(teamId).subscribe({
      next: () => {
        this.loadLastGamesData();
        this.isLastGamesConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // ===================Results===================
  // =============================================
  loadResultsData() {
    this.resultsService.getTeamResults(this.teamId).subscribe({
      next: (data) => this.results.set(data),
      error: (err) => this.results.set(undefined),
    });
  }

  setResultsOptions(phase: number, size: number) {
    this.resultsOptions.set({ teamId: this.teamId, phase, size });
    this.isResultsSetModalOpen.set(true);
  }

  confirmDeleteResults(teamId: string) {
    this.resultsService.deleteTeamResults(teamId).subscribe({
      next: () => {
        this.loadResultsData();
        this.isResultsConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // =================Performance=================
  // =============================================
  loadPerformaceData() {
    this.teamsPerformanceService.getTeamPerformance(this.teamId).subscribe({
      next: (data) => this.performance.set(data),
      error: (err) => this.performance.set(undefined),
    });
  }

  setPerformanceOptions(phase: number) {
    this.performanceOptions.set({ phase, performance: this.performance()! });
    this.isPerformanceUpdateModal.set(true);
  }

  confirmDeletePerformance(teamId: string) {
    this.teamsPerformanceService.deleteTeamPerformance(teamId).subscribe({
      next: () => {
        this.loadPerformaceData();
        this.isPerformanceConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // =================Information=================
  // =============================================
  loadInformationData() {
    this.informationService.getTeamsInformation(this.teamId).subscribe({
      next: (data) => this.information.set(data),
      error: (err) => this.information.set(undefined),
    });
  }

  confirmDeleteInformation(teamId: string) {
    this.informationService.deleteInformation(teamId).subscribe({
      next: () => {
        this.loadInformationData();
        this.isInformationConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }
}