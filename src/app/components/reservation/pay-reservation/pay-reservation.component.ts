import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pay-reservation',
  imports: [ButtonModule],
  templateUrl: './pay-reservation.component.html',
  styleUrl: './pay-reservation.component.css',
})
export class PayReservationComponent {
  @Output() finish = new EventEmitter();
  onSave() {
    this.finish.emit();
  }
}
