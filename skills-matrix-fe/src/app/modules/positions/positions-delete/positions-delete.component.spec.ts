import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsDeleteComponent } from './positions-delete.component';

describe('PositionsDeleteComponent', () => {
  let component: PositionsDeleteComponent;
  let fixture: ComponentFixture<PositionsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
