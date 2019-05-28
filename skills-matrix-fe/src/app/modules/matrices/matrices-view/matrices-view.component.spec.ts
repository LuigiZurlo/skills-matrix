import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricesViewComponent } from './matrices-view.component';

describe('MatricesViewComponent', () => {
  let component: MatricesViewComponent;
  let fixture: ComponentFixture<MatricesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
