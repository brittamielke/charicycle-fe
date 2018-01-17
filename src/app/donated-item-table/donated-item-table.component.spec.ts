import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatedItemTableComponent } from './donated-item-table.component';

describe('DonatedItemTableComponent', () => {
  let component: DonatedItemTableComponent;
  let fixture: ComponentFixture<DonatedItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatedItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatedItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
