import { AdminEntity } from './admin.models';
import {
  adminAdapter,
  AdminPartialState,
  initialAdminState,
} from './admin.reducer';
import * as AdminSelectors from './admin.selectors';

describe('Admin Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAdminId = (it: AdminEntity) => it.id;
  const createAdminEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AdminEntity);

  let state: AdminPartialState;

  beforeEach(() => {
    state = {
      admin: adminAdapter.setAll(
        [
          createAdminEntity('PRODUCT-AAA'),
          createAdminEntity('PRODUCT-BBB'),
          createAdminEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAdminState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Admin Selectors', () => {
    it('selectAllAdmin() should return the list of Admin', () => {
      const results = AdminSelectors.selectAllAdmin(state);
      const selId = getAdminId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AdminSelectors.selectEntity(state) as AdminEntity;
      const selId = getAdminId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAdminLoaded() should return the current "loaded" status', () => {
      const result = AdminSelectors.selectAdminLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAdminError() should return the current "error" state', () => {
      const result = AdminSelectors.selectAdminError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
