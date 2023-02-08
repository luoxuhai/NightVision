import { Translations } from './zh';

const en: Translations = {
  common: {
    ok: 'OK',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    second: 'Seconds',
    minute: 'Minutes',
    hour: 'Hours',
    appName: 'Night Vision',
    coming: 'Coming Soon...',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    closed: 'Closed',
    opened: 'Opened',
    open: 'Open',
    close: 'Close',
    done: 'Done',
    noData: 'No Data',
    rename: 'Rename',
    delete: 'Delete',
    share: 'Share',
    save: 'Save',
  },
  homeScreen: {
    outOfRange: 'Beyond the detection range: 10cm - 5m',
    unavailable: {
      title: 'Cannot run on this device',
      message:
        'Only supports devices with lidar scanners, supported models: iPhone 12 Pro(Max), iPhone 13 Pro (Max), iPhone 14 Pro (Max)',
    },
  },
  settingsScreen: {
    title: 'Settings',
    version: 'version',
    connect: 'Contact the developer',
    goodReview: 'Give a good review',
    recommend: {
      title: 'App Recommendation',
      appName: 'Privacy Box',
      desc: 'Hide private pictures, videos and files',
    },
    agreement: 'Agreement',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    advanced: {
      title: 'Advanced Settings',
    },
  },
  permissionManager: {
    camera: 'Camera',
    unavailable: '{{permission}} unavailable',
    blocked:
      'Please go to settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
  },
};

export default en;

export type { Translations };
