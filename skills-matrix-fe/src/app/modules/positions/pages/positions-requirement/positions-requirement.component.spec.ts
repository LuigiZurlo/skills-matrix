import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsRequirementComponent } from './positions-requirement.component';

describe('PositionsRequirementComponent', () => {
  let component: PositionsRequirementComponent;
  let fixture: ComponentFixture<PositionsRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
