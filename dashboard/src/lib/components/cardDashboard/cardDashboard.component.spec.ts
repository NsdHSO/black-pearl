import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDashboardComponent } from './cardDashboard.component';
import { By } from '@angular/platform-browser';
import { JumbotronComponent } from 'ngx-synergy';

describe('CardDashboardComponent', () => {
  describe('should be init value ', () => {
    let component: CardDashboardComponent;
    let fixture: ComponentFixture<CardDashboardComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CardDashboardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CardDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should check if exist directive', () => {
      const elementJumbo = fixture.debugElement.query(
        By.directive(JumbotronComponent)
      );

      expect(elementJumbo).toBeTruthy();
    });
  });
});
