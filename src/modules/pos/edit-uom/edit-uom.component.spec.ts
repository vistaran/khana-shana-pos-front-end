import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUomComponent } from './edit-uom.component';

describe('EditUomComponent', () => {
  let component: EditUomComponent;
  let fixture: ComponentFixture<EditUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
