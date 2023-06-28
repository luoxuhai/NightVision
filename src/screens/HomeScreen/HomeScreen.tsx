import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ViewStyle,
  View,
  PlatformColor,
  Share,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KeepAwake from '@sayem314/react-native-keep-awake';
import { requestReview } from 'react-native-store-review';
import Shake from 'react-native-shake';

import { TopButton } from './components/TopButton';
import { BottomButton } from './components/BottomButton';
import config from '@/config';
import { Device, HapticFeedback, Overlay } from '@/utils';
import { DepthCamera } from '@/components';
import { DepthCameraViewRef } from '@/components/DepthCamera/DepthCameraView';
import { AppStackParamList } from '@/navigators';
import { useStore } from '@/store';
import { t, i18n, SupportedLanguage } from '@/locales';
import { appUpdateCheck } from '@/utils/appUpdateCheck';
import { EventTracking } from '@/utils/EventTracking';
import { SFSymbol } from 'react-native-sfsymbols';

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

    setTimeout(() => {
      appUpdateCheck();
    });
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

  const canUseFeature = () => {
    if (store.isPremium) {
      return true;
    } else {
      props.navigation.navigate('Settings');
      Overlay.toast({
        preset: 'error',
        title: t('settingsScreen.donate.needPremium'),
        duration: 4000,
      });
      return false;
    }
  };

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
          <TouchableOpacity
            style={$fullscreen}
            activeOpacity={0.5}
            onPress={() => {
              store.setIsFullscreen(!store.isFullscreen);
              HapticFeedback.impact.medium();
              EventTracking.shared.track('fullscreen');
            }}
          >
            <SFSymbol
              name={
                store.isFullscreen
                  ? 'rectangle.and.arrow.up.right.and.arrow.down.left.slash'
                  : 'rectangle.and.arrow.up.right.and.arrow.down.left'
              }
              color={PlatformColor('systemGray')}
              style={$fullscreenIcon}
            />
          </TouchableOpacity>
          <View style={$bottomButtonGroup}>
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
              iconName={distanceRectVisible ? 'ruler.fill' : 'ruler'}
              text={t('homeScreen.distance')}
              onPress={() => {
                setDistanceRectVisible((prev) => !prev);
                HapticFeedback.impact.heavy();
                EventTracking.shared.track('distance_detection');
              }}
            />
            <BottomButton
              iconName="record.circle"
              text={t('homeScreen.take')}
              style={{
                marginLeft: 10,
              }}
              onPress={async () => {
                if (!canUseFeature()) {
                  return;
                }

                HapticFeedback.impact.medium();
                await depthCameraRef.current?.takePicture({
                  original: store.isTakeCameraPhoto,
                });
                Overlay.toast({
                  preset: 'done',
                  title: t('homeScreen.saveToPhotos'),
                });
                EventTracking.shared.track('take_picture');
              }}
            />
            <BottomButton
              iconName="moon"
              text={t('homeScreen.offLight')}
              onPress={() => {
                if (!canUseFeature()) {
                  return;
                }

                props.navigation.navigate('AppMask');
                HapticFeedback.impact.medium();
                EventTracking.shared.track('screen_off');
              }}
            />
          </View>
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
  paddingTop: Device.isPad ? 40 : 10,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $fullscreen: ViewStyle = {
  marginBottom: 2,
};

const $fullscreenIcon: ViewStyle = {
  width: 32,
  height: 32,
};

const $bottomContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingBottom: Device.isPad ? 50 : 20,
  alignItems: 'center',
};

const $bottomButtonGroup: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: Device.isPad ? 54 : 36,
};
