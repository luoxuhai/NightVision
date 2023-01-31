import {
  Image,
  ImageStyle,
  PlatformColor,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import { human } from 'react-native-typography';
import { SFSymbol } from 'react-native-sfsymbols';

import { ListCell, ListSection } from '@/components';
import { t } from '@/locales';
import { openRecommendAppStore } from '../helpers/openUri';

const AppIcon = require('@/assets/app-icon.png');

export function AppRecommendSection() {
  return (
    <ListSection headerText={t('settingsScreen.recommend.title')}>
      <ListCell style={$recommend} bottomSeparator={false} onPress={openRecommendAppStore}>
        <Image style={$appIcon} source={AppIcon} />
        <View style={{ flex: 1 }}>
          <Text style={[human.body, $appName]}>{t('settingsScreen.recommend.appName')}</Text>
          <Text style={[human.subhead, $desc]}>{t('settingsScreen.recommend.desc')}</Text>
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
