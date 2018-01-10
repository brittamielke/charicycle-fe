import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeededItemFormComponent } from './needed-item-form.component';

describe('NeededItemFormComponent', () => {
  let component: NeededItemFormComponent;
  let fixture: ComponentFixture<NeededItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeededItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeededItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
