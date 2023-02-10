import { t } from '@/locales';

export function validDistance(distance: number) {
  return distance >= 0;
}

export function alertInavailable() {
  Alert.alert(t('homeScreen.unavailable.title'), t('homeScreen.unavailable.message'));
}