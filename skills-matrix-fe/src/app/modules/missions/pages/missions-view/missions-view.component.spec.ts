import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsViewComponent } from './missions-view.component';

describe('MissionsViewComponent', () => {
  let component: MissionsViewComponent;
  let fixture: ComponentFixture<MissionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
