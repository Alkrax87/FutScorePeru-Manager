import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-5">
      <div class="bg-white p-4 rounded-3xl w-full max-w-sm">
        <h3 class="text-xl font-semibold">Delete {{ message.section }}</h3>
        <p class="text-neutral-800 text-sm text-justify">
          Are you sure you want to delete <span class="font-semibold">{{ message.element }}?</span> This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2 mt-3">
          <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/50 text-neutral-600 border rounded-full px-4 py-2 text-sm duration-300">Cancelar</button>
          <button type="submit" (click)="confirm.emit()" class="bg-red-600 text-white hover:bg-red-600/80 rounded-full px-4 py-2 text-sm duration-300">
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