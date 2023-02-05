import React from 'react';
import { Pressable } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { AppStackParamList } from '@/navigators';
import { useMemo } from 'react';

export function AppMaskScreen(props: NativeStackScreenProps<AppStackParamList, 'AppMask'>) {
  const dblclickGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(3)
        .maxDistance(10)
        .runOnJS(true)
        .onEnd(() => {
          props.navigation.goBack();
        }),
    [props.navigation.goBack],
  );

  return (
    <FullWindowOverlay>
      <GestureDetector gesture={dblclickGesture}>
        <Pressable style={{ backgroundColor: '#000', flex: 1 }} />
      </GestureDetector>
    </FullWindowOverlay>
  );
}
