import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserSettingsComponent } from './show-user-settings.component';

describe('ShowUserSettingsComponent', () => {
  let component: ShowUserSettingsComponent;
  let fixture: ComponentFixture<ShowUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
