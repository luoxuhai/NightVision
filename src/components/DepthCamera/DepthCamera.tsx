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

const windowWidth = Dimensions.get('window').width;
const cameraViewWidth = windowWidth > 500 ? 500 : windowWidth;

interface DepthCameraProps {
  distanceRectVisible: boolean;
}

export function DepthCamera(props: DepthCameraProps) {
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

  function checkSupports() {
    if (supports) {
      return;
    }

    DepthCameraView.supports().then(async (value) => {
      if (!value) {
        Alert.alert('无法在此设备运行', '请更换支持激光雷达扫描仪的设备后尝试');
      } else {
        await PermissionManager.checkPermissions(['ios.permission.CAMERA']);
        setSupports(value);
      }
    });
  }

  const onCameraSize = useCallback((size: any) => {
    setRatio(size.height / size.width);
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
            smoothed
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
}

const $depthCameraView: ViewStyle = {
  flex: 1,
  backgroundColor: '#888',
};

const $cameraContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
