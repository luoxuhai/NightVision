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
} from 'react-native';

import { VibrancyView } from '@react-native-community/blur';
import { SFSymbol } from 'react-native-sfsymbols';

interface BottomButtonProps {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  size?: number;
  iconSize?: number;
  color?: ColorValue;
  onPress?: () => void;
}

export function BottomButton(props: BottomButtonProps) {
  const isDark = useColorScheme() === 'dark';
  const size = props.size ?? 60;
  const iconSize = props.iconSize ?? 26;
  const color = props.color ?? PlatformColor('systemGray5');

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
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <VibrancyView
        style={StyleSheet.absoluteFill}
        blurType={isDark ? 'ultraThinMaterialDark' : 'chromeMaterialLight'}
        blurAmount={50}
      />
      <SFSymbol name={props.iconName} size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
};
