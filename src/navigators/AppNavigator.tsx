import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { HomeScreen, SettingsScreen } from '../screens';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
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
