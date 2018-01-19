import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimedItemTableComponent } from './claimed-item-table.component';

describe('ClaimedItemTableComponent', () => {
  let component: ClaimedItemTableComponent;
  let fixture: ComponentFixture<ClaimedItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimedItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimedItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
