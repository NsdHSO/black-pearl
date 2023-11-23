import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from 'ngx-synergy';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  describe('should have init value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccountComponent],
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

    it('should check iban', () => {
      const elementIban: HTMLParagraphElement =
        fixture.nativeElement.querySelector(
          '[data-test="synergy-account-iban"]',
        );

      expect(elementIban.innerText).toEqual('0');
    });
  });
});
