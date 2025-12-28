import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImages, faInfoCircle, faLocationDot, faPalette, faPenToSquare, faRing, faTrashCan, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { combineLatest } from 'rxjs';
import { TeamsApiService } from '../../../services/teams-api.service';
import { StadiumsApiService } from '../../../services/stadiums-api.service';
import { Team } from '../../../interfaces/team';
import { Stadium } from '../../../interfaces/stadium';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteConfirmationModalComponent } from "../../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { TeamModalComponent } from "../../../components/team-modal/team-modal.component";

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, CommonModule, DeleteConfirmationModalComponent, TeamModalComponent],
  templateUrl: './team-page.component.html',
  styles: ``,
})

export class TeamPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsApiService);
  private stadiumsService = inject(StadiumsApiService);
  stadiums!: Stadium[];
  category!: number;
  teamId!: string;
  team: Team | null = null;

  isTeamModalOpen = signal(false);
  isConfirmOpen = signal(false);
  isResourcesModalOpen = signal(false);
  selectedTeam = signal<Team | null>(null);
  stadium = signal<Stadium | null>(null);

  phases = [
    ['apertura', 'clausura'],
    ['regional', 'grupos'],
    ['regional', 'final']
  ]

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
}