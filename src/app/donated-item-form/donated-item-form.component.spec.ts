import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatedItemFormComponent } from './donated-item-form.component';

describe('DonatedItemFormComponent', () => {
  let component: DonatedItemFormComponent;
  let fixture: ComponentFixture<DonatedItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatedItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatedItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
