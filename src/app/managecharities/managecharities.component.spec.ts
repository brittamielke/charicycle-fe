import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecharitiesComponent } from './managecharities.component';

describe('ManagecharitiesComponent', () => {
  let component: ManagecharitiesComponent;
  let fixture: ComponentFixture<ManagecharitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecharitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
