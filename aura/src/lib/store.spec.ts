import { Store } from './store';
import { expect } from '@storybook/jest';

describe('Store', () => {
  describe('init value', () => {
    const name = 'todo';
    const state = {
      age: 2,
      name: 'Ivanka',
    };
    const store = new Store({ name, state });

    it('should check init value to be liganture', () => {
      expect(store['initialState']).toEqual(state);
    });

    it('should push value', () => {
      store.update((state) => ({
        ...state,
        age: 5,
      }));
      expect(store['initialState']).toEqual(state);
      expect(store.value.age).toEqual(5);
      expect(store.name).toEqual('todo');
    });

    it('should reset at initial value', () => {
      store.reset();
      expect(store.value).toEqual(state);
    });

    it('should check multiple fns', () => {
      store.update(
        (state) => ({ ...state, name: 'Ion' }),
        (state) => ({ ...state, name: 'Ivan' }),
      );

      expect(store.value.name).toEqual('Ivan');
    });
  });
});
