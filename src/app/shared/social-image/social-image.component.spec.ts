import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialImageComponent } from './social-image.component';

describe('SocialImageComponent', () => {
  let component: SocialImageComponent;
  let fixture: ComponentFixture<SocialImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
