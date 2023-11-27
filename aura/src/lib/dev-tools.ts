import { Store } from './store';
import { skip, Subscription } from 'rxjs';
import { Factory } from './factory';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(options: any): {
        send(
          data: { type: string } & Record<string, any>,
          state: Record<string, any>,
        ): void;
        init(state: Record<string, any>): void;
        unsubscribe(): void;
        subscribe(
          cb: (message: {
            type: string;
            payload: { type: string };
            state: string;
          }) => void,
        ): () => void;
      };
    };
  }
}
type Action = { type: string } & Record<string, any>;

export function devTools(options = {}) {
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) return;

  let lock = false;
  const instance = window.__REDUX_DEVTOOLS_EXTENSION__.connect(options);
  const subscriptions = new Map<string, Subscription>();
  const send = (action: Action) => {
    instance.send(action, Factory.getStoresSnapshot());
  };

  const addStore = (store: Store) => {
    const name = store.name;
    const displayName = capitalize(name);

    send({ type: `[${displayName}] - @Init` });

    // Adaptare pentru a utiliza BehaviorSubject:
    const update = store.pipe(skip(1)).subscribe(() => {
      if (lock) {
        lock = false;
        return;
      }
      //
      // options.preAction?.();
      send({ type: `[${displayName}] - Update` });
    });

    subscriptions.set(name, update);
  };

  Factory.factories.forEach(addStore);

  const subscription = Factory.factoriesAction$.subscribe(({ store, type }) => {
    const name = store.name;
    const displayName = capitalize(name);

    if (options) {
      const msg = `[${displayName}] - ${type}`;
      console.groupCollapsed(msg);
      console.trace();
      console.groupEnd();
    }

    if (type === 'insert') {
      addStore(store);
    }

    if (type === 'pop') {
      subscriptions.get(name)?.unsubscribe();
      subscriptions.delete(name);
      send({ type: `Remove ${displayName}` });
    }
  });

  const devtoolsDispose = instance.subscribe((message) => {
    if (message.type === 'DISPATCH') {
      const payloadType = message.payload.type;

      if (payloadType === 'COMMIT') {
        instance.init(Factory.getStoresSnapshot());
        return;
      }

      if (payloadType === 'JUMP_TO_STATE' || payloadType === 'JUMP_TO_ACTION') {
        const state = JSON.parse(message.state);

        for (const [name, value] of Object.entries(state)) {
          lock = true;
          Factory.getFactory(name)?.update(() => value);
        }
      }
    }
  });

  return {
    unsubscribe() {
      subscription.unsubscribe();
      instance.unsubscribe();
      subscriptions.forEach((sub) => sub.unsubscribe());
      devtoolsDispose();
    },
  };
}

export function capitalize(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}
