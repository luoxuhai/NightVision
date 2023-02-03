import { t } from '@/locales';
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { HomeScreen, SettingsScreen, AppMaskScreen } from '../screens';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  AppMask: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
        // headerStyle: {
        //   backgroundColor: colors.background,
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'modal',
          title: t('settingsScreen.title'),
        }}
      />
      <Stack.Screen
        name="AppMask"
        component={AppMaskScreen}
        options={{
          headerShown: false,
          animation: 'none',
          presentation: 'fullScreenModal',
          autoHideHomeIndicator: true,
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  // const { colors, isDark } = useTheme();

  // const theme: typeof DefaultTheme = useMemo(
  //   () => ({
  //     dark: isDark,
  //     colors: {
  //       primary: colors.palette.primary6,
  //       card: colors.background,
  //       background: colors.background,
  //       text: colors.label,
  //       border: colors.separator,
  //       notification: colors.palette.red,
  //     },
  //   }),
  //   [isDark],
  // );

  return (
    <NavigationContainer {...props}>
      <AppStack />
    </NavigationContainer>
  );
});
