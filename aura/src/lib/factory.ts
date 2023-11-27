import { Store, StoreDef } from './store';
import { Subject } from 'rxjs';

export class Factory {
  private static action = new Subject<{
    type: 'insert' | 'pop';
    store: Store;
  }>();
  public static factoriesAction$ = Factory.action.asObservable();
  static factories: Map<string, Store> = new Map();

  static getFactory<T extends StoreDef>(name: string): Store<T> | undefined {
    return this.factories.get(name);
  }

  /**
   * Remove store
   */
  static removeFactory(factory: Store) {
    Factory.factories.delete(factory.name);
    Factory.action.next({ type: 'pop', store: factory });
  }

  /**
   * Add store
   */
  static addFactory(factory: Store) {
    Factory.factories.set(factory.name, factory);
    Factory.action.next({ type: 'insert', store: factory });
  }
  static getStoresSnapshot<T extends Record<string, any>>(): T {
    const stores: T = {} as T;

    Factory.factories.forEach((store, key) => {
      stores[key as keyof T] = store.getValue();
    });

    return stores;
  }
}
