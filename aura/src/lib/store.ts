import { BehaviorSubject } from 'rxjs';
import { devTools } from './dev-tools';
import { Factory } from './factory';

export class Store<
  T extends StoreDef = any,
  State = T['state'],
> extends BehaviorSubject<State> {
  protected initialState!: State;

  constructor(private storeDef: T) {
    super(storeDef.state);
    this.initialState = this.getValue();
    Factory.addFactory(this);
    devTools(this);
  }

  update(...fns: Array<(state: State) => State>) {
    const currentState = this.getValue();
    const nextState = fns.reduce((value, reducer) => {
      value = reducer(value);

      return value;
    }, currentState);
    this.next(nextState);
  }

  /**
   * Reset at initial state
   */
  reset() {
    this.next(this.initialState);
  }
  get name(): StoreDef['name'] {
    return this.storeDef.name;
  }
}

export interface StoreDef<State = any> {
  name: string;
  state: State;
}
