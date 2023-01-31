import { Linking } from 'react-native';
import {
  observable,
  runInAction,
  makeObservable,
  action,
} from 'mobx';
import {
  hydrateStore,
  makePersistable,
  clearPersistedStore,
} from 'mobx-persist-store';

export class GlobalStore {
  @observable debug = false;

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'Global',
      properties: ['debug'],
    });
  }

  @action setDebug(enabled: boolean): void {
    this.debug = enabled;
  }

  async hydrate(): PVoid {
    return hydrateStore(this);
  }

  async clearPersisted(): PVoid {
    return clearPersistedStore(this);
  }
}

const globalStore = new GlobalStore();

export default globalStore;

