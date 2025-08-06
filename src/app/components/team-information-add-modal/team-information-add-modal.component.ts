import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamInformation } from '../../interfaces/team-information';
import { FormsModule } from '@angular/forms';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-information-add-modal',
  imports: [FormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-xl">
        <h3 class="text-lg font-semibold">Add Team Information</h3>
        <p class="text-neutral-500 text-sm">Manage additional team information.</p>
        <div class="flex flex-col gap-3 pt-4 pb-8">
          <div class="flex gap-5">
            <!-- Foundation -->
            <div class="w-1/4">
              <label for="foundation" class="block text-sm font-semibold mb-1">Foundation Year</label>
              <input id="foundation" [(ngModel)]="teamInformationData.foundation" type="number" min="1900" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="foundation"
              >
            </div>
            <!-- Background -->
            <div class="w-3/4">
              <label for="background" class="block text-sm font-semibold mb-1">Background</label>
              <input id="background" [(ngModel)]="teamInformationData.background" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Background URL"
              >
            </div>
          </div>
          <!-- Social -->
          <p class="font-semibold text-base">Social Media</p>
          <div class="flex flex-col gap-2">
            <!-- Website -->
            <div class="flex items-center">
              <label for="website" class="border-gray-300 border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Web"></fa-icon>
              </label>
              <input id="website" [(ngModel)]="teamInformationData.website" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Website URL"
              >
            </div>
            <!-- Facebook -->
            <div class="flex items-center">
              <label for="facebook" class="border-blue-700 bg-blue-700 text-white border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Facebook"></fa-icon>
              </label>
              <input id="facebook" [(ngModel)]="teamInformationData.social.facebook" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Facebook URL"
              >
            </div>
            <!-- Instagram -->
            <div class="flex items-center">
              <label for="instagram" class="border-l-yellow-400 border-t-pink-400 border-b-yellow-400 bg-gradient-to-tr from-yellow-400 to-pink-500 text-white border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Instagram"></fa-icon>
              </label>
              <input id="instagram" [(ngModel)]="teamInformationData.social.instagram" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Instagram URL"
              >
            </div>
            <!-- Twitter -->
            <div class="flex items-center">
              <label for="twitter" class="border-black bg-black text-white border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Twitter"></fa-icon>
              </label>
              <input id="twitter" [(ngModel)]="teamInformationData.social.twitter" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Twitter URL"
              >
            </div>
            <!-- Youtube -->
            <div class="flex items-center">
              <label for="youtube" class="border-red-600 bg-red-600 text-white border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Youtube"></fa-icon>
              </label>
              <input id="youtube" [(ngModel)]="teamInformationData.social.youtube" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Youtube URL"
              >
            </div>
            <!-- Tiktok -->
            <div class="flex items-center">
              <label for="tiktok" class="border-neutral-800 bg-neutral-800 text-white border-l border-t border-b py-1.5 px-2 min-w-10 rounded-l-lg text-center">
                <fa-icon [icon]="Tiktok"></fa-icon>
              </label>
              <input id="tiktok" [(ngModel)]="teamInformationData.social.tiktok" type="text" required
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
                placeholder="Tiktok URL"
              >
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button (click)="onCancel()" class="hover:bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Cancel"></fa-icon> Cancel
          </button>
          <button (click)="onAdd()" class="bg-night hover:bg-neutral-800 text-white border-neutral-200 rounded-lg px-5 py-1.5 font-semibold text-sm">
            <fa-icon [icon]="Add"></fa-icon> Add Team Information
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class TeamInformationAddModalComponent {
  @Input() teamId!: string;
  @Output() add = new EventEmitter<TeamInformation>();
  @Output() cancel = new EventEmitter<void>();

  teamInformationData: TeamInformation = {
    teamId: '',
    foundation: 1900,
    background: 'assets/images/liga-/-background.webp',
    website: '',
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: '',
    }
  }

  ngOnInit() {
    this.teamInformationData.teamId = this.teamId;
  }

  // Icons
  Add = faPlus;
  Cancel = faXmark;
  Web = faGlobe;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;

  onAdd() {
    if (!this.teamInformationData.website) {
      delete this.teamInformationData.website;
    }
    if (!this.teamInformationData.social.facebook) {
      delete this.teamInformationData.social.facebook;
    }
    if (!this.teamInformationData.social.instagram) {
      delete this.teamInformationData.social.instagram;
    }
    if (!this.teamInformationData.social.twitter) {
      delete this.teamInformationData.social.twitter;
    }
    if (!this.teamInformationData.social.youtube) {
      delete this.teamInformationData.social.youtube;
    }
    if (!this.teamInformationData.social.tiktok) {
      delete this.teamInformationData.social.tiktok;
    }
    this.add.emit(this.teamInformationData);
  }

  onCancel() {
    this.cancel.emit();
  }
}