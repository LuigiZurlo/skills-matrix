import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCreateComponent } from './missions-create.component';

describe('MissionsCreateComponent', () => {
  let component: MissionsCreateComponent;
  let fixture: ComponentFixture<MissionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
