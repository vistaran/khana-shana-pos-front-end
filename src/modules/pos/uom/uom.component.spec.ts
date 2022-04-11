import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomComponent } from './uom.component';

describe('UomComponent', () => {
  let component: UomComponent;
  let fixture: ComponentFixture<UomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
