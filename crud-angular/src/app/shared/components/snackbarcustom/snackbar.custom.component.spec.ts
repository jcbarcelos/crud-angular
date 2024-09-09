import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarCustomComponent } from './snackbar.custom.component';



describe('SnackbarcustomComponent', () => {
  let component: SnackbarCustomComponent;
  let fixture: ComponentFixture<SnackbarCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
