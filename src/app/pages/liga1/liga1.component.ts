import { Component } from '@angular/core';
import { TeamsListComponent } from '../../components/teams-list/teams-list.component';
import { TeamsApiServiceService } from '../../services/teams-api-service.service';

@Component({
  selector: 'app-liga1',
  imports: [TeamsListComponent],
  template: ` <app-teams-list [teams]="teams"></app-teams-list> `,
  styles: ``,
})
export class Liga1Component {
  constructor(private teamsService: TeamsApiServiceService) {}

  teams: any;

  ngOnInit() {
    this.teamsService.getTeams(1).subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (e) => {
        console.log('Error al obtener equipos: ', e);
      },
    });
  }
}
