import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JumbotronComponent } from './jumbotron.component';

describe('JumbotronComponent', () => {
  let component: JumbotronComponent;
  let fixture: ComponentFixture<JumbotronComponent>;

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

    it('should create', () => {
      const uiElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]',
      );

      expect(uiElement).not.toBeNull();
    });

    it('should create', () => {
      const uiElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-wrapper"]',
      );

      expect(uiElement).not.toBeNull();
    });
  });
});
