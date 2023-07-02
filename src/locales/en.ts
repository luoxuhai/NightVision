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
    agreement: 'Agreement',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    advanced: {
      title: 'Advanced Settings',
      smoothed: 'Smooth Image',
      saveCameraImage: 'Take Normal Camera Photo',
      distance: 'Min Alarm Distance: ',
      shake: 'Shake the Screen',
      vibrationEnabled: 'Vibration Alarm',
    },
    donate: {
      needPremium: 'Requires Purchase',
      purchasing: 'Purchasing',
      purchased: 'Purchased',
      success: 'Purchase Successful',
      fail: 'Purchase Failed',
      title: 'Night Vision Premium',
      subtitle: 'Permanently unlock all premium features: Screen Off + Capture Image',
      restore: 'Restore Purchase',
      restoring: 'Restoring Purchase',
      restoreSuccess: 'Restore Purchase Successful',
      restoreFail: 'Failed to Restore Purchases',
      footer:
        'The Apple account will be credited after the user confirms the purchase and pays. If you have any questions, please contact us.',
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
  appUpdate: {
    alert: {
      title: 'New Version Found (V{{version}})',
      ok: 'Update',
      next: 'Next',
      ignore: 'Ignore',
    },
  },
  appPromote: {
    title: 'My More Apps',
    privateBox: {
      id: '1597534147',
      name: 'Privacy Box',
      description: 'Hide private pictures, videos and files',
    },
  },
};

export default en;

export type { Translations };
