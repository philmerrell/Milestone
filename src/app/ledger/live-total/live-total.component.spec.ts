import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTotalComponent } from './live-total.component';

describe('LiveTotalComponent', () => {
  let component: LiveTotalComponent;
  let fixture: ComponentFixture<LiveTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
