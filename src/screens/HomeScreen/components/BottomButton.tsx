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
  TextStyle,
} from 'react-native';

import { VibrancyView } from '@react-native-community/blur';
import { SFSymbol } from 'react-native-sfsymbols';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';

interface BottomButtonProps {
  text: string;
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
  const iconSize = props.iconSize ?? 36;
  const color = props.color ?? PlatformColor('systemGray');

  return (
    <TouchableOpacity
      style={[$container, props.style]}
      disabled={!store.isReady}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <View style={[$body, { width: size, height: size, borderRadius: size / 2 }]}>
        <VibrancyView
          style={StyleSheet.absoluteFill}
          blurType={isDark ? 'ultraThinMaterial' : 'ultraThinMaterialLight'}
          blurAmount={50}
        />
        <SFSymbol
          name={props.iconName}
          style={{
            width: iconSize,
            height: iconSize,
          }}
          color={color}
        />
      </View>
      <Text style={$text}>{props.text}</Text>
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const $text: TextStyle = {
  marginTop: 10,
  color: PlatformColor('secondaryLabel'),
  fontSize: 12,
};

const $body: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};
