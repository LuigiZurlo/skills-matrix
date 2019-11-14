import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourcesAddCompetenciesComponent} from './resources-add-competencies.component';

describe('ResourcesAddCompetenciesComponent', () => {
  let component: ResourcesAddCompetenciesComponent;
  let fixture: ComponentFixture<ResourcesAddCompetenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesAddCompetenciesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesAddCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
