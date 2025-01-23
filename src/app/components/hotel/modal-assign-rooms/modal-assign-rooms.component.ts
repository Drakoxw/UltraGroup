import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dialog } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { RoomsService } from '@services/rooms.service';
import { HotelData, RoomData, RoomDataSeleted } from '@interfaces/index';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-assign-rooms',
  imports: [
    Dialog,
    CheckboxModule,
    TableModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    TagModule,
  ],
  templateUrl: './modal-assign-rooms.component.html',
  styleUrl: './modal-assign-rooms.component.css',
})
export class ModalAssignRoomsComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input({ transform: booleanAttribute }) visible = false;
  @Input() hotel!: HotelData;

  #roomServ = inject(RoomsService);
  listRooms: RoomData[] = [];
  selectedRooms: RoomData[] = [];
  readonly loading = this.#roomServ.loading;

  ngOnInit(): void {
    this.listRooms = this.#roomServ
      .rooms()
      .filter((f) => f.available && f.idHotel != this.hotel.id);
  }

  onClose() {
    this.closeModal.emit();
  }

  save() {
    const rooms = this.selectedRooms.map(el => el.id)
    this.#roomServ.assingRooms(this.hotel.id, rooms)
    this.onClose()
  }

}
