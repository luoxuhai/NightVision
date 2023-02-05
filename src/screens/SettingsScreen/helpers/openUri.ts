import Config from '@/config';
import { openLinkInAppBrowser } from '@/utils';
import { i18n, SupportedLanguage } from '@/locales';
import { Linking } from 'react-native';

export function openRecommendAppStore() {
  Linking.openURL(
    i18n.language === SupportedLanguage.ZH
      ? 'https://apps.apple.com/cn/app/id1597534147'
      : 'https://apps.apple.com/app/id1597534147',
  );
}

export function openUserAgreement(modalEnabled = true) {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.userAgreement.zh_cn
      : Config.userAgreement.en_us,
    { modalEnabled },
  );
}

export function openPrivacyPolicy(modalEnabled = true) {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.privacyPolicy.zh_cn
      : Config.privacyPolicy.en_us,
    { modalEnabled },
  );
}
