import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { Fixture, FixtureGenerator } from '../interfaces/fixture';

@Injectable({
  providedIn: 'root',
})
export class FixturesApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private fixturesSubject = new BehaviorSubject<Fixture[]>([]);
  dataFixtures$ = this.fixturesSubject.asObservable();

  getFixtures() {
    this.http.get<Fixture[]>(this.backendUrl + 'fixture').subscribe({
      next: (data) => this.fixturesSubject.next(data),
      error: (err) => console.error('Unable to load fixtures: ', err),
    });
  }

  addFixture(fixtureGenerator: FixtureGenerator) {
    this.http.post(this.backendUrl + 'fixture', fixtureGenerator).subscribe({
      next: () => this.getFixtures(),
      error: (err) => console.error('Unable to create fixture: ', err),
    });
  }

  updateFixture(category: number, fixture: Fixture) {
    this.http.put(this.backendUrl + 'fixture/' + category, fixture).subscribe({
      next: () => this.getFixtures(),
      error: (err) => console.error('Unable to update fixture: ', err),
    });
  }

  deleteFixture(category: number) {
    this.http.delete(this.backendUrl + 'fixture/' + category).subscribe({
      next: () => this.getFixtures(),
      error: (err) => console.error('Unable to delete fixture: ', err),
    });
  }
}