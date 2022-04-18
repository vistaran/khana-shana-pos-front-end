import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseByGroupComponent } from './expense-by-group.component';

describe('ExpenseByGroupComponent', () => {
  let component: ExpenseByGroupComponent;
  let fixture: ComponentFixture<ExpenseByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseByGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
