import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsDeleteComponent } from './missions-delete.component';

describe('MissionsDeleteComponent', () => {
  let component: MissionsDeleteComponent;
  let fixture: ComponentFixture<MissionsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
