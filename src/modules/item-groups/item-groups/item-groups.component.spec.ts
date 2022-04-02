import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGroupsComponent } from './item-groups.component';

describe('ItemGroupsComponent', () => {
  let component: ItemGroupsComponent;
  let fixture: ComponentFixture<ItemGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
