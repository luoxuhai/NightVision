import { useMemo, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  PlatformColor,
  Vibration,
  Alert,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useStore } from '@/store';
import { useImperativeHandle } from 'react';
import { useAppState } from '@/hooks';
import { t } from '@/locales';
import { validDistance } from './helpers';
import { MAX_RECT_SCALE, MIN_RECT_SCALE } from './constants';

interface DistanceRectProps {
  width: number;
  height: number;
}

export interface DistanceRectRef {
  setMinDistance(value: number): void;
}

export const DistanceRect = observer<DistanceRectProps, DistanceRectRef>(
  (props, ref) => {
    const store = useStore();
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const rectSize = useMemo(() => props.width * store.distanceRect.scale, []);

    const $animatedStyle = useAnimatedStyle(() => ({
      width: scale.value * rectSize,
      height: scale.value * rectSize,
      transform: [
        {
          translateX: -(scale.value * rectSize) / 2,
        },
        {
          translateY: -(scale.value * rectSize) / 2,
        },
      ],
    }));

    const gesture = useMemo(
      () =>
        Gesture.Pinch()
          .runOnJS(true)
          .onUpdate((e) => {
            const _scale = savedScale.value * e.scale;
            const w = _scale * rectSize;
            if (w < props.width * MIN_RECT_SCALE || w > props.width * MAX_RECT_SCALE) {
              return;
            }
            scale.value = savedScale.value * e.scale;
          })
          .onEnd(() => {
            savedScale.value = scale.value;
            store?.setDistanceRect({
              scale: (scale.value * rectSize) / props.width,
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
  },
  { forwardRef: true },
);

const DistanceText = observer(
  (_, ref: DistanceRectRef) => {
    const [minDistance, setMinDistance] = useState(-2);
    const [rangeTextWidth, setRangeTextWidth] = useState(50);
    const appState = useAppState();
    const store = useStore();
    const warning = useMemo(
      () => (validDistance(minDistance) ? store.minDistance > minDistance : false),
      [minDistance, store.minDistance],
    );

    useImperativeHandle(ref, () => ({
      setMinDistance,
    }));

    useEffect(() => {
      if (!store.ignoreRectTip) {
        Alert.alert(t('homeScreen.rectTip'));
        store.setIgnoreRectTip(true);
      }
    }, []);

    useEffect(() => {
      if (store.vibrationEnabled && appState === 'active' && warning) {
        Vibration.vibrate([250], true);
      } else {
        Vibration.cancel();
      }

      return () => {
        Vibration.cancel();
      };
    }, [appState, warning]);

    if (!minDistance || minDistance === -1) {
      return (
        <Text
          style={[
            $rangeLimitText,
            {
              transform: [
                {
                  translateX: -rangeTextWidth / 2,
                },
              ],
            },
          ]}
          onLayout={(e) => {
            setRangeTextWidth(e.nativeEvent.layout.width);
          }}
        >
          {t('homeScreen.outOfRange')}
        </Text>
      );
    }

    return (
      <Text style={[$text, warning && $textError]}>
        {minDistance.toFixed(3)}
        {t('common.meter')}
      </Text>
    );
  },
  { forwardRef: true },
);

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
  width: 78,
  backgroundColor: PlatformColor('systemYellow'),
  borderRadius: 14,
  color: PlatformColor('darkText'),
  overflow: 'hidden',
  textAlign: 'center',
  paddingVertical: 4,
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  fontSize: 17,
  transform: [
    {
      translateX: -39,
    },
    {
      translateY: -5,
    },
  ],
};

const $textError: TextStyle = {
  backgroundColor: PlatformColor('systemRed'),
  color: '#FFF',
  width: 100,
  fontSize: 20,
  transform: [
    {
      translateX: -50,
    },
    {
      translateY: -5,
    },
  ],
};

const $rangeLimitText: TextStyle = {
  width: 200,
  backgroundColor: PlatformColor('systemPink'),
  borderRadius: 12,
  color: '#FFF',
  overflow: 'hidden',
  textAlign: 'center',
  paddingVertical: 4,
  paddingHorizontal: 8,
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: [
    {
      translateX: -100,
    },
    {
      translateY: -5,
    },
  ],
};
