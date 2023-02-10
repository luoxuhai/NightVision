import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Dimensions,
  AppState,
  Pressable,
  ViewStyle,
  PlatformColor,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import throttle from 'lodash/throttle';

import { DistanceRect, DistanceRectRef } from './DistanceRect';
import { DepthCameraView } from './DepthCameraView';
import { PermissionManager } from '@/utils';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { alertInAvailable } from './helpers';
import { useAppState } from '@/hooks';

const windowWidth = Dimensions.get('window').width;
const cameraViewWidth = windowWidth > 500 ? 500 : windowWidth;

interface DepthCameraProps {
  distanceRectVisible: boolean;
}

export const DepthCamera = observer((props: DepthCameraProps) => {
  const [ratio, setRatio] = useState(192 / 256);
  const minDistanceTextRef = useRef<DistanceRectRef>(null);
  const store = useStore();
  const isDark = useColorScheme() === 'dark';
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      checkSupports();
    }
  }, [store.isAvailable, appState]);

  const checkSupports = useCallback(() => {
    if (store.isAvailable) {
      return;
    }

    DepthCameraView.supports().then(async (value) => {
      if (!value) {
        alertInAvailable();
      } else if (await PermissionManager.checkPermissions(['ios.permission.CAMERA'])) {
        store.setIsAvailable(value);
      }
    });
  }, [store.isAvailable]);

  const onCameraSize = useCallback((size: any) => {
    setRatio(size.height / size.width);
    store.setIsReady(true);
  }, []);

  const onMinDistance = useCallback(
    throttle((distance: number) => {
      minDistanceTextRef.current?.setMinDistance(distance);
    }, 200),
    [],
  );

  return (
    <Pressable
      style={[
        $cameraContainer,
        {
          backgroundColor: PlatformColor(isDark ? 'secondarySystemBackground' : 'systemBackground'),
        },
      ]}
      onPress={checkSupports}
    >
      <View
        style={{
          width: cameraViewWidth,
          height: cameraViewWidth / ratio,
          backgroundColor: '#000',
          position: 'relative',
        }}
      >
        {store.isAvailable && (
          <DepthCameraView
            style={$depthCameraView}
            smoothed={store.smoothed}
            colorMode={store.colorMode}
            minDistanceDetection={props.distanceRectVisible}
            detectionWidthScale={store?.distanceRect.scale}
            detectionHeightScale={store?.distanceRect.scale}
            onCameraSize={onCameraSize}
            onMinDistance={onMinDistance}
          />
        )}

        {!store.isReady && <ActivityIndicator style={$indicator} size="large" />}

        {props.distanceRectVisible && (
          <DistanceRect
            ref={minDistanceTextRef}
            width={cameraViewWidth}
            height={cameraViewWidth / ratio}
          />
        )}
      </View>
    </Pressable>
  );
});

const $depthCameraView: ViewStyle = {
  flex: 1,
};

const $cameraContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $indicator: ViewStyle = {
  position: 'absolute',
  width: 50,
  height: 50,
  top: '50%',
  left: '50%',
  zIndex: 9,
  transform: [
    {
      translateX: -25,
    },
    {
      translateY: -25,
    },
  ],
};
