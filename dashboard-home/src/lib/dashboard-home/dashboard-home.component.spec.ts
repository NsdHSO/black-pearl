import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHomeComponent } from './dashboard-home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { AccountComponent } from 'ngx-synergy';
import { DashboardHomeService } from '../dashboard-home.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  let store: MockStore;

  afterEach(() => {
    store?.resetSelectors();
  });
  describe('', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DashboardHomeComponent],
        providers: [
          provideMockStore(),
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DashboardHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      // Provide a mock observable for the selectSearchField selector
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should header component', () => {
      const headerElement = fixture.debugElement.queryAll(
        By.directive(AccountComponent),
      );

      expect(headerElement.length).toBe(0);
    });
  });
  describe('should assert ui', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          DashboardHomeComponent,
          AccountComponent,
          HttpClientTestingModule,
        ],
        providers: [
          provideMockStore(),
          {
            provide: DashboardHomeService,
            useValue: {
              accountWithIcons$: of(['t', 't']),
            },
          },
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(DashboardHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      // Provide a mock observable for the selectSearchField selector
    });

    it('should accounts renderer', () => {
      const headerElement = fixture.debugElement.queryAll(
        By.directive(AccountComponent),
      );

      expect(headerElement.length).toBe(2);
    });
  });
});
