import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDeleteComponent } from './skills-delete.component';

describe('SkillsDeleteComponent', () => {
  let component: SkillsDeleteComponent;
  let fixture: ComponentFixture<SkillsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
