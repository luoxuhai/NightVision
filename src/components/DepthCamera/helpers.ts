import { Alert } from 'react-native';

import { t } from '@/locales';

export function validDistance(distance: number) {
  return distance >= 0;
}

export function alertInAvailable() {
  Alert.alert(t('homeScreen.unavailable.title'), t('homeScreen.unavailable.message'));
}
