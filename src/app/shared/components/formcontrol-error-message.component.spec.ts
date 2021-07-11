import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontrolErrorMessageComponent } from './formcontrol-error-message.component';

describe('FormcontrolErrorMessageComponent', () => {
  let component: FormcontrolErrorMessageComponent;
  let fixture: ComponentFixture<FormcontrolErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcontrolErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcontrolErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
