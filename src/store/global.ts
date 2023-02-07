import { MIN_RECT_SIZE } from '@/components/DepthCamera/constants';
import { observable, makeObservable, action } from 'mobx';
import { hydrateStore, makePersistable, clearPersistedStore } from 'mobx-persist-store';

interface DistanceRect {
  position: { x: number; y: number };
  scale: number;
}

export class GlobalStore {
  // 最短距离
  @observable minDistance = 1;
  @observable distanceRect: DistanceRect = {
    position: { x: 0, y: 0 },
    scale: 0.5,
  };

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'Global',
      properties: ['minDistance', 'distanceRect'],
    });
  }

  @action setMinDistance(value: number): void {
    this.minDistance = value;
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
