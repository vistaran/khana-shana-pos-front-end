import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFamilyComponent } from './attribute-family.component';

describe('AttributeFamilyComponent', () => {
  let component: AttributeFamilyComponent;
  let fixture: ComponentFixture<AttributeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
