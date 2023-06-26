import { Alert, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

import Config from '@/config';
import { t } from '@/locales';
import * as storage from './storage';

const IGNORE_VERSION_KEY = 'IGNORE_VERSION';

export async function appUpdateCheck() {
  const { isNeeded = false, latestVersion } = (await VersionCheck.needUpdate()) ?? {};
  const ignoreVersion = storage.get(IGNORE_VERSION_KEY, 'string');

  if (!isNeeded || latestVersion === ignoreVersion) return;

  // 存在最新版
  Alert.alert(t('appUpdate.alert.title', { version: latestVersion }), '', [
    {
      text: t('appUpdate.alert.ok'),
      style: 'default',
      onPress: () => {
        Linking.openURL(Config.appStoreUrl.urlSchema);
      },
    },
    {
      text: t('appUpdate.alert.next'),
      style: 'default',
    },
    {
      text: t('appUpdate.alert.ignore'),
      style: 'default',
      onPress: () => {
        storage.set(IGNORE_VERSION_KEY, latestVersion);
      },
    },
  ]);
}
