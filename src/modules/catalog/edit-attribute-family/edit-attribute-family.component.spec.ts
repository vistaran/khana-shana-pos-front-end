import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributeFamilyComponent } from './edit-attribute-family.component';

describe('EditAttributeFamilyComponent', () => {
  let component: EditAttributeFamilyComponent;
  let fixture: ComponentFixture<EditAttributeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttributeFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAttributeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
