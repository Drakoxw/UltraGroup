import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomsViewComponent } from './hotel-rooms-view.component';

describe('HotelRoomsViewComponent', () => {
  let component: HotelRoomsViewComponent;
  let fixture: ComponentFixture<HotelRoomsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRoomsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRoomsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
