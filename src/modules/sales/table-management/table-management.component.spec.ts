import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableManagementComponent } from './table-management.component';

describe('TableManagementComponent', () => {
  let component: TableManagementComponent;
  let fixture: ComponentFixture<TableManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
