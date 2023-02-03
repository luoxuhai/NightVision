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
    appName: 'Privacy Box',
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
  },
  permissionManager: {
    camera: 'Camera',
    photoLibrary: 'Photo Library',
    mediaLibrary: 'Media Library',
    unavailable: '{{permission}} unavailable',
    blocked:
      'Please go to settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
  },
};

export default en;

export type { Translations };
