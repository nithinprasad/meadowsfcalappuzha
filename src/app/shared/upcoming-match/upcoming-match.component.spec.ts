import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMatchComponent } from './upcoming-match.component';

describe('UpcomingMatchComponent', () => {
  let component: UpcomingMatchComponent;
  let fixture: ComponentFixture<UpcomingMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
