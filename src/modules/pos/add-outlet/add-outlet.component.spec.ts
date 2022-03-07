import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutletComponent } from './add-outlet.component';

describe('AddOutletComponent', () => {
  let component: AddOutletComponent;
  let fixture: ComponentFixture<AddOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
