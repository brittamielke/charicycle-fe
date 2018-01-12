import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedonorsComponent } from './managedonors.component';

describe('ManagedonorsComponent', () => {
  let component: ManagedonorsComponent;
  let fixture: ComponentFixture<ManagedonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedonorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
