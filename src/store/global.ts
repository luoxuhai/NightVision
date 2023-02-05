import { observable, makeObservable, action } from 'mobx';
import { hydrateStore, makePersistable, clearPersistedStore } from 'mobx-persist-store';

export class GlobalStore {
  // 最大距离
  @observable maxDistance = 1;

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'Global',
      properties: ['maxDistance'],
    });
  }

  @action setMaxDistance(value: number): void {
    this.maxDistance = value;
  }

  async hydrate() {
    return hydrateStore(this);
  }

  async clearPersisted() {
    return clearPersistedStore(this);
  }
}

export const globalStore = new GlobalStore();
