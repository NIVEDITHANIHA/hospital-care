import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditformComponent } from './patient-editform.component';

describe('PatientEditformComponent', () => {
  let component: PatientEditformComponent;
  let fixture: ComponentFixture<PatientEditformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientEditformComponent]
    });
    fixture = TestBed.createComponent(PatientEditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
