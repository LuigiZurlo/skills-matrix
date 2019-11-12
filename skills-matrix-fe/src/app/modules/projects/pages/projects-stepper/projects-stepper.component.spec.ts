import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsStepperComponent } from './projects-stepper.component';

describe('ProjectsStepperComponent', () => {
  let component: ProjectsStepperComponent;
  let fixture: ComponentFixture<ProjectsStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
