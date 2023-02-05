import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  PlatformColor,
  useColorScheme,
  StyleProp,
} from 'react-native';

import { VibrancyView } from '@react-native-community/blur';
import { SFSymbol } from 'react-native-sfsymbols';

interface TopButtonProps {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;
}

export function TopButton(props: TopButtonProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableOpacity style={[$container, props.style]} activeOpacity={0.5} onPress={props.onPress}>
      <VibrancyView
        style={StyleSheet.absoluteFill}
        blurType={isDark ? 'ultraThinMaterial' : 'ultraThinMaterialLight'}
        blurAmount={50}
      />
      <SFSymbol name={props.iconName} size={24} color={PlatformColor('systemGray')} />
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  width: 86,
  height: 50,
  overflow: 'hidden',
};
