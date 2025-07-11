import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink],
  template: `
    <div class="bg-red-900 text-white w-full flex justify-center gap-10 p-5">
      @for (route of routes; track $index) {
      <a [routerLink]="route.route">{{ route.name }}</a>
      }
    </div>
  `,
  styles: ``,
})
export class MainNavComponent {
  routes: { route: string; name: string }[] = [
    {
      route: 'liga-1',
      name: 'Liga 1',
    },
    {
      route: 'liga-2',
      name: 'Liga 2',
    },
    {
      route: 'liga-3',
      name: 'Liga 3',
    },
    {
      route: 'copa-peru',
      name: 'Copa Perú',
    },
  ];
}
