import { MIN_RECT_SIZE } from '@/components/DeepCamera/constants';
import { observable, makeObservable, action } from 'mobx';
import { hydrateStore, makePersistable, clearPersistedStore } from 'mobx-persist-store';

interface DistanceRect {
  position: { x: number; y: number };
  scale: number;
}

export class GlobalStore {
  // 最大距离
  @observable maxDistance = 1;
  @observable distanceRect: DistanceRect = {
    position: { x: 0, y: 0 },
    scale: 1,
  };

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'Global',
      properties: ['maxDistance', 'distanceRect'],
    });
  }

  @action setMaxDistance(value: number): void {
    this.maxDistance = value;
  }

  @action setDistanceRect(value: Partial<DistanceRect>): void {
    this.distanceRect = { ...this.distanceRect, ...value };
  }

  async hydrate() {
    return hydrateStore(this);
  }

  async clearPersisted() {
    return clearPersistedStore(this);
  }
}

export const globalStore = new GlobalStore();
