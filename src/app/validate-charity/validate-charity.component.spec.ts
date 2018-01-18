import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCharityComponent } from './validate-charity.component';

describe('ValidateCharityComponent', () => {
  let component: ValidateCharityComponent;
  let fixture: ComponentFixture<ValidateCharityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateCharityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
