import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Stadium } from '../interfaces/stadium';

@Injectable({
  providedIn: 'root',
})
export class StadiumsApiService {
  private BackendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  private stadiumsSubject = new BehaviorSubject<Stadium[]>([]);
  dataStadiums$ = this.stadiumsSubject.asObservable();

  getStadiums() {
    this.http.get<Stadium[]>(this.BackendUrl + 'stadiums').subscribe({
      next: (data) => (this.stadiumsSubject.next(data)),
      error: (err) => (console.error('Failed to get Stadiums data ', err)),
    });
  }

  addStadium(stadium: Stadium) {
    this.http.post<Stadium>(this.BackendUrl + 'stadiums', stadium).subscribe({
      next: () => (this.getStadiums()),
      error: (err) => (console.error('Failed to add stadium: ', err.error.error)),
    });
  }

  updateStadium(stadium: Stadium) {
    this.http.put<Stadium>(this.BackendUrl + 'stadiums/' + stadium.stadiumId, stadium).subscribe({
      next: () => (this.getStadiums()),
      error: (err) => (console.error('Failed to update stadium: ', err.error.errors)),
    });
  }

  deleteStadium(stadiumId: number) {
    this.http.delete(this.BackendUrl + 'stadiums/' + stadiumId).subscribe({
      next: () => (this.getStadiums()),
      error: (err) => (console.error('Failed to delete stadium: ', err.error.error)),
    });
  }
}