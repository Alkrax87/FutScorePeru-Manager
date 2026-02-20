import { Component, inject, signal } from '@angular/core';
import { League } from '../../../interfaces/league';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaguesApiService } from '../../../services/leagues-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeagueModalComponent } from "../../../components/league-modal/league-modal.component";
import { DeleteConfirmationModalComponent } from "../../../components/delete-confirmation-modal/delete-confirmation-modal.component";
import { TeamsCPApiService } from '../../../services/teams-cp-api.service';
import { TeamCP } from '../../../interfaces/team-cp';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-league-page',
  imports: [FontAwesomeModule, LeagueModalComponent, DeleteConfirmationModalComponent],
  templateUrl: './league-page.component.html',
  styles: ``,
})
export class LeaguePageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private leaguesService = inject(LeaguesApiService);
  private teamsCPService = inject(TeamsCPApiService);

  teamsCP: TeamCP[] = [];
  leagueId!: string;
  league: League | null = null;

  // League
  isLeagueModalOpen = signal(false);
  isConfirmOpen = signal(false);
  selectedLeague = signal<League | null>(null);

  // Icons
  League = faFlag;
  Edit = faPenToSquare;
  Delete = faTrashCan;

  constructor() {
    this.teamsCPService.getTeamsCP();
    combineLatest([this.teamsCPService.dataTeamsCP$, this.route.params]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsCP, params]) => {
        this.teamsCP = teamsCP;
        this.leagueId = params['leagueId'];
      }
    });
  }

  ngOnInit() {
    this.leaguesService.getLeagueByLeagueId(this.leagueId).subscribe({
      next: (data) => {
        this.league = data;
        this.selectedLeague.set(data);
      },
      error: (err) => {
        console.error('Failed to load league data:', err.error.error);
        this.router.navigate(['leagues']);
      }
    });
  }

  getTeam(teamId: string) {
    return this.teamsCP.find((team) => team.teamId === teamId);
  }

  updateLeagueData(league: League) {
    this.league = league;
    this.selectedLeague.set(league);
    this.isLeagueModalOpen.set(false);
  }

  confirmDelete() {
    this.leaguesService.deleteLeague(this.selectedLeague()!.leagueId!);
    this.isConfirmOpen.set(false);
    this.router.navigate(['leagues']);
  }
}