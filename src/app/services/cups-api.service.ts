import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Cup, CupGenerator } from '../interfaces/cup';

@Injectable({
  providedIn: 'root',
})
export class CupsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cupSubject = new BehaviorSubject<Cup[]>([]);
  dataCups$ = this.cupSubject.asObservable();

  getCups() {
    this.http.get<Cup[]>(this.backendUrl + 'cups').subscribe({
      next: (data) => this.cupSubject.next(data),
      error: (err) => console.error('Unable to load cups: ', err),
    });
  }

  addCup(cup: CupGenerator) {
    this.http.post(this.backendUrl + 'cups', cup).subscribe({
      next: () => this.getCups(),
      error: (err) => console.error('Unable to create cup: ', err),
    });
  }

  updateCup(cupId: string, cup: Cup) {
    this.http.put(this.backendUrl + 'cups/' + cupId, cup).subscribe({
      next: () => this.getCups(),
      error: (err) => console.error('Unable to update cup: ', err),
    });
  }

  deleteCup(cupId: string) {
    this.http.delete(this.backendUrl + 'cups/' + cupId).subscribe({
      next: () => this.getCups(),
      error: (err) => console.error('Unable to delete cup: ', err),
    });
  }
}