import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { Stadium } from '../interfaces/stadium';

@Injectable({
  providedIn: 'root',
})
export class StadiumsApiService {
  private BackendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private stadiumsSubject = new BehaviorSubject<Stadium[]>([]);
  dataStadiums$ = this.stadiumsSubject.asObservable();

  getStadiums() {
    this.http.get<Stadium[]>(this.BackendUrl + 'stadiums').subscribe({
      next: (data) => this.stadiumsSubject.next(data),
    });
  }

  createStadium(stadium: Stadium) {
    this.http.post(this.BackendUrl + 'stadiums', stadium).subscribe({
      next: () => this.getStadiums(),
    });
  }

  updateStadium(stadiumId: number, stadium: Stadium) {
    this.http.put(this.BackendUrl + 'stadiums/' + stadiumId, stadium).subscribe({
      next: () => this.getStadiums(),
    });
  }

  deleteStadium(stadiumId: number) {
    this.http.delete(this.BackendUrl + 'stadiums/' + stadiumId).subscribe({
      next: () => this.getStadiums(),
    });
  }
}