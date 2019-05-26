import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsViewComponent } from './skills-view.component';

describe('SkillsViewComponent', () => {
  let component: SkillsViewComponent;
  let fixture: ComponentFixture<SkillsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
