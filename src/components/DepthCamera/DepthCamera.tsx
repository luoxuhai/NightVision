import { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Dimensions,
  PlatformColor,
  useColorScheme,
  Alert,
  AppState,
  Pressable,
  ViewStyle,
} from 'react-native';
import throttle from 'lodash/throttle';

import { DistanceRect, DistanceRectRef } from './DistanceRect';
import { DepthCameraView } from './DepthCameraView';
import { PermissionManager } from '@/utils';
import { useStore } from '@/store';
import { t } from '@/locales';
import { observer } from 'mobx-react-lite';

const windowWidth = Dimensions.get('window').width;
const cameraViewWidth = windowWidth > 500 ? 500 : windowWidth;

interface DepthCameraProps {
  distanceRectVisible: boolean;
}

export const DepthCamera = observer((props: DepthCameraProps) => {
  const isDark = useColorScheme() === 'dark';
  const [supports, setSupports] = useState(false);
  const [ratio, setRatio] = useState(192 / 256);
  const minDistanceTextRef = useRef<DistanceRectRef>(null);
  const store = useStore();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkSupports();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkSupports = useCallback(() => {
    if (supports) {
      return;
    }

    DepthCameraView.supports().then(async (value) => {
      if (!value) {
        alertInavailable()
      } else {
        await PermissionManager.checkPermissions(['ios.permission.CAMERA']);
        setSupports(value);
        setAvailable(value);
      }
    });
  }, [supports]);

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
        {supports && (
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
