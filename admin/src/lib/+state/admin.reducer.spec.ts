import { Action } from '@ngrx/store';

import * as AdminActions from './admin.actions';
import { AdminEntity } from './admin.models';
import { AdminState, initialAdminState, adminReducer } from './admin.reducer';

describe('Admin Reducer', () => {
  const createAdminEntity = (id: string, name = ''): AdminEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Admin actions', () => {
    it('loadAdminSuccess should return the list of known Admin', () => {
      const admin = [
        createAdminEntity('PRODUCT-AAA'),
        createAdminEntity('PRODUCT-zzz'),
      ];
      const action = AdminActions.loadAdminSuccess({ admin });

      const result: AdminState = adminReducer(initialAdminState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = adminReducer(initialAdminState, action);

      expect(result).toBe(initialAdminState);
    });
  });
});
