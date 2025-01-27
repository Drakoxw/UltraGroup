import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmergencyContactComponent } from './form-emergency-contact.component';

describe('FormEmergencyContactComponent', () => {
  let component: FormEmergencyContactComponent;
  let fixture: ComponentFixture<FormEmergencyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmergencyContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEmergencyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
