import { Translations } from './zh';

const en: Translations = {
  common: {
    ok: 'OK',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    appName: 'Night Vision',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    closed: 'Closed',
    opened: 'Opened',
    close: 'Close',
    done: 'Done',
    share: 'Share',
    meter: 'm',
    centimeter: 'cm',
  },
  homeScreen: {
    outOfRange: 'Beyond the detection range: 10cm - 5m',
    unavailable: {
      title: 'Cannot run on this device',
      message:
        'Only supports devices with lidar scanners, supported models: iPhone 12 Pro(Max), iPhone 13 Pro (Max), iPhone 14 Pro (Max)、iPad Pro',
    },
    maskTip: 'Quickly tap the screen 3 times in a row to exit the screen mode',
    rectTip: 'Pinch the detection frame with two fingers to adjust the size',
    color: 'Colors',
    distance: 'Detection',
    take: 'Take',
    offLight: 'Screen Off',
    saveToPhotos: 'Saved to Photo Album',
  },
  settingsScreen: {
    title: 'Settings',
    version: 'Version',
    connect: 'Contact Developer',
    goodReview: 'Good Review',
    recommend: {
      title: 'More Apps',
      appName: 'Privacy Box',
      desc: 'Hide private pictures, videos and files',
    },
    agreement: 'Agreement',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    advanced: {
      title: 'Advanced Settings',
      smoothed: 'Smooth Image',
      distance: 'Min Alarm Distance: ',
      shake: 'Shake the Screen',
      vibrationEnabled: 'Vibration Alarm',
    },
    donate: {
      purchasing: 'Paying',
      success: 'Thank you for your donation',
      fail: 'Donation failed',
      title: 'Buy Me a Coffee (Donation)',
      subtitle: 'Support us to develop more free and easy-to-use apps',
    },
    openSource: {
      title: 'The APP is open source, welcome to Star and PR 👉',
    },
  },
  permissionManager: {
    camera: 'Camera',
    saveToPhoto: 'Save to Photos',
    unavailable: '{{permission}} unavailable',
    blocked:
      'Please go to settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
  },
};

export default en;

export type { Translations };
