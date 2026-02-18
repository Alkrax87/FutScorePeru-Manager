import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faFlag, faGlobe, faImages, faLocationDot, faPenToSquare, faPlus, faRing, faShareNodes, faShieldHalved, faTrashCan, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import { TeamDetails } from '../../../interfaces/teamDetails';
import { TeamsDetailsApiService } from '../../../services/teams-details-api.service';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TeamDetailsModalComponent } from "../../../components/team-details-modal/team-details-modal.component";
import { TeamsMatchResultsApiService } from '../../../services/teams-match-results-api.service';
import { TeamMatchResults } from '../../../interfaces/teamMatchResults';
import { TeamMatchResultsAddModalComponent } from "../../../components/team-match-results-add-modal/team-match-results-add-modal.component";
import { TeamMatchResultsUpdateModalComponent } from "../../../components/team-match-results-update-modal/team-match-results-update-modal.component";

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, DeleteConfirmationModalComponent, TeamModalComponent, TeamFormAddModalComponent, TeamFormOptionModalComponent, TeamPerformanceAddModalComponent, TeamPerformanceUpdateModalComponent, TeamDetailsModalComponent, TeamMatchResultsAddModalComponent, TeamMatchResultsUpdateModalComponent],
  templateUrl: './team-page.component.html',
  styles: ``,
})

export class TeamPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsApiService);
  private stadiumsService = inject(StadiumsApiService);
  private teamsFormService = inject(TeamsFormApiService);
  private teamsMatchResultsService = inject(TeamsMatchResultsApiService);
  private teamsPerformanceService = inject(TeamsPerformanceApiService);
  private teamsDetailsService = inject(TeamsDetailsApiService);

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

  // TeamForm
  teamForm = signal<TeamForm | undefined>(undefined);
  isTeamFormAddOpen = signal(false);
  isTeamFormOptionModalOpen = signal(false);
  isTeamFormConfirmOpen = signal(false);
  teamFormOption = signal<{ teamId: string, phase: number, option: string } | null>(null);

  // TeamMatchResults
  teamMatchResults = signal<TeamMatchResults | undefined>(undefined);
  isTeamMatchResultsAddOpen = signal(false);
  isTeamMatchResultsSetModalOpen = signal(false);
  isTeamMatchResultsConfirmOpen = signal(false);
  teamMatchResultsOptions = signal<{ teamId: string, phase: number, size: number } | null>(null);

  // TeamPerformance
  teamPerformance = signal<TeamPerformance | undefined>(undefined);
  isTeamPerformanceAddOpen = signal(false);
  isTeamPerformanceUpdateModal = signal(false);
  isTeamPerformanceConfirmOpen = signal(false);
  teamPerformanceOptions = signal<{ phase: number, performance: TeamPerformance } | null>(null);

  // TeamDetails
  teamDetails = signal<TeamDetails | undefined>(undefined);
  isTeamDetailsModalOpen = signal(false);
  isTeamDetailsConfirmOpen = signal(false);

  // Icons
  Team = faShieldHalved;
  Location = faLocationDot;
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
        this.loadTeamFormData();
        this.loadTeamMatchResultsData();
        this.loadTeamPerformanceData();
        this.loadTeamDetailsData();
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
  // ====================Form=====================
  // =============================================
  loadTeamFormData() {
    this.teamsFormService.getTeamForm(this.teamId).subscribe({
      next: (data) => this.teamForm.set(data),
      error: (err) => this.teamForm.set(undefined),
    });
  }

  setTeamFormOptions(phase: number, option: string) {
    this.teamFormOption.set({ teamId: this.teamId, phase, option });
    this.isTeamFormOptionModalOpen.set(true);
  }

  confirmDeleteTeamForm(teamId: string) {
    this.teamsFormService.deleteTeamForm(teamId).subscribe({
      next: () => {
        this.loadTeamFormData();
        this.isTeamFormConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // ================Match Results================
  // =============================================
  loadTeamMatchResultsData() {
    this.teamsMatchResultsService.getTeamMatchResults(this.teamId).subscribe({
      next: (data) => this.teamMatchResults.set(data),
      error: (err) => this.teamMatchResults.set(undefined),
    });
  }

  setTeamMatchResultsOptions(phase: number, size: number) {
    this.teamMatchResultsOptions.set({ teamId: this.teamId, phase, size });
    this.isTeamMatchResultsSetModalOpen.set(true);
  }

  confirmDeleteTeamMatchResults(teamId: string) {
    this.teamsMatchResultsService.deleteTeamMatchResults(teamId).subscribe({
      next: () => {
        this.loadTeamMatchResultsData();
        this.isTeamMatchResultsConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // =================Performance=================
  // =============================================
  loadTeamPerformanceData() {
    this.teamsPerformanceService.getTeamPerformance(this.teamId).subscribe({
      next: (data) => this.teamPerformance.set(data),
      error: (err) => this.teamPerformance.set(undefined),
    });
  }

  setTeamPerformanceOptions(phase: number) {
    this.teamPerformanceOptions.set({ phase, performance: this.teamPerformance()! });
    this.isTeamPerformanceUpdateModal.set(true);
  }

  confirmDeleteTeamPerformance(teamId: string) {
    this.teamsPerformanceService.deleteTeamPerformance(teamId).subscribe({
      next: () => {
        this.loadTeamPerformanceData();
        this.isTeamPerformanceConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }

  // =============================================
  // ===================Details===================
  // =============================================
  loadTeamDetailsData() {
    this.teamsDetailsService.getTeamsDetails(this.teamId).subscribe({
      next: (data) => this.teamDetails.set(data),
      error: (err) => this.teamDetails.set(undefined),
    });
  }

  confirmDeleteTeamDetails(teamId: string) {
    this.teamsDetailsService.deleteTeamDetails(teamId).subscribe({
      next: () => {
        this.loadTeamDetailsData();
        this.isTeamDetailsConfirmOpen.set(false);
      },
      error: (err) => {}
    });
  }
}