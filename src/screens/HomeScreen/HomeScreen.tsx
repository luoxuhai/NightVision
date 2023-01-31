import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, PlatformColor, Share, InteractionManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KeepAwake from '@sayem314/react-native-keep-awake';
import { requestReview } from 'react-native-store-review';
import Shake from 'react-native-shake';

import { TopButton } from './components/TopButton';
import { BottomButton } from './components/BottomButton';
import config from '@/config';
import { HapticFeedback, Overlay } from '@/utils';
import { DepthCamera } from '@/components';
import { DepthCameraViewRef } from '@/components/DepthCamera/DepthCameraView';
import { AppStackParamList } from '@/navigators';
import { useStore } from '@/store';
import { t, i18n, SupportedLanguage } from '@/locales';

export const HomeScreen = observer<NativeStackScreenProps<AppStackParamList, 'Home'>>((props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const store = useStore();
  const [distanceRectVisible, setDistanceRectVisible] = useState(false);
  const depthCameraRef = useRef<DepthCameraViewRef>(null);

  useEffect(() => {
    if (!__DEV__) {
      setTimeout(() => {
        InteractionManager.runAfterInteractions(requestReview);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const subscription = Shake.addListener(() => {
      if (store.shake) {
        props.navigation.navigate('AppMask');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [store.shake]);

  return (
    <>
      <KeepAwake />
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
            onPress={() => {
              Share.share({
                url:
                  i18n.language === SupportedLanguage.ZH
                    ? config.appStoreUrl.cn
                    : config.appStoreUrl.global,
              });
            }}
          />
        </View>

        <DepthCamera ref={depthCameraRef} distanceRectVisible={distanceRectVisible} />

        <View style={[$bottomContainer, { bottom: safeAreaInsets.bottom }]}>
          <BottomButton
            iconName="camera.filters"
            text={t('homeScreen.color')}
            color={PlatformColor(store.colorMode === 1 ? 'systemPurple' : 'systemGray')}
            onPress={() => {
              const prev = store.colorMode;
              store.setColorMode(prev === 1 ? 2 : 1);
              HapticFeedback.impact.medium();
            }}
          />
          <BottomButton
            iconName="ruler"
            text={t('homeScreen.distance')}
            onPress={() => {
              setDistanceRectVisible((prev) => !prev);
              HapticFeedback.impact.heavy();
            }}
          />
          <BottomButton
            iconName="record.circle"
            text={t('homeScreen.take')}
            onPress={async () => {
              HapticFeedback.impact.medium();
              await depthCameraRef.current?.takePicture();
              Overlay.toast({
                preset: 'done',
                title: t('homeScreen.saveToPhotos'),
              });
            }}
          />
          <BottomButton
            iconName="moon.fill"
            text={t('homeScreen.offLight')}
            onPress={() => {
              props.navigation.navigate('AppMask');
              HapticFeedback.impact.medium();
            }}
          />
        </View>
      </View>
    </>
  );
});

const $container: ViewStyle = {
  flex: 1,
};

const $topContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingTop: 10,
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
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 36,
};
