   import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsStepperCreateComponent } from './positions-stepper-create.component';

describe('PositionsStepperCreateComponent', () => {
  let component: PositionsStepperCreateComponent;
  let fixture: ComponentFixture<PositionsStepperCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsStepperCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsStepperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
