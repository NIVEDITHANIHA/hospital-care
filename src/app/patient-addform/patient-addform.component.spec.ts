import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddformComponent } from './patient-addform.component';

describe('PatientAddformComponent', () => {
  let component: PatientAddformComponent;
  let fixture: ComponentFixture<PatientAddformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientAddformComponent]
    });
    fixture = TestBed.createComponent(PatientAddformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
