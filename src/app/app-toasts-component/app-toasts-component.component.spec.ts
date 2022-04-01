import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToastsComponentComponent } from './app-toasts-component.component';

describe('AppToastsComponentComponent', () => {
  let component: AppToastsComponentComponent;
  let fixture: ComponentFixture<AppToastsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppToastsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToastsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
