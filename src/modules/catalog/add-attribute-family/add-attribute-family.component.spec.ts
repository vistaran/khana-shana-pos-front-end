import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeFamilyComponent } from './add-attribute-family.component';

describe('AddAttributeFamilyComponent', () => {
  let component: AddAttributeFamilyComponent;
  let fixture: ComponentFixture<AddAttributeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributeFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
