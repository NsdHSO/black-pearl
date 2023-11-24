import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  describe('should have init value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ButtonComponent, MatButtonModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;
      component.disabled = of(true);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should render', () => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');

      expect(buttonElement).toBeDefined();
    });
    it('should send data', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');

      jest.spyOn(component.marian, 'emit');

      buttonElement.click();
      tick();
      expect(component.marian.emit).toHaveBeenCalledTimes(0);
    }));

    it('should have default class', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');
      buttonElement.classList.remove(
        'mdc-button',
        'mat-mdc-button',
        'mat-unthemed',
        'mat-mdc-button-base',
      );

      // By default shadows
      expect(buttonElement.classList.length).toEqual(1);
    }));
  });
  describe('should have change value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ButtonComponent, MatButtonModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;
      component.disabled = of(false);
      component.text = 'Ivan';
      component.class = 'bg-blue-500';
      fixture.detectChanges();
    });

    it('should should send data', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');

      jest.spyOn(component.marian, 'emit');

      buttonElement.click();
      tick();
      expect(component.marian.emit).toHaveBeenCalledTimes(1);
    }));
    it('should should send data', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');

      expect(buttonElement.innerHTML).toContain('Ivan');
    }));

    it('should have default class', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');
      buttonElement.classList.remove(
        'mdc-button',
        'mat-mdc-button',
        'mat-unthemed',
        'mat-mdc-button-base',
      );
      expect(buttonElement.classList.length).toEqual(2);
    }));

    it('should not have default class', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');
      buttonElement.classList.remove(
        'mdc-button',
        'mat-mdc-button',
        'mat-unthemed',
        'mat-mdc-button-base',
      );
      expect(buttonElement.classList.length).toEqual(2);
    }));

    it('should have rounded class', fakeAsync(() => {
      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('[data-test="synergy-button"]');
      buttonElement.classList.remove(
        'mdc-button',
        'mat-mdc-button',
        'mat-unthemed',
        'mat-mdc-button-base',
      );
      component.class = 'rounded-full';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('rounded-full');
    }));
  });
});
