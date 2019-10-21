import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsEditComponent } from './positions-edit.component';

describe('PositionsEditComponent', () => {
  let component: PositionsEditComponent;
  let fixture: ComponentFixture<PositionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
