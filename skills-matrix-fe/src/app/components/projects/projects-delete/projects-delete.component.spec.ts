import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDeleteComponent } from './projects-delete.component';

describe('ProjectsDeleteComponent', () => {
  let component: ProjectsDeleteComponent;
  let fixture: ComponentFixture<ProjectsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
