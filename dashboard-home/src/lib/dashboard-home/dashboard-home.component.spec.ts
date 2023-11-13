import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHomeComponent } from './dashboard-home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { selectSearchField } from '@black-pearl/home';
import { PREFIX_HOME } from '../util/PREFIX_HOME';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let selectSearchValueSelector: any;
  let store: MockStore;

  afterEach(() => {
    store?.resetSelectors();
  });
  describe('', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DashboardHomeComponent],
        providers: [provideMockStore()],
      }).compileComponents();

      fixture = TestBed.createComponent(DashboardHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      // Provide a mock observable for the selectSearchField selector
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not render the input ', () => {
      const inputTag: HTMLInputElement = fixture.nativeElement.querySelector(
        `[data-test="${PREFIX_HOME}-home-input"]`,
      );

      expect(inputTag).toBeNull();
    });
  });
  describe('should assert the select', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DashboardHomeComponent],
        providers: [
          provideMockStore({
            initialState: {
              home: {
                id: 1,
                entities: {
                  theme: 'dark',
                  search: '',
                },
              },
            },
          }),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DashboardHomeComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store) as MockStore;
      selectSearchValueSelector = store.overrideSelector(
        selectSearchField,
        'CROCO' as any,
      );
      fixture.detectChanges();
      // Provide a mock observable for the selectSearchField selector
    });
    it('should update search value', () => {
      const inputE: HTMLInputElement = fixture.nativeElement.querySelector(
        `[data-test="${PREFIX_HOME}-home-input"]`,
      );
      expect(inputE.value).toEqual('CROCO');
    });
  });
});
