import { useMemo, useEffect, forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  Dimensions,
  ViewStyle,
  PlatformColor,
  Vibration
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { MIN_RECT_SIZE } from './constants';
import { useStore } from '@/store';

const windowWidth = Dimensions.get('window').width;

interface DistanceRectProps { }

export const DistanceRect = observer<DistanceRectProps>((props, ref) => {
  const store = useStore();
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  useEffect(() => {
    scale.value = store!.distanceRect.scale;
    savedScale.value = store!.distanceRect.scale;
  }, [store?.distanceRect.scale]);

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
        .onEnd(() => {
          savedScale.value = scale.value;
          store?.setDistanceRect({
            scale: scale.value,
          });
        }),
    [],
  );

  return (
    <Animated.View
      style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(100)}
    >
      <View style={$xAxis} />
      <View style={$yAxis} />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[$rect, $animatedStyle]}>
          <DistanceText ref={ref} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}, { forwardRef: true });

const DistanceText = forwardRef((_, ref) => {
  const [minDistance, setMinDistance] = useState(-1);
  const store = useStore();
  const warning = store.minDistance < minDistance;

  useImperativeHandle(ref, () => ({
    setMinDistance
  }))

  useUpdateEffect(() => {
    if (warning) {
      Vibration.vibrate([], true)
    } else {
      Vibration.cancel();
    }
  }, [warning])

  if (!minDistance || minDistance === -1) {
    return null;
  }

  return <Text style={[$text, warning && $textError ]}>{minDistance.toFixed(3)}m</Text>
})

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
  width: 68,
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

const $textError: TextStyle = {
  backgroundColor: PlatformColor('systemRed'),
}