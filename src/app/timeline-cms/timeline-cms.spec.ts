import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCms } from './timeline-cms';

describe('TimelineCms', () => {
  let component: TimelineCms;
  let fixture: ComponentFixture<TimelineCms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineCms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineCms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
