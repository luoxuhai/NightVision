import { useUpdateEffect } from '@/hooks';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextStyle } from 'react-native';
import { View, Dimensions, ViewStyle, PlatformColor } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { MIN_RECT_SIZE } from './constants';

const windowWidth = Dimensions.get('window').width;

export const DistanceRect = observer(() => {
  const store = useStore();
  const scale = useSharedValue(1);

  useUpdateEffect(() => {
    scale.value = store!.distanceRect.scale;
    savedScale.value = store!.distanceRect.scale;
  }, [store?.distanceRect.scale]);

  const savedScale = useSharedValue(1);
  const $animatedStyle = useAnimatedStyle(() => ({
    width: scale.value * MIN_RECT_SIZE,
    height: scale.value * MIN_RECT_SIZE,
    transform: [
      {
        translateX: -(scale.value * MIN_RECT_SIZE) / 2,
      },
      {
        translateY: -(scale.value * MIN_RECT_SIZE) / 2,
      },
    ],
  }));

  const gesture = useMemo(
    () =>
      Gesture.Pinch()
        .runOnJS(true)
        .onUpdate((e) => {
          const _scale = savedScale.value * e.scale;
          if (_scale < 1 || _scale * MIN_RECT_SIZE > windowWidth - 50) {
            return;
          }
          scale.value = savedScale.value * e.scale;
        })
        .onEnd((e) => {
          savedScale.value = scale.value;
          store?.setDistanceRect({
            scale: scale.value,
          });
        }),
    [],
  );

  return (
    <>
      <View style={$xAxis} />
      <View style={$yAxis} />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[$rect, $animatedStyle]}>
          <Text style={$text}>1.2m</Text>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const $xAxis: ViewStyle = {
  width: '100%',
  height: StyleSheet.hairlineWidth,
  backgroundColor: PlatformColor('systemYellow'),
  position: 'absolute',
  top: '50%',
  opacity: 0.6,
};

const $yAxis: ViewStyle = {
  width: StyleSheet.hairlineWidth,
  height: '100%',
  backgroundColor: PlatformColor('systemYellow'),
  position: 'absolute',
  left: '50%',
  opacity: 0.6,
};

const $rect: ViewStyle = {
  borderWidth: 1,
  borderColor: PlatformColor('systemYellow'),
  position: 'absolute',
  top: '50%',
  left: '50%',
};

const $text: TextStyle = {
  width: 50,
  backgroundColor: PlatformColor('systemYellow'),
  borderRadius: 10,
  color: '#FFF',
  overflow: 'hidden',
  textAlign: 'center',
  paddingVertical: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [
    {
      translateX: -25,
    },
  ],
};
