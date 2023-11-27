import { Factory } from './factory';
import { Store } from './store';
import { expect, jest } from '@storybook/jest';

describe('Factory', () => {
  describe('Init value', () => {
    const store = new Store({ name: 'ivan', state: { age: 3, name: 'ana' } });

    it('should c', () => {
      const stor2 = new Store({
        name: 'ivans',
        state: { age: 3, name: 'ana' },
      });
      expect(Factory.factories.size).toEqual(2);
      jest.spyOn(Factory.action, 'next');

      Factory.removeFactory(store);
      expect(Factory.action.next).toHaveBeenCalledTimes(1);
      expect(Factory.factories.size).toEqual(1);
    });
  });
});
