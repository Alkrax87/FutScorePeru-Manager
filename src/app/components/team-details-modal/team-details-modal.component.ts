import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TeamDetails } from '../../interfaces/teamDetails';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsDetailsApiService } from '../../services/teams-details-api.service';
import { faFloppyDisk, faGlobe, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-team-details-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-lg">
        <div class="p-5">
          @if (information) {
            <h3 class="text-white text-xl font-semibold">Edit Details</h3>
            <p class="text-neutral-200 text-sm">Update team details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add Details</h3>
            <p class="text-neutral-200 text-sm">Enter the details below.</p>
          }
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <!-- Description -->
            <div>
              <label for="description" class="relative">
                <textarea id="description" formControlName="description" placeholder=" " rows="8" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson cursor-text px-5 py-3 peer w-full rounded-2xl shadow-sm duration-100 outline-none resize-none"></textarea>
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text absolute start-3 -top-[188px] px-2 text-xs font-semibold transition-transform -translate-y-[22px] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[22px]">Descripción</span>
              </label>
            </div>
            <!-- Founded -->
            <div>
              <label for="founded" class="relative">
                <input id="founded" type="number" min="1900" formControlName="founded" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Founded</span>
              </label>
            </div>
            <!-- Website -->
            <div>
              <label for="website" class="relative">
                <input id="website" type="text" formControlName="website" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Website</span>
              </label>
            </div>
            <!-- Social -->
            <p class="text-gold text-sm -mb-1 font-semibold">Social</p>
            <div formGroupName="social" class="flex flex-col gap-2">
              <!-- Facebook -->
              <div class="flex">
                <label for="facebook" class="border-blue-700 bg-blue-700 text-white h-10 flex items-center justify-center min-w-9 rounded-l-full pl-1"><fa-icon [icon]="Facebook"></fa-icon></label>
                <input id="facebook" type="text" formControlName="facebook" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-blue-700 focus:text-blue-700 h-10 cursor-text px-3 py-2 peer w-full rounded-r-full shadow-sm duration-100 outline-none">
              </div>
              <!-- Instagram -->
              <div class="flex">
                <label for="instagram" class="bg-gradient-to-tr from-yellow-400 to-pink-500 text-white h-10 flex items-center justify-center min-w-9 rounded-l-full pl-1"><fa-icon [icon]="Instagram"></fa-icon></label>
                <input id="instagram" type="text" formControlName="instagram" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-pink-400 focus:text-pink-400 h-10 cursor-text px-3 py-2 peer w-full rounded-r-full shadow-sm duration-100 outline-none">
              </div>
              <!-- Twitter -->
              <div class="flex">
                <label for="twitter" class="bg-black text-white h-10 flex items-center justify-center min-w-9 rounded-l-full pl-1"><fa-icon [icon]="Twitter"></fa-icon></label>
                <input id="twitter" type="text" formControlName="twitter" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-black focus:text-black h-10 cursor-text px-3 py-2 peer w-full rounded-r-full shadow-sm duration-100 outline-none">
              </div>
              <!-- Youtube -->
              <div class="flex">
                <label for="youtube" class="bg-red-600 text-white h-10 flex items-center justify-center min-w-9 rounded-l-full pl-1"><fa-icon [icon]="Youtube"></fa-icon></label>
                <input id="youtube" type="text" formControlName="youtube" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-red-600 focus:text-red-600 h-10 cursor-text px-3 py-2 peer w-full rounded-r-full shadow-sm duration-100 outline-none">
              </div>
              <!-- Tiktok -->
              <div class="flex">
                <label for="tiktok" class="bg-neutral-800 text-white h-10 flex items-center justify-center min-w-9 rounded-l-full pl-1"><fa-icon [icon]="Tiktok"></fa-icon></label>
                <input id="tiktok" type="text" formControlName="tiktok" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-neutral-800 focus:text-neutral-800 h-10 cursor-text px-3 py-2 peer w-full rounded-r-full shadow-sm duration-100 outline-none">
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @if (information) {
              <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Details
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamDetailsModalComponent {
  @Input() teamId: string | null = null;
  @Input() category: number | null = null;
  @Input() information: TeamDetails | null = null;
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsDetailsService = inject(TeamsDetailsApiService);

  form = this.fb.group({
    teamId: ['', Validators.required],
    category: [null as number | null, Validators.required],
    description: ['', Validators.required],
    founded: [null as number | null, [Validators.required, Validators.min(1900)]],
    website: [''],
    social: this.fb.group({
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: [''],
      tiktok: [''],
    }),
  });
  errorMessage: string | null = null;

  Web = faGlobe;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;
  Add = faPlus;
  Save = faFloppyDisk;

  ngOnInit() {
    if (this.information) {
      this.form.patchValue(this.information);
    } else {
      this.form.patchValue({ teamId: this.teamId, category: this.category });
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formDetails = this.form.value as TeamDetails;

    if (!formDetails.website) {
      delete formDetails.website;
    }
    if (!formDetails.social.facebook) {
      delete formDetails.social.facebook;
    }
    if (!formDetails.social.instagram) {
      delete formDetails.social.instagram;
    }
    if (!formDetails.social.twitter) {
      delete formDetails.social.twitter;
    }
    if (!formDetails.social.youtube) {
      delete formDetails.social.youtube;
    }
    if (!formDetails.social.tiktok) {
      delete formDetails.social.tiktok;
    }

    if (this.information?.teamId) {
      this.teamsDetailsService.updateTeamDetails(formDetails.teamId, formDetails).subscribe({
        next: () => {
          this.updated.emit();
          this.close.emit();
        }
      });
    } else {
      this.teamsDetailsService.addTeamDetails(formDetails).subscribe({
        next: () => {
          this.updated.emit();
          this.close.emit();
        }
      });
    }
  }
}