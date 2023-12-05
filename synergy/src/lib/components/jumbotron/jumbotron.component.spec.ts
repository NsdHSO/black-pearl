import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JumbotronComponent } from './jumbotron.component';

describe('JumbotronComponent', () => {
  let component: JumbotronComponent;
  let fixture: ComponentFixture<JumbotronComponent> | any;

  describe('Init Jumbotron', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [JumbotronComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(JumbotronComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have padding', () => {
      const element: HTMLDivElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]'
      );
      fixture.detectChanges();
      expect(element.classList).toContain('p-0');
    });
  });
  describe('Assert UI Jumbotron', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [JumbotronComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(JumbotronComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have padding changed', () => {
      const element: HTMLDivElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]'
      );
      component.padding = 'px-0 py-2';
      fixture.detectChanges();

      expect(element.classList).toContain('px-0');
      expect(element.classList).toContain('py-2');
    });
    it('should have margin changed', () => {
      const element: HTMLDivElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]'
      );
      component.margin = 'mx-0 my-2';
      fixture.detectChanges();

      expect(element.classList).toContain('mx-0');
      expect(element.classList).toContain('my-2');
    });

    it('should change default class', () => {
      const uiElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]'
      );
      component.shadow = 'shadow-x';
      fixture.detectChanges();
      expect(uiElement.classList).toContain('shadow-x');
    });
  });
});
