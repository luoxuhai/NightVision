import { useEffect } from 'react';
import { PlatformColor, StatusBar, ViewStyle, Linking, useColorScheme } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Mailer from 'react-native-mail';

import { AppStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, TextButton } from '@/components';
import { t } from '@/locales';
import Config from '@/config';
import { openPrivacyPolicy, openUserAgreement } from './helpers/openUri';
import { Application, Device } from '@/utils';
import { AppRecommendSection } from './components/AppRecommendSection';
import { AdvancedSection } from './components/AdvancedSection';

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <TextButton text={t('common.close')} onPress={props.navigation.goBack} />,
      });
    }, []);

    function openDeveloperEmail() {
      Mailer.mail(
        {
          recipients: [Config.email],
          subject: '夜视仪反馈',
          body: `
  
  
               Device: ${Device.modelName}
               iOS Version: ${Device.version}
               App Version: ${Application.version}(${Application.buildNumber})
        `,
        },
        (err) => {
          if (!err) {
            return;
          }
          Linking.openURL(`mailto:${Config.email}`);
        },
      );
    }

    return (
      <>
        <StatusBar barStyle="light-content" hidden={false} animated />
        <SafeAreaScrollView
          style={{
            backgroundColor: isDark
              ? PlatformColor('systemBackground')
              : PlatformColor('secondarySystemBackground'),
          }}
          contentContainerStyle={$contentContainer}
        >
          <ListSection>
            <ListCell text="xxx" />
          </ListSection>
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
          <ListSection headerText={t('settingsScreen.agreement')}>
            <ListCell
              text={t('settingsScreen.privacyPolicy')}
              onPress={() => openPrivacyPolicy()}
            />
            <ListCell
              text={t('settingsScreen.userAgreement')}
              bottomSeparator={false}
              onPress={() => openUserAgreement()}
            />
          </ListSection>
          <ListSection>
            <ListCell
              text={t('settingsScreen.connect')}
              bottomSeparator={false}
              RightAccessory={Config.email}
              onPress={openDeveloperEmail}
            />
          </ListSection>
          <AppRecommendSection />
        </SafeAreaScrollView>
      </>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingTop: 20,
  paddingHorizontal: 20,
};
