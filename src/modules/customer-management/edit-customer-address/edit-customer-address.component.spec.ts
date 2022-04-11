import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerAddressComponent } from './edit-customer-address.component';

describe('EditCustomerAddressComponent', () => {
  let component: EditCustomerAddressComponent;
  let fixture: ComponentFixture<EditCustomerAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
