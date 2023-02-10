import { DEFAULT_RECT_SCALE } from '@/components/DepthCamera/constants';
import { observable, makeObservable, action } from 'mobx';
import { hydrateStore, makePersistable, clearPersistedStore } from 'mobx-persist-store';

interface DistanceRect {
  position: { x: number; y: number };
  scale: number;
}

export class GlobalStore {
  // 最短距离
  @observable minDistance = 1;
  @observable colorMode = 1;
  @observable smoothed = true;
  @observable distanceRect: DistanceRect = {
    position: { x: 0, y: 0 },
    scale: DEFAULT_RECT_SCALE,
  };
  @observable isReady = false;
  // 忽略熄屏模式提示
  @observable ignoreAppMask = false;

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'Global',
      properties: ['minDistance', 'distanceRect', 'smoothed', 'colorMode'],
    });
  }

  @action setMinDistance(value: number): void {
    this.minDistance = value;
  }

  @action setDistanceRect(value: Partial<DistanceRect>): void {
    this.distanceRect = { ...this.distanceRect, ...value };
  }

  @action setColorMode(value: number): void {
    this.colorMode = value;
  }

  @action setSmoothed(value: boolean): void {
    this.smoothed = value;
  }

  @action setIsReady(value: boolean): void {
    this.isReady = value;
  }

  @action setIgnoreAppMask(value: boolean): void {
    this.ignoreAppMask = value;
  }

  async hydrate() {
    return hydrateStore(this);
  }

  async clearPersisted() {
    return clearPersistedStore(this);
  }
}

export const globalStore = new GlobalStore();
