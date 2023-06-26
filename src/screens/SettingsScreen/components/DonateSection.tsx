import {
  Text,
  Button,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
  PlatformColor,
  ActivityIndicator,
} from 'react-native';

import { ListSection, ListCell } from '@/components';
import { InAppPurchase } from '../helpers/InAppPurchase';
import { useCallback } from 'react';
import { human } from 'react-native-typography';

import { useAsyncMemo } from '@/hooks';
import { t } from '@/locales';
import { LottieView } from '@/components/LottieView';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const DonateSection = observer(() => {
  const store = useStore();
  const product = useAsyncMemo(async () => {
    await InAppPurchase.shared.init();
    return await InAppPurchase.shared.getProduct();
  }, []);

  const handlePurchase = useCallback(async () => {
    await InAppPurchase.shared.init();
    await InAppPurchase.shared.requestPurchase();
  }, []);

  return (
    <ListSection footerText={store.isPremium ? undefined : t('settingsScreen.donate.footer')}>
      <ListCell
        style={$container}
        disabled={store.isPremium || !product}
        bottomSeparator={false}
        onPress={handlePurchase}
      >
        <LottieView style={$icon} source="Pro" autoPlay loop speed={0.8} />

        <View style={$textContainer}>
          <Text style={$title} adjustsFontSizeToFit numberOfLines={1}>
            {t('settingsScreen.donate.title')}
          </Text>
          <Text style={$subtitle} adjustsFontSizeToFit numberOfLines={2}>
            {t('settingsScreen.donate.subtitle')}
          </Text>
        </View>

        {store.isPremium ? (
          <Text style={$purchased}>{t('settingsScreen.donate.purchased')}</Text>
        ) : (
          <View>
            {product?.localizedPrice ? (
              <Button title={product?.localizedPrice} onPress={handlePurchase} />
            ) : (
              <ActivityIndicator />
            )}
          </View>
        )}
      </ListCell>
    </ListSection>
  );
});

export { DonateSection };

const $container: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  alignItems: 'center',
};

const $textContainer: ViewStyle = {
  marginHorizontal: 12,
  flex: 1,
};

const $title: TextStyle = {
  ...human.headlineObject,
  color: PlatformColor('label'),
};

const $purchased: TextStyle = {
  ...human.headlineObject,
  color: PlatformColor('label'),
};

const $subtitle: TextStyle = {
  ...human.footnoteObject,
  color: PlatformColor('secondaryLabel'),
  lineHeight: 14,
  marginTop: 4,
};

const $icon: ImageStyle = {
  width: 50,
  alignItems: 'center',
};
