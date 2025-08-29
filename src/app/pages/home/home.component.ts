import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule],
  template: `
    <div class="flex items-center justify-center h-svh pt-16">
      <div class="flex flex-col items-center gap-4 md:gap-6 px-8 md:px-0 w-full md:w-3/5 lg:w-1/2 xl:w-1/3 text-center">
        <div>
          <h1 class="text-5xl md:text-6xl font-bold">FutScorePerú</h1>
          <h2 class="text-5xl md:text-6xl font-bold text-crimson">Data API</h2>
        </div>
        <p class="text-neutral-600">Access comprehensive data about Peruvian football teams, managers, stadiums, and more.</p>
        <button class="bg-crimson text-white w-fit px-8 py-3 rounded-full text-sm hover:bg-crimson/90">
          View Documentation &nbsp;<fa-icon [icon]="Book"></fa-icon>
        </button>
      </div>
    </div>
    <div class="bg-night flex flex-col items-center text-center gap-4 md:gap-6 py-20 px-5">
      <div>
        <h4 class="text-4xl md:text-5xl font-bold text-white">Powered By</h4>
        <p class="text-neutral-400">Built with modern, reliable technologies to ensure optimal performance and scalability</p>
      </div>
      <div class="flex flex-col md:flex-row gap-0 md:gap-6">
        <img class="h-16" src="assets/express.webp" alt="Express-Logo">
        <img class="h-16" src="assets/mongodb.webp" alt="MongoDB-Logo">
        <img class="h-16" src="assets/angular.webp" alt="Angular-Logo">
      </div>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  Book = faBook;
}
