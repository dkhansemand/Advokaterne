import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSelectComponent } from './media-select.component';

describe('MediaSelectComponent', () => {
  let component: MediaSelectComponent;
  let fixture: ComponentFixture<MediaSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
