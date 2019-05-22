import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsListComponent } from './positions-list.component';

describe('PositionsListComponent', () => {
  let component: PositionsListComponent;
  let fixture: ComponentFixture<PositionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
