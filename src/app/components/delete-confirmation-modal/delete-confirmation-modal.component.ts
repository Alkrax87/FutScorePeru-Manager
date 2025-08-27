import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm">
        <h3 class="text-lg font-semibold">Delete {{ message.section }}</h3>
        <p class="text-neutral-500 text-sm text-justify">
          Are you sure you want to delete <span class="font-semibold">{{ message.element }}?</span> This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" (click)="close.emit()" class="hover:bg-neutral-50 border text-sm rounded-lg px-4 py-2">Cancelar</button>
          <button type="submit" (click)="confirm.emit()" class="bg-night hover:bg-neutral-800 text-white text-sm rounded-lg px-4 py-2">
            <fa-icon [icon]="Delete"></fa-icon>&nbsp; Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DeleteConfirmationModalComponent {
  @Input() message!: { section: string, element: string };
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  Delete = faTrashCan;
}
