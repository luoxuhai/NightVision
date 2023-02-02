import { observer } from 'mobx-react-lite';
import { ViewStyle, View, PlatformColor, StatusBar, Share } from 'react-native';
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { TopButton } from './components/TopButton';
import config from '../../config';
import { BottomButton } from './components/BottomButton';
import { AppStackParamList } from '@/navigators';

export const HomeScreen = observer<StackScreenProps<AppStackParamList>>((props) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={$container}>
      <View
        style={[
          $topContainer,
          {
            top: safeAreaInsets.top,
          },
        ]}
      >
        <TopButton
          iconName="gearshape"
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
        <TopButton
          iconName="square.and.arrow.up"
          onPress={() => Share.share({ url: config.appUrl })}
        />
      </View>
      <View style={{ backgroundColor: '#F00', flex: 1 }} />
      <View style={[$bottomContainer, { bottom: safeAreaInsets.bottom }]}>
        <BottomButton iconName="moon.fill" />
        <BottomButton iconName="ruler" iconSize={40} size={80} />
        <BottomButton iconName="camera.filters" />
      </View>
    </View>
  );
});

const $container: ViewStyle = {
  flex: 1,
};

const $topContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingTop: 20,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $bottomContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingBottom: 20,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 40,
};

const $bottomCenterButton: ViewStyle = {};
