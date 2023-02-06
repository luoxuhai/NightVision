import { useMemo } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { AppStackParamList } from '@/navigators';
import { HapticFeedback } from '@/utils';

export function AppMaskScreen(props: NativeStackScreenProps<AppStackParamList, 'AppMask'>) {
  const dblclickGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(3)
        .maxDistance(10)
        .runOnJS(true)
        .onEnd(() => {
          props.navigation.goBack();
          HapticFeedback.impact.light();
        }),
    [props.navigation.goBack],
  );

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
}
