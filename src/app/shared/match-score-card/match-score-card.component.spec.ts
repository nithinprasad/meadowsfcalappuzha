import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreCardComponent } from './match-score-card.component';

describe('MatchScoreCardComponent', () => {
  let component: MatchScoreCardComponent;
  let fixture: ComponentFixture<MatchScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchScoreCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
