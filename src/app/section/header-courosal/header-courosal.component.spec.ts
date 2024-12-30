import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCourosalComponent } from './header-courosal.component';

describe('HeaderCourosalComponent', () => {
  let component: HeaderCourosalComponent;
  let fixture: ComponentFixture<HeaderCourosalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCourosalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCourosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
