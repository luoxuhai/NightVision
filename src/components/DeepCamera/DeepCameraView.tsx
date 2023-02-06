import { View, Dimensions, PlatformColor, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { DistanceRect } from './DistanceRect';

const ratio = 192 / 256;
const width = Dimensions.get('window').width;

export function DeepCameraView() {
  const isDark = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: PlatformColor(isDark ? 'secondarySystemBackground' : 'systemBackground'),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width,
          height: width / ratio,
          backgroundColor: '#000',
        }}
      >
        <DistanceRect />
      </View>
    </View>
  );
}
