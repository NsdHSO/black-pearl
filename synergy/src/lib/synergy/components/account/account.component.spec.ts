import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent, JumbotronComponent } from './../';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  describe('should have init value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccountComponent, JumbotronComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccountComponent);
      component = fixture.componentInstance;
      component.account = {
        IBAN: '0',
        currency: 'RON',
        icon: {
          name: 'gbp',
          value: 'fa_brands:waze',
        },
        amount: 200,
      };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should check iban not be undefined', () => {
      const elementIban: HTMLDivElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-account-iban"]',
      );
      fixture.detectChanges();
      expect(elementIban).not.toBeUndefined();
    });

    it('should check iban to be value initial', () => {
      const elementIban: HTMLDivElement = fixture.nativeElement.querySelector(
        '[data-test="synergy-account-iban"]',
      );

      fixture.detectChanges();
      expect(elementIban.textContent).toBe(' 0 ');
    });

    it('should check title to be blue', () => {
      const elementIban: HTMLParagraphElement =
        fixture.nativeElement.querySelector(
          '[data-test="synergy-account-title"]',
        );

      fixture.detectChanges();

      expect(elementIban.classList).toContain('text-blue-400');
    });
  });
});
