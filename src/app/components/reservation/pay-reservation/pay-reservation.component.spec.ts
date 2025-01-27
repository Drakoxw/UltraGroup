import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayReservationComponent } from './pay-reservation.component';

describe('PayReservationComponent', () => {
  let component: PayReservationComponent;
  let fixture: ComponentFixture<PayReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
