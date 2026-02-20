import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { League } from '../interfaces/league';

@Injectable({
  providedIn: 'root',
})
export class LeaguesApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private leaguesSubject = new BehaviorSubject<League[]>([]);
  dataLeagues$ = this.leaguesSubject.asObservable();

  getLeagues() {
    this.http.get<League[]>(this.backendUrl + 'leagues').subscribe({
      next: (data) => this.leaguesSubject.next(data),
      error: (err) => console.error('Unable to load leagues: ', err),
    });
  }

  getLeagueByLeagueId(leagueId: string) {
    return this.http.get<League>(this.backendUrl + 'leagues/leagueId/' + leagueId);
  }

  addLeague(league: League) {
    this.http.post(this.backendUrl + 'leagues', league).subscribe({
      next: () => this.getLeagues(),
      error: (err) => console.error('Unable to create league: ', err),
    });
  }

  updateLeague(leagueId: string, league: League) {
    this.http.put(this.backendUrl + 'leagues/' + leagueId, league).subscribe({
      next: () => this.getLeagues(),
      error: (err) => console.error('Unable to update league: ', err),
    });
  }

  deleteLeague(leagueId: string) {
    this.http.delete(this.backendUrl + 'leagues/' + leagueId).subscribe({
      next: () => this.getLeagues(),
      error: (err) => console.error('Unable to delete league: ', err),
    });
  }
}