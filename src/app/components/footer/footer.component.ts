import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div class="py-2 text-white text-center bg-crimson font-semibold">
      <a href="https://www.mavp_projects.com" >&copy; {{ Now().getFullYear() }} MAVP Projects</a>
    </div>
  `,
  styles: ``,
})
export class FooterComponent {
  Now() {
    return new Date();
  }
}