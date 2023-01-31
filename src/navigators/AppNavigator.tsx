/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useMemo} from 'react';

import {} from '../screens';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name="Home" component={} />

      <Stack.Screen
        name="Settings"
        component={ChangeLockPasscodeScreen}
        options={{
          presentation: 'formSheet',
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  const {colors, isDark} = useTheme();

  const theme: typeof DefaultTheme = useMemo(
    () => ({
      dark: isDark,
      colors: {
        primary: colors.palette.primary6,
        card: colors.background,
        background: colors.background,
        text: colors.label,
        border: colors.separator,
        notification: colors.palette.red,
      },
    }),
    [isDark],
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
});
