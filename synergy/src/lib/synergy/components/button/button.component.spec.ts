import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';

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
      expect(buttonElement.classList.length).toEqual(2);
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
  describe('should not have text and render the ng-content', () => {
    let componentFake: any;
    let fixturefake: any;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMockComponent, ButtonComponent],
      }).compileComponents();

      fixturefake = TestBed.createComponent(TestMockComponent);
      componentFake = fixturefake.componentInstance;
      fixturefake.detectChanges();
    });

    it('should check ng-content is renderer', () => {
      const divElement = fixturefake.nativeElement.querySelector(
        '[data-test="test-button-content"]',
      );

      expect(divElement).toBeDefined();
    });

    it('should check is only one element', () => {
      const divElement = fixturefake.nativeElement.querySelector(
        '[data-test="test-button-content"]',
      );

      expect(divElement.innerHTML).toEqual('test');
    });
  });
  describe('should not have ng-content', () => {
    let componentFake: any;
    let fixturefake: any;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMockComponent2, ButtonComponent],
      }).compileComponents();

      fixturefake = TestBed.createComponent(TestMockComponent2);
      componentFake = fixturefake.componentInstance;
      componentFake.text = 'ivant';
      fixturefake.detectChanges();
    });

    it('should check ng-content ', () => {
      const divElement = fixturefake.nativeElement.querySelector(
        '[data-test="test-button-content"]',
      );

      expect(divElement).toBeNull();
    });
  });
});

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <black-pearl-button
      [disabled]="of(false)"
      class="rounded-md border border-gray-100 bg-blue-400 z-10 text-white"
    >
      <div data-test="test-button-content">test</div>
    </black-pearl-button>
  `,
})
export class TestMockComponent {
  protected readonly of = of;
}

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <black-pearl-button
      text="ivan"
      [disabled]="of(false)"
      class="rounded-md border border-gray-100 bg-blue-400 z-10 text-white"
    >
      <div data-test="test-button-content">test</div>
    </black-pearl-button>
  `,
})
export class TestMockComponent2 {
  protected readonly of = of;
}
