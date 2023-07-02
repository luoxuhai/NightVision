import {
  Image,
  ImageStyle,
  PlatformColor,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Linking,
} from 'react-native';
import { human } from 'react-native-typography';
import { SFSymbol } from 'react-native-sfsymbols';

import { ListCell, ListSection } from '@/components';
import { t, locale } from '@/locales';

const apps = [
  {
    name: t('appPromote.privateBox.name'),
    icon: require('@/assets/app-icon/private-box.png'),
    description: t('appPromote.privateBox.description'),
    id: t('appPromote.privateBox.id'),
  },
];

if (locale.countryCode === 'CN') {
  apps.unshift({
    name: t('appPromote.iGrammar.name'),
    icon: require('@/assets/app-icon/igrammar.png'),
    description: t('appPromote.iGrammar.description'),
    id: t('appPromote.iGrammar.id'),
  });
}

export function AppPromoteSection() {
  return (
    <ListSection headerText={t('appPromote.title')}>
      {apps.map((app) => (
        <ListCell
          style={$recommend}
          bottomSeparator={false}
          onPress={() => {
            Linking.openURL(
              locale.countryCode === 'CN'
                ? `https://apps.apple.com/cn/app/id${app.id}`
                : `https://apps.apple.com/app/id${app.id}`,
            );
          }}
        >
          <Image style={$appIcon} source={app.icon} />
          <View style={{ flex: 1 }}>
            <Text style={[human.body, $appName]}>{app.name}</Text>
            <Text style={[human.subhead, $desc]}>{app.description}</Text>
          </View>
          <SFSymbol
            style={{
              width: 30,
              height: 30,
            }}
            name="icloud.and.arrow.down"
            weight="medium"
            color={PlatformColor('systemBlue')}
          />
        </ListCell>
      ))}
    </ListSection>
  );
}

const $recommend: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 10,
};

const $appIcon: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: PlatformColor('systemGray5'),
  marginRight: 16,
};

const $appName: TextStyle = {
  color: PlatformColor('label'),
  marginBottom: 4,
};

const $desc: TextStyle = {
  color: PlatformColor('secondaryLabel'),
};
