import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorNeededItemTableComponent } from './donor-needed-item-table.component';

describe('DonorNeededItemTableComponent', () => {
  let component: DonorNeededItemTableComponent;
  let fixture: ComponentFixture<DonorNeededItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorNeededItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorNeededItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
