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
  homeScreen: {},
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
