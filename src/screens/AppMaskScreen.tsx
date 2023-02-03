import React from 'react';
import { Pressable } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '@/navigators';

export function AppMaskScreen(props: NativeStackScreenProps<AppStackParamList, 'AppMask'>) {
  return (
    <FullWindowOverlay>
      <Pressable style={{ backgroundColor: '#000', flex: 1 }} onPress={props.navigation.goBack} />
    </FullWindowOverlay>
  );
}
