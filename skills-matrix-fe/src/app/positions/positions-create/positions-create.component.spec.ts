import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsCreateComponent } from './positions-create.component';

describe('PositionsCreateComponent', () => {
  let component: PositionsCreateComponent;
  let fixture: ComponentFixture<PositionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
