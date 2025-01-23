import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignRoomsComponent } from './modal-assign-rooms.component';

describe('ModalAssignRoomsComponent', () => {
  let component: ModalAssignRoomsComponent;
  let fixture: ComponentFixture<ModalAssignRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAssignRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssignRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
