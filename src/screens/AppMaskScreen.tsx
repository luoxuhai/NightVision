import { useMemo } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { AppStackParamList } from '@/navigators';
import { HapticFeedback } from '@/utils';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { t } from '@/locales';

export const AppMaskScreen = observer(
  (props: NativeStackScreenProps<AppStackParamList, 'AppMask'>) => {
    const store = useStore();
    const dblclickGesture = useMemo(
      () =>
        Gesture.Tap()
          .numberOfTaps(3)
          .maxDistance(10)
          .maxDuration(300)
          .runOnJS(true)
          .onEnd(() => {
            props.navigation.goBack();
            HapticFeedback.impact.light();
          }),
      [props.navigation.goBack],
    );

    useEffect(() => {
      if (!store.ignoreAppMask) {
        Alert.alert(t('homeScreen.maskTip'));
        store.setIgnoreAppMask(true);
      }
    }, [store.ignoreAppMask]);

    return (
      <>
        <StatusBar hidden />
        <FullWindowOverlay>
          <GestureDetector gesture={dblclickGesture}>
            <Pressable style={{ backgroundColor: '#000', flex: 1 }} />
          </GestureDetector>
        </FullWindowOverlay>
      </>
    );
  },
);
