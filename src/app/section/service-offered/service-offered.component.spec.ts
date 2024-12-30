import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferedComponent } from './service-offered.component';

describe('ServiceOfferedComponent', () => {
  let component: ServiceOfferedComponent;
  let fixture: ComponentFixture<ServiceOfferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceOfferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
