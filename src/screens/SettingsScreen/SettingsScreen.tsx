import { useCallback, useEffect } from 'react';
import { PlatformColor, ViewStyle, Linking, useColorScheme } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from '@react-native-library/overlay';

import { AppStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, TextButton } from '@/components';
import { t } from '@/locales';
import Config from '@/config';
import { Application } from '@/utils';
import { AppPromoteSection } from './components/AppPromoteSection';
import { AdvancedSection } from './components/AdvancedSection';
import { AgreementSection } from './components/AgreementSection';
import { ContactSection } from './components/ContactSection';
import { DonateSection } from './components/DonateSection';
import { InAppPurchase } from './helpers/InAppPurchase';
import { useStore } from '@/store';

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    const isDark = useColorScheme() === 'dark';
    const store = useStore();

    const handleRestore = useCallback(async () => {
      await InAppPurchase.shared.init();
      Alert.show({
        preset: 'spinner',
        title: t('settingsScreen.donate.restoring'),
        duration: 0,
      });

      try {
        const isPurchased = await InAppPurchase.shared.restorePurchase();
        // 恢复成功
        if (isPurchased) {
          InAppPurchase.shared.setPurchasedState(true);
          Alert.dismissAll();
          Alert.show({
            preset: 'done',
            title: t('settingsScreen.donate.restoreSuccess'),
          });
        } else {
          throw Error('No purchase history');
        }
      } catch (error) {
        // 恢复失败
        InAppPurchase.shared.setPurchasedState(false);
        Alert.dismissAll();
        Alert.show({
          preset: 'error',
          title: t('settingsScreen.donate.restoreFail'),
          message: (error as any).message || '',
        });
      }
    }, []);

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <TextButton
            disabled={store.isPremium}
            text={t('settingsScreen.donate.restore')}
            onPress={handleRestore}
          />
        ),
      });
    }, [store.isPremium, handleRestore]);

    return (
      <>
        <SafeAreaScrollView
          style={{
            backgroundColor: isDark
              ? PlatformColor('systemBackground')
              : PlatformColor('secondarySystemBackground'),
          }}
          contentContainerStyle={$contentContainer}
        >
          <DonateSection />

          <ListSection>
            <ListCell
              text={t('settingsScreen.version')}
              rightIcon={null}
              RightAccessory={`${Application.version}(${Application.buildNumber})`}
            />
            <ListCell
              text={t('settingsScreen.goodReview')}
              bottomSeparator={false}
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
            />
          </ListSection>
          <AdvancedSection />
          <AgreementSection />
          <ContactSection />
          <AppPromoteSection />
        </SafeAreaScrollView>
      </>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingTop: 20,
  paddingHorizontal: 20,
};
