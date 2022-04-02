import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemGroupComponent } from './edit-item-group.component';

describe('EditItemGroupComponent', () => {
  let component: EditItemGroupComponent;
  let fixture: ComponentFixture<EditItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItemGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
