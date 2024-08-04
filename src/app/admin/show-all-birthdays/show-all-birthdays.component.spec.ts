import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllBirthdaysComponent } from './show-all-birthdays.component';

describe('ShowAllBirthdaysComponent', () => {
  let component: ShowAllBirthdaysComponent;
  let fixture: ComponentFixture<ShowAllBirthdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllBirthdaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllBirthdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
