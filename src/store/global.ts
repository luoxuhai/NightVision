import { observable, makeObservable, action } from 'mobx';
import { hydrateStore, makePersistable, clearPersistedStore } from 'mobx-persist-store';

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

  async hydrate() {
    return hydrateStore(this);
  }

  async clearPersisted() {
    return clearPersistedStore(this);
  }
}

export const globalStore = new GlobalStore();
