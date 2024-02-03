import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoadingCalculationComponent } from './loadingCalculation.component';
import { expect } from '@storybook/jest';

describe('LoadingCalculationComponent', () => {
  let component: LoadingCalculationComponent;
  let fixture: ComponentFixture<LoadingCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingCalculationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingCalculationComponent);
    component = fixture.componentInstance;
    component.cartFrom.patchValue({
      price: 20,
      procentFromYour: 0.3,
      howMany: 5,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', fakeAsync(() => {
    component.cartFrom.controls.price.setValue(332);

    let r;
    component.cartFrom.valueChanges.subscribe((value) => {
      r = value;
      expect(r).toEqual('43');
    });
    tick();
  }));
});
