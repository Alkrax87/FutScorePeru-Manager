import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { Stadium } from '../interfaces/stadium';

@Injectable({
  providedIn: 'root',
})
export class StadiumsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private stadiumsSubject = new BehaviorSubject<Stadium[]>([]);
  dataStadiums$ = this.stadiumsSubject.asObservable();

  getStadiums() {
    this.http.get<Stadium[]>(this.backendUrl + 'stadiums').subscribe({
      next: (data) => this.stadiumsSubject.next(data),
      error: (err) => console.error('Unable to load stadiums: ', err),
    });
  }

  addStadium(stadium: Stadium) {
    this.http.post(this.backendUrl + 'stadiums', stadium).subscribe({
      next: () => this.getStadiums(),
      error: (err) => console.error('Unable to create stadium: ', err),
    });
  }

  updateStadium(stadiumId: number, stadium: Stadium) {
    this.http.put(this.backendUrl + 'stadiums/' + stadiumId, stadium).subscribe({
      next: () => this.getStadiums(),
      error: (err) => console.error('Unable to update stadium: ', err),
    });
  }

  deleteStadium(stadiumId: number) {
    this.http.delete(this.backendUrl + 'stadiums/' + stadiumId).subscribe({
      next: () => this.getStadiums(),
      error: (err) => console.error('Unable to delete stadium: ', err),
    });
  }
}