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

import { DistanceRect } from './DistanceRect';
import { DepthCameraView } from './DepthCameraView';
import { useEffect } from 'react';
import { useState } from 'react';
import { PermissionManager } from '@/utils';
import { useStore } from '@/store';

const ratio = 192 / 256;
const width = Dimensions.get('window').width;

interface DepthCameraProps {
  distanceRectVisible: boolean;
}

export function DepthCamera(props: DepthCameraProps) {
  const isDark = useColorScheme() === 'dark';
  const [supports, setSupports] = useState(false);
  const minDistanceTextRef = useRef();
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
          width,
          height: width / ratio,
          backgroundColor: '#000',
          position: 'relative',
        }}
      >
        {supports && (
          <DepthCameraView
            style={$depthCameraView}
            onMinDistance={(distance) => {
              minDistanceTextRef.current?.setMinDistance(distance)
            }}
            minDistance={1}
            smoothed
            minDistanceDetection={props.distanceRectVisible}
            detectionWidthScale={store.distanceRect.scale}
            detectionHeightScale={store.distanceRect.scale}
          />
        )}

        {props.distanceRectVisible && <DistanceRect ref={} />}
      </View>
    </Pressable>
  );
}

const $depthCameraView: ViewStyle = {
  flex: 1,
  backgroundColor: '#F00',
};

const $cameraContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
