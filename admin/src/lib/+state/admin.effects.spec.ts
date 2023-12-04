import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AdminActions from './admin.actions';
import { AdminEffects } from './admin.effects';

describe('AdminEffects', () => {
  let actions: Observable<Action>;
  let effects: AdminEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AdminEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AdminEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AdminActions.initAdmin() });

      const expected = hot('-a-|', {
        a: AdminActions.loadAdminSuccess({ admin: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
