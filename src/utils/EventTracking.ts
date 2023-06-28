import { Mixpanel, MixpanelProperties } from 'mixpanel-react-native';

import { Application } from './Application';

export class EventTracking {
  public static shared = new EventTracking();
  private mixpanel?: Mixpanel;

  get disabled() {
    return Application.env !== 'AppStore';
  }

  constructor() {
    if (this.disabled) {
      return;
    }

    this.mixpanel = new Mixpanel('d970f7d34d79103c7aceb35ff0b42b03', true);
    this.mixpanel.init();
  }

  public track(eventName: string, properties?: MixpanelProperties | undefined) {
    this.mixpanel?.track(eventName, properties);
  }
}
