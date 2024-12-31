import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaCardComponent } from './fifa-card.component';

describe('FifaCardComponent', () => {
  let component: FifaCardComponent;
  let fixture: ComponentFixture<FifaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
