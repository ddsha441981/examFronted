import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutQuizComponent } from './about-quiz.component';

describe('AboutQuizComponent', () => {
  let component: AboutQuizComponent;
  let fixture: ComponentFixture<AboutQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
