import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Division } from '../interfaces/division';

@Injectable({
  providedIn: 'root',
})
export class DivisionsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private divisionsSubject = new BehaviorSubject<Division[]>([]);
  dataDivisions$ = this.divisionsSubject.asObservable();

  getDivisions() {
    this.http.get<Division[]>(this.backendUrl + 'divisions').subscribe({
      next: (data) => this.divisionsSubject.next(data),
      error: (err) => console.error('Unable to load divisions: ', err),
    });
  }

  addDivision(division: Division) {
    this.http.post<Division>(this.backendUrl + 'divisions', division).subscribe({
      next: () => this.getDivisions(),
      error: (err) => console.error('Unable to create division: ', err),
    });
  }

  updateDivision(divisionId: number, division: Division) {
    this.http.put<Division>(this.backendUrl + 'divisions/' + divisionId, division).subscribe({
      next: () => this.getDivisions(),
      error: (err) => console.error('Unable to update division: ', err),
    });
  }

  deleteDivision(divisionId: number) {
    this.http.delete(this.backendUrl + 'divisions/' + divisionId).subscribe({
      next: () => this.getDivisions(),
      error: (err) => console.error('Unable to delete division: ', err),
    });
  }
}