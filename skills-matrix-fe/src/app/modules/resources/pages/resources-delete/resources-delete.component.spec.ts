import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDeleteComponent } from './resources-delete.component';

describe('ResourcesDeleteComponent', () => {
  let component: ResourcesDeleteComponent;
  let fixture: ComponentFixture<ResourcesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
