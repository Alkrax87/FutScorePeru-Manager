import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-white h-14 px-5 flex items-center justify-end gap-4 shadow-md">
      <div class="text-crimson hover:bg-crimson w-8 h-8 rounded-full duration-300 cursor-pointer hover:text-white flex items-center justify-center">
        <fa-icon [icon]="Gear"></fa-icon>
      </div>
    </div>
  `,
  styles: ``,
})
export class TopbarComponent {
  Gear = faGear;
}