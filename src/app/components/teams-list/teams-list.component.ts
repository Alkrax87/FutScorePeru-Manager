import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { TeamProfile } from '../../interfaces/team-profile';

@Component({
  selector: 'app-teams-list',
  imports: [FontAwesomeModule, RouterLink],
  template: `
    <div class="bg-neutral-900 text-white g p-5">
      <div class="w-4/5 mx-auto grid grid-cols-3 gap-5">
        @for (team of teams; track $index) {
          <div [routerLink]="['../team', team.category, team.teamId]" class="bg-neutral-800 group hover: grid-cols-1 p-5 cursor-pointer">
            <div class="flex">
              <div class="w-full">
                <p class="text-neutral-400 text-xs">TeamID: {{ team.teamId }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <img [src]="team.image" [alt]="team.alt" class="w-12 h-12">
                  <p class="font-semibold">{{ team.name }}</p>
                </div>
              </div>
              <div class="flex items-center text-neutral-500 group-hover:text-white duration-300">
                <fa-icon class="py-2 px-3 rounded-full group-hover:bg-neutral-700 duration-300" [icon]="Redirect"></fa-icon>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class TeamsListComponent {
  @Input() teams!: TeamProfile[];
  Redirect = faArrowUpRightFromSquare;
}