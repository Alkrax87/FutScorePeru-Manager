import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faFlag, faGlobe, faLayerGroup, faLocationDot, faPenToSquare, faPlus, faRing, faShareNodes, faTrashCan, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TeamsApiService } from '../../../services/teams-api.service';
import { StadiumsApiService } from '../../../services/stadiums-api.service';
import { TeamProfile } from '../../../interfaces/team-profile';
import { Stadium } from '../../../interfaces/stadium';
import { TeamProfileEditComponent } from "../../../components/team-profile-edit/team-profile-edit.component";
import { TeamProfileDeleteComponent } from "../../../components/team-profile-delete/team-profile-delete.component";
import { LastGamesApiService } from '../../../services/last-games-api.service';
import { LastGamesAddModalComponent } from "../../../components/last-games-add-modal/last-games-add-modal.component";
import { LastGamesGenerator } from '../../../interfaces/last-games-generator';
import { LastGamesOptionModalComponent } from "../../../components/last-games-option-modal/last-games-option-modal.component";
import { PerformanceAddModalComponent } from "../../../components/performance-add-modal/performance-add-modal.component";
import { PerformanceApiService } from '../../../services/performance-api.service';
import { PerformanceUpdateModalComponent } from "../../../components/performance-update-modal/performance-update-modal.component";
import { PerformanceData } from '../../../interfaces/performance-data';
import { ResultsAddModalComponent } from "../../../components/results-add-modal/results-add-modal.component";
import { ResultsUpdateModalComponent } from "../../../components/results-update-modal/results-update-modal.component";
import { ResultsApiService } from '../../../services/results-api.service';
import { TeamInformationAddModalComponent } from "../../../components/team-information-add-modal/team-information-add-modal.component";
import { TeamInformationUpdateModalComponent } from "../../../components/team-information-update-modal/team-information-update-modal.component";
import { TeamInformation } from '../../../interfaces/team-information';
import { TeamsInformationApiService } from '../../../services/teams-information-api.service';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, CommonModule, TeamProfileEditComponent, TeamProfileDeleteComponent, LastGamesAddModalComponent, LastGamesOptionModalComponent, PerformanceAddModalComponent, PerformanceUpdateModalComponent, ResultsAddModalComponent, ResultsUpdateModalComponent, TeamInformationAddModalComponent, TeamInformationUpdateModalComponent],
  templateUrl: './team-page.component.html',
  styles: ``,
})

export class TeamPageComponent {
  private destroy$ = new Subject<void>();

  category!: number;
  teamId!: string;

  team!: TeamProfile;
  editedTeam!: TeamProfile;

  private stadiumsSubscription: Subscription | null = null;
  stadiums!: Stadium[];

  phases = [
    ['apertura', 'clausura'],
    ['regional', 'grupos'],
    ['regional', 'final']
  ]

  // Data
  phasesSelected: string[] = []
  lastGamesDataPhase1!: string[] | undefined;
  lastGamesDataPhase2!: string[] | undefined;
  lastGamesOption: string = '';
  lastGamesPhase: string = '';
  resultsPhase: string = '';
  resultsSelected!: Number[];
  resultsDataPhase1!: Number[] | undefined;
  resultsDataPhase2!: Number[] | undefined;
  performanceDataPhase1!: any;
  performanceDataPhase2!: any;
  performancePhase: string = '';
  selectedPerformance!: PerformanceData;
  teamInformation!: TeamInformation;


  // Modals
  showTeamEditModal = false;
  showTeamDeleteModal = false;
  showLastGamesAddModal = false;
  showLastGamesOptionModal = false;
  showResultsAddModal = false;
  showResultsUpdateModal = false;
  showPerformanceAddModal = false;
  showPerformanceUpdateModal = false;
  showTeamInformationAddModal = false;
  showTeamInformationUpdateModal = false;

  // Icons
  Location = faLocationDot;
  Stadium = faRing;
  People = faUsers;
  Edit = faPenToSquare;
  Delete = faTrashCan;
  Add = faPlus;
  Phase = faLayerGroup;
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Loose = faCircleXmark;
  Default = faCircle;
  Web = faGlobe;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;
  Flag = faFlag;
  Share = faShareNodes;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamsService: TeamsApiService,
    private stadiumsService: StadiumsApiService,
    private lastGamesService: LastGamesApiService,
    private resultsService: ResultsApiService,
    private performanceService: PerformanceApiService,
    private teamInformationService: TeamsInformationApiService,
  ) {}

  ngOnInit() {
    this.stadiumsService.getStadiums();
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {

      this.category = Number(params['category']);
      this.teamId = params['teamId'];

      if (this.category && this.teamId != null) {
        this.loadTeamData();
        this.loadStadiumData();
        this.loadLastGamesData();
        this.loadResultsData();
        this.loadPerformanceData();
        this.loadTeamInformationData();
        this.setStages();
      }
    });
  }

  loadTeamData() {
    this.teamsService.getTeamsByTeamId(this.teamId).subscribe({
      next: (data) => {
        this.team = data;
        this.editedTeam = {...data}
      },
      error: (err) => (console.error('Failed to load team: ', err))
    });
  }

  loadStadiumData() {
    this.stadiumsSubscription = this.stadiumsService.dataStadiums$.subscribe({
      next: (data) => (this.stadiums = data),
    });
  }

  loadLastGamesData() {
    this.lastGamesService.getTeamLastGames(this.teamId).subscribe({
      next: (data) => {
        switch (this.category) {
          case 1:
            this.lastGamesDataPhase1 = data.apertura;
            this.lastGamesDataPhase2 = data.clausura;
            break;
          case 2:
            this.lastGamesDataPhase1 = data.regional;
            this.lastGamesDataPhase2 = data.grupos;
            break;
          case 3:
            this.lastGamesDataPhase1 = data.regional;
            this.lastGamesDataPhase2 = data.final;
            break;
          default:
            break;
        }
      },
      error: (err) => console.log(err.error)
    });
  }

  loadResultsData() {
    this.resultsService.getTeamResults(this.teamId).subscribe({
      next: (data) => {
        switch (this.category) {
          case 1:
            this.resultsDataPhase1 = data.apertura;
            this.resultsDataPhase2 = data.clausura;
            break;
          case 2:
            this.resultsDataPhase1 = data.regional;
            this.resultsDataPhase2 = data.grupos;
            break;
          case 3:
            this.resultsDataPhase1 = data.regional;
            this.resultsDataPhase2 = data.final;
            break;
          default:
            break;
        }
      },
      error: (err) => console.log(err.error)
    });
  }

  loadPerformanceData() {
    this.performanceService.getTeamPerformance(this.category, this.teamId).subscribe({
      next: (data) => {
        switch (this.category) {
          case 1:
            this.performanceDataPhase1 = data.apertura;
            this.performanceDataPhase2 = data.clausura;
            break;
          case 2:
            this.performanceDataPhase1 = data.regional;
            this.performanceDataPhase2 = data.grupos;
            break;
          case 3:
            this.performanceDataPhase1 = data.regional;
            this.performanceDataPhase2 = data.final;
            break;
          default:
            break;
        }
      },
      error: (err) => console.log(err.error)
    });
  }

  loadTeamInformationData() {
    this.teamInformationService.getTeamsByTeamId(this.teamId).subscribe({
      next: (data) => (this.teamInformation = data),
      error: (err) => console.log(err.error),
    });
  }

  setStages() {
    switch (this.category) {
      case 1:
        this.phasesSelected = this.phases[0];
        break;
      case 2:
        this.phasesSelected = this.phases[1];
        break;
      case 3:
        this.phasesSelected = this.phases[2];
        break;
      default:
        break;
    }
  }

  saveChanges(updatedTeam: TeamProfile) {
    this.teamsService.updateTeam(this.teamId, updatedTeam).subscribe({
      next: () => {
        this.team = this.editedTeam;
        this.showTeamEditModal = false;
      },
      error: (err) => (console.error("An error ocurred updating team: ", err))
    });
  }

  confirmDelete() {
    this.teamsService.deleteTeam(this.teamId).subscribe({
      next: () => {
        this.showTeamDeleteModal = false;
        this.teamsService.getTeams();
        this.router.navigate(['teams']);
      },
      error: (err) => (console.error("An error ocurred deleting team: ", err))
    });
  }

  addLastGames(lastGamesGenerator: LastGamesGenerator) {
    this.lastGamesService.addLastGames(lastGamesGenerator).subscribe({
      next: () => {
        this.loadLastGamesData();
        this.showLastGamesAddModal = false;
      }
    });
  }

  setLastGamesOptions(option: string, phase: string) {
    this.showLastGamesOptionModal = true;
    this.lastGamesPhase = phase;
    this.lastGamesOption = option;
  }

  changeLastGameResult() {
    this.lastGamesService.updateTeamLastGames(this.teamId, this.lastGamesPhase, this.lastGamesOption).subscribe({
      next: () => {
        this.loadLastGamesData();
        this.showLastGamesOptionModal = false;
      }
    });
  }

  addResults(resultsItem: LastGamesGenerator) {
    this.resultsService.addResults(resultsItem).subscribe({
      next: () => {
        this.loadResultsData();
        this.showResultsAddModal = false;
      }
    });
  }

  setResultsOptions(phase: string, results: Number[]) {
    this.resultsPhase = phase;
    this.resultsSelected = results;
    this.showResultsUpdateModal = true;
  }

  updateResults(resultUpdateData: { index: number; score: number }) {
    this.resultsService.updateTeamResults(this.teamId, this.resultsPhase, resultUpdateData.index, resultUpdateData.score).subscribe({
      next: () => {
        this.loadResultsData();
        this.showResultsUpdateModal = false;
      }
    });
  }

  addPerformance() {
    const team = {
      teamId: this.teamId,
      category: this.category,
    }

    this.performanceService.addPerformance(team).subscribe({
      next: () => {
        this.loadPerformanceData();
        this.showPerformanceAddModal = false;
      }
    });
  }

  setPerformanceUpdateData(phase: string, performance: PerformanceData) {
    this.performancePhase = phase;
    this.selectedPerformance = performance;
    this.showPerformanceUpdateModal = true;
  }

  updatePerformance(performance: PerformanceData) {
    this.performanceService.updateTeamPerformance(this.teamId, this.performancePhase, performance).subscribe({
      next: () => {
        this.loadPerformanceData();
        this.showPerformanceUpdateModal = false;
      }
    });
  }

  addTeamInformation(teamInformationData: TeamInformation) {
    this.teamInformationService.addTeam(teamInformationData).subscribe({
      next: () => {
        this.loadTeamInformationData();
        this.showTeamInformationAddModal = false;
      }
    });
  }

  updateTeamInformation(updatedTeamInformation: TeamInformation) {
    this.teamInformationService.updateTeam(this.teamId, updatedTeamInformation).subscribe({
      next: () => {
        this.loadTeamInformationData();
        this.showTeamInformationUpdateModal = false;
      }
    });
  }

  ngOnDestroy() {
    this.stadiumsSubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}