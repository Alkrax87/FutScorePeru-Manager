import { Component, Input } from '@angular/core';
import { TeamProfile } from '../../interfaces/team-profile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teams-nav',
  imports: [RouterLink],
  template: `
    <div class="bg-crimson h-2"></div>
    <div class="bg-neutral-100 w-full flex justify-evenly p-3">
      @for (team of teams; track $index) {
        <a [routerLink]="['./team', team.category, team.teamId]">
          <img class="w-7" [src]="team.imageThumbnail" [alt]="team.alt"/>
        </a>
      }
    </div>
    <div class="bg-crimson h-2"></div>
  `,
  styles: ``,
})
export class TeamsNavComponent {
  @Input() teams!: TeamProfile[];
}