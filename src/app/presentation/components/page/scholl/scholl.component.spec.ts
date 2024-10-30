import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchollComponent } from './scholl.component';

describe('SchollComponent', () => {
  let component: SchollComponent;
  let fixture: ComponentFixture<SchollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
