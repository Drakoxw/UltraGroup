import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectRoomComponent } from './modal-select-room.component';

describe('ModalSelectRoomComponent', () => {
  let component: ModalSelectRoomComponent;
  let fixture: ComponentFixture<ModalSelectRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
