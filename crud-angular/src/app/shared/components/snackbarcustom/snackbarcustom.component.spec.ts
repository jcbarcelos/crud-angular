import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarcustomComponent } from './snackbarcustom.component';

describe('SnackbarcustomComponent', () => {
  let component: SnackbarcustomComponent;
  let fixture: ComponentFixture<SnackbarcustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarcustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
