import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  PlatformColor,
  useColorScheme,
  StyleProp,
  ColorValue,
  Text,
} from 'react-native';

import { VibrancyView } from '@react-native-community/blur';
import { SFSymbol } from 'react-native-sfsymbols';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';

interface BottomButtonProps {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  size?: number;
  iconSize?: number;
  color?: ColorValue;
  onPress?: () => void;
}

export const BottomButton = observer((props: BottomButtonProps) => {
  const isDark = useColorScheme() === 'dark';
  const store = useStore();

  const size = props.size ?? 60;
  const iconSize = props.iconSize ?? 26;
  const color = props.color ?? PlatformColor('systemGray');

  return (
    <TouchableOpacity
      style={[
        $container,
        props.style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
      disabled={!store.isReady}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <View>
        <VibrancyView
          style={StyleSheet.absoluteFill}
          blurType={isDark ? 'ultraThinMaterial' : 'ultraThinMaterialLight'}
          blurAmount={50}
        />
        <SFSymbol name={props.iconName} size={iconSize} color={color} />
      </View>
      <Text>xxxx</Text>
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
};
