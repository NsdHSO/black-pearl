import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingCalculationComponent } from './loadingCalculation.component';

describe('LoadingCalculationComponent', () => {
  let component: LoadingCalculationComponent;
  let fixture: ComponentFixture<LoadingCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingCalculationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
